const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const {
	MessageEmbed,
} = require('discord.js');
const {
	color,
	footer,
	icon,
} = require('../../../configs/embed.json');
const warndb = require('../../models/warns.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warns a specific member for a specific reason!')
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	.addUserOption(option => option.setName('member').setDescription('Who to warn ?').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Warn for what ?').setRequired(false))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: ["MANAGE_GUILD"], owneronly: "false",
	 async execute(interaction, client) {
		try {
		// const string = interaction.options.getString('input');
		// const integer = interaction.options.getInteger('int');
		// const number = interaction.options.getNumber('num');
		// const boolean = interaction.options.getBoolean('choice');
		// const user = interaction.options.getUser('target');
		// const member = interaction.options.getMember('target');
		// const channel = interaction.options.getChannel('destination');
		// const role = interaction.options.getRole('muted');
		// const mentionable = interaction.options.getMentionable('mentionable');
        const auser = interaction.options.getUser('member');
        const reason = interaction.options.getString('reason') || 'No Reason Provided!';

        await interaction.guild.members.fetch();
        const target = interaction.guild.members.cache.get(auser.id);

        if (!interaction.guild.members.cache.get(auser.id)) return interaction.reply('Could not find the specified user!');
        if (target.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply(`You Cannot Warn ${auser.tag} Becouse They Have Higher Role Then You!`);
        if (target.roles.highest.position > interaction.guild.me.roles.highest.position) return interaction.reply(`I Cannot Warn ${auser.tag} Becouse They Have Higher Role Then Me!`);
        // if (arole.position > interaction.member.roles.highest.position) return interaction.reply(`You cannot ban becouse its above then your highest role position!`);
        // if (arole.position > interaction.guild.me.roles.highest.position) return interaction.reply(`I cannot remove that role becouse its above then my highest role position!`);
        // if(arole.name.includes('everyone') || arole.name.includes('booster')) return interaction.reply(`You cannot add or remove the server default roles!`);
        if (interaction.user.id === auser.id) return interaction.reply(`You Cannot Warn Yourself!`);
        if (auser.id === client.user.id) return interaction.reply(`You Cannot Warn Me!`);

        warndb.findOne({
            guild: interaction.guild.id,
            user: auser.id
          }, async (err, data) => {
            if (err) throw err;
            if (!data) {
              data = new warndb({
                guild: interaction.guild.id,
                user: auser.id,
                content: [{
                  moderator: interaction.user.id,
                  reason: reason
                }]
              })
            } else {
              const object = {
                moderator: interaction.user.id,
                reason: reason
              }
              data.content.push(object)
            }
            data.save()
  
          });
  
          const aembed = new MessageEmbed()
          .setColor(color)
          .setTitle(`Member Warned`)
          .setDescription('Successfully Warned The Specified Member!')
          .addFields(
              { name: 'Member', value: `>>> ${auser}` },
              { name: 'Reason', value: `>>> ${reason}` },
          )
          .setFooter('Comet - Warn A Member', icon)
          .setThumbnail(icon)
          .setTimestamp();

          interaction.reply({ embeds: [aembed] });
  
          const sendUser = new MessageEmbed()
          .setColor(color)
          .setDescription(`You Have Been Warned In ${interaction.guild.name}! \nReason: ${reason}`)
          .setFooter(footer, icon)
          .setTimestamp();
  
          try {
            await auser.send({ embeds: [sendUser] });
          } catch (e) {
            return;
          }
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
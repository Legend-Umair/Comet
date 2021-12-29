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

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nick')
		.setDescription('Changes nickname of specified user!')
	.addStringOption(option => option.setName('newnick').setDescription('New nickname for member ?').setRequired(true))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	.addUserOption(option => option.setName('member').setDescription('Change nickname of ?').setRequired(true))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: ["MANAGE_NICKNAMES"], botpermissions: ["MANAGE_NICKNAMES"], owneronly: "false",
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
        const newnick = interaction.options.getString('newnick') || '';

        await interaction.guild.members.fetch();
        const target = interaction.guild.members.cache.get(auser.id);

        if (!interaction.guild.members.cache.get(auser.id)) return interaction.reply('Could not find the specified user!');
        if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply(`You Cannot Change Nickname Of ${auser.tag} Becouse They Have Higher Role Or Same Role AS You!`);
        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply(`I Cannot Change Nickname Of ${auser.tag} Becouse They Have Higher Role Or Same Role As Me!`);
        // if (arole.position > interaction.member.roles.highest.position) return interaction.reply(`You cannot ban becouse its above then your highest role position!`);
        // if (arole.position > interaction.guild.me.roles.highest.position) return interaction.reply(`I cannot remove that role becouse its above then my highest role position!`);
        // if(arole.name.includes('everyone') || arole.name.includes('booster')) return interaction.reply(`You cannot add or remove the server default roles!`);
        if (interaction.user.id === auser.id) return interaction.reply(`You Cannot Change Nickname Of Yourself!`);
        if (auser.id === client.user.id) return interaction.reply(`You Cannot Change Nickname Of Me!`);

        if (newnick.length > 32) return interaction.reply(`The new nickname cannot be above 32 words`);

        try {
        await target.setNickname(newnick);
        const embed = new MessageEmbed()
        .setTitle(`Nickname Changed`)
        .setDescription(`I have changed nickname of ${auser} successfully!`)
        .setFields(
            { name: `To:`, value: `>>> ${newnick}` }
        )
        .setColor(color)
        .setThumbnail(icon)
        .setFooter('Comet - Change Nickname', icon)
        .setTimestamp();

        interaction.reply({ embeds: [embed] });
        } catch (e) {
            interaction.reply(`I Could not change nickname of ${auser}`)
            console.log(e)
        }
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
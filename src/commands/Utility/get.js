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
		.setName('get')
		.setDescription('Get something!')
        .addSubcommand(subcommand => subcommand.setName('first-message').setDescription('Shows The First Message Of The Current/Specific Channel!').addChannelOption(options => options.setName('channel').setDescription('Get first message of which channel ?').setRequired(false)))
        .addSubcommand(subcommand => subcommand.setName('id').setDescription('Shows the specified member client id!').addUserOption(options => options.setName('member').setDescription('Get id of which member ?').setRequired(true)))
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	// .addUserOption(option => option.setName('target').setDescription('Select a user'))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: [], owneronly: "false",
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
        command = interaction.options.getSubcommand()
        if (command === "first-message") {
        // await interaction.deferReply();
        const fetchchannel = interaction.options.getChannel('channel');
        if (fetchchannel) {
          const fetchMessages = await fetchchannel.messages.fetch({
        after: 1,
        limit: 1,
      });
      const msg = fetchMessages.first();
  
        const embed = new MessageEmbed()
          .setColor(color)
          .setTitle(`First Messsage in ${fetchchannel.name}`)
          .setURL(msg.url)
          .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`Content: ${msg.content}\nAuthor: ${msg.author}\nMessage ID: ${msg.id}`)
          .setFooter(footer, icon)
          .setTimestamp()
  
      interaction.reply({ embeds: [embed] });
        }
        if (!fetchchannel) {
      const fetchMessages = await interaction.channel.messages.fetch({
        after: 1,
        limit: 1,
      });
      const msgg = fetchMessages.first();
  
        const embeded = new MessageEmbed()
          .setColor(color)
          .setTitle(`First Messsage in ${interaction.channel.name}`)
          .setURL(msgg.url)
          .setThumbnail(msgg.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`Content: ${msgg.content}\nAuthor: ${msgg.author}\nMessage ID: ${msgg.id}`)
          .setFooter(footer, icon)
          .setTimestamp()
  
      interaction.reply({ embeds: [embeded] });
        }
    } else if (command === "id") {
      const target = interaction.options.getUser('member');

      const ee = new MessageEmbed()
      .setTitle(`${target.tag}'s Client ID`)
      .setDescription(`>>> ${target.id}`)
      .setColor(color)
      .setFooter(footer, icon)
      .setThumbnail(icon)
      .setTimestamp();

      interaction.reply({ embeds: [ee] });
    }
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
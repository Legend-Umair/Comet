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
		.setName('aboutus')
		.setDescription('Shows information about us!')
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	// .addUserOption(option => option.setName('target').setDescription('Select a user'))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, async execute(interaction, client) {
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

        const aboutBed = new MessageEmbed()
        .setTitle(`Comet's About`)
        .setColor(color)
        .addFields(
		{ name: 'Developer', value: '>>> - Glaxin 🖤 ᵒˢ#0001' },
    { name: 'NodeJS', value: '>>> 17 / Latest' },
    { name: 'Library', value: '>>> Discord.js@13' },
    { name: 'Version', value: '>>> 1.0.0' },
    { name: 'Bot Helpers', value: '>>> Soon', inline: false },
	{ name: 'Bot Testers', value: '>>> - Insane 🖤#3645', inline: false },
	)
  .setFooter(footer, icon)
  .setThumbnail(icon)
  .setTimestamp();

      interaction.reply({ embeds: [aboutBed] });
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
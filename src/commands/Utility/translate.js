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
const translate = require('@iamtraction/google-translate');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translates the provided message into english!')
	.addStringOption(option => option.setName('message').setDescription('translate what ?').setRequired(true))
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
		await interaction.reply(`**Translating the message...**`);
        const text = interaction.options.getString('message');

        const translated = await translate(text, { to: 'en' });
        const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Translated To English')
		.addFields(
			{ name: `Input`, value: `>>> ${text}` },
			{ name: `Output`, value: `>>> ${translated.text}` },
		)
        .setThumbnail(icon)
        .setFooter(`Comet - Requested By ${interaction.user.tag}`, icon)
        .setTimestamp();
        interaction.editReply({ content: `**Translated your message...**`, embeds: [embed] });
		} catch (e) {
			interaction.editReply(`Couldnot translate the provided message...`)
			console.log(e)
		};
	},
};
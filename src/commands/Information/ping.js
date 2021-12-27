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
const mongoose = require('mongoose');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows the ping!')
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

		await interaction.reply(`**Getting the bot ping**!`)
		// await setInterval(function () {interaction.editReply(`**Getting the api ping**!`)}, 2000);
		await interaction.editReply(`**Getting the api ping**!`)

        const pingEmbed = new MessageEmbed()
		.setTitle(`Comet's Ping`)
		.addFields(
			{ name: `Bot`, value: `${Math.floor((Date.now() - interaction.createdTimestamp) - 2 * Math.floor(client.ws.ping))}ms` },
			{ name: `Api`, value: `${client.ws.ping}ms` },
			// { name: `Shard`, value: `${mongoose.db.ping}ms` },
		)
		.setColor(color)
		.setThumbnail(icon)
		.setFooter(footer, icon)
		.setTimestamp();

		// setInterval(() => {
			interaction.editReply({ content: `**Got the comet ping**!`, embeds: [pingEmbed] });
		// }, 6000);
		} catch (e) {
			interaction.editReply(`Something went worng...`)
			console.log(e)
		};
	},
};
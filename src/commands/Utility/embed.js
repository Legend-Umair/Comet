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
const simplydjs = require("simply-djs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed-creator')
		.setDescription('Shows a embed creator to create the best embed!')
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	// .addUserOption(option => option.setName('target').setDescription('Select a user'))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: ["MANAGE_MESSAGES"], owneronly: "false",
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
		const creator = new MessageEmbed()
		.setTitle(`Embed Creator`)
		.setColor(color)
		.setThumbnail(icon)
		.setDescription(`Select any option from the Select Menu in this message and i will collect all informations and create a embed for you using the provided data!`)
		.setImage(`https://cdn.discordapp.com/attachments/924147713233285192/924607653018226698/unknown.png`)
		.setFooter('Comet - Create A Embed', icon)
		.setTimestamp();

        await interaction.deferReply();
        simplydjs.embedCreate(interaction, {
            credit: false,
            // embedColor: color
			embed: creator
        });
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
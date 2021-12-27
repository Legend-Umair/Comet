const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const {
	MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const {
	color,
	footer,
	icon,
} = require('../../../configs/embed.json');
const shorten = require("isgd");
const { isURL } = require("validator");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('short')
		.setDescription('Shorts the provided url and generates a short link')
        .addSubcommand(subcommand =>
            subcommand
            .setName('url')
            .setDescription('Makes the provided url short!')
            .addStringOption(option =>
                option
                .setName('long-url')
                .setDescription('Provide a link to make shorter')
                .setRequired(true)
                )
            )
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
        if (interaction.options.getSubcommand() === "url") {
            const shurl = interaction.options.getString('long-url');

            if (!isURL(shurl)) return interaction.reply(`Please provide a vaild url to make it shorter!`);

            shorten.shorten(shurl, function (res) {
                const urldone = new MessageEmbed() // Prettier
                 .setColor(color)
                 .setTitle(`Short URL`)
                 .setDescription(`Short Link: **${res}**`)
                 .setThumbnail(icon)
                 .setFooter('Comet - Create A Short Link', icon)
                 .setTimestamp();
                const row = new MessageActionRow() // Prettier
                 .addComponents(
                  new MessageButton() // Prettier
                   .setStyle("LINK")
                   .setURL(res)
                   .setLabel(`Short Link`)
                 );
                interaction.reply({ embeds: [urldone], components: [row] });
               });
        };
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
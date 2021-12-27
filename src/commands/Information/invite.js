const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const {
	MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
	color,
	footer,
	icon,
} = require('../../../configs/embed.json');
const {
    botinvite,
    maininvite
} = require('../../../configs/links.json');
const {
	comet,
	plus
} = require('../../../configs/addons/emojis.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Shows the invite link of the bot to add in your server!')
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
        const ee = new MessageEmbed()
        .setTitle(`Comet's Invite Link`)
        .setDescription(`I'am a multipurpose discord bot, i can do giveaways, i have many commands and chatbot system and music system and much more!`)
        .addField('**Invite Link**:', `[Click Here To Add Me To Your Server](${botinvite})`)
        .setColor(color)
        .setFooter(footer, icon)
		.setThumbnail(icon)
        .setTimestamp();

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                // .setCustomId('primary')
                .setLabel('Invite Me')
                .setStyle('LINK')
				.setEmoji(comet)
                .setURL(botinvite),
            new MessageButton()
                // .setCustomId('primary')
                .setLabel('Alternative Invite')
                .setStyle('LINK')
				.setEmoji(plus)
                .setURL(maininvite),
        );

        interaction.reply({ embeds: [ee], components: [row] });
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
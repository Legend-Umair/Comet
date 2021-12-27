const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const {
	MessageEmbed,
	Permissions
} = require('discord.js');
const {
	color,
	footer,
	icon,
} = require('../../../configs/embed.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Shows the recent deleted message, if there is one')
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
        const msg = client.snipes.get(interaction.channel.id);
        if(!msg) return interaction.reply("There Is No Deleted Message!");
        if (msg.content.includes('https://')) msg.content = 'Cannot snipe messages that contain links.';
        if (msg) {
         const embed = new MessageEmbed()
        .setAuthor(msg.author, interaction.user.displayAvatarURL({ dynamic: true }))
        .addField('Content:', `>>> ${msg.content}`)
        .setColor(color)
        .setFooter("Comet - Requested By " + interaction.user.tag, icon)
        .setThumbnail(icon)
		.setTimestamp()
        if(msg.image)embed.setImage(msg.image)

        interaction.reply({ embeds: [embed] });
        }
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
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
		.setName('coinflip')
		.setDescription('Dont fight! lets solve your problems by flipping coin!')
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

		await interaction.reply(`${require('../../../configs/addons/emojis.js').coin} - **Flipping The Coin**!`)
        const answers = ["Heads", "Tails"];
        const answer = answers[Math.floor(Math.random() * answers.length)];
        const embed = new MessageEmbed() // Prettier
         .setColor(color)
         .setTitle('Coinflip')
		.setDescription(`>>> ${require('../../../configs/addons/emojis.js').coin} | GG! You Got ${answer}`)
         .setFooter(footer, icon)
         .setThumbnail(icon)
         .setTimestamp();
		 setInterval(function () { interaction.editReply({ content: `**Coin Has Been Fliped And The Answer Is:**`, embeds: [embed] }); }, 3000);
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
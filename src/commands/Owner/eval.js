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
		.setName('eval')
		.setDescription('Evaluates and runs JavaScript code')
	.addStringOption(option => option.setName('code').setDescription('Enter a code').setRequired(true))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	// .addUserOption(option => option.setName('target').setDescription('Select a user'))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: [], owneronly: "true",
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
        let result = interaction.options.getString('code');
   let evaluated = eval(result);
   let type = typeof evaluated;
   console.log("Code to eval: " + result);
   const success = new MessageEmbed() // Prettier
    .setColor(color)
    .addField(`Type`, `\`\`\`js\n${type}\`\`\``)
    .addField(`Input`, `\`\`\`js\n${result}\`\`\``)
    .addField(`Output`, `\`\`\`js\n${evaluated}\`\`\``)
    .setFooter(footer, icon)
   interaction.reply({ embeds: [success] });
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
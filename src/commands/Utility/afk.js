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
const { afk } = require('../../collections/index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('afk')
		.setDescription('Sets your global status to afk!')
	    .addStringOption(option => option.setName('reason').setDescription('Reason for afk ?').setRequired(false))
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

		// if (interaction.options.getSubcommand() === "global") {
			const reason = interaction.options.getString('reason') || "Im Afk :)";
			const user = interaction.member;

			await afk.set(interaction.user.id, [Date.now(), reason]);
			const embed = new MessageEmbed()
			.setTitle(`${require('../../../configs/addons/emojis.js').success} - **Set Your AFK Status Globally**`)
			.addFields(
				{ name: `Reason:`, value: `>>> ${reason}` }
			)
			.setColor(color)
			.setThumbnail(icon)

			interaction.reply({ embeds: [embed] });
		// };
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
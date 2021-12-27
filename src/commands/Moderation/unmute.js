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
		.setName('unmute')
		.setDescription('Unmutes the specified member for a specific reason!')
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	.addUserOption(option => option.setName('member').setDescription('Who to unmute ?').setRequired(true))
	// .addStringOption(option => option.setName('reason').setDescription('Reason for mute ?').setRequired(false))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: ["MANAGE_GUILD"], botpermissions: ["MANAGE_ROLES"], owneronly: "false",
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
		const auser = interaction.options.getUser('member');
		// const reason = interaction.options.getString('reason') || 'No Reason Provided!';

		await interaction.guild.members.fetch();
		const target = interaction.guild.members.cache.get(auser.id);
        let muteRole = interaction.guild.roles.cache.find(role => role.name === 'muted');

        if (!interaction.guild.roles.cache.find(role => role.name === "muted")) return interaction.reply('There is no role named `muted` in this server!');
		if (!interaction.guild.members.cache.get(auser.id)) return interaction.reply('Could not find the specified user!');
		if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply(`You Cannot Unmute ${auser.tag} Becouse They Have Higher Role Or Same Role AS You!`);
		if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply(`I Cannot Unmute ${auser.tag} Becouse They Have Higher Role Or Same Role As Me!`);
		if (interaction.user.id === auser.id) return interaction.reply(`You Cannot Unmute Yourself!`);
		if (auser.id === client.user.id) return interaction.reply(`You Cannot Unmute Me!`);
        if (muteRole.postion >= interaction.guild.me.roles.highest.postion) return interaction.reply(`I cannot unmute them becouse muterole is above then my highest role!`);
		if (!target.roles.cache.has(muteRole.id)) return interaction.reply('They Are Not Muted! use `/mute` To Mute Them!');

		await target.roles.remove(muteRole.id);
		const aembed = new MessageEmbed()
		.setColor(color)
		.setTitle(`Member Unmuted`)
		.setDescription('Successfully Unmuted The Specified Member!')
		.addFields(
			{ name: 'Member', value: `>>> ${auser}` },
			{ name: 'Action', value: `>>> Unmute` },
		)
		.setFooter('Comet - Unmute A Member', icon)
        .setThumbnail(icon)
		.setTimestamp();

		interaction.reply({ embeds: [aembed] });
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
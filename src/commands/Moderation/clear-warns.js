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
const db = require('../../models/warns.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-warnings')
		.setDescription('Removes all warnings from a specified member!')
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	.addUserOption(option => option.setName('member').setDescription('Clear warnings of ?').setRequired(true))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: ["MANAGE_GUILD"], owneronly: "false",
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
		const user = interaction.guild.members.cache.get(auser.id);
        if (!interaction.guild.members.cache.get(user.id)) return interaction.reply('Could not find the specified user!');
        if (user.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply(`You Cannot Clear Warns Of ${auser.tag} Becouse They Have Higher Role Or Same Role As You!`);
        if (user.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply(`I Cannot Clear Warns Of ${auser.tag} Becouse They Have Higher Role Or Same Role As Me!`);
        if (user.id === interaction.user.id) return interaction.reply(`You Cannot Clear Warnings Of Yourself!`);
                db.findOne({
            guild: interaction.guild.id,
            user: user.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await db.findOneAndDelete({
                    user: user.id,
                    guild: interaction.guild.id
                })
                const aembed = new MessageEmbed()
                .setColor(color)
                .setTitle(`Cleared Warnings`)
                .setDescription('Successfully Cleared Warnings Of The Specified Member!')
                .addFields(
                    { name: 'Member', value: `>>> ${user}` },
                    { name: 'Cleared', value: `>>> All` },
                )
                .setFooter('Comet - Clear Warnings Of A Member', icon)
                .setThumbnail(icon)
                .setTimestamp();
    
                interaction.reply({ embeds: [aembed] });
            } else {
                interaction.reply('This user does not have any warns in this server!');
            }
        })
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
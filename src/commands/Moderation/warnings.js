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
const warndb = require('../../models/warns.js');
const moment = require('moment');
const { stripIndent } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnings')
	    .setDescription('Shows warnings of a specified member!')
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	.addUserOption(option => option.setName('member').setDescription('Show warnings of ?').setRequired(false))
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
		const user = interaction.options.getMember('member') || interaction.user;

		warndb.findOne({
            guild: interaction.guild.id, 
            user: user.id
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                const e = data.content.map(
                    (w, i) => `\n${i + 1} - Moderator: ${interaction.guild.members.cache.get(w.moderator).user.tag}, Reason: ${w.reason}`
                )
const warns = stripIndent`
       ${e.join(' ')}
 `;

                const embed = new MessageEmbed()
                    .setTitle(`List Of Warnings`)
                    .addField('**Warnings**:', `\`\`\`asciidoc\n${warns}\`\`\``)
                    .setColor(color)
                    .setFooter(`Comet - Show Warnings`, icon)
                    .setThumbnail(icon)
					.setTimestamp();
                interaction.reply({
                    embeds: [embed]
                });
            } else {
                interaction.reply(`${user} does not have any warnings!`)
            }
        });
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
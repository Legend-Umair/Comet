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
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Shows commands related to giveaway!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('start')
            .setDescription('Starts a giveaway in this channel!')
            .addStringOption(option => option.setName('prize').setDescription('Prize for giveaway ?').setRequired(true))
            .addStringOption(option => option.setName('duration').setDescription('how long should the giveaway be ?').setRequired(true))
            .addIntegerOption(option => option.setName('winners').setDescription('how many winners should giveaway have ?').setRequired(false))
            )
			.addSubcommand(subcommand =>
				subcommand
				.setName('reroll')
				.setDescription('Rerolls a giveaway, if there is one!')
				.addStringOption(option => option.setName('id').setDescription('Id of giveaway message ?').setRequired(true))
				)
				.addSubcommand(subcommand =>
					subcommand
					.setName('end')
					.setDescription('Ends a giveaway, if there is one!')
					.addStringOption(option => option.setName('id').setDescription('Id of giveaway message ?').setRequired(true))
					)
					.addSubcommand(subcommand =>
						subcommand
						.setName('delete')
						.setDescription('Deletes a giveaway, if there is one!')
						.addStringOption(option => option.setName('id').setDescription('Id of giveaway message ?').setRequired(true))
						)
						.addSubcommand(subcommand =>
							subcommand
							.setName('pause')
							.setDescription('Pauses a giveaway, if there is one!')
							.addStringOption(option => option.setName('id').setDescription('Id of giveaway message ?').setRequired(true))
							)
							.addSubcommand(subcommand =>
								subcommand
								.setName('resume')
								.setDescription('Resumes a giveaway, if there is one paused!')
								.addStringOption(option => option.setName('id').setDescription('Id of giveaway message ?').setRequired(true))
								)
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	// .addUserOption(option => option.setName('target').setDescription('Select a user'))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: [], botpermissions: [], owneronly: "false",
	 async execute(interaction, client) {
		try {
		ctx = interaction;
		// const string = interaction.options.getString('input');
		// const integer = interaction.options.getInteger('int');
		// const number = interaction.options.getNumber('num');
		// const boolean = interaction.options.getBoolean('choice');
		// const user = interaction.options.getUser('target');
		// const member = interaction.options.getMember('target');
		// const channel = interaction.options.getChannel('destination');
		// const role = interaction.options.getRole('muted');
		// const mentionable = interaction.options.getMentionable('mentionable');
		command = interaction.options.getSubcommand()

		if (!interaction.member.roles.cache.some(role => role.name === 'Giveaways')) {
			return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed()
				.setColor("RED")
				.setTitle(`Error While Executing`)
				.setDescription(`${require('../../../configs/addons/emojis.js').error} You Need Required Roles To Execute This Command!!`)
				.addFields(
					{ name: '**Required Roles**:', value: `>>> You Need A Role Called: \`Giveaways\`` }
				)
				.setFooter(footer, icon)
				.setTimestamp()
				]
			});
		};
		if (command === "start") {
			const gp = ctx.options.getString('prize');
			const gd = ctx.options.getString('duration');
			const gw = ctx.options.getInteger('winners') || 1;

			client.giveawaysManager.start(interaction.channel, {
				duration: ms(gd),
				winnerCount: gw,
				prize: gp,
				hostedBy: interaction.user.tag,
				lastChance: {
					enabled: true,
					content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
					threshold: 5000,
					embedColor: '#FF0000'
				},
				messages: {
					giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
					giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
					drawing: 'Drawing: {timestamp}',
					dropMessage: 'Be the first to react with 🎉 !',
					inviteToParticipate: 'React with 🎉 to participate!',
					winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
					embedFooter: '{this.winnerCount} winner(s)',
					noWinner: 'Giveaway cancelled, no valid participations.',
					hostedBy: 'Hosted by: {this.hostedBy}',
					winners: 'Winner(s):',
					endedAt: 'Ended at',
				}
			}).then((gData) => {
				interaction.reply({ content: `Giveaway has been created!`, ephemeral: true });
			});
		} else if (command === "reroll") {
			const messageId = interaction.options.getString('id');
			client.giveawaysManager.reroll(messageId).then(() => {
				interaction.reply({ content: `Success! Giveaway rerolled!`, ephemeral: true });
			}).catch((err) => {
				interaction.reply({ content: err, ephemeral: true });
			});	
		} else if (command === "end") {
			const messageId = interaction.options.getString('id');
			client.giveawaysManager.end(messageId).then(() => {
				interaction.reply({ content: `Success! Giveaway ended!`, ephemeral: true });
			}).catch((err) => {
				interaction.reply({ content: err, ephemeral: true });
			});	
		} else if (command === "delete") {
			const messageId = interaction.options.getString('id');
			client.giveawaysManager.delete(messageId).then(() => {
				interaction.reply({ content: `Success! Giveaway deleted!`, ephemeral: true });
			}).catch((err) => {
				interaction.reply({ content: err, ephemeral: true });
			});	
		} else if (command === "pause") {
			const messageId = interaction.options.getString('id');
			client.giveawaysManager.pause(messageId).then(() => {
				interaction.reply({ content: `Success! Giveaway paused!`, ephemeral: true });
			}).catch((err) => {
				interaction.reply({ content: err, ephemeral: true });
			});	
		} else if (command === "resume") {
			const messageId = interaction.options.getString('id');
			client.giveawaysManager.unpause(messageId).then(() => {
				interaction.reply({ content: `Success! Giveaway resumed!`, ephemeral: true });
			}).catch((err) => {
				interaction.reply({ content: err, ephemeral: true });
			});	
		}
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
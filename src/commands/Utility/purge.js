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
const Purger = require('discord-purger');
const purger = new Purger();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('shows commands realted to purge...')
        .addSubcommand(subcommand =>
            subcommand
            .setName('messages')
            .setDescription('Purge number of messages in this channel!')
            .addStringOption(option =>
                option
                .setName('messages')
                .setDescription('How many messages to delete ?')
                .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('msgs-of-bots')
                .setDescription('Purge all of the messages sent from bots!')
                )
                .addSubcommand(subcommand =>
                    subcommand
                    .setName('msgs-of-user')
                    .setDescription('Purge number of messages sent from specific user!')
                    .addUserOption(option =>
                        option
                        .setName('member')
                        .setDescription('Purge messages of ?')
                        .setRequired(true)
                        )
                        .addStringOption(option =>
                            option
                            .setName('messages')
                            .setDescription('How many messages to delete ?')
                            .setRequired(true)
                            )
                    )
                        .addSubcommand(subcommand =>
                            subcommand
                            .setName('msgs-with-emojis')
                            .setDescription('Purge number of messages that contain emojis!')
                                .addStringOption(option =>
                                    option
                                    .setName('messages')
                                    .setDescription('How many messages to delete ?')
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
	, memberpermissions: ["MANAGE_MESSAGES"], botpermissions: ['MANAGE_MESSAGES'], owneronly: "false",
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
        command = interaction.options.getSubcommand()

        if (command === "messages") {
            const number = interaction.options.getString('messages');

            if (isNaN(number)) return interaction.reply('Please provide a vaild number of messages to delete!');
            if (number.length > 100) return interaction.reply('I cannot delete more then 100 messages!');

            purger.purge("messages", interaction, interaction.channel, number);
        } else if (command === "msgs-of-bots") {
            purger.purge("bot-messages", interaction, interaction.channel);
        } else if (command === "msgs-of-user") {
            const number = interaction.options.getString('messages');
            const member = interaction.options.getUser('member');

            if (isNaN(number)) return interaction.reply('Please provide a vaild number of messages to delete!');
            if (number.length > 100) return interaction.reply('I cannot delete more then 100 messages!');

            purger.purge("user-messages", interaction, interaction.channel, number, member);
        } else if (command === "msgs-with-emojis") {
            const number = interaction.options.getString('messages');
            // const string = interaction.options.getUser('starts-with');

            if (isNaN(number)) return interaction.reply('Please provide a vaild number of messages to delete!');
            if (number.length > 100) return interaction.reply('I cannot delete more then 100 messages!');

            purger.purge("emoji-messages", interaction, interaction.channel, number);
        }
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
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
		.setName('announce')
		.setDescription('Announce a message in a channel!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('with-everyone-ping')
            .setDescription('Announce a message with @everyone ping!')
            .addStringOption(option =>
                option
                .setName('message')
                .setDescription('Announce what ?')
                .setRequired(true)
                )
            .addChannelOption(option =>
                option
                .setName('channel')
                .setDescription('Announce where ?')
                .setRequired(false)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('with-here-ping')
                .setDescription('Announce a message with @here ping!')
                .addStringOption(option =>
                    option
                    .setName('message')
                    .setDescription('Announce what ?')
                    .setRequired(true)
                    )
                .addChannelOption(option =>
                    option
                    .setName('channel')
                    .setDescription('Announce where ?')
                    .setRequired(false)
                    )
                )
                .addSubcommand(subcommand =>
                    subcommand
                    .setName('without-ping')
                    .setDescription('Announce a message without a ping!')
                    .addStringOption(option =>
                        option
                        .setName('message')
                        .setDescription('Announce what ?')
                        .setRequired(true)
                        )
                    .addChannelOption(option =>
                        option
                        .setName('channel')
                        .setDescription('Announce where ?')
                        .setRequired(false)
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
        command = interaction.options.getSubcommand()
        if (command === "with-everyone-ping") {
            // await interaction.deleteReply();
            const message = interaction.options.getString('message');
            const channel = interaction.options.getChannel('channel');

            const everyoneBed = new MessageEmbed()
            .setColor(color)
            .setDescription(`>>> ${message}`)
            .setFooter(`Comet - Announcement By ${interaction.user.tag}`, icon)
            .setTimestamp();

            if (!channel) interaction.channel.send({ content: `@everyone`, embeds: [everyoneBed] });
            if (channel) {
                channel.send({ content: '@everyone', embeds: [everyoneBed] });
                interaction.reply(`Announced the message in ${channel}`);
            }
            // interaction.deleteReply();
        } else if (command === "with-here-ping") {
            // await interaction.deleteReply();
            const message = interaction.options.getString('message');
            const channel = interaction.options.getChannel('channel');

            const hereBed = new MessageEmbed()
            .setColor(color)
            .setDescription(`>>> ${message}`)
            .setFooter(`Comet - Announcement By ${interaction.user.tag}`, icon)
            .setTimestamp();

            if (!channel) interaction.channel.send({ content: '@here', embeds: [hereBed] });
            if (channel) {
                channel.send({ content: '@here', embeds: [hereBed] });
                interaction.reply(`Announced the message in ${channel}!`);
            }
            // interaction.deleteReply();
        } else if (command === "without-ping") {
            // await interaction.deleteReply();
            const message = interaction.options.getString('message');
            const channel = interaction.options.getChannel('channel');
            // const role = interaction.options.getRole('role');

            const noBed = new MessageEmbed()
            .setColor(color)
            .setDescription(`>>> ${message}`)
            .setFooter(`Comet - Announcement By ${interaction.user.tag}`, icon)
            .setTimestamp();

            if (!channel) interaction.channel.send({ embeds: [noBed] });
            if (channel) {
                channel.send({ embeds: [noBed] });
                interaction.reply(`Announced the message in ${channel}!`);
            }
            // interaction.deleteReply();
        };
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
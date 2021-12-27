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
const Schema = require('../../models/chatbot.js');
const joindm = require('../../models/joindm.js');
const autorole = require('../../models/autorole.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('config')
		.setDescription('Config the comet bot for this server!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('chatbot-channel')
            .setDescription('Setup the chatbot system in this server!')
            .addChannelOption(option =>
                option
                .setName('channel')
                .setDescription('Which channel for chatbot ?')
                .setRequired(true)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('chatbot-disable')
                .setDescription('Disable the chatbot system in this server!')
                )
                .addSubcommand(subcommand =>
                    subcommand
                    .setName('joindm-message')
                    .setDescription('Setup the join dm message in this server!')
                    .addStringOption(option =>
                        option
                        .setName('message')
                        .setDescription('Which message for dm ?')
                        .setRequired(true)
                        )
                    )
                    .addSubcommand(subcommand =>
                        subcommand
                        .setName('joindm-disable')
                        .setDescription('Disable the joindm message in this server!')
                        )
                        .addSubcommand(subcommand =>
                            subcommand
                            .setName('autorole-setup')
                            .setDescription('Setup the autorole for new members!')
                            .addRoleOption(option =>
                                option
                                .setName('role')
                                .setDescription('Which role for new members ?')
                                .setRequired(true)
                                )
                            )
                            .addSubcommand(subcommand =>
                                subcommand
                                .setName('autorole-disable')
                                .setDescription('Disable the autorole system in this server!')
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
        if (command === "chatbot-channel") {
            const channel = interaction.options.getChannel('channel');
            Schema.findOne({
        Guild: interaction.guild.id
    }, async(err, data) => {
        if (data) data.delete();
        new Schema({
            Guild: interaction.guild.id,
            Channel: channel.id,
        }).save();
        const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Chatbot System')
        .setDescription(`Successfully Set ${channel} For Chatbot!`)
        .setFooter(footer, icon)
        .setThumbnail(icon)
        .setTimestamp()
        interaction.reply({ embeds: [embed] });
        if (channel.id !== interaction.channel.id) channel.send(`Set This Channel As Chatbot Channel!`);
    });
        } else if (command === "chatbot-disable") {
            Schema.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (!data) return interaction.reply(`Chatbot Is Not Enabled In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Chatbot Disabled')
                .setDescription(`Successfully Disabled Chatbot System In This Server!`)
                .setFooter(footer, icon)
                .setThumbnail(icon)
				.setTimestamp()
                interaction.reply({ embeds: [embed] });
            });
        } else if (command === "joindm-message") {
            const msg = interaction.options.getString('message');
            joindm.findOne({
        Guild: interaction.guild.id
    }, async(err, data) => {
        if (data) data.delete();
        new joindm({
            Guild: interaction.guild.id,
            Message: msg,
            GuildName: interaction.guild.name,
        }).save();
        const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Join Direct Message')
        .setDescription(`Successfully Set A Message For Messaging New Users!`)
        .setFooter(footer, icon)
        .setThumbnail(icon)
        .setTimestamp()
        interaction.reply({ embeds: [embed] });
        // if (channel.id !== interaction.channel.id) channel.send(`Set This Channel As Chatbot Channel!`);
    });
        } else if (command === "joindm-disable") {
            joindm.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (!data) return interaction.reply(`Joindm System Is Not Enabled In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Join DM Disabled')
                .setDescription(`Successfully Disabled Join Dm Message System In This Server!`)
                .setFooter(footer, icon)
                .setThumbnail(icon)
				.setTimestamp()
                interaction.reply({ embeds: [embed] });
            });
        } else if (command === "autorole-setup") {
            const newrole = interaction.options.getRole('role');
            autorole.findOne({
        Guild: interaction.guild.id
    }, async(err, data) => {
        if (data) data.delete();
        new autorole({
            Guild: interaction.guild.id,
            Role: newrole.id,
            // GuildName: interaction.guild.name,
        }).save();
        const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Autorole System')
        .setDescription(`Successfully Set ${newrole} As Autorole For New Members!`)
        .setFooter(footer, icon)
        .setThumbnail(icon)
        .setTimestamp()
        interaction.reply({ embeds: [embed] });
        // if (channel.id !== interaction.channel.id) channel.send(`Set This Channel As Chatbot Channel!`);
    });
        } else if (command === "autorole-disable") {
            autorole.findOne({
                Guild: interaction.guild.id
            }, async(err, data) => {
                if (!data) return interaction.reply(`Autorole System Is Not Enabled In This Server!`);
                if (data) data.delete();
                const embed = new MessageEmbed()
                .setColor(color)
                .setTitle('Autorole Disabled')
                .setDescription(`Successfully Disabled Autorole System In This Server!`)
                .setFooter(footer, icon)
                .setThumbnail(icon)
				.setTimestamp()
                interaction.reply({ embeds: [embed] });
            });
        };
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
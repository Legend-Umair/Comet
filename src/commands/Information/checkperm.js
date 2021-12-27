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
const {
    error,
    success
} = require('../../../configs/addons/emojis.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot')
		.setDescription('Checks if bot has correct required permissions or not!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('checkperm')
            .setDescription('Checks if bot has correct required permissions or not!')
            )
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	// .addUserOption(option => option.setName('target').setDescription('Select a user'))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, memberpermissions: ["ADMINISTRATOR"], owneronly: "false",
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

    const embed = new MessageEmbed()
    .setTitle(`Comet Permissions`)
    .setDescription(
     `These are the bot premissions on this server. If <@${client.user.id}> misses them some commands & functions will be disabled!
     • \`ADMINISTRATOR\`: ${interaction.guild.me.permissions.has("ADMINISTRATOR") ? `${success}` : `${error}`}\n
     • \`MANAGE_CHANNELS\`: ${interaction.guild.me.permissions.has("MANAGE_CHANNELS") ? `${success} Passed!` : `${error} Error!`}
     • \`MANAGE_ROLES\`: ${interaction.guild.me.permissions.has("MANAGE_ROLES") ? `${success} Passed!` : `${error} Error!`}
     • \`KICK_MEMBERS\`: ${interaction.guild.me.permissions.has("KICK_MEMBERS") ? `${success} Passed!` : `${error} Error!`}
     • \`BAN_MEMBERS\`: ${interaction.guild.me.permissions.has("BAN_MEMBERS") ? `${success} Passed!` : `${error} Error!`}
     • \`ADD_REACTIONS\`: ${interaction.guild.me.permissions.has("ADD_REACTIONS") ? `${success} Passed!` : `${error} Error!`}
     • \`MANAGE_EMOJIS_AND_STICKERS\`: ${interaction.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") ? `${success} Passed!` : `${error} Error!`}
     • \`VIEW_AUDIT_LOG\`: ${interaction.guild.me.permissions.has("VIEW_AUDIT_LOG") ? `${success} Passed!` : `${error} Error!`}
     • \`SEND_MESSAGES\`: ${interaction.guild.me.permissions.has("SEND_MESSAGES") ? `${success} Passed!` : `${error} Error!`}
     • \`MANAGE_MESSAGES\`: ${interaction.guild.me.permissions.has("MANAGE_MESSAGES") ? `${success} Passed!` : `${error} Error!`}
     • \`EMBED_LINKS\`: ${interaction.guild.me.permissions.has("EMBED_LINKS") ? `${success} Passed!` : `${error} Error!`}
     • \`ATTACH_FILES\`: ${interaction.guild.me.permissions.has("ATTACH_FILES") ? `${success} Passed!` : `${error} Error!`}
     • \`USE_EXTERNAL_EMOJIS\`: ${interaction.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? `${success} Passed!` : `${error} Error!`}
     • \`CONNECT\`: ${interaction.guild.me.permissions.has("CONNECT") ? `${success} Passed!` : `${error} Error!`}
     • \`SPEAK\`: ${interaction.guild.me.permissions.has("SPEAK") ? `${success} Passed!` : `${error} Error!`}
     `
    )
    .setTimestamp()
	.setThumbnail(icon)
    .setColor(color)
    .setFooter(footer, icon)
   interaction.reply({ embeds: [embed] });
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
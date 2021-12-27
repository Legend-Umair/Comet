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
const moment = require("moment");
function capitalize(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('The server utility commands!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('info')
            .setDescription('Shows information about the current server!') 
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('icon')
                .setDescription('Shows icon of the current server!') 
                )
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
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
        command =interaction.options.getSubcommand()
        if (command === "info") {
            interaction.guild.fetch();
            interaction.guild.members.fetch();
            const embed = new MessageEmbed() // Prettier
             .setTitle(`${interaction.guild.name}'s Information`)
             .setColor(color)
            //  .setThumbnail(avatar)
             .addField(`Owner`, `> <@${interaction.guild.ownerId}> (ID: \`${interaction.guild.ownerId}\`)`, true)
             .addField(`Server ID`, `> \`${interaction.guild.id}\``, true)
             .addField(`Description`, `> ${interaction.guild.description || "No server description!"}`)
             .addField(`Members`, `\`${interaction.guild.memberCount}/${interaction.guild.maximumMembers}\` members (\`${interaction.guild.members.cache.filter((member) => member.user.bot).size}\` bots)`)
             .addField(`Emojis`, `> Total emojis: \`${interaction.guild.emojis.cache.size}\``, true)
             .addField(`Boosts`, `> \`${interaction.guild.premiumSubscriptionCount}\` (${capitalize(interaction.guild.premiumTier.toLowerCase().replace("_", " "))})`, true)
             .addField(`Verification`, `> \`${capitalize(interaction.guild.verificationLevel.toLowerCase().replace("_", " "))}\``, true)
             .addField(`Creation Date`, `> <t:${moment(interaction.channel.guild.createdTimestamp).unix()}> (<t:${moment(interaction.channel.guild.createdTimestamp).unix()}:R>)`, true)
             .setFooter(
              `Comet - Requested By ${interaction.user.tag}`, icon)
              .setThumbnail(icon)
             .setTimestamp();
            interaction.reply({ embeds: [embed] });
        } else if (command === "icon") {
            if (!interaction.guild.icon) return interaction.reply(`This server doesnot have a icon!`);
            const embed = new MessageEmbed()
            .setTitle(`${interaction.guild.name}'s Icon`)
            .setImage(interaction.guild.iconURL({ dynamic: true, size: 2048 }))
            .setColor(color)
            .setThumbnail(icon)
            .setFooter(`Comet - Requested By ${interaction.user.tag}`, icon)
            .setTimestamp();
    
            interaction.reply({ embeds: [embed] });
        };
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
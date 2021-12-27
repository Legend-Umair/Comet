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
		.setName('discord-activity')
		.setDescription('Play A Discord Acitivty With Server Members On Discord')
	.addSubcommand(subcommand =>
		subcommand
			.setName('chess')
			.setDescription('Play Chess With Your Firends On Discord'))
	.addSubcommand(subcommand =>
				subcommand
					.setName('youtube')
					.setDescription('Watch youtube with server members on discord'))
	// .addStringOption(option => option.setName('input').setDescription('Enter a string'))
	// .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
	// .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
	// .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
	// .addUserOption(option => option.setName('target').setDescription('Select a user'))
	// .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
	// .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
	// .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
	, async execute(interaction, client) {
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
    if (command === "chess") {
          if(interaction.member.voice.channel) {
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'chess').then(async invite => {
      const embed = new MessageEmbed()
      .setTitle(`Chess Together`)
      .setDescription(`[Click Me To Join Chess Together](${invite.code})`)
      .setColor(color)
      .setFooter(footer, icon)
      .setThumbnail(icon)
	  .setTimestamp()

      return interaction.reply({ embeds: [embed] })
            });
        } else return interaction.reply(`Please join a voice channel first!`);
    } else if (command === "youtube") {
		if(interaction.member.voice.channel) {
		  client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
	const embed = new MessageEmbed()
	.setTitle(`Youtube Together`)
	.setDescription(`[Click Me To Join Youtube Together](${invite.code})`)
	.setColor(color)
	.setFooter(footer, icon)
    .setThumbnail(icon)
	.setTimestamp()

	return interaction.reply({ embeds: [embed] })
		  });
	  } else return interaction.reply(`Please join a voice channel first!`);
  }
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
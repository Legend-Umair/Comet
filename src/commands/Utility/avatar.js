const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const {
	MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js');
const {
	color,
	footer,
	icon,
} = require('../../../configs/embed.json');
const axios = require("axios");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Gets a user avatar!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('user')
            .setDescription("Shows a specified user's avatar")
            .addUserOption(option =>
                option
                .setName('member')
                .setDescription('Show avatar of ?')
                .setRequired(false)
                )
            )
            .addSubcommand(subcommand =>
                subcommand
                .setName('server')
                .setDescription("Shows a specified user's server avatar, if they have one")
                .addUserOption(option =>
                    option
                    .setName('member')
                    .setDescription('Show avatar of ?')
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

        if (interaction.options.getSubcommand() === "user") {
            // await interaction.deferReply(true);
            // console.log('ran')
            const target = interaction.options.getUser('member') || interaction.user;

            const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`${target.tag}'s Avatar`)
            .setImage(target.displayAvatarURL({
                dynamic: true,
                size: 2048
            }))
       .setFooter(footer, icon)
       .setTimestamp();

       const row = new MessageActionRow()
       .addComponents(
           new MessageButton()
            //    .setCustomId('primary')
               .setLabel('JPG')
               .setURL(interaction.user.avatarURL({ format: 'jpg' }))
               .setStyle('LINK'),
           new MessageButton()
                 //    .setCustomId('primary')
                    .setLabel('PNG')
                    .setURL(interaction.user.avatarURL({ format: 'png' }))
                    .setStyle('LINK'),
           new MessageButton()
                    //    .setCustomId('primary')
                       .setLabel('GIF')
                       .setURL(interaction.user.avatarURL({ dynamic: true }))
                       .setStyle('LINK'),
       );
        
        interaction.reply({
            embeds: [embed],
            components: [row]
        });
        } else if (interaction.options.getSubcommand() === "server") {
            // const member = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
            const target = interaction.options.getUser('member') || interaction.user;
   const data = await axios
    .get(`https://discord.com/api/guilds/${interaction.guild.id}/members/${target.id}`, {
     headers: {
      Authorization: `Bot ${client.token}`,
     },
    })
    .then((d) => d.data);
   if (data.avatar && data.avatar != target.avatar) {
    let url = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
    url = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${target.id}/avatars/${data.avatar}${url}`;
    const row = new MessageActionRow().addComponents(
     // Prettier
     new MessageButton() // Prettier
      .setLabel("View")
      .setStyle("LINK")
      .setURL(url)
    );
    const embed = new MessageEmbed()
     .setTitle(`${target.tag}'s Custom Avatar`)
     .setColor(color)
     .setImage(url)
    //  .setAuthor(`${member.user.username} server avatar`, url)
     .setTimestamp()
     .setFooter(
      `Comet - Requested By ${interaction.user.tag}`, icon);
    interaction.reply({ embeds: [embed], components: [row] });
   } else {
    return interaction.reply(`User has no custom avatar!`);
   }
        };
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
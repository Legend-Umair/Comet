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
const mal = require("mal-scraper");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.setDescription('Search something in google!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('anime')
            .setDescription('Shows info about a anime!')
            .addStringOption(option =>
                option
                .setName('name')
                .setDescription('Search which anime (specify its name) ?')
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
        command = interaction.options.getSubcommand()
        if (command === "anime") {
            await interaction.reply('**Searching**!');
            const search = interaction.options.getString('name');

            if (search.length > 20) return interaction.reply(`The Name Cannot Be Above 20 Words!`);
            
            mal
            .getInfoFromName(search)
            .then((data) => {
             const embed = new MessageEmbed() // Prettier
             .setTitle(`Search Result For ${search}`)
              .setImage(data.picture)
              .setColor(color)
              .addField(`>>> English Title`, "```" + data.englishTitle + "```")
              .addField(`>>> Japanese Title`, "```" + data.japaneseTitle + "```")
              .addField(`>>> Type`, "```" + data.type + "```")
              .addField(`>>> Episodes`, "```" + data.episodes + " episodes```")
              .addField(`>>> Rating`, "```" + data.rating + "```")
              .addField(`>>> Aired`, "```" + data.aired + "```")
              .addField(`>>> Score`, "```" + data.score + "```")
              .addField(`>>> Score Stats`, "```" + data.scoreStats + "```")
              .setFooter(footer, icon)
              .setThumbnail(icon)
              .setTimestamp();
              const row = new MessageActionRow() // Prettier
              .addComponents(
               // Prettier
               new MessageButton() // Prettier
                .setStyle("LINK")
                .setURL(data.url)
                .setLabel("View")
              );
             interaction.editReply({ content: `**These Are The Search Results**!`, embeds: [embed], components: [row] });
            }).catch((err) => {
                console.log(err);
                return interaction.editReply(`Please enter vaild anime name!`);
               });
        }
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
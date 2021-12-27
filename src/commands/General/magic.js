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
const flip = require("flip-text");
var figlet = require('figlet');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('magic')
		.setDescription('Do a magic and get ur things!')
        .addSubcommand(subcommand =>
            subcommand.setName('flip').setDescription('Will do a magic and flip your message!').addStringOption(options =>
                options.setName(`message`).setDescription(`Message to do magic with.`).setRequired(true)
                )
            )
			.addSubcommand(subcommand =>
				subcommand.setName('ascii').setDescription('Will do a magic and converts your message to art!').addStringOption(options =>
					options.setName(`message`).setDescription(`Message to do magic with.`).setRequired(true)
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
        if (command === "flip") {
            const text = interaction.options.getString('message');
        
            if (text.length > 20) return interaction.reply(`The Message Cannot Be Above 20 Words!`);
    
      let flipped = [];
        flipped.push(flip(text));
    
       const embed = new MessageEmbed()
       .addField(`Flipped Text`, "```" + flipped.join(" ") + "```")
       .setColor(color)
       .setFooter('Comet - Does a Magic Flip', icon)
       .setThumbnail(icon)
       .setTimestamp();
    
       interaction.reply({ embeds: [embed] });
        } else if (command === "ascii") {
			const text = interaction.options.getString('message');
			var maxLen = 20
			if (text.length > maxLen) return interaction.reply("The Message Cannot Be Above 20 Words!");
	
			figlet.text(text, {
			  font: ""
			}, async(err, data) => {
			  const art = new MessageEmbed()
			  .setColor(color)
			  .setDescription(`\`\`\`${data}\`\`\`\``)
              .setThumbnail(icon)
			  .setFooter('Comet - Make a Art', icon)
			  .setTimestamp()
	
			  interaction.reply({ embeds: [art] });
			})
		};
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
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
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-dad-joke')
        .setDescription('Tells a random dad joke!')
        // .addStringOption(option => option.setName('input').setDescription('Enter a string'))
        // .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
        // .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
        // .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
        // .addUserOption(option => option.setName('target').setDescription('Select a user'))
        // .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
        // .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
        // .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
        ,
    memberpermissions: [],
    owneronly: "false",
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

            (async () => {
                await interaction.reply(`**Finding A Random Joke!**`);
                const response = await fetch("http://icanhazdadjoke.com/", {
                    method: "get",
                    headers: {
                        Accept: "application/json",
                    },
                });
                const body = await response.json();
                const embed = new MessageEmbed() // Prettier
                    .setTitle("Random Dad Joke")
                    .setDescription(`>>> ${body.joke}`)
                    .setColor(color)
                    .setFooter(footer, icon)
                    .setThumbnail(icon)
                    .setTimestamp();
                interaction.editReply({
                    content: `**Found A Random Joke!**`,
                    embeds: [embed]
                });
            })();
        } catch (e) {
            interaction.reply(`Something went worng...`)
            console.log(e)
        };
    },
};
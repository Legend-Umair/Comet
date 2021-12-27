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
        .setName('unban')
        .setDescription('Unbans a specific member from this server!')
        // .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
        // .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
        // .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
        .addStringOption(option => option.setName('id').setDescription('Who to unban (Provide thier id) ?').setRequired(true))
        // .addStringOption(option => option.setName('reason').setDescription('Reason for ban ?').setRequired(false))
        // .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
        // .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
        // .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
        ,
    memberpermissions: ["BAN_MEMBERS"],
    botpermissions: ["BAN_MEMBERS"],
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
            const id = interaction.options.getString('id');
            const reason = 'No Reason Provided!';

			await interaction.guild.members.fetch();
            // const id = interaction.options.getInteger('id');
            const bannedUsers = await interaction.guild.bans.fetch();
            // const bannedUsers = await interaction.guild.bans.fetch();

            const user = bannedUsers.get(id);

            if (!user) return interaction.reply('Could not find that user in the bans!');

           await interaction.guild.members.unban(id, reason);

            const target = interaction.guild.members.cache.get(id);

            const aembed = new MessageEmbed()
            .setColor(color)
            .setTitle(`Member Unbanned`)
            .setDescription('Successfully Unbanned The Specified Member!')
            .addFields(
                { name: 'User ID', value: `>>> ${id}` },
                { name: 'Action', value: `>>> Unban` },
            )
            .setFooter('Comet - Unban A Member', icon)
            .setThumbnail(icon)
            .setTimestamp();

            interaction.reply({ embeds: [aembed] });
        } catch (e) {
            interaction.reply(`Something went worng...`)
            console.log(e)
        };
    },
};
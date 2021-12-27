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

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Recreates the current channel with same settings!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('channel')
            .setDescription('Recreates the current channel with same settings!')
        )
        // .addStringOption(option => option.setName('input').setDescription('Enter a string'))
        // .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
        // .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
        // .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
        // .addUserOption(option => option.setName('target').setDescription('Select a user'))
        // .addChannelOption(option => option.setName('destination').setDescription('Select a channel'))
        // .addRoleOption(option => option.setName('muted').setDescription('Select a role'))
        // .addMentionableOption(option => option.setName('mentionable').setDescription('Mention something')),
        ,
    memberpermissions: ["MANAGE_CHANNELS"],
    botpermissions: ["MANAGE_CHANNELS"],
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
            if (interaction.options.getSubcommand() === "channel") {
                if (!interaction.channel.deletable) return interaction.reply('This Channel Is Not Deletable!');

                const embed = new MessageEmbed()
                    .setTitle("Nuke Channel")
                    .setDescription("Are You Sure You Want To Nuke The Channel?")
                    .setColor(color)
                    .setThumbnail(icon)
                    .setFooter(footer, icon)
                    .setTimestamp();

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('yes')
                        .setLabel('Yes, Im Sure')
                        .setStyle('DANGER'),
                        new MessageButton()
                        .setCustomId('no')
                        .setLabel('No, Im Not Sure')
                        .setStyle('SECONDARY'),
                    );

                interaction.reply({
                    embeds: [embed],
                    components: [row]
                });

                const filter = i => i.customId === 'yes' && i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 15000
                });

                collector.on('collect', async i => {
                    if (i.customId === 'yes') {
                        if (i.user.id !== interaction.user.id) return interaction.reply({ content: `This is not your command -_-`, ephemeral: true });
                        const yesembed = new MessageEmbed()
                            .setColor(color)
                            .setTitle('Channel Nuked')
                            .setDescription(`The Channel Has Been Nuked By ${interaction.user.tag}!`)
                            .setImage('https://giphy.com/clips/studiosoriginals-omw-HG9DEXUzbFXPu8AC9P')
                            .setFooter(footer, icon)
                            .setThumbnail(icon)
                            .setTimestamp();
                        interaction.channel.clone().then(channel => channel.send({
                            embeds: [yesembed]
                        }));
                        interaction.channel.delete();
                    }
                });

                const fltr = i => i.customId === 'no' && i.user.id === interaction.user.id;
                const cltr = interaction.channel.createMessageComponentCollector({
                    fltr,
                    time: 15000
                });

                cltr.on('collect', async i => {
                    if (i.customId === 'no') {
                        if (i.user.id !== interaction.user.id) return interaction.reply({ content: `This is not your command -_-`, ephemeral: true });
                        await i.update({
                            content: 'Cancelled Nuking The Channel!',
                            components: [],
                            embeds: []
                        });
                    }
                });
            };
        } catch (e) {
            interaction.reply(`Something went worng...`)
            console.log(e)
        };
    },
};
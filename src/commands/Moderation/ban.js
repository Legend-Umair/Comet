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
        .setName('ban')
        .setDescription('Bans a specific member for specified reason!')
        // .addIntegerOption(option => option.setName('int').setDescription('Enter an integer'))
        // .addNumberOption(option => option.setName('num').setDescription('Enter a number'))
        // .addBooleanOption(option => option.setName('choice').setDescription('Select a boolean'))
        .addUserOption(option => option.setName('member').setDescription('Who to ban ?').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for ban ?').setRequired(false))
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
            const auser = interaction.options.getUser('member');
            const reason = interaction.options.getString('reason') || 'No Reason Provided!';

			await interaction.guild.members.fetch();
			const target = interaction.guild.members.cache.get(auser.id);

            if (!interaction.guild.members.cache.get(auser.id)) return interaction.reply('Could not find the specified user!');
			if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply(`You Cannot Ban ${auser.tag} Becouse They Have Higher Role Or Same Role AS You!`);
			if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply(`I Cannot Ban ${auser.tag} Becouse They Have Higher Role Or Same Role As Me!`);
			// if (arole.position > interaction.member.roles.highest.position) return interaction.reply(`You cannot ban becouse its above then your highest role position!`);
			// if (arole.position > interaction.guild.me.roles.highest.position) return interaction.reply(`I cannot remove that role becouse its above then my highest role position!`);
			// if(arole.name.includes('everyone') || arole.name.includes('booster')) return interaction.reply(`You cannot add or remove the server default roles!`);
			if (interaction.user.id === auser.id) return interaction.reply(`You Cannot Ban Yourself!`);
            if (auser.id === client.user.id) return interaction.reply(`You Cannot Ban Me!`);
			// if (!target.roles.cache.some(role => role.name === arole.name)) return interaction.reply(`They Dont Have That Role!`);
            const sendUser = new MessageEmbed()
                .setColor(color)
                .setDescription(`You Have Been Banned From ${interaction.guild.name}! \nReason: ${reason}`)
                .setFooter(footer, icon)
                .setTimestamp();

            try {
                await auser.send({
                    embeds: [sendUser]
                });
            } catch (e) {
                return;
            }
            target.ban({
                reason
            });

            const aembed = new MessageEmbed()
            .setColor(color)
            .setTitle(`Member Banned`)
            .setDescription('Successfully Banned The Specified Member!')
            .addFields(
                { name: 'Member', value: `>>> ${auser}` },
                { name: 'Reason', value: `>>> ${reason}` },
            )
            .setFooter('Comet - Ban A Member', icon)
            .setThumbnail(icon)
            .setTimestamp();

            interaction.reply({ embeds: [aembed] });
        } catch (e) {
            interaction.reply(`Something went worng...`)
            console.log(e)
        };
    },
};
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
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Shows comet bot stats!')
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

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const up = `${days}D ${hours}H ${minutes}M ${seconds}S`
        const clientStats = stripIndent`
          Servers   :: ${interaction.client.guilds.cache.size}
          Users     :: ${interaction.client.users.cache.size}
          Channels  :: ${interaction.client.channels.cache.size}
          Api Ping   :: ${Math.round(interaction.client.ws.ping)}ms
          Uptime    :: ${up}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: Debian
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setTitle('Comet\'s Statistics')
        .addField('Client Stats', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server Stats', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(`Comet - Requested By ${interaction.user.tag}`, icon)
        .setColor(color)
        .setThumbnail(icon)
		.setTimestamp()
        interaction.reply({ embeds: [embed] });
		} catch (e) {
            interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
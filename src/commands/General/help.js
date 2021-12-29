const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu
} = require('discord.js');
const {
	color,
	footer,
	icon,
} = require('../../../configs/embed.json');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows all the commands of comet!')
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
			// await interaction.deferReply();

			await interaction.reply(`**Loading The Help Menu...**`);
			let index = new MessageEmbed()
				.setTitle("Comet's Help Desk")
				.setColor(color)
				.setDescription(`>>> <a:Stars:925598513423859732> I'am A Multipurpose Discord Bot I Have Many Features And Commands That You Can Use To Make Your Server Active And Modern!\n<:arrow:925598802990227467> Use The Buttons Below To View Commands`)
				.addFields(
					{ name: `Comet's Features`, value: `>>> <:house:925611818779570216> Home\n<:general:925340343078096897> General\n<:info:925270846782730321> Information\n<:sTool:925340539790954598> Utility\n<:bolt:925596615560024145> Moderation\n<:Giveaway1:925596991046684762> Giveaways\n<:controller:925597738127720488> Activites\n<:Config:925611048428503152> Config` }
				)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

			let general = new MessageEmbed()
				.setTitle('General Commands')
				.setColor(color)
				.setDescription(`<:t_arrow2:925605605501173770> /coinflip\n<:t_arrow2:925605605501173770> /magic flip\n<:t_arrow2:925605605501173770> /magic ascii\n<:t_arrow2:925605605501173770> /random-dad-joke\n<:t_arrow2:925605605501173770> /search anime`)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

				let utility = new MessageEmbed()
				.setTitle('Utility Commands')
				.setColor(color)
				.setDescription(`<:t_arrow2:925605605501173770> /afk\n<:t_arrow2:925605605501173770> /announce-with-everyone-ping\n<:t_arrow2:925605605501173770> /announce-with-here-ping\n<:t_arrow2:925605605501173770> /announce-without-ping \n<:t_arrow2:925605605501173770> /avatar user\n<:t_arrow2:925605605501173770> /avatar server\n<:t_arrow2:925605605501173770> /calc\n<:t_arrow2:925605605501173770> /embed-creator\n<:t_arrow2:925605605501173770> /get first-message\n<:t_arrow2:925605605501173770> /get id\n<:t_arrow2:925605605501173770> /nuke channel\n<:t_arrow2:925605605501173770> /purge messages\n<:t_arrow2:925605605501173770> /purge msgs-of-bots\n<:t_arrow2:925605605501173770> /purge msgs-of-user\n<:t_arrow2:925605605501173770> /role create\n<:t_arrow2:925605605501173770> /role add\n<:t_arrow2:925605605501173770> /role remove\n<:t_arrow2:925605605501173770> /role info\n<:t_arrow2:925605605501173770> /server info\n<:t_arrow2:925605605501173770> /server icon\n<:t_arrow2:925605605501173770> /short url\n<:t_arrow2:925605605501173770> /snipe\n<:t_arrow2:925605605501173770> /translate`)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

				let info = new MessageEmbed()
				.setTitle('Information Commands')
				.setColor(color)
				.setDescription(`<:t_arrow2:925605605501173770> /ping\n<:t_arrow2:925605605501173770> /stats\n<:t_arrow2:925605605501173770> invite\n<:t_arrow2:925605605501173770> /support\n<:t_arrow2:925605605501173770> /website\n<:t_arrow2:925605605501173770> /bot checkperm\n<:t_arrow2:925605605501173770> /uptime\n<:t_arrow2:925605605501173770> /user info\n<:t_arrow2:925605605501173770> /aboutus`)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

				let mod = new MessageEmbed()
				.setTitle('Moderation Commands')
				.setColor(color)
				.setDescription(`<:t_arrow2:925605605501173770> /kick\n<:t_arrow2:925605605501173770> /ban\n<:t_arrow2:925605605501173770> /unban\n<:t_arrow2:925605605501173770> /mute\n<:t_arrow2:925605605501173770> /unmute\n<:t_arrow2:925605605501173770> /warn\n<:t_arrow2:925605605501173770> /warnings\n<:t_arrow2:925605605501173770> /clear-warns\n<:t_arrow2:925605605501173770> /nick`)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

				let gws = new MessageEmbed()
				.setTitle('Giveaway Commands')
				.setColor(color)
				.setDescription(`<:t_arrow2:925605605501173770> /giveaway start\n<:t_arrow2:925605605501173770> /giveaway end\n<:t_arrow2:925605605501173770> /giveaway reroll\n<:t_arrow2:925605605501173770> /giveaway pause\n<:t_arrow2:925605605501173770> /giveaway resume\n<:t_arrow2:925605605501173770> /giveaway delete`)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

				let act = new MessageEmbed()
				.setTitle('Activity Commands')
				.setColor(color)
				.setDescription(`<:t_arrow2:925605605501173770> /discord-activity youtube\n<:t_arrow2:925605605501173770> /discord-activity chess`)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

				let config = new MessageEmbed()
				.setTitle('Config Commands')
				.setColor(color)
				.setDescription(`<:t_arrow2:925605605501173770> /config chatbot-channel\n<:t_arrow2:925605605501173770> /config chatbot-disable\n<:t_arrow2:925605605501173770> /config joindm-message\n<:t_arrow2:925605605501173770> /config joindm-disable\n<:t_arrow2:925605605501173770> /config autorole-setup\n<:t_arrow2:925605605501173770> /config autorole-disable`)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp();

			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setCustomId('home')
					// .setLabel()
					.setEmoji('<:house:925611818779570216>')
					.setStyle('SECONDARY'),
					new MessageButton()
					.setCustomId('general')
					// .setLabel()
					.setEmoji('<:general:925340343078096897>')
					.setStyle('SECONDARY'),
					new MessageButton()
					.setCustomId('info')
					// .setLabel()
					.setEmoji('<:info:925270846782730321>')
					.setStyle('SECONDARY'),
					new MessageButton()
					.setCustomId('utility')
					// .setLabel()
					.setEmoji('<:sTool:925340539790954598>')
					.setStyle('SECONDARY'),
				)
				const raw = new MessageActionRow()
				.addComponents(
					new MessageButton()
					.setCustomId('mod')
					// .setLabel()
					.setEmoji('<:bolt:925596615560024145>')
					.setStyle('SECONDARY'),
					new MessageButton()
					.setCustomId('gws')
					// .setLabel()
					.setEmoji('<:Giveaway1:925596991046684762>')
					.setStyle('SECONDARY'),
					new MessageButton()
					.setCustomId('act')
					// .setLabel()
					.setEmoji('<:controller:925597738127720488>')
					.setStyle('SECONDARY'),
					new MessageButton()
					.setCustomId('config')
					// .setLabel()
					.setEmoji('<:Config:925611048428503152>')
					.setStyle('SECONDARY'),
				);

			await interaction.editReply({
				content: `**Loaded the help menu...**`,
				embeds: [index],
				components: [row, raw]
			});

			const filter = i => i.user.id === interaction.user.id;
			const collector = interaction.channel.createMessageComponentCollector({
				filter,
				// time: 99999
			});

			collector.on('collect', async i => {
				if (i.user.id !== interaction.user.id) return;
				await i.deferUpdate();
				// await wait(4000);
				if (i.customId === "home") i.editReply({ embeds: [index], components: [row, raw] });
				if (i.customId === "general") i.editReply({ embeds: [general], components: [row, raw] });
				if (i.customId === "utility") i.editReply({ embeds: [utility], components: [row, raw] });
				if (i.customId === "info") i.editReply({ embeds: [info], components: [row, raw] });
				if (i.customId === "mod") i.editReply({ embeds: [mod], components: [row, raw] });
				if (i.customId === "gws") i.editReply({ embeds: [gws], components: [row, raw] });
				if (i.customId === "act") i.editReply({ embeds: [act], components: [row, raw] });
				if (i.customId === "config") i.editReply({ embeds: [config], components: [row, raw] });
			});

			collector.on('end', collected => console.log(`Collected ${collected.size} items`));
		} catch (e) {
			interaction.editReply(`Something went worng...`)
			console.log(e)
		};
	},
};
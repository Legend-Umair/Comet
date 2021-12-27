const {
	SlashCommandBuilder,
} = require('@discordjs/builders');
const {
	MessageEmbed,
	Permissions
} = require('discord.js');
const {
	color,
	footer,
	icon,
} = require('../../../configs/embed.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('The commands realted to role!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('create')
            .setDescription('Creates a role with specific name!')
            .addStringOption(option =>
                option
                .setName('name')
                .setDescription('What name for role ?')
                .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('color')
                        .setDescription('What color for role ?')
                        .setRequired(false)
                        .addChoice('Blue', '#0000FF')
                        .addChoice('Red', '#FF0000')
                        .addChoice('Random', 'RANDOM'))
            )
			.addSubcommand(subcommand =>
				subcommand
				.setName('add')
				.setDescription('Adds a specific role to a specific member!')
				.addRoleOption(option =>
					option
					.setName('role')
					.setDescription('Add which role ?')
					.setRequired(true)
					)
					.addUserOption(option =>
						option
						.setName('member')
						.setDescription('Add role to ?')
						.setRequired(true)
						)
				)
			.addSubcommand(subcommand =>
					subcommand
					.setName('remove')
					.setDescription('Removes a specific role from a specific member!')
					.addRoleOption(option =>
						option
						.setName('role')
						.setDescription('Remove which role ?')
						.setRequired(true)
						)
						.addUserOption(option =>
							option
							.setName('member')
							.setDescription('Remove role from ?')
							.setRequired(true)
							)
					)
					.addSubcommand(subcommand =>
						subcommand
						.setName('info')
						.setDescription('Shows information about the specified role!')
						.addRoleOption(option =>
							option
							.setName('role')
							.setDescription('Show info about which role ?')
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
	, memberpermissions: ["MANAGE_ROLES"], botpermissions: ["MANAGE_ROLES"], owneronly: "false",
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

        if (command === "create") {
            const rname = interaction.options.getString('name') || "No Name";
            const rcolor = interaction.options.getString('color') || "RANDOM";

			if (rname.length > client.maxinput) return interaction.reply(`The name length cannot be above ${client.maxinput} words`);
			try {
				await interaction.guild.roles.create({ name: rname, permissions: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES], color: rcolor });
				const newrole = interaction.guild.roles.cache.find(r => r.name === rname);
				const e = new MessageEmbed()
				.setColor(color)
				.setTitle('Role Created')
				.setDescription('Successfully Created The Specified Role!')
				.addFields(
					{ name: 'Role', value: `>>> ${newrole}` },
					{ name: 'Name', value: `>>> ${rname}` },
					{ name: 'Color', value: ` >>> ${newrole.color}` },
				)
				.setFooter('Comet - Create A Role', icon)
                .setThumbnail(icon)
				.setTimestamp();
	
				interaction.reply({ embeds: [e] });
			} catch (e) {
				interaction.reply('Something went worng... Please try again in few minutes!');
				console.log(e)
			}
        } else if (command === "add") {
			await interaction.guild.members.fetch();
			const auser = interaction.options.getUser('member');
			const arole = interaction.options.getRole('role');
			const target = interaction.guild.members.cache.get(auser.id);

			if (!interaction.guild.members.cache.get(auser.id)) return interaction.reply('Could not find the specified user!');
			if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply(`You Cannot Add Role To ${auser.tag} Becouse They Have Higher Role Or Same Role As You!`);
			if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply(`I Cannot Add Role To ${auser.tag} Becouse They Have Higher Role Or Same Role As Me!`);
			if (arole.position > interaction.member.roles.highest.position) return interaction.reply(`You cannot add that role becouse its above then your highest role position!`);
			if (arole.position > interaction.guild.me.roles.highest.position) return interaction.reply(`I cannot add that role becouse its above then my highest role position!`);
			if(arole.name.includes('everyone') || arole.name.includes('booster')) return interaction.reply(`You cannot add or remove the server default roles!`);
			if (interaction.user.id === auser.id) return interaction.reply(`You Cannot Add Role To Yourself!`);
			if (target.roles.cache.some(role => role.name === arole.name)) return interaction.reply(`They Already Have That Role!`);

			try {
				await target.roles.add(arole.id);
				const aembed = new MessageEmbed()
				.setColor(color)
				.setTitle(`Role Added`)
				.setDescription('Successfully Added The Specified Role!')
				.addFields(
					{ name: 'Role', value: `>>> ${arole}` },
					{ name: 'Added To', value: `>>> ${auser}` },
				)
				.setFooter('Comet - Add A Role', icon)
                .setThumbnail(icon)
				.setTimestamp();
	
				interaction.reply({ embeds: [aembed] });
			} catch (e) {
				console.log(e)
				interaction.reply('Something went worng... Please try again in few minutes!');
			}
		} else if (command === "remove") {
			await interaction.guild.members.fetch();
			const auser = interaction.options.getUser('member');
			const arole = interaction.options.getRole('role');
			const target = interaction.guild.members.cache.get(auser.id);

			if (!interaction.guild.members.cache.get(auser.id)) return interaction.reply('Could not find the specified user!');
			if (target.roles.highest.position > interaction.member.roles.highest.position) return interaction.reply(`You Cannot Remove Role From ${auser.tag} Becouse They Have Higher Role Then You!`);
			if (target.roles.highest.position > interaction.guild.me.roles.highest.position) return interaction.reply(`I Cannot Remove Role From ${auser.tag} Becouse They Have Higher Role Then Me!`);
			if (arole.position > interaction.member.roles.highest.position) return interaction.reply(`You cannot remove that role becouse its above then your highest role position!`);
			if (arole.position > interaction.guild.me.roles.highest.position) return interaction.reply(`I cannot remove that role becouse its above then my highest role position!`);
			if(arole.name.includes('everyone') || arole.name.includes('booster')) return interaction.reply(`You cannot add or remove the server default roles!`);
			if (interaction.user.id === auser.id) return interaction.reply(`You Cannot Remove Roles From Yourself!`);
			if (!target.roles.cache.some(role => role.name === arole.name)) return interaction.reply(`They Dont Have That Role!`);

			try {
				await target.roles.remove(arole.id);
				const aembed = new MessageEmbed()
				.setColor(color)
				.setTitle(`Role Removed`)
				.setDescription('Successfully Removed The Specified Role!')
				.addFields(
					{ name: 'Role', value: `>>> ${arole}` },
					{ name: 'Removed From', value: `>>> ${auser}` },
				)
				.setFooter('Comet - Remove A Role', icon)
                .setThumbnail(icon)
				.setTimestamp();
	
				interaction.reply({ embeds: [aembed] });
			} catch (e) {
				console.log(e)
				interaction.reply('Something went worng... Please try again in few minutes!');
			}
		} else if (command === "info") {
			// let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
			const role = interaction.options.getRole('role');
			if (!role) return message.channel.send("**Please Enter A Valid Role!**");
	
			const status = {
				false: "No",
				true: "Yes"
			}
	
			let roleembed = new MessageEmbed()
				.setColor(color)
				.setTitle(`Role Info`)
				// .setThumbnail(message.guild.iconURL())
				.addFields(
					{ name: `Name`, value: `>>> ${role.name}` },
					{ name: `ID`, value: `>>> ${role.id}` },
					{ name: `Hex`, value: `>>> ${role.hexColor}` },
					{ name: 'Members', value: `>>> ${role.members.size}` },
					{ name: `Position`, value: `>>> ${role.position}` },
					{ name: `Mentionable`, value: `>>> ${status[role.mentionable]}` },
				)
				.setThumbnail(icon)
				.setFooter(footer, icon)
				.setTimestamp()
	
			interaction.reply({ embeds: [roleembed] });
		}
		} catch (e) {
			interaction.reply(`Something went worng...`)
			console.log(e)
		};
	},
};
const { footer, icon } = require('../../../configs/embed.json');
const { ownerid } = require('../../../configs/config.json');
const { error } = require('../../../configs/addons/emojis.js');
const  { MessageEmbed } = require('discord.js');
const db = require('quick.db');
// const { onCoolDown } = require("../functions/index.j?s");

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;
		if (command.memberpermissions && command.memberpermissions.length > 0 && !interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has(command.memberpermissions)) {
			return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed()
				.setColor("RED")
				.setTitle(`Error While Executing`)
				.setDescription(`${error} You Dont Have The Required Permissions To Execute This Command!`)
				.addFields(
					{ name: '**Required Permissions**:', value: `>>> \`${command.memberpermissions}\`` }
				)
				.setFooter(footer, icon)
				.setTimestamp()
				]
			});
		  };
		  if (command.botpermissions && command.botpermissions.length > 0 && !interaction.guild.me.permissions.has("ADMINISTRATOR") && !interaction.guild.me.permissions.has(command.memberpermissions)) {
			return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed()
				.setColor("RED")
				.setTitle(`Error While Executing`)
				.setDescription(`${error} I Dont Have The Required Permissions To Execute This Command!`)
				.addFields(
					{ name: '**Required Permissions**:', value: `>>> \`${command.memberpermissions}\`` }
				)
				.setFooter(footer, icon)
				.setTimestamp()
				]
			});
		};
		  if (command.owneronly && command.owneronly === "true" && interaction.member.id !== ownerid) {
			  const eOwner = new MessageEmbed()
			  .setColor("RED")
			  .setTitle(`${error} This Command Is Only For My Developer`);
			  interaction.reply({ embeds: [eOwner], ephemeral: true });
		  }
		  const ee = require('../../../configs/embed.json');
		try {
			let ctx = interaction;
			await command.execute(interaction, client, db, ee, ctx);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	},
};
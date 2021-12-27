const {
	REST,
} = require('@discordjs/rest');
const {
	Routes,
} = require('discord-api-types/v9');
const fs = require('fs');
const yaml = require('js-yaml');
const chalk = require('chalk');
const logger = require('../utils/logger.js');

// const doc = yaml.load(fs.readFileSync('yamlconfigs/client.yml', 'utf8'));
const clientId = process.env.clientid;
const guildId = process.env.guildid;

module.exports = (client) => {
	client.handleCommands = async (commandFolders, path) => {
		client.commandArray = [];
		for (folder of commandFolders) {
			const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}
		const rest = new REST({
			version: '9',
		}).setToken(process.env.token);

		(async () => {
			try {
				logger.info('Started refreshing application (/) commands.', { label: 'Reload' });
				console.log(chalk.magenta('Started refreshing application (/) commands.'));

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId), {
						body: client.commandArray,
					},
				);
				logger.info('Successfully reloaded application (/) commands.', { label: 'Reload' });
				console.log(chalk.magenta('Successfully reloaded application (/) commands.'));
			}
			catch (error) {
				console.error(error);
			}
		})();
	};
};
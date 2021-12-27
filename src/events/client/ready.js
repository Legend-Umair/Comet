const chalk = require('chalk');
const { status } = require('../../../configs/config.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setActivity(status, { type: 'LISTENING' });
		console.log(chalk.red(`Ready! Logged in as ${client.user.tag}`));
	},
};
const chalk = require('chalk');

module.exports = {
	name: 'disconnected',
	async execute() {
		console.log(chalk.cyanBright('Disconnected From Database! Reconnecting...'));
	},
};
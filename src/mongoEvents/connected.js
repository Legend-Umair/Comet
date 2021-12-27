const chalk = require('chalk');

module.exports = {
	name: 'connected',
	async execute() {
		console.log(chalk.magenta('Connected To Database!'));
	},
};
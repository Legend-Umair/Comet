const fs = require("fs");
const allevents = [];
const chalk = require('chalk');

module.exports = async (client) => {
	let amount = 0;
	const load_dir = (dir) => {
		const event_files = fs.readdirSync(`src/events/${dir}`).filter((file) => file.endsWith(".js"));
		for (const file of event_files) {
			try {
				const event = require(`../events/${dir}/${file}`)
				let eventName = file.split(".")[0];
				allevents.push(eventName);
				client.on(event.name, (...args) => event.execute(...args, client));
				amount++;
			} catch (e) {
				console.log(e)
			}
		}
	}
	await ["client", "guild"].forEach(e => load_dir(e));
	console.log(chalk.magenta(`${amount} Events Loaded Successfully!`));
};
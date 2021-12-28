const { afk } = require('../../collections/index.js');
const moment = require('moment');

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
        if (!message.guild || message.author.bot) return;

        const mentioned = message.mentions.members.first();
        // if (afk.get(mentioned.id, message.guild.id)) return;
        if (mentioned) {
            const data = afk.get(mentioned.id)
            if (data) {
                const [ timestamp, reason ] = data;
                message.reply(`${mentioned} Is Currently AFK: ${reason}`);
            }
        }
        const gData = afk.get(message.author.id);
        if (gData) {
            await afk.delete(message.author.id)
            message.reply(`Welcome Back! I Have Removed Your AFK!`)
        }
    }
}
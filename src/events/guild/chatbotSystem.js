const Schema = require('../../models/chatbot.js');
// const client = require('../bot.js');
const Chat = require("easy-discord-chatbot");
const chat = new Chat({ name: "Comet" });

module.exports = {
	name: 'messageCreate',
	execute(message, client) {
        try {
            if (!message.guild) return;
              Schema.findOne({
                        Guild: message.guild.id
                      }, async(err, data) => {
              if (!data) return;
              if (data) {
                if (!message.guild.channels.cache.get(data.Channel)) return;
          
              const chatchannel = message.guild.channels.cache.get(data.Channel);
              if (!chatchannel) return;
          
              if (message.channel.id === chatchannel.id && !message.author.bot) {
                let reply = await chat.chat(message.content)
                chatchannel.send(reply);
              }
            } else return;
                })
            } catch (e) {
              return;
            }
	},
};
require('dotenv').config();
const {
	Client,
	Collection,
	MessageEmbed,
	MessageAttachment
} = require('discord.js');
const client = new Client({
	fetchAllMembers: true,
	restTimeOffset: 0,
	restWsBridgetimeout: 100,
	shards: 'auto',
	allowedMentions: {
		parse: ["everyone", "roles", "users"],
		repliedUser: true,
	},
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	intents: 32767,
	presence: {
		activity: {
			name: 'To Legend Umair',
			type: 'LISTENING',
		},
		status: 'online',
	},
});
module.exports = client;
const fs = require('fs');
const pino = require('pino');
const transport = pino.transport({
	target: 'pino/file',
	options: { destination: './log.json' },
});
// const moment = require('moment');
// const canvas = require("discord-canvas"),
// welcomeCanvas = new canvas.Welcome();
// const welcomer = require('./models/welcomer.js');
const logger = pino(transport);
client.commands = new Collection();
client.config = require('../configs/config.json');
client.token = process.env.token;

client.on('debug', m => logger.debug(m));
client.on('warn', m => logger.warn(m));
client.on('error', m => logger.error(m));

const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);

client.snipes = new Map();
client.on('messageDelete', async (message) => {
  if (message.author.bot && !message.guild) return;

    client.snipes.set(message.channel.id,{
        content:message.content,
        author:message.author.tag,
        image:message.attachments.first() ? message.attachments.first().proxyURL : null
});
});

const mongoose = require('mongoose');
const db = mongoose.connection;

const giveawaySchema = new mongoose.Schema({
    messageId: String,
    channelId: String,
    guildId: String,
    startAt: Number,
    endAt: Number,
    ended: Boolean,
    winnerCount: Number,
    prize: String,
    messages: {
        giveaway: String,
        giveawayEnded: String,
        inviteToParticipate: String,
        drawing: String,
        dropMessage: String,
        winMessage: mongoose.Mixed,
        embedFooter: mongoose.Mixed,
        noWinner: String,
        winners: String,
        endedAt: String,
        hostedBy: String
    },
    thumbnail: String,
    hostedBy: String,
    winnerIds: { type: [String], default: undefined },
    reaction: mongoose.Mixed,
    botsCanWin: Boolean,
    embedColor: mongoose.Mixed,
    embedColorEnd: mongoose.Mixed,
    exemptPermissions: { type: [], default: undefined },
    exemptMembers: String,
    bonusEntries: String,
    extraData: mongoose.Mixed,
    lastChance: {
        enabled: Boolean,
        content: String,
        threshold: Number,
        embedColor: mongoose.Mixed
    },
    pauseOptions: {
        isPaused: Boolean,
        content: String,
        unPauseAfter: Number,
        embedColor: mongoose.Mixed,
        durationAfterPause: Number
    },
    isDrop: Boolean,
    allowedMentions: {
        parse: { type: [String], default: undefined },
        users: { type: [String], default: undefined },
        roles: { type: [String], default: undefined }
    }
}, { id: false });

// Create the model
const giveawayModel = mongoose.model('giveaways', giveawaySchema);

const { GiveawaysManager } = require('discord-giveaways');
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database. We fetch all documents by passing an empty condition.
        return await giveawayModel.find().lean().exec();
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageId, giveawayData) {
        // Add the new giveaway to the database
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageId, giveawayData) {
        // Find by messageId and update it
        await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageId) {
        // Find by messageId and delete it
        await giveawayModel.deleteOne({ messageId }).exec();
        // Don't forget to return something!
        return true;
    }
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: 'RANDOM',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client);
	}
	// requirments
	require('./utils/logger.js');
	require('./utils/client.js')(client)
	// login client
	client.handleCommands(commandFolders, './src/commands');
	client.login(process.env.token);
	client.handleDatabase();
	client.handleCrash();
})();
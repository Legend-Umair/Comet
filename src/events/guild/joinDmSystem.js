const Schema = require('../../models/joindm.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	execute(member, client) {
        try {
            Schema.findOne({
                Guild: member.guild.id
            }, async (err, data) => {
                if (!data) return;
                if (data) {
                    const msg = data.Message;
                    if (!msg) return;

                    const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('server')
                            .setLabel(`Sent From: ${data.GuildName}`)
                            .setStyle('SECONDARY')
                            .setEmoji(require('../../../configs/addons/emojis.js').comet)
                            .setDisabled(true),
                    );
                    const responce = data.Message;

                    member.send({ content: responce, components: [row] });
                }
            })
            } catch (e) {
              return;
            }
	},
};
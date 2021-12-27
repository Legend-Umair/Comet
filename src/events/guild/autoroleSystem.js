const Schema = require('../../models/autorole.js');

module.exports = {
	name: 'guildMemberAdd',
	execute(member, client) {
        try {
            Schema.findOne({
                Guild: member.guild.id
            }, async (err, data) => {
                if (!data) return;
                if (data) {
                    const joinrole = member.guild.roles.cache.find(role => role.id === data.Role);
                    if (!joinrole) {
                        return data.delete();
                    }
                    member.roles.add(joinrole.id)
                }
            })
            } catch (e) {
              return;
            }
	},
};
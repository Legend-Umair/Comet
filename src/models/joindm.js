const { Schema, model } = require('mongoose');

module.exports = model('joindm', new Schema({
    Guild: String,
    Message: String,
    GuildName: String,
   })
);
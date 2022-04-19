const Discord = require("discord.js")
module.exports = {
    name: 'lolchess',
    description: 'Get link to lolchess profile.',
    async execute(message, args) {
        try {
            if(!args) {
                message.channel.send("https://lolchess.gg");
            }
            else {
                message.channel.send('https://lolchess.gg/profile/eune/'+args);
            }
        } catch (error) {
            message.channel.send("Missing argument or non-existent summoner name.");
        }
    }
}
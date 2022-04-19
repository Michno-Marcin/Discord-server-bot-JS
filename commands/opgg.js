const Discord = require("discord.js")
module.exports = {
    name: 'opgg',
    description: 'Get link to opgg profile.',
    async execute(message, args) {
      try {
        if(!args) {
        message.channel.send("https://eune.op.gg");
        }
        else {
        message.channel.send('https://eune.op.gg/summoner/userName='+args);
        }
    } catch (error) {
        message.channel.send("Missing argument or non-existent summoner name.");
    }
    }
}

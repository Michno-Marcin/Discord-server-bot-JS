const { default: axios } = require("axios");
const Discord = require("discord.js")
module.exports = {
    name: 'lolmmrcheck',
    description: 'Check SoloQ LoL MMR. EUNE server only.',
    execute: async function (message, args) {
        try {
            if (!args) throw ("There is a lack of arguments.");
            else {

                const data = await axios.get('https://eune.whatismymmr.com/api/v1/summoner?name=' + args)
                    .then(({data}) => data)

                // Create embed
                const title = args + "'s MMR"
                const embed = new Discord.MessageEmbed(undefined, undefined)
                    .setTitle(title)
                    .setColor(0x2196f3)
                    .addField("MMR", data.ranked.avg + "±" + data.ranked.err, true)
                    .addField("Approximate rank", data.ranked.closestRank, true)
                    .addField("Centile in rank", data.ranked.percentile, true)
                    .setFooter("Data from eune.whatismymmr.com", "https://eune.whatismymmr.com")
                message.channel.send(embed)
            }
        } catch (error) {
            message.channel.send("Player name not given, does not exist or has not played enough games " +
                "in solo/duo ranking queue");
        }
    }
}
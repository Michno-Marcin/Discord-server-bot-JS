module.exports = {
    name: 'rand',
    description: "generates a random number",
    execute(message, args, Discord) {
        if (!args.length || !args[1]) {
            message.channel.send("You must give an interval for a random number according to the formula:" +
                " \`!rand [min] [max]\`")
        }
        else {
            let min = args[0]
            let max = args[1]
            min = Math.ceil(min);
            max = Math.floor(max);
            let randNum = Math.floor(Math.random() * (max - min + 1)) + min;
            const embed = new Discord.MessageEmbed()
                .setTitle("The received random no.: ")
                .setDescription(randNum)
                .setColor(0x2196f3)
                .setFooter("Random number generator")
                .setTimestamp()
            message.reply(embed)
        }
    }
}
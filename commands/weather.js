module.exports = {
    name: 'weather',
    description: "Used to get the weather of a place",
    execute(message, args, Discord, weather) {
        const city = args[0]
        weather.find({search: args.join(" "), degreeType: "C"}, function(error, result){
            if (!city) return message.channel.send("No city was given.")
            if (result === undefined || result.length === 0)
                return message.channel.send("There is no such city in our database.")
            if (error) return message.channel.send(error)
            let current = result[0].current
            let location = result[0].location
            const embed = new Discord.MessageEmbed()
                .setTitle(`Weather information for ${current.observationpoint}`)
                .setColor(0x2196f3)
                .setTimestamp()
                .addField("Temperature: ", current.temperature + "°C", true)
                .addField("Wind speed: ", current.winddisplay, true)
                .addField("Moisture: ", `${current.humidity}%`, true)
                .addField("Time zone: ", `UTC ${location.timezone}`, true)
            message.channel.send(embed)
        })
    }
}
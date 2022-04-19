module.exports = {
    name: 'clear',
    description: 'clear messages - command',
    execute: function (message, args) {
        // Default deletes message itself plus previous.
        let num = 2;
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply('You do not have sufficient authority to perform this action.')
            // If user doesnt have the role, return
            return
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.reply(`The bot does not have permissions: 'Message management'.`);
            return
        }
        // If argument is provided, we need to convert it from string to number.
        if (args[0]) {
            // Add 1 to delete clear command itself.
            num = parseInt(args[0]) + 1;
        }
        // Bulk delete the messages.
        message.channel.bulkDelete(num);
        // Notify channel about deleted messages.
        message.channel.send(`Deleted ${num-1} messages.`);
    }
}
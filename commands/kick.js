module.exports = {
    name: 'kick',
    description: 'Kick chosen user from discord server',
    execute: function (message) {
        //verify that user has moderation role
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.reply('You do not have sufficient authority to perform this action.')
            // If user doesnt have the role, we return without kicking the user.
            return
        }
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            message.reply(`The bot does not have powers: 'Kicking members'.`);
            return
        }
        // Check to make sure a user was actually mentioned, if not we return because bot doesnt know who to kick.
        const user = message.mentions.users.first()
        if (!user) {
            message.reply('No user indicated. ')
            return
        }
        // If user was mentioned, grab their guild member information.
        const member = message.guild.member(user)
        // If reason was chosen then use this, in other case use default one.
        let reason = message.content.split(' ')[2]
        if (reason == null) {
            reason = 'unknown reason'
        }
        // If they are a member of the server, kick them.
        if (member) {
            member.kick(reason).then(() => {
                message.reply(`${user.tag} has been kicked because of \'${reason}\'.`)
            })
        }
    }
}
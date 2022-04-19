module.exports = {
    name: 'ping',
    description: 'ping! command',
    execute(message, ) {
        message.channel.send(`🏓Pong! Latency is ${message.createdTimestamp - Date.now()}ms.`);
    }
}
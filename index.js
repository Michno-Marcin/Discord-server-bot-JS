const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged as ${client.user.tag}!`);
});
const ytdl = require('ytdl-core');
const fs = require("fs")
const weather = require(`weather-js`);

const token = fs.readFileSync("bot-token.txt").toString(); // gets your token
const queue = new Map();
const prefix = '!'

client.once('ready', () => {
  console.log('Connected !');
});
client.once('reconnecting', () => {
  console.log('Reconnection...');
});
client.once('disconnect', () => {
  console.log('Disconnected !');
});

client.commands = new Discord.Collection()
// Loading commands
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

let set = new Set(['swear word',"bad word",`przeklenstwo`])
// Messages without prefix are ignored.
client.on('message', async message =>{
  let wordArray = message.content.toLowerCase().split()
  console.log(wordArray)
  for(let i = 0; i < wordArray.length; i++) {
    // If the message contains a word in our set, we delete it and send a message explaining why.
    if(set.has(wordArray[i])) {
      await message.delete()
      await message.channel.send(`Sorry  ${message.author.username}, but on this server using swear words is forbidden !`)
      break
    }
  }

  if(!message.content.startsWith(prefix) || message.author.bot) return
    // Messages without prefix or sent by bots are ignored
  const serverQueue = queue.get(message.guild.id);
  const args = message.content.slice(prefix.length).toLowerCase().split(/ +/);
  const command = args.shift().toLowerCase()
  // Commands:
  if (command === 'ping') {
    client.commands.get('ping').execute(message, args)
  }
  if (command === 'poll') {
    client.commands.get('poll').execute(message, args)
  }
  if (command === 'lolmmrcheck') {
    client.commands.get('lolmmrcheck').execute(message, args)
  }
  if (command === 'opgg') {
    client.commands.get('opgg').execute(message, args)
  }
  if (command === 'lolchess') {
    client.commands.get('lolchess').execute(message, args)
  }
  if (command === 'weather') {
    client.commands.get('weather').execute(message, args, Discord, weather)
  }
  if (command === 'play') {
    await execute(message, serverQueue);
    return;
  }
  if (command === 'skip') {
    skip(message, serverQueue);
    return;
  }
  if (command === 'stop') {
    stop(message, serverQueue);
    return;
  }
  if (command === 'help') {
    const title = "Commands";
    const embed = new Discord.MessageEmbed(undefined, undefined)
        .setTitle(title)
        .setColor(0x2196f3)
        .setFooter("Help Command")
        .setTimestamp()
        .setDescription("<> - required argument, [] - optional argument, 🔰 - requires administrator rights")
        .addField("ping", "check ping")
        .addField("poll [option1+option22+...+option26]", "create a poll")
        .addField("lolchess <summonername>", "get your TFT profile from lolchess")
        .addField("opgg [summonername]",
            "get opgg profile or link to profile finder when no player name indicated")
        .addField("lolmmrcheck <summonername>",
            "check your League of Legends MMR (solo/duet ranking queue only)")
        .addField("play <nazwa or a link to the song on YT>", "play a song from YouTube")
        .addField("skip", "skip the track being played")
        .addField("stop", "stop music playing")
        .addField("weather <nazwa miasta>", "display weather information for the selected city")
        .addField("rand <number1> <number2>", "generate a pseudo-random number")
        .addField("math <operation> <number1> [number2]", "display the result of a mathematical operation")
        .addField("helpmath", "display available mathematical operations")
        .addField("🔰 kick <nazwa użytkownika> [reason]", "kick a user for some reason")
        .addField("🔰 ban <nazwa użytkownika> [reason]", "ban a user for some reason")
        .addField("🔰 clear [n - default 1]", "clear the last n messages (default 1)");
    await message.channel.send(embed)
  }
  if (command === 'helpmath') {
    const title = "Available  math operations";
    const embed = new Discord.MessageEmbed(undefined, undefined)
        .setTitle(title)
        .setColor(0x2196f3)
        .setFooter("Math help Command")
        .setTimestamp()
        .setDescription("<> - required argument, [] - optional argument")
        .addField("add", "!math add <number1> <number2>")
        .addField("sub", "!math sub <number1> <number2>")
        .addField("mul", "!math mul <number1> <number2>")
        .addField("div", "!math <number1> <number2>")
        .addField("mod", "!math mod <number1> <number2>")
        .addField("pow", "!math pow <number1> <number2>")
        .addField("root", "!math root <number1>")
    await message.channel.send(embed)
  }
  if(command === "clear") {
    client.commands.get('clear').execute(message, args)
    return;
  }
  if(command === 'kick') {
    client.commands.get('kick').execute(message, args)
  }
  if(command === 'ban') {
    client.commands.get('ban').execute(message, args)
  }
  if(command === 'math') {
    client.commands.get('math').execute(message, args)
  }
  if(command === 'rand') {
    client.commands.get('rand').execute(message, args, Discord)
  }
})


// Music module
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
        "You must be connected to a voice channel to play music."
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
        "At least one of the following is missing: CONNECT, SPEAK !"
    );
  }


  const yts = require('yt-search');
  let song;
  if (ytdl.validateURL(args[1])) {
  const songInfo = await ytdl.getInfo(args[1], { filter: 'audioonly' });
    song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url
    };
  } else {
    // Searches YouTube with the message content (this joins the arguments
    // together because songs can have spaces)
    const {videos} = await yts(args.slice(1).join(" "));
    if (!videos.length) return message.channel.send("No song matching the link or title found.");
    song = {
      title: videos[0].title,
      url: videos[0].url
    };
  }

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      queueContruct.connection = await voiceChannel.join();
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return message.channel.send(`Added: **${song.title}** in place: `+
        serverQueue.songs.length+` in the queue !`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
        "You must be connected to a voice channel to skip songs !"
    );
  if (!serverQueue)
    return message.channel.send("There is no song I can skip !");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
        "You must be connected to a voice channel to stop the music !"
    );

  if (!serverQueue)
    return message.channel.send("There is no song that I can stop !");

  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  if (serverQueue.songs.length-1>0) {
    serverQueue.textChannel.send(`Now playing: **${song.title}**. Remaining: **${serverQueue.songs.length-1}** 
    songs in the list.`);
  }
  else {
    serverQueue.textChannel.send(`Now playing: **${song.title}**.`);
  }
}


client.login(token)

// Avoiding crash
client.on('debug', () => {})
client.on('warn', () => { client.log() })
client.on('error', () => {})
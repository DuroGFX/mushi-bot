const Discord = require("discord.js");
const colors = require("../colors")

module.exports.run = async (bot, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id)
  
  if(!fetched) return message.channel.send("There isn't any music playing")
  
  let queue = fetched.queue;
  let nowPlaying = queue[0];
  
  let resp = `**Now Playing:**\n${nowPlaying.songTitle} - Requested By: ${nowPlaying.requester}\n\n**Queue:**\n`;
  
  for (var i = 1; i < queue.length; i++) {
    resp += `${i}. ${queue[i].songTitle} - Requested By: ${queue[i].requester}\n`
  }
  
  message.channel.send(resp);
  
  
}

module.exports.help = {
    name: "queue"
}
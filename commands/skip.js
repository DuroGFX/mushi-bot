const Discord = require("discord.js");
const colors = require("../colors")

module.exports.run = async (bot, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);
  
  if(!fetched) return message.channel.send("There currently isn't any music playing!");
  
    message.channel.send("Successfully skipped song!");
    
    return fetched.dispatcher.end();
}

module.exports.help = {
    name: "skip"
}
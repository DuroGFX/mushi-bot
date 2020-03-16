const Discord = require("discord.js");
const colors = require("../colors")
const botconfig = require("../botconfig")
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
  
  if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
  
  if(!message.guild.me.voiceChannel) return message.channel.send("Sorry, the bot isn't connected to the voice channel");
  
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return("Sorry, you aren't in the same channel as me!")
  
  message.guild.me.voiceChannel.leave();
  
  message.channel.send("Leaving the channel...");
  
};

module.exports.help = {
  name: "stop"
};

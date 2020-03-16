const Discord = require("discord.js");
const colors = require("../colors");
const botconfig = require("../botconfig");

module.exports.run = async (bot, message, args) => {
  
  if(message.member.hasPermission("ADMINISTRATOR")) {
    const text = args.join(" ");
    
    if(text.length < 0) return message.channel.send("Please provide an announcement.");
    
    const embed = new Discord.RichEmbed()
    .setTitle(`Announcement`)
    .setColor(colors.aqua)
    .setDescription(text)
    .addField("Announcement by", `<@${message.author.id}>`, true)
    
    message.delete();
    message.channel.send({embed});
    
  }else{
    return message.channel.send("You aren't an admin!");
  }
      
}

module.exports.help = {
  name: "announce"
};
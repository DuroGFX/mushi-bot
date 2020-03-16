const Discord = require("discord.js");
const colors = require("../colors");
const botconfig = require("../botconfig")

module.exports.run = async (bot, message, args) => {
  let Help = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("Mushi Help")
        .addField("**Music Commands**", `Do +play (URL or Word) to start listening to music!\nDo +queue to see the queue!\nDo +search to find a song\nDo +skip to skip a song!\nDo +volume to change the volume (0-200)\nDo +stop to disconnect the bot`, false)
        .addField("**Other Commands**", `Do +announce to make an announcement to your server (it does not ping)!\nDo +dadjoke for a dadjoke!\nDo +meme for a random meme!`)
        .setFooter(`Mushi | Developed by Duro#5232`, bot.user.displayAvatarURL);
        message.channel.send(Help);
   };

module.exports.help = {
  name: "help"
};

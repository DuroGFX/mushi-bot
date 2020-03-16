const Discord = require('discord.js')
const colors = require('./colors')
const bot = new Discord.Client();
const token = 'Njg3MzQzNDAyNTUxMjE0MTQw.Xmqjpw.G7QeKwdHLCgdZ9cb2M6DUr3DZrw';
const ping = require('minecraft-server-util')
const PREFIX = ">";
const fs = require('fs');
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("Couldn't find any commands")
  }


  jsfile.forEach((f, i) =>{
  let props = require (`./commands/${f}`);
  console.log(`${f} loaded!`)
  bot.commands.set(props.help.name, props);
});
  
});



bot.on('ready', () =>{
  console.log("Advancius is online!")
})

bot.on('guildMemberAdd', member =>{
  
  const channel = member.guild.channels.find(channel => channel.name === "welcome")
  if(!channel) return;
  
  channel.send("```New user!```")
  channel.send(`__Welcome ${member}__ to Advancius!`)
  channel.send(`**you suck**`)
  channel.send("*Have a nice stay!*")
});

bot.on('message', message=>{
  
  let args = message.content.substring(PREFIX.length).split(" ");
  
  switch(args[0]){
     
      // Help Command
    case 'test':
      bot.commands.get('test').execute(message, args);
    break;
    
    case 'help':
     let HelpEmbed = new Discord.RichEmbed()
        .setColor(colors.yellow)
        .setTitle("Advancius Help")
        .addField("**Info Command**", `**>info** for information about the server`, false)
        .addField("**Music Commands | WIP**", `**>music** for music commands`, false)
        .addField("**Report Command**", `**>report <user>** Report a discord user`, false)
        .addField("**More Coming soon!**", `:D`, false)
     
        .setFooter(`mc.advancius.net`, bot.user.displayAvatarURL);
        message.channel.send({embed: HelpEmbed});
    break;
    
      // Info command
    
    case 'info':
     let InfoEmbed = new Discord.RichEmbed()
        .setColor(colors.blue)
        .setTitle("Advancius Info")
        .addField("**Server Owner**", `${message.guild.owner}`, false)
        .addField("**Member Count**", `${message.guild.memberCount}`, false)
        .addField("**Bot Count**", `${message.guild.roles.get("687498488295981069").members.size}`, false)
        // Replace With Advancius Bot ID
        .addField("**Need Help?**", `Do **>help** for a list of commands!`, false)
        .setFooter(`mc.advancius.net`, bot.user.displayAvatarURL);
        message.channel.send({embed: InfoEmbed});
    break;
      
      // Music Help Commands
      
    case 'music':
      let MusicEmbed = new Discord.RichEmbed()
        .setColor(colors.green)
        .setTitle("Advancius Music Help")
        .addField("**Play Command**", `**>play** to start listening to music`, false)
        .addField("**Skip Command**", `**>skip** to skip a song`, false)
        .addField("**Stop  Command**", `**>stop** to stop a song`, false)
        .setFooter(`mc.advancius.net`, bot.user.displayAvatarURL);
        message.channel.send({embed: MusicEmbed});
    break;
      
      // Mod Help Commands
      
    case 'mod':
      let ModEmbed = new Discord.RichEmbed()
        .setColor(colors.purple)
        .setTitle("Advancius Mod Help")
        .addField("**Ban Command**", `**>ban <user>** to ban a user`, false)
        .addField("**Mute Command**", `**>mute <user> <length>**`, false)
        .addField("**Kick Command**", `**>kick <user>** kick a user`, false)
        .addField("**Purge  Command**", `**>purge** deletes messages`, false)
        .addField("**Lock  Command**", `**>lock <channel>** Lock a channel to normal users`, false)
        .setFooter(`mc.advancius.net`, bot.user.displayAvatarURL);
        message.channel.send({embed: ModEmbed});
    break;
      
      // Social Media Links
      
    case 'media':
      let SocialMediaEmbed = new Discord.RichEmbed()
        .setColor(colors.red)
        .setTitle("Advancius Social Media")
        .addField("**YouTube**", `https://www.youtube.com/channel/UC1GOgE96wzVXmvKI4ORXF4g`, false)
        .addField("**Reddit**", `https://www.reddit.com/r/AdvanciusNetwork`, false)
        .addField("**Instagram**", `https://www.instagram.com/advanciusmc`, false)
        .addField("**Twitter**", `https://twitter.com/advanciusmc`, false)
        .addField("**YouTube/Streamer Applications**", `https://www.advancius.net/socialmediaapplication`, false)
        .setFooter(`mc.advancius.net`, bot.user.displayAvatarURL);
        message.channel.send({embed: SocialMediaEmbed});
    break;
      
      // Advancius Links
      
    case 'links':
      let LinksEmbed = new Discord.RichEmbed()
        .setColor(colors.orange)
        .setTitle("Advancius Links")
        .addField("**Website**", `https://www.advancius.net/`, false)
        .addField("**Forums**", `https://www.advancius.net/forum`, false)
        .addField("**Applications**", `https://www.advancius.net/apply`, false)
        .addField("**Network Stats**", `http://stats.advancius.net`, false)
        .addField("**Appeal A Punishment**", `https://www.advancius.net/appeal`, false)
        .addField("**Server Punishments**", `http://advanciuspunishments.website`, false)
        .setFooter(`mc.advancius.net`, bot.user.displayAvatarURL);
        message.channel.send({embed: LinksEmbed});
    break;
      
      // Purge command
    
    case 'purge':
          if (isNaN(args[0]))
      return message.channel.send(
        "**Please supply a valid amount of messages to purge**"
      );
    if (args[0] > 100)
      return message.channel.send(
        "**Please supply a valid amount of messages to purge**"
      );
    message.channel
      .bulkDelete(args[0])
      .then(messages =>
        message.channel
          .send(`Successfully deleted \`${messages.size}\` messages.`)
          .then(msg => msg.delete({ timeout: 1000 }))
      )
      .catch(error => message.channel.send(`**ERROR** ${error.message}`));
    break;
    
      // Kick command
    case 'kick':
   if (!args[1]) message.reply("Please provide a user!");

    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member
          .kick("You have been kicked from Advancius for breaking rules!")
          .then(() => {
            message.reply(`Successfully kicked **${user.tag}**`);
          })
          .catch(err => {
            message.reply("Sorry, I was unable to kick the member");
            console.log(err);
          });
      } else {
        message.reply("Unable to locate the user!");
      }
    } else {
      return;
    }
    break;
      
  }

}) //END OF COMMANDS

bot.login(token);
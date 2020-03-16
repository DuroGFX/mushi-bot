const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const colors = require("./colors")
const fs = require("fs");
let prefix = botconfig.prefix;
let ownerID = '283312847478325251';
const active = new Map();
var servers = {};

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

bot.on("ready", async () => {
  console.log(`Mushi is Online!`)
  bot.user.setActivity("Mushi | +help", {type: "PLAYING"});
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let ops = {
    ownerID: ownerID,
    active: active
  }
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile && message.content[0] === prefix) commandfile.run(bot, message, args, ops);
})
       

bot.login(botconfig.token);
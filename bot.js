const { readdirSync } = require('fs');
var discord = require('discord.js');
var Discord = discord
var prefix = "-"
var client = new discord.Client({disableEveryone: false});
const axios = require('axios');
const config = require('./config.js');
const db = require('./db.js');

client.login(config.token)

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.prefix = prefix;

//read all commands from file and insert into client.commands/client.aliases
const load = dirs => {
  const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
  for (const file of commands) {
    const pull = require(`./commands/${dirs}/${file}`)
    client.commands.set(pull.info.name, pull);
    if (pull.info.aliases) pull.info.aliases.forEach(a => client.aliases.set(a, pull.info.name));
  }
};
const commandsDir = readdirSync('./commands/');
commandsDir.forEach(x => {load(x)});

const init = require("./init.js")

//-----------EVENTS-----------

client.on('ready', async () => {
  //client.user.setActivity("-verify", {type: "PLAYING"})   //status
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
  init.init()
});

client.on('message', async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(client.prefix)) return;

  let dbUser = await db.users.findOne({discordId: message.author.id})
  let permissionLevel
  if(!dbUser.permissionLevel) permissionLevel = 0
  else permissionLevel = dbUser.permissionLevel
  
  const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  console.log(Date.now() + "-" + message.author.id + "-" + cmd + "-" + args)

  const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if(commandfile) commandfile.run(client, message, args, permissionLevel, db);

});

client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get("863069139148341279").send(member.user.tag + " joined.")
  db.users.create({discordId: member.user.id})
})

client.on('guildMemberRemove', member => {
  member.guild.channels.cache.get("863069139148341279").send(member.user.tag + " left.")
  db.users.deleteOne({discordId: member.user.id})
})

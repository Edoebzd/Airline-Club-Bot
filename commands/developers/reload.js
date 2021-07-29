const { readdirSync } = require('fs');
const { join } = require('path');
var serverMessage
module.exports.run = async (bot, message, args, permissionLevel) => {
  if(permissionLevel < 99) return message.channel.send("You can't use this command.").then(m => serverMessage = m)
  if(!args[0]) return message.channel.send('Please provide a command to reload!').then(m => serverMessage = m);
  const commandName = args[0].toLowerCase();
  if(!bot.commands.get(commandName)) return message.channel.send('That command doesn\'t exist. Try again.').then(m => serverMessage = m);
  readdirSync(join(__dirname, '..')).forEach(f => {
    const files = readdirSync(join(__dirname,'..',f));
    if(files.includes(commandName + '.js')) {
      try {
        delete require.cache[require.resolve(`../${f}/${commandName}.js`)];
        bot.commands.delete(commandName);
        const pull = require(`../${f}/${commandName}.js`);
        bot.commands.set(commandName, pull);
        return message.channel.send(`Successfully reloaded ${commandName}.js!`).then(m => serverMessage = m);
      } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``).then(m => serverMessage = m);
      }
    }
  });

  setTimeout(() => {
    message.delete()
    serverMessage.delete()
  }, 5000);
};

module.exports.info = {
  name: 'reload',
  description: 'Reload a command',
  usage: '[command]',
  category: 'developers',
  accessableby: 'Developers',
  aliases: []
};

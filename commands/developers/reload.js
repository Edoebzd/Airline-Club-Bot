const { readdirSync } = require('fs');
const { join } = require('path');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != 253877182739382274) return message.channel.send("You can't use this command.")
  if(!args[0]) return message.channel.send('Please provide a command to reload!');
  const commandName = args[0].toLowerCase();
  if(!bot.commands.get(commandName)) return message.channel.send('That command doesn\'t exist. Try again.');
  readdirSync(join(__dirname, '..')).forEach(f => {
    const files = readdirSync(join(__dirname,'..',f));
    if(files.includes(commandName + '.js')) {
      try {
        delete require.cache[require.resolve(`../${f}/${commandName}.js`)];
        bot.commands.delete(commandName);
        const pull = require(`../${f}/${commandName}.js`);
        bot.commands.set(commandName, pull);
        return message.channel.send(`Successfully reloaded ${commandName}.js!`);
      } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``);
      }
    }
  });
};

module.exports.info = {
  name: 'reload',
  description: 'Reload a command',
  usage: '[command]',
  category: 'developers',
  accessableby: 'Developers',
  aliases: []
};

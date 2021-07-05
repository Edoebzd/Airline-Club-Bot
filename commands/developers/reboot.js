module.exports.run = async (bot, message, args) => {
  if(message.author.id != 253877182739382274) return message.channel.send("You can't use this command.")
  message.channel.send("Restarting the bot...").then(k => process.exit(0))
};

module.exports.info = {
  name: 'reboot',
  description: 'Restart the bot',
  usage: ' ',
  category: 'developers',
  accessableby: 'Developers',
  aliases: []
};

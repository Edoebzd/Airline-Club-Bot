module.exports.run = async (bot, message, args) => {
  if(!(message.author.id == 102949678185738240 || message.author.id == 222924725075050497 || message.author.id == 253877182739382274)) return message.channel.send("You can't use this command.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  if(!args[0]) return message.channel.send("Please provide the number of messages to delete.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  if(args[0] > 100) return message.channel.send("You can't delete more than 100 messages.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  message.channel.messages.fetch({ limit: parseInt(args[0])+1 }).then(messages => {
      message.channel.bulkDelete(messages);
      message.reply("deleted " + messages.array().length + " messages, including deletion command.").then(m => setTimeout(() => {m.delete()}, 5000))
    }).catch(err => {
      console.log(err)
      message.channel.send("Failed to delete messages. This may be caused by attempting to delete messages that are over 2 weeks old.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
    });
};

module.exports.info = {
  name: 'purge',
  description: 'Delete messages',
  usage: '[number of messages]',
  category: 'admin',
  accessableby: 'Admins',
  aliases: []
};

module.exports.run = async (bot, message, args) => {
  if(!(message.author.id == 102949678185738240 || message.author.id == 222924725075050497)) return message.channel.send("You can't use this command.")
  var total = 0
  var total2 = 0
  message.guild.members.fetch().then(members => { members.forEach(member => {
    if(!member.user.bot && !member.roles.cache.find(role => role.name == "Verified" && member.user.id != 253877182739382274)) {
      member.roles.add(message.guild.roles.cache.find(role => role.name == "Verified"), "Automatic verification").then(() => {
        total++
        console.log("#"+total+" Verified "+member)
      })
    } })
  });
};

module.exports.info = {
  name: 'verifyall',
  description: 'Verifies everyone',
  usage: ' ',
  category: 'admin',
  accessableby: 'Admins',
  aliases: []
};

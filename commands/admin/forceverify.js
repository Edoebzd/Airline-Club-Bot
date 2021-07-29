const init = require('../../init.js');
module.exports.run = async (bot, message, args, permissionLevel, db) => {
  if(!(message.author.id == 102949678185738240 || message.author.id == 222924725075050497 || message.author.id == 253877182739382274)) return message.channel.send("You can't use this command.").then(m => deleteMessage(m, message))
  if(!args[0]) return message.channel.send("Please provide a valid discord user Id.").then(m => deleteMessage(m, message))
  if(!args[1]) return message.channel.send("Please provide a valid airline name.").then(m => deleteMessage(m, message))
  let userId = args[0]
  let members = await message.guild.members.fetch()
  let member = members.get(userId)
  if(!member) return message.channel.send("Invalid user id.").then(m => deleteMessage(m, message))
  let airlineName = args.slice(1).join(" ")
  let airlineId = -1
  init.airlines.forEach(a => {
    if(a.name == airlineName) airlineId = a.id
  });
  if(airlineId == -1) {
    let airlines = await init.updateAirlines()
    airlines.forEach(a => {
      if(a.name == airlineName) airlineId = a.id
    });
    if(airlineId == -1) return message.channel.send("Can't find this airline.").then(m => deleteMessage(m, message))
  }
  await member.roles.add(message.guild.roles.cache.find(role => role.name == "Verified"), "Automatic forced-verification")
  let dbUser = await db.users.findOne({discordId: userId})
  if(dbUser.airlineId.indexOf(airlineId) != -1) message.channel.send("User already verified with airline '"+airlineName+"'").then(m => deleteMessage(m, message))
  else {
    dbUser.airlineId.push(airlineId)
    if(dbUser.permissionLevel < 10) dbUser.permissionLevel = 10
    dbUser.save()
    message.channel.send("Verified!").then(m => deleteMessage(m, message))
    message.guild.channels.cache.get("863069139148341279").send(member.user.tag+" Force-verified as "+airlineName)
  }
};

function deleteMessage(m1, m2) {
  setTimeout(() => {
    m1.delete()
    m2.delete()
  }, 5000)
}

module.exports.info = {
  name: 'forceverify',
  description: 'Verifies a user',
  usage: '[discord id] [Airline Name]',
  category: 'admin',
  accessableby: 'Admins',
  aliases: []
};

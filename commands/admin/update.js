const init = require('../../init.js');
module.exports.run = async (bot, message, args, permissionLevel, db) => {
  if(permissionLevel < 50) return message.channel.send("You can't use this command.").then(m => deleteMessage(m, message))
  if(!args[0]) return message.channel.send("Please provide a valid discord user Id.").then(m => deleteMessage(m, message))
  let userId = args[0]
  let members = await message.guild.members.fetch()
  let member = members.get(userId)
  if(!member) return message.channel.send("Invalid user id.").then(m => deleteMessage(m, message))
  let dbUser = await db.users.findOne({discordId: userId})

  switch (args[1]) {
    case "nickname":
      updateNickname(dbUser, member)
      break;
    case "-n":
      updateNickname(dbUser, member)
      break;
    default:
      return message.channel.send("Invalid option.").then(m => deleteMessage(m, message))
  }

    message.channel.send("Updated!").then(m => deleteMessage(m, message))
    message.guild.channels.cache.get("863069139148341279").send(member.user.tag+" Updated.")
};

function updateNickname(dbUser, member) {
  if(!dbUser.airlineId && !dbUser.nickname) return
  else if(!dbUser.nickname){
    let airlineNames = []
    dbUser.airlineId.forEach(airline => {
      airlineNames.push(init.airlines[airline].name)
    });
    member.setNickname(airlineNames.join("/"))
  } else {member.setNickname(dbUser.nickname)}
}

function deleteMessage(m1, m2) {
  setTimeout(() => {
    m1.delete()
    m2.delete()
  }, 5000)
}

module.exports.info = {
  name: 'update',
  description: 'Updates a user',
  usage: '[discord id] [option]',
  category: 'admin',
  accessableby: 'Admins',
  aliases: []
};

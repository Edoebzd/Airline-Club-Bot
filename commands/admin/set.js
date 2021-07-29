module.exports.run = async (bot, message, args, permissionLevel, db) => {
  if(permissionLevel < 50) return message.channel.send("You can't use this command.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  if(!args[0]) return message.channel.send("Please provide a valid user Id.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  if(!args[1]) return message.channel.send("Please provide the field to set.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  if(!args[2]) return message.channel.send("Please provide a value for the field.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  let userId = args[0]
  let members = await message.guild.members.fetch()
  let member = members.get(userId)
  if(!member) return message.channel.send("Invalid user id.").then(m => deleteMessage(m, message))
  let dbUser = await db.users.findOne({discordId: userId})

  switch (args[1]) {
    case "permissionLevel":
      if(permissionLevel < 70) return message.channel.send("You can't use this command.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
      setPermissionLevel(dbUser, args[2])
      message.channel.send("Permission set.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
      message.guild.channels.cache.get("863069139148341279").send(member.user.tag+" permission level set to "+args[2]+".")
      break;
    case "nickname":
      setNickname(dbUser, args[2])
      message.channel.send("Nickname set.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
      message.guild.channels.cache.get("863069139148341279").send(member.user.tag+" nickname set to "+args[2]+".")
      break;
    default:
      return message.channel.send("Invalid field.").then(m => setTimeout(() => {m.delete(); message.delete()}, 5000))
  }
};

function setPermissionLevel(dbUser, level) {
  dbUser.permissionLevel = level
  dbUser.save()
}

function setNickname(dbUser, nickname) {
  dbUser.nickname = nickname
  dbUser.save()
}

module.exports.info = {
  name: 'set',
  description: 'Set a field of an user',
  usage: '[discordId] [fieldName] [fieldValue]',
  category: 'admin',
  accessableby: 'Admins',
  aliases: []
};

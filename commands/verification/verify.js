var init = require('../../init.js');
const crypto = require('crypto');
const Discord = require('discord.js');

const verifiedRoleName = "Verified"

module.exports.run = async (bot, message, args) => {
  try {
    if(!message.guild) return message.channel.send("Cannot use this command in direct messages")
    if(!message.channel.id == 862058301704503296) return message.reply("Cannot use this command in this channel").then(m => {setTimeout(() => {message.delete(); m.delete()}, 10000)})
    if(!args[0]) return message.channel.send("Please provide your airline name.").then(m => {setTimeout(() => {message.delete(); m.delete()}, 20000)})
    message.channel.send("Loading...").then(serverMessage => {
      var airlineId = -1
      init.updateAirlines().then(airlines => {
        airlines.forEach(airline => {
          if(airline.name == args.join(" ")) {
            airlineId = airline.id
          }
        })
        if(airlineId == -1) return serverMessage.edit("Cannot find this airline.").then(m => {setTimeout(() => {message.delete(); serverMessage.delete()}, 20000)})
        else serverMessage.edit("Please follow the instructions received in your direct messages.")

        let randomString = crypto.randomBytes(20).toString("hex")
        message.author.send("Hello, to verify your airline, please insert the following string into the slogan field (You can find it in the office page)\n`"+randomString+"`\n\nYou have up to 10 minutes of time, once done react with ✅.")
        .then(mex => {
          mex.react("✅")

          const filter = (reaction, member) => {return ['✅'].includes(reaction.emoji.name) && member.id == message.author.id}
          mex.awaitReactions(filter, {max: 1, time: 600000, errors: ["time"]})
          .then(collected => {
            message.author.send("Loading...").then(m => {
              init.updateAirlines().then(airlines => {
                if(airlines[airlineId].slogan==randomString) {
                  message.member.roles.add(message.guild.roles.cache.find(role => role.name == verifiedRoleName), "Automatic verification").catch(err => console.log("33" + err))
                  .then(() => {
                    m.edit("Verified successfully as "+airlines[airlineId].name+". You can now change back your airline slogan.").catch(err => console.log("35" + err))
                    console.log(message.author.id + "-" + airlineId)
                    message.guild.channels.cache.get("863069139148341279").send(message.author.tag+" Verified as "+airlines[airlineId].name).catch(err => console.log("37" + err))
                    message.delete()
                    serverMessage.delete()
                  }).catch(err => {
                    console.log(err)
                    m.edit("Verification failed. Please try again. If you think this is an error contact a staff member.")
                  })
                } else {
                  m.edit("Verification failed. Please try again. If you think this is an error contact a staff member.")
                }
              })
            })
          }).catch(err => {
            message.author.send("Verification timed out. Please type `-verify [Airline Name]` to restart the process.")
            message.guild.channels.cache.get("863069139148341279").send(message.author.tag+" Verification timeout")
            message.delete()
            serverMessage.delete()
          })
        })
      })
    })
  } catch (err) {
    console.log(err)
    message.reply("Something went wrong. Please try again or contact a staff member.")
    serverMessage.delete()
  }
};

module.exports.info = {
  name: 'verify',
  description: 'Starts the verification process',
  usage: ' ',
  category: 'verification',
  accessableby: 'Anyone',
  aliases: []
};

var init = require('../../init.js');
const crypto = require('crypto');

const verifiedRoleName = "Test role"

module.exports.run = async (bot, message, args) => {
  /*
  if(!args[0]) return message.channel.send("Please provide your airline name.")
  message.channel.send("Loading...").then(serverMessage => {
    var airlineId = -1
    init.updateAirlines().then(airlines => {
      airlines.forEach(airline => {
        if(airline.name == args.join(" ")) {
          airlineId = airline.id
        }
      })
      if(airlineId == -1) return serverMessage.edit("Cannot find this airline.")
      else serverMessage.edit("Please follow the instructions received in your direct messages.")

      let randomString = crypto.randomBytes(20).toString("hex")
      message.author.send("Hello, to verify your airline, please insert the following string into the slogan field (You can find it in the office page)\n`"+randomString+"`\n\nYou have up to 10 minutes of time, once done react with ✅.")
      .then(mex => {
        mex.react("✅")

        const filter = (reaction, member) => {return ['✅'].includes(reaction.emoji.name) && member.id == message.author.id}
        mex.awaitReactions(filter, {max: 1, time: 60000, errors: ["time"]})
        .then(collected => {
          message.author.send("Loading...").then(m => {
            init.updateAirlines().then(airlines => {
              if(airlines[airlineId].slogan==randomString) {
                message.member.roles.add(message.guild.roles.cache.find(role => role.name == verifiedRoleName), "Automatic verification")
                .then(() => {
                  m.edit("Verified successfully as "+airlines[airlineId].name+". You can now change back your airline slogan.")
                  message.channel.send("Verified successfully as "+airlines[airlineId].name)
                })
                .catch(err => {
                  console.log(err)
                  m.edit("Verification failed. Please try again. If you think this is an error contact a staff member.")
                })
              } else {
                m.edit("Verification failed. Please try again. If you think this is an error contact a staff member.")
              }
            })
          })
        })
      })
      .catch(err => {
        console.log(err)
        message.channel.send("Something went wrong. Please try again or contact a staff member.")
      })
    })
  })
  */
  message.channel.send("Command on maintenance.")
};

module.exports.info = {
  name: 'verify',
  description: 'Starts the verification process',
  usage: ' ',
  category: 'verification',
  accessableby: 'Anyone',
  aliases: []
};

const mongoose = require('mongoose');
const {Schema} = mongoose
const config = require('./config.js');

mongoose.connect(`mongodb://${config.mongoDBUsername}:${config.mongoDBPassword}@${config.mongoDBAddress}/${config.mongoDBName}`)
  .then(() => console.log("Connected to the database."))
  .catch(err => console.log(err))

const userSchema = new Schema({
  discordId: Number,
  airlineId: [Number],
  nickname: String,
  patreon: Boolean,
  admin: Boolean,
  permissionLevel: Number  //0 = default, 10 = verified, 50 = admin, 70 = superAdmin, 90 = Game Dev, 99 = Bot Dev
})

const users = mongoose.model("Users", userSchema)

module.exports = {
  users: users
}

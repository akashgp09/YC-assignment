const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
  photo: String,
  firstName: String,
  lastName: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

// googleId: profile.id,
// username: profile.displayName,
// firstName: profile.name.givenName,
// lastName: profile.name.familyName,
// photo: profile.photos[0].value,
// email: profile.emails[0].value,

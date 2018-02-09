const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  { type: String, unique: true },
  fullname:  { type: String, unique: true, default: '' },
  email:  { type: String, default: '', unique: true },
  password:  { type: String, default: '' },
  userImage:  { type: String, default: 'default.png' },
  facebook:  { type: String, default: '' },
  fbToken: Array,
  google: { type: String, default: '' },
  gToken: Array
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

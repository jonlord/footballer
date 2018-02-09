const mongoose = require('mongoose')

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

module.exports = mongoose.model('User', userSchema);

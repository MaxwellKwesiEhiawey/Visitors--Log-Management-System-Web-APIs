const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema({
  name: String, //from form
  email: String, //from form
  phone: String, //from form
  department: String,//from form
  created_at: String //from server side
});

module.exports = mongoose.model('Host', hostSchema);

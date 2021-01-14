const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

tod = mm + '/' + dd + '/' + yyyy;

let time = new Date().toLocaleTimeString()

const logOutSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
   phone: String,
    create_date: {
        type: Date,
        default: tod
    },

  time: {
    type: String,
    default: time
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]

});

module.exports = mongoose.model('logout', logOutSchema);

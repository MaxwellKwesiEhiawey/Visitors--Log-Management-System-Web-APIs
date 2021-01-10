const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
   phone: String,
    create_date: {
        type: Date,
        default: Date.now
    },
  password: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'I am new!'
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]

});

module.exports = mongoose.model('User', userSchema);

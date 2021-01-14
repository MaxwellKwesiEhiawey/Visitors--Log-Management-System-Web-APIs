const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
  department: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: ''
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]

});

module.exports = mongoose.model('Admin', adminSchema);

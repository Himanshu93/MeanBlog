const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type:String, required:true},
  content: {type:String, required: true}
});

// Model name should start with an upper case character
module.exports = mongoose.model('Post', postSchema);

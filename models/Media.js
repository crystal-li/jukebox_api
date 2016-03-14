var mongoose = require('mongoose');

//TODO: Add 'completed' for media history
//      'uploader' to see who uploaded it

//TODO: make a more generic media schema
//      this one is really only for youtube links
var MediaSchema = new mongoose.Schema({
    title: String,
    type: String,
    videoId: String,
    extra: String,
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', MediaSchema);

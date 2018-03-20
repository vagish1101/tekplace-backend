var mongoose = require('mongoose');

var UsersSchema = mongoose.Schema({
    name: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('users', UsersSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByName = function (name, callback) {
    const query = { name: name }
    User.findOne(query,callback);
}

module.exports.getUserByUsername = function (name, callback) {

    const query = { username: name }
    User.findOne(query, callback);
}
module.exports.addUser = function (newUser, callback) {
    const password = newUser.password;
    
    bcrypt.hash(password, 10, function(err, hash) {
        newUser.password=hash;
        newUser.save(callback);
    });

}
module.exports.comparePassword= function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        else{
            callback(null, isMatch);
        }
    })
}
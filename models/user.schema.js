const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    address1: String,
    address2: String,
    towncity: String,
    email: String,
    postcode: String,
    password: String,
    cartItems: []
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;
const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    title: String,
    fullname: String,
    addressline1: String,
    addressline2: String,
    towncity: String,
    email: String,
    password: String,
    phone: Number,
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;
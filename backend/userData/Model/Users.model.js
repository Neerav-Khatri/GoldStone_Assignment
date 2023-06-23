const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    id : Number,
    name : String,
    email : String,
    gender : String,
    status : String
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserScheme = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});
const UserModel = new mongoose.model("user", UserScheme);
module.exports = UserModel;
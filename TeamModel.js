const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const TeamSchema = new Schema({
    team_member_name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: false
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
    },
});

const TeamModel= new mongoose.model("team",TeamSchema);
module.exports = TeamModel;
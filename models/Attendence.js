const mongoose = require("mongoose")

const AttendenceSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
 
    user_phone: {
        type: String,
        required: true,
    },
 

}, 
{
    timestamps : true
}
)

const Attendence = mongoose.model("attendence",  AttendenceSchema)
module.exports = Attendence;

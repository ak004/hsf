const mongoose = require("mongoose")

const StatusSchema = new mongoose.Schema({
    IsAccept: {
        type: String,
        default : 1
        // required: true,
    },
 

    user_id: {
        type: String,
        // required: true,
    },
    user_name: {
        type: String,
        // required: true,
    },
 
}, 
{
    timestamps : true
}
)

const Status = mongoose.model("Status",  StatusSchema)
module.exports = Status;
const mongoose = require("mongoose")

const StatusSchema = new mongoose.Schema({
    accept: {
        type: String,
        // required: true,
    },
 

    reject: {
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

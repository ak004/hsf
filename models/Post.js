const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user_id: {
        type :String,
    }
    user_name :{
        type :String
    }
},
{
    timestamps : true
}
)

const Post = mongoose.model("Post",  postSchema)
module.exports = Post;
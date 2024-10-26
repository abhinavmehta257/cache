const mongoose = require("mongoose");

const chunk = new mongoose.Schema({
    bookmark_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"UserBookmark"
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    content: {
        type: String,
        required: true
    },
    embedding:{
        type:Array,
        required:true
    }
});

const Chunk = mongoose.models.Chunk || mongoose.model("Chunk", chunk);

module.exports = Chunk;

const mongoose = require("mongoose");

const userBookmarksSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Service"
    },
    service_name: {
        type: String,
        required: true
    }
});

const UserBookmark = mongoose.models.UserBookmark || mongoose.model("UserBookmark", userBookmarksSchema);

module.exports = UserBookmark;

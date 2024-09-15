const mongoose = require('mongoose');

const userServiceSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  user_name:{
    type: String,
    required: true,
  },
  service_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Services"
  },
  access_token: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: false,
  },
  token_expires_at: {
    type: Date,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userServiceSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  if(this.isModified("user_id")){
    this.user_id = new mongoose.Types.ObjectId(this.user_id);
  }
  if(this.isModified("service_id")){
    this.service_id = new mongoose.Types.ObjectId(this.service_id);
  }
  next();
});

const UserService = mongoose.models.UserService || mongoose.model('UserService', userServiceSchema);

module.exports = UserService;

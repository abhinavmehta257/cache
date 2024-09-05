const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password_hash: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function (next) {
    this.updated_at = Date.now();
    if (this.isModified('password_hash')) {
      this.password_hash = await bcrypt.hash(this.password_hash, 10);
    }
    next();
  });
  

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;

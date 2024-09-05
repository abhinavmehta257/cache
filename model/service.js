const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
service_name: {
    type: String,
    required: true,
    trim: true
  },
  service_url: {
    type: String,
    required: true,
    trim: true
  },
  permissions:{
    type:Array,
    required:false,
    trim:true
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

serviceSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
module.exports = Service;

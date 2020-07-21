const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuditSchema = new Schema({
  action: String,
  parameters: Object,
  isSuccess: Boolean,
  statusCode: Number,
  reason: String,
  accessLog: String,
});

const Audit = mongoose.model('audit', AuditSchema);

module.exports = Audit;

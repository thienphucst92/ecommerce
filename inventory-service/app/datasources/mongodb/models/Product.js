const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  sku: String,
  inventoryCount: Number,
}, { timestamps: true });

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;

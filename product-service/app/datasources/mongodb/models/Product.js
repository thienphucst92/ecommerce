const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  sku: String,
  name: String,
  price: Number,
  branch: String,
  colour: String,
}, { timestamps: true });

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;

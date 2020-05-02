const mongoose = require('mongoose');

const ShoppingItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageurl: String,
    description: String,
    category: String
});

const ShoppingItem = mongoose.model("ShoppingItem", ShoppingItemSchema);

module.exports = ShoppingItem;
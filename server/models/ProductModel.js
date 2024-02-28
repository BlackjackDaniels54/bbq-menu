const {model, Schema} = require('mongoose');

const ProductSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    isActive: {type: Boolean},
    weight: {type: Number, required: true},
    imgSrc: {type: String, required: true, unique: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
})

module.exports = model('Product', ProductSchema);
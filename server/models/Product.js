import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, required: true, default: null },
  description: { type: String },
  newPrice: { type: Number, required: true, default: 0 },
  oldPrice: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
});
const Product =mongoose.model('Product', productSchema)
export default Product;

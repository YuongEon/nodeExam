import mongoose from "mongoose";

export default mongoose.model("Product", {
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})
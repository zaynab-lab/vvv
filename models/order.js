const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userID: { type: String },
    orderCode: { type: Number },
    products: {
      productID: { type: String },
      Quantity: { type: Number },
      price: { type: Number }
    },
    total: { type: Number },
    paymentMethod: { type: String },
    date: { type: Date, default: Date.now },
    progress: {
      acceptance: {
        date: { type: Date },
        done: { type: Boolean, default: false }
      },
      preparation: {
        date: { type: Date },
        done: { type: Boolean, default: false }
      },
      dispatch: {
        date: { type: Date },
        done: { type: Boolean, default: false }
      },
      return: {
        date: { type: Date },
        done: { type: Boolean, default: false }
      },
      cancelation: {
        date: { type: Date },
        done: { type: Boolean, default: false }
      }
    }
  },

  { collection: "orders" }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);

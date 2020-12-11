const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userID: { type: String },
    userName: { type: String },
    number: { type: Number },
    orderCode: { type: Number },
    products: [
      {
        id: { type: String },
        name: { type: String },
        measure: { type: String },
        category: { type: String },
        quantity: { type: Number },
        price: { type: Number }
      }
    ],
    address: {
      content: { type: String },
      long: { type: Number },
      lat: { type: Number }
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

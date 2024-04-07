const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
      stripeId: {
        type: String,
        required: true,
        unique: true,
      },
      totalAmount: {
        type: String,
      },
      event: {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
      buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;

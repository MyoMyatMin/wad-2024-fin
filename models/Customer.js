import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  membernumber: { type: Number, required: true },
  interests: { type: String, required: true },
});

const Customer =
  mongoose.models.customer || mongoose.model("customer", customerSchema);

export default Customer;

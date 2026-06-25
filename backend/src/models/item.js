const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  category: { type: String, required: true },
  status: { type: String, default: "Coleção" },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

itemSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

itemSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const User = require("./user");
    await User.findByIdAndUpdate(doc.user, {
      $pull: { items: doc._id },
    });
  }
});
module.exports = mongoose.model("Item", itemSchema);

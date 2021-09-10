const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    max: 250,
  },
  edibel: {
    type: Boolean,
    required: true,
  },
  image: {
    type: URL,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;

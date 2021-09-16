const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;

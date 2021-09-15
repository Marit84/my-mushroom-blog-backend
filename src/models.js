const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,

    max: 250,
  },
  edibel: {
    type: Boolean,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;

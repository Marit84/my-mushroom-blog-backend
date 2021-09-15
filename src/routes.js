const express = require("express");
const Listing = require("./models");

const app = express();

//add new listing
app.post("/add_listing", async (req, response) => {
  const listing = new Listing({
    name: String(req.body.name),
    description: String(req.body.description),
    edibel: Boolean(req.body.edibel),
    image: String(req.body.image),
  });

  try {
    await listing.save();
    response.send(listing);
    console.log(listing);
  } catch (error) {
    response.status(500).send(error);
  }
});

//get all listings
app.get("/listings", async (request, response) => {
  const listings = await Listing.find({});

  try {
    response.send(listings);
  } catch (error) {
    response.status(500).send(error);
  }
});

//get one listing
app.get("/listings/:id", async (request, response) => {
  const listings = await Listing.findById(request.params.id);

  try {
    response.send(listings);
  } catch (error) {
    response.status(500).send(error);
  }
});

//delete listing
app.delete("/listings/:id", async (request, response) => {
  const listings = await Listing.findByIdAndDelete(request.params.id);

  try {
    response.send(listings);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;

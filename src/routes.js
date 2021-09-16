const express = require("express");
const Listing = require("./models");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static("/uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

//add new listing
app.post("/add_listing", upload.single("image"), (req, response) => {
  const listing = new Listing({
    title: req.body.title,
    description: req.body.description,
    edibel: req.body.edibel,
    image: req.body.image,
  });

  try {
    listing.save();
    response.send(listing);
    console.log(listing);
  } catch (error) {
    response.status(500).send(error);
  }
});

//update a listing
app.put("/listings/:id", upload.single("image"), (req, res) => {
  Listing.findById(req.params.id)
    .then((listing) => {
      listing.title = req.body.title;
      listing.image = req.file.originalname;
      listing.description = req.body.description;
      listing.edibel = req.body.edibel;

      listing
        .save()
        .then(() => res.json("Lisitng Updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
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

//get one listing by id
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

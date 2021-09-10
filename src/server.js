const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");

const app = express();

app.use(express.json());

mongoose.connect(
  `mongodb+srv://maritPedersen:12345@cluster0.gftza.mongodb.net/BLOG-PROJECT?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(8000, () => {
  console.log("Server is running at port 8000");
});

app.get("/hello", (req, res) => res.send("Hello"));
app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}`));
app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`));

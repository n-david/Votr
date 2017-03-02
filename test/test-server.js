const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set('views', __dirname + '/../views/');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {

});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000!`);
});

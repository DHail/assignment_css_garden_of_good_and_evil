const app = require("express")();

// Set up form body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set up cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Set up handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
	res.render("index");
})

app.post("/settings", (req, res) => {
  // res.cookie("name", req.body.name);
  console.log(req.body);
  res.cookie('attitude', req.body.attitude);
  res.cookie('food', req.body.food);
  res.cookie('color', req.body.color);
  res.cookie('insanity', req.body.insanity);

  res.redirect("back");
});


app.listen(3000, () => {
  console.log("Listening!");
});
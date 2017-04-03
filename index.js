const express = require("express");
const app = express();
const {getSessionData} = require("./oursessions");

// Set up form body parsing
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Set up cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Set up handlebars
const exphbs = require("express-handlebars");
var hbs = exphbs.create({
    helpers: {
        valuesEqual: function (value1, value2) {
         return (value1 == value2); 
     	},
    },
    defaultLayout: "main"
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");



app.use(express.static(__dirname + "/public"));

function randomInsanity(insanity) {
	let random = {
		random1: Math.floor(Math.random() * (200 * (insanity -1))),
		random2: Math.floor(Math.random() * (200 * (insanity -1))),
		random3: Math.floor(Math.random() * (200 * (insanity -1)))
	}
	return random;
}

app.get('/', (req, res) => {
	let {attitude, food, color, insanity} = req.cookies;
	let randomIn = randomInsanity(insanity);
  sessionID = req.cookies['session_id'];
  getSessionData(req, res, sessionID);
  let views = req.session.views;
	res.render("index", {attitude, food, color, insanity, randomIn, views});
});



app.post("/settings", (req, res) => {
  // res.cookie("name", req.body.name);
  res.cookie('attitude', req.body.attitude);
  res.cookie('food', req.body.food);
  res.cookie('color', req.body.color);
  res.cookie('insanity', req.body.insanity);

  res.redirect("back");
});


app.listen(3000, () => {
  console.log("Listening!");
});
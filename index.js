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
exphbs.registerPartial('goodList', )

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
	let {attitude, food, color, insanity} = req.cookies;
	let goodAttitude = false;
	let blue, red, green, yellow, purple;
	if (attitude === "good") {goodAttitude = true};

	switch (color) {
		case 'Blue':
		blue = true;
		break;
		case 'Red':
		red = true;
		break;
		case 'Green':
		green = true;
		break;
		case 'Yellow':
		yellow = true;
		break;		
		case 'Purple':
		purple = true;
		break;
	}
	res.render("index", {attitude, goodAttitude, food, color, blue, red, green, yellow, purple, insanity});
	

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
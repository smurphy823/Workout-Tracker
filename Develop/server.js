var express = require("express");
var mongoose = require("mongoose");

var app = express();
var PORT = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true
});
app.use(require("./routes/api"))
app.use(require("./routes/html"))

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
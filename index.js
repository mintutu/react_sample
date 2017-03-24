var express = require("express");
var bodyParser = require("body-parser")
var parser = bodyParser.urlencoded({extended: false});
var app	= express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000, function() {
	console.log("Listening on port 3000")
});


var array = ["Shit v1", "Shit v2", "Shit v3"];
app.get('/get-notes', function(request, response){
	response.send(array);
});

app.post('/add-note', parser, function(request, response) {
	var newNote = request.body.note;
	array.push(newNote);
	response.send(array);
});

app.post('/delete-note', parser, function(request, response) {
	var deleteId = request.body.note;
  array.splice(deleteId, 1);
	response.send(array);
});

app.post('/edit-note', parser, function(request, response) {
	const editId = request.body.id;
	const editValue = request.body.value;
  array[editId] = editValue;
	console.log(array);
	response.send(array);
});

app.get("/", function(request, response) {

	response.render("trangchu");
});

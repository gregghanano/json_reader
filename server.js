var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/static'));

var obj = {
  "alfonso":["1","2","3"],
  "kristal":["4","5","6"],
  "gregg":["7","8","9"]
};
app.get('/', function(req, res){
  //obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
  var names = ['alfonso','kristal','gregg'];
  res.render('index',{users:names});
})

app.get('/users/:name', function(req, res){
  var key = req.path.split('/')[2];
  console.log(key);
  res.render('user', {user : obj[key], name: key});
})

app.listen(8000, function(){
  console.log('listening on port 8000');
})

var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname+'/static'));

var obj = {};
app.get('/', function(req, res){
  //obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
  var namesLookUp ={};
  var amNames = [];
  fs.readFile('./overlaps.json','utf8', function(err,data){
    console.log("reading file");
    if(err) throw err;
    obj = JSON.parse(data);
    // console.log(obj);
    for(var i in obj){
      //console.log(obj[i].amContact);
      if(!(namesLookUp.hasOwnProperty(obj[i].amContact))){
        namesLookUp[obj[i].amContact] = true;
        amNames.push(obj[i].amContact);
      }
    }
    //console.log(amNames);
    var object = {users: amNames};
    //console.log(object);
    res.render('index',object);
  })
})

app.get('/users/:name', function(req, res){
  // console.log(obj);
  var amName = req.path.split('/')[2];
  // console.log(amName);
  var userObj = {};
  userObj.name = amName;
  userObj.userReasons = [];
  var counter = 0;
  for(var i in obj){
    if(obj[i].amContact === amName){
      console.log('yes! ' + amName+ ' '+ counter++);
      // console.log('reasons ' + obj[i].reasons.join(''));
      userObj.userReasons.push(obj[i].reasons.join(''));
      userObj.count = counter;
    }
  }
  counter=0;
  for(var j = 0; j < userObj.userReasons.length; j++){
    userObj.userReasons[j] += "</p><hr>";
  }
  //console.log("/////////////",userObj);
  // var nextSet = [];
  // if(userObj.userReasons.length > 25){
  //   nextSet = userObj.userReason.slice(0, 25);
  //   userObj.tooMany = true;
  // }
  res.render('user', {user: userObj});
})

app.listen(8000, function(){
  console.log('listening on port 8000');
})

// db.installs.find({targetGame:67271,created:{$gt:ISODate("2015-11-30"), $lt:ISODate("2015-12-13")}},{_id:0,created:1,"identity.rawAdvertisingTrackingId":1,sourceGame:1, targetGame:1})
// db.installs.find({campaignDeveloperId: 1423, targetGame:{$in: [82616,81633]}, created:{$gt:ISODate("2015-09-30")}},{_id:0, created:1, sourceGame:1,targetGame:1,"identity.rawAdvertisingTrackingId":1})

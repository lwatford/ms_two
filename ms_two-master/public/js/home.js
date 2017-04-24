var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var app = express()

var url = 'mongodb://localhost:8080';

var container = $('div.container');
var obj = {};


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))


obj.name = $("#name").val();
obj.dob = $("#dob").val();
obj.hospital_born = $("#hospital").val();

// index = index of the array
// value = the actual item .name = property

// button will trigger the function
$('input#get').click(function(){
	$.ajax({
		type: 'GET', 
		url: '/data/database.json',
		dataType: 'json',
		success: function(data) {
				$.each(data, function(index, item) {
					console.log(data); //this works just fine I can see the objects
						container.append(key + ': ' + value + '</br>');
					// },
					container.append('<br/></br>')
				})
			}
		})
})


$('place#post').click(function(){
	$.ajax({
    type: 'POST',
    url: '../data/database.json',
    contentType: 'json',
    dataType: 'json',
    data: JSON.stringify(fromData),
			success: function(res) {
            console.log(res);
            console.log('Post: got response');
            console.log('POST Response Data', JSON.parse(res.data))


        },
        error: function(resquest, status, error) {
						console.error(request.responseText)
        }
		})
})

	//get list of registered numbers
$('button#button-registration').click(function(){
	$.getJSON('/data/database.json', function(data){
		$.each(data.database, function(i, a){
			$('ul').append('</li><br></br>Number ' + i +': '+ a['registration'] + '</li>' ); //ugh this only shows my objects
		});
	});
});



function modal()
{
 $('.modal').css("display","flex");
}

$(document).ready(function(){
  $('.modal:not(article)').click(function(){
   
 $('.modal').css("display","none"); 
  });
  
  $('.modal > article').click(function(e){
    e.stopPropagation();
  });
});

(function() {
    var staticPanel = $('.panel--static');
    var slidingPanel = $('.panel--sliding');
    
    var signupBtn = staticPanel.find('.btn.signup');
    var loginBtn = staticPanel.find('.btn.login');
    
    var signupContent = slidingPanel.find('.panel__content.signup');
    
    var loginContent = slidingPanel.find('.panel__content.login');

    signupBtn.on('click', function() {
        loginContent.hide();
        signupContent.show();
        slidingPanel.animate({
            'left': '4%'
        }, 550, 'easeInOutBack');
    });

    loginBtn.on('click', function() {
        signupContent.hide();
        loginContent.show();
        slidingPanel.animate({
            'left': '54%'
        }, 550, 'easeInOutBack');
    });
})();



//store information from input form into json file
(function(){

var buttonValue = {};
  
$("#submit").click(function(){
   $("input[type=button]").each(function($i){
   var name =$(this).attr('name')     
   buttonValue[name]=$(this).val();
  });
  });

  $("#seeData").click(function(){
   console.log(buttonValue);
  });

}())

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index.html');
});

app.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index.html', {items: resultArray});
    });
  });
});

app.post('/insert', function(req, res, next) {
  var item = {
    registration: req.body.registration,
    adoptee_name: req.body.adoptee_name,
    brithfamily_member: req.body.brithfamily_member,
    date_of_birth: req.body.date_of_birth,
    sex: req.body.sex,
    nationality: req.body.nationality,
    adoptee_name_at_birth: req.body.adoptee_name_at_birth,
    hospital_born: req.body.hospital_born,
    state: req.body.state,
    county: req.body.county,
    birth_mother_maiden_name: req.body.birth_mother_maiden_name,
    birth_father_name: req.body.birth_father_name,
    email: req.body.email
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});
app.post('/update', function(req, res, next) {
  var item = {
    registration: req.body.registration,
    adoptee_name: req.body.adoptee_name,
    brithfamily_member: req.body.brithfamily_member,
    date_of_birth: req.body.date_of_birth,
    sex: req.body.sex,
    nationality: req.body.nationality,
    adoptee_name_at_birth: req.body.adoptee_name_at_birth,
    hospital_born: req.body.hospital_born,
    state: req.body.state,
    county: req.body.county,
    birth_mother_maiden_name: req.body.birth_mother_maiden_name,
    birth_father_name: req.body.birth_father_name,
    email: req.body.email,
    number: req.body.number

  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

app.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = app;






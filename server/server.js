/**
 * Created by Mateen Bhai on 1/11/2016.
 */

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");


/*Api requires path*/
var api1 = require("./api/api_sign_up.js");




var app = express();



var viewsPath = path.resolve(__dirname,"../client");
app.use(express.static(viewsPath));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());




app.post('/sign_up_user',api1);

app.post('/check_email',api1);








app.set('port',process.env.PORT || 3000);

 app.listen(app.get('port'),function()
 {
 console.log("App in running state");
 })

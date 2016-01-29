/**
 * Created by Mateen Bhai on 1/11/2016.
 */

    //Modules
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");

/*Api requires path of sign_up Api*/
var signUp_api = require("./api/api_sign_up.js");
var login_api = require("./api/api_login.js");
var verify_account_api = require("./api/api_verify_account.js");

//initialize the express
var app = express();

//Path of files
var viewsPath = path.resolve(__dirname,"../client");
app.use(express.static(viewsPath));

// Using body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//Post request of Sign_up
app.post('/sign_up_user',signUp_api);

//Post request of Checking email in database
app.post('/check_email',signUp_api);


//Post request for authenticating email and password
app.post('/login',login_api);


app.post('/verify_account',verify_account_api);







//Set the port environment if not send than set the port on 3000
app.set('port',process.env.PORT || 3000);
app.listen(app.get('port'),function()
 {
 console.log("App in running state");
 })

/**
 * Created by Mateen Bhai on 1/13/2016.
 */


var express = require("express");
var Firebase = require("firebase");
var nodemailer = require('nodemailer');
var path = require("path");

        /*Sign up Schema require */
var schema = require("../schema/schema_sign_up.js")
var sign_up_schema = schema.sign_up_schema;

        /*Firebase ref set*/
var firebase_ref = new Firebase("https://salesmanmanagement.firebaseio.com/");
var api = express.Router();



//This status code refers username already exist with provided email in firebase
var duplicate_error = "1100";

//This status code refers username created in firebase and mongodb
var confirm_code = "200";

//This status code refers that is user removed from firebase
var remove_fire_user = "402";

//This status code refers that there is any error removing firebase user
var error_romove_user = "804";


//Api of Signup
api.post("/sign_up_user",function(req,res)
{
    //Firebase user registration function
    firebase_ref.createUser({
        email: req.body.email,
        password: req.body.pass
    },function(err,success)
    {
        if (err)
        {
            res.send(duplicate_error);
        }
        else
        {
            //Mongodb user registration function
            req.body.firebase_uid = success.uid;
            var save_user = new sign_up_schema(req.body);
            save_user.save(function(err,success)
            {
                if(err)
                {
                    //Firebase user remove function
                    firebase_ref.removeUser({
                        email: req.body.email,
                        password: req.body.pass
                    },function(err,success)
                    {
                        if (err)
                        {
                            //Error in removing firebase error
                            res.send(error_romove_user)
                        }
                        else
                        {
                            //Firebase firebase user successfully
                            res.send(remove_fire_user);
                        }
                    })
                }
                else
                {
                    sendMail_func(req.body.email,success._id);

                    console.log(success._id);
                    res.send(confirm_code);
                }
            })
        }
    })

});



//Authnetication for sent an email to any one account
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gayyasabcd@gmail.com',
        pass:   'abcdef123456'

        //meanstack02@gmial.com
        //meanstack
    }
});

//Email send function
function sendMail_func(email,id)
{
    var verifyUrl = "http://localhost:3000/#/verify-account/"+id;
    var mailOptions = {
        to: email,
        subject: 'Sales Man Verification Email',
        html: "<h1 style='color: blue'>Welcome To Sale's Man</h1><br><br><b>Please verify your Email Click here : "+verifyUrl+"</b>"
    };

    /*html: "<h1 style='color: blue'>Welcome To Sale's Man</h1><br><br><b>Email : "+email+"<br><br><b>Password : "+pass+"</b>"*/

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("Email Not sent ",error);
            //res.json({yo: 'error'});
        }else{
            console.log("Email sent: " + info.response);
            //res.json({yo: info.response});
        };
    });
};




//Api Check email address in database is already exist or not
api.post("/check_email",function(req,res)
{
    sign_up_schema.findOne({email:req.body.email},{_id:1},function(err,success)
    {
        if (err)
        {
            console.log("Api Error :",success);
            res.send(err);
        }
        else
        {
            if(success == null)
            {
                res.send(confirm_code);
            }
            else
            {
                res.send(duplicate_error);
            }
        }

    });
})


//Export the Api
module.exports = api;
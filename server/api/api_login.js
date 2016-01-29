/**
 * Created by Mateen Bhai on 1/13/2016.
 */


var express = require("express");
var bcrypt = require("bcrypt-nodejs");
var model = require("../schema/schema_sign_up.js")
var login_model = model.sign_up_schema;

var api = express.Router();


api.post("/login",function(req,res)
{
    login_model.findOne({email:req.body.email},function(err,data)
    {
        if (data)
        {
            bcrypt.compare(req.body.pass,data.pass,function(err,isMatch)
            {
                if(isMatch)
                {
                    var userDetails = {
                        uid:data.firebase_uid,
                        name:data.firstName+" "+data.lastName
                    }
                    //200 authorized user
                    res.status(200).send(userDetails);
                }
                else
                {
                    //401 unauthorized (password does not match)
                    res.status(401).send("The email and password you entered don't match");
                }

            })
        }
        else
        {
            //404 email not found
            res.status(404).send("Sorry, your email doesn't recognize");
        }
    });
})

module.exports = api;


/*
saleman2Model.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] }, function(err, success) {
    if (success) {
        console.log(success);
        bcrypt.compare(req.body.password, success.password, function(err, isMatch) {
            done(err, isMatch);
        });
        function done(err2, isMatch) {
            isMatch ? res.send(success) : res.send(err);
        }
    }
    else {
        res.send(success)
    }
});*/

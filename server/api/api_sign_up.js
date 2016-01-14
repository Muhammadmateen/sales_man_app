/**
 * Created by Mateen Bhai on 1/13/2016.
 */



var express = require("express");
var Firebase = require("firebase");




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
                    res.send(confirm_code);
                }
            })
        }
    })

});




api.post("/check_email",function(req,res)
{
    sign_up_schema.findOne({email:req.body.email},{_id:1},function(err,success)
    {
        if (err)
        {
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





module.exports = api;
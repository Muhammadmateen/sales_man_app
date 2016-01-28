/**
 * Created by Mateen Bhai on 1/13/2016.
 */


var express = require("express");
/*var bodyParser = require("body-parser");*/



var api = express.Router();



api.post("/login",function(req,res)
{
    console.log(req.body);
    res.send("OK request get mateen");
})

module.exports = api;
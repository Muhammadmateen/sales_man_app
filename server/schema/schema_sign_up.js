/**
 * Created by Mateen Bhai on 1/14/2016.
 */
/* Sales Man Schema */
/*var mongoose = requires('mongoose');
var connection = mongoose.connect("mongodb://localhost/sales_man");


var schema = new mongoose.schema({
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    email : {type:email,required:true,unique:true},
    pass:   {type:String,required:true},
    date: {type:Date,default: Date.now}
});
exports.sign_up_schema = mongoose.model("users",schema);*/

    //Modules
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://localhost/sales_man");


        /* Sales Man Schema */
var schema = mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    email : {
        type:String,validate: function(email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        },required:true,unique:true
    },
    pass : {type:String,required:true},
    date : {type:Date,default:Date.now},
    verified:{type:Boolean,default:false},
    firebase_uid : {type:String,required:true,unique:true}
});

//Using to bcrypt the password
var SALT_FACTOR = 10;
var noop = function() {};

schema.pre("save", function(done) {
    var user = this;
    if (!user.isModified("pass")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.pass, salt, noop,
            function(err, hashedPassword)
            {
                if (err) { return done(err);
            }
            user.pass = hashedPassword;
            done();
        });
    });
});



//Export the schema
exports.sign_up_schema = mongoose.model("users",schema);



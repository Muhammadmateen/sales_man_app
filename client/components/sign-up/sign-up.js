/**
 * Created by Mateen Bhai on 1/11/2016.
 */



angular.module('app')

    .controller('sign_up_controller',['$http','$state','alert_dialog_service','toast_service',signup_ctrl_func])


    //Signup controller function
    function signup_ctrl_func($http,$state,alert_dialog_service,toast_service,coirmPass)
    {
        var _self = this;
        _self.email_loader = false;
        _self.email_in_used = false;
        _self.loader = false;



        var title = "Successfully Register!";
        var message = "Please check your email and verify your account.";
        var btnVal = "OK";

        //Sale's man Sign up function
        _self.sign_up =   function(ev)
        {


            if(!_self.email_in_used)
            {
                _self.loader = true;
                $http.post('/sign_up_user',_self.user).then(function(result)
                {
                    _self.loader = false;
                    switch (result.data)
                    {
                        case '200':
                            alert_dialog_service.showDialog(ev,title,message,btnVal);
                            break;
                        case '1100':
                            //console.log("Email id already exist");
                            break;
                        case '402':
                            //console.log("User removed from firebase successfully");
                            break;
                        case '804':
                            //console.log("User not removed from firebase successfully");
                            break;
                    }
                    $state.go($state.current,[],{reload:true});

                },function(err)
                {
                    _self.loader = false;
                    toast_service.showSimpleToast(err);
                    //alert("Request Not send on server");
                    console.log(err);
                    _self.user = "";
                })
            }
            else
            {
                toast_service.showSimpleToast("Please enter valid email address");
                //console.log("function not call first enter valid email address");
            }

        };


        //Check signup user email in database that already in use or not
        _self.checkEmail = function(response)
        {

            if(response != undefined)
            {
                _self.email_loader = true;
                $http.post("/check_email",{email: response}).then(function(result)
                {
                    _self.email_loader = false;
                    switch (result.data)
                    {
                        case '200':
                            //console.log("you can create account with this email");
                            _self.email_in_used = false;
                            break;
                        case '1100':
                            //console.log("Email id already exist");
                            _self.email_in_used = true;
                            break;
                        default :
                            toast_service.showSimpleToast(result);
                            //console.log("Mongo Error :",result);

                    }

                },function(err)
                {
                    _self.email_loader = false;
                    toast_service.showSimpleToast(err);
                    //console.log("Request not send on server : ",err);
                });
            }
        }

    };


/*
var title = "Successfully Register!";
var message = "Please check your email and verify your account.";
var btnVal = "OK";
var ev = "$event";
alert_dialog_service.showDialog(ev,title,message,btnVal)*/

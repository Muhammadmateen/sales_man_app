/**
 * Created by Mateen Bhai on 1/11/2016.
 */



angular.module('app')

    .controller('sign_up_controller',['$http','$state',signup_ctrl_func])


    //Signup controller function
    function signup_ctrl_func($http,$state)
    {
        var _self = this;
        _self.email_loader = false;
        _self.email_in_used = false;
        _self.loader = false;


        //Sale's man Sign up function
        _self.sign_up =   function()
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
                            console.log("Registeration done");
                            alert("Please check your email");
                            break;
                        case '1100':
                            console.log("Email id already exist");
                            break;
                        case '402':
                            console.log("User removed from firebase successfully");
                            break;
                        case '804':
                            console.log("User not removed from firebase successfully");
                            break;
                    }
                    $state.go($state.current,[],{reload:true});

                },function(err)
                {
                    _self.loader = false;
                    alert("Request Not send on server");
                    console.log(err);
                    _self.user = "";
                })
            }
            else
            {
                console.log("function not call first enter valid email address");
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
                            console.log("you can create account with this email");
                            _self.email_in_used = false;
                            break;
                        case '1100':
                            console.log("Email id already exist");
                            _self.email_in_used = true;
                            break;
                        default :
                            console.log("Mongo Error :",result);

                    }

                },function(err)
                {
                    _self.email_loader = false;
                    console.log("Request not send on server : ",err);
                });
            }
        }

    };



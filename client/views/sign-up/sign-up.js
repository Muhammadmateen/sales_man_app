/**
 * Created by Mateen Bhai on 1/11/2016.
 */



angular.module('app')

    .controller('sign_up_controller',['$http',signup_ctrl_func]);

    function signup_ctrl_func($http)
    {
        var _self = this;

        _self.sign_up =   function()
        {

            $http.post('/sign_up_user',_self.user).then(function(result)
            {
               switch (result.data)
               {
                   case '200':
                       console.log("Registeration done");
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
                _self.user = "";

            },function(err)
            {
                alert("Request Not send on server");
                console.log(err);
                _self.user = "";
            })

        };




        _self.checkEmail = function(response)
        {

            console.log(response);
            if(response != undefined)
            {
                $http.post("/check_email",{email: response}).then(function(result)
                {
                    switch (result.data)
                    {
                        case '200':
                            console.log("you can create account with this email");
                            break;
                        case '1100':
                            console.log("Email id already exist");
                            break;
                        default :
                            console.log("Mongo Error :",result.data);

                    }

                },function(err)
                {
                    console.log("Request not send on server : ",err);
                });
            }

        }

    };
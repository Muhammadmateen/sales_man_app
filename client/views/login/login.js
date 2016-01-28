/**
 * Created by Mateen Bhai on 1/11/2016.
 */




angular.module('app')

    .controller('login_controller',['$http',login_ctrl_func]);

    function login_ctrl_func($http)
    {
        var _self = this;

       _self.login_auth =   function()
        {
            $http.post("/login",_self.user).then(function(data)
            {
                console.log(data);
            },function()
            {
                console.log("Request not send on server");
            });

        };

    };
/**
 * Created by Mateen Bhai on 1/11/2016.
 */




angular.module('app')

    .controller('login_controller',[login_ctrl_func]);

    function login_ctrl_func()
    {
        var _self = this;

       _self.login_auth =   function()
        {
            console.log("OK");
        };

    };
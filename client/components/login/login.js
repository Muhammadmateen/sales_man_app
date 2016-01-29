/**
 * Created by Mateen Bhai on 1/11/2016.
 */




angular.module('app')

    .controller('login_controller',['$http','$mdToast','toast_serice',login_ctrl_func]);

    function login_ctrl_func($http,$mdToast,toast_serice)
    {
        var _self = this;

       _self.login_auth =   function()
        {
            $http.post("/login",_self.user).then(function(data)
            {
                localStorage.setItem("uid",data.data.uid);
                toast_serice.showSimpleToast("Welcome "+data.data.name);

            },function(err)
            {
                toast_serice.showSimpleToast(err.data);
            });
        };


    };
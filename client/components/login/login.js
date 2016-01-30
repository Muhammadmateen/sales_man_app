/**
 * Created by Mateen Bhai on 1/11/2016.
 */




angular.module('app')

    .controller('login_controller',['$http','$mdToast','toast_service',login_ctrl_func]);

    function login_ctrl_func($http,$mdToast,toast_service)
    {
        var _self = this;
        _self.loader = false;

       _self.login_auth =   function()
        {
            _self.loader = true;
            $http.post("/login",_self.user).then(function(data)
            {
                _self.loader = false;
                localStorage.setItem("uid",data.data.uid);
                toast_service.showSimpleToast("Welcome "+data.data.name);

            },function(err)
            {
                _self.loader = false;
                toast_service.showSimpleToast(err.data);

            });
        };


    };
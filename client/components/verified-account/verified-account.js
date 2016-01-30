/**
 * Created by Mateen Bhai on 1/29/2016.
 */


(function()
{

    angular.module('app')
        .controller("verify_account_controller",['$http','$stateParams',verify_account_func])

    function verify_account_func($http,$stateParams)
    {

        var _self  = this;
        var user_uid = $stateParams.id;
        var invalid_req = "Invalid Request";


        if(user_uid != null && user_uid != "")
        {

            $http.post('/verify_account',{id :user_uid}).then(function(data)
            {

                if(data.data.n == 1 && data.data.nModified == 0 && data.data.ok == 1)
                {
                    _self.result = "You have already verified your account...";
                }
                else if(data.data.n == 1 && data.data.nModified == 1 && data.data.ok == 1)
                {
                    _self.result = "Successful! Your account is verified...";
                }
                else
                {
                    _self.result = invalid_req;
                }

            },function(err)
            {
                _self.result = invalid_req;
            })
        }
        else
        {
           _self.result = invalid_req;
        }

    }



}());
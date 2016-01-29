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


        if(user_uid != null)
        {

            $http.post('/verify_account',{id :user_uid}).then(function(data)
            {

                if(data.data.nModified == 0)
                {
                    _self.result = "You have already verified your account...";
                }
                else
                {
                    _self.result = "Successful! Your account is verified...";
                }

            },function(err)
            {
                _self.result = "Invalid Request";
            })
        }
        else
        {
           _self.result = "Invalid Request";
        }

    }



}());
/**
 * Created by Mateen Bhai on 1/30/2016.
 */


(function()
{

    angular.module("app")
        .controller("dashboard_controller",[dashboard_ctrl_func])

    function dashboard_ctrl_func()
    {
        var _self = this;

        console.log("Controller function initilize");
    }

}());
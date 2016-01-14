/**
 * Created by Mateen Bhai on 1/11/2016.
 */


var app = angular.module('app',['ui.router','ngMaterial','ngMdIcons']);


app.config(function($stateProvider,$urlRouterProvider)
{

    $stateProvider.state('login',{
            url:'/login',
            templateUrl:'views/login/login.html',
            controller:'login_controller',
            controllerAs:'ctrl'
        })


        .state('sign-up',{
            url:'/sign-up',
            templateUrl:'./views/sign-up/sign-up.html',
            controller:'sign_up_controller',
            controllerAs:'ctrl'
        })


        .state('404',{
            url:'/404',
            templateUrl:'./client/views/404/404.html',
        })

        $urlRouterProvider.otherwise('sign-up');
})
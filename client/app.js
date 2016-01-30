/**
 * Created by Mateen Bhai on 1/11/2016.
 */


var app =  angular.module('app',['ui.router','ngMaterial','ngMdIcons'])


   app.run(function($rootScope, $state){

       console.log("Run working");
        $rootScope.$on("$stateChangeStart", function(event, toState){
            console.log("state change");
            /*var firebaseLocalToken = localStorage.getItem("token");

            if(toState.loginCompulsory && !firebaseLocalToken){
                event.preventDefault();
                $state.go("login");
            }*/

        });

    })
/*app.run(function($rootScope) {

    //console.log("run");
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams)
    {
        console.log("Event fire");
        /!*alert("alert");
        var uid = localStorage.getItem("uid");*!/

        /!*if (toState.key)
         {
         if(uid)
         {
         console.log("Uid : ",uid);
         }
         else
         {
         console.log("uid not found : ",uid);
         }
         }
         else
         {
         console.log("Key not found",toState.key);
         }*!/

    })
})*/

app.config(function($stateProvider,$urlRouterProvider)
{

    $stateProvider.state('login',{
            url:'/login',
            templateUrl:'components/login/login.html',
            controller:'login_controller',
            controllerAs:'ctrl'
        })


        .state('sign-up',{
            url:'/sign-up',
            templateUrl:'components/sign-up/sign-up.html',
            controller:'sign_up_controller',
            controllerAs:'ctrl'
        })

        .state('dashboard',{
            url:'/dashboard',
            templateUrl:'components/dashboard/dashboard.html',
            controller:'dashboard_controller',
            controllerAs:'ctrl'
            /*resolve:{
                abcd:function()
                {

                }
            }*/
        })

        .state('verify-account',{
            url:'/verify-account/:id',
            templateUrl:'components/verified-account/verified-account.html',
            controller:'verify_account_controller',
            controllerAs:'ctrl'
        })

        .state('404',{
            url:'/404',
            templateUrl:'./client/components/404/404.html',
        })

        $urlRouterProvider.otherwise('sign-up');
})




        /*.run(function ($rootScope, $state) {
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    var firebaseToken = localStorage.getItem("firebaseToken");
                    if (toState.name.slice(0, toState.name.indexOf(".")) === "dashboard" && !firebaseToken) {
                        event.preventDefault();
                        $state.go("login")
                    }
                    else if ((toState.name == "login" || toState.name == "signup") && firebaseToken) {
                        event.preventDefault();
                        $state.go("dashboard.dashboard-home")
                    }
                })
        })*/
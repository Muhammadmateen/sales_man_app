/**
 * Created by Mateen Bhai on 1/30/2016.
 */


(function()
{
    angular.module("app")
        .directive('validPasswordC',function()
        {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue, ctrl) {
                        var noMatch = viewValue != ctrl.signUp.pass.$viewValue
                        ctrl.$setValidity('noMatch', !noMatch)
                    })
                }
            }
        })
});
/**
 * Created by Mateen Bhai on 1/30/2016.
 */




/**
 * Created by Mateen Bhai on 1/29/2016.
 */


(function ()
{
    angular.module('app')
        .factory('alert_dialog_service',function($mdDialog)
        {
            var obj = {};
            obj.showDialog = function(ev,title,message,btnVal)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title(title)
                        .textContent(message)
                        .ariaLabel('Alert Dialog')
                        .ok(btnVal)
                        .targetEvent(ev)
                );
            }

            return obj;
        })

}());




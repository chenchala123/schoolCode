'use strict';

angular.module('schoolApp')
    .controller('LoginCtrl', function($scope, ServerCall, $rootScope) {

        $scope.fnLogin = function() {
            var dataObj = {
                "Email": $scope.uname,
                "Password": $scope.pwd,
                "OldPassword": null,
                "Phone": null,
                "NewPassword": null,
                "MainUserID": 0,
                "Questions": [{
                    "SecurityQuestionID": 0,
                    "UserSecurityID": 0,
                    "SecurityAnswer": null,
                    "SecurityQuestion": null
                }]
            }
            var sucLoginCB = function(res) {
                debugger;
                $rootScope.$broadcast('loggedIn', {});
                $scope.fnGetClassList();
            }
            var errLoginCB = function(res) {}
            ServerCall.getData('authentication/login', 'POST', dataObj, sucLoginCB, errLoginCB);
            //201703098223
            var classListSuccess = function(res) {
                debugger;
                sessionStorage.setItem('classList', JSON.stringify(res.classList));
            };
            var classListError = function(res) {
                debugger;
            };
            $scope.fnGetClassList = function() {
                ServerCall.getData('lookup/class', 'GET', '', classListSuccess, classListError);
            };
        }
    });

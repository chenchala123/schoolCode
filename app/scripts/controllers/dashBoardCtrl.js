'use strict';

angular.module('schoolApp')
    .controller('DashBoardCtrl', function($scope,ServerCall) {

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
        $scope.fnGetClassList();
    });

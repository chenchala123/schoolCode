'use strict';

angular.module('schoolApp')
    .controller('DashBoardCtrl', function($scope,ServerCall) {

        var classListSuccess = function(res) {
            sessionStorage.setItem('classList', JSON.stringify(res));
        };
        var classListError = function(res) {
        };
        $scope.fnGetClassList = function() {
            ServerCall.getData('lookup/class', 'GET', '', classListSuccess, classListError);
        };
        $scope.fnGetClassList();
    });

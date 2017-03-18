'use strict';

angular.module('schoolApp')
    .controller('DairyCtrl', function($socpe,ServerCall) {
        var dairyError = function() {

        }
        var dairySuccess = function() {

        }
        $scope.fnGetDairyDetails = function() {
            ServerCall.getData('student/' 'GET', '', dairySuccess, dairyError);

        }
    });

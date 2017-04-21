'use strict';

angular.module('schoolApp')
    .controller('DairyCtrl', function($socpe,ServerCall) {
    	$scope.constants=sessionStorage.getItem('constantsData');
        if( $scope.constants==null){
            var constantSuccCB=function(data){
                $scope.constants=data;
            }
            var ConstantErrCB=function(data){
                $scope.constants=data;
            }
             $scope.constants=CommonService.getConstantData(constantSuccCB,ConstantErrCB);
            }else{
                $scope.constants=JSON.parse($scope.constants);
            }
        var dairyError = function() {

        }
        var dairySuccess = function() {

        }
        $scope.fnGetDairyDetails = function() {
            ServerCall.getData('student/', 'GET', '', dairySuccess, dairyError);

        }
    });

'use strict';

angular.module('schoolApp')
    .controller('DashBoardCtrl', function($scope,ServerCall,CommonService) {
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

'use strict';

angular.module('schoolApp')
  .controller('DashBoardCtrl', function ($scope) {
     $scope.percent = 65;
        $scope.options = {
            animate:{
                duration:0,
                enabled:false
            },
            barColor:'#2C3E50',
            scaleColor:false,
            lineWidth:20,
            lineCap:'circle'
        };
  });
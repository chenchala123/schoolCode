'use strict';

angular.module('schoolApp')
    .controller('StudentCtrl', function($scope, ServerCall,fileUpload,CommonService) {
        $scope.gender = 'male';
        $scope.classList=CommonService.getClassList();
        var stdListSuccess = function(res) {
                $scope.stdList = res;
            }
        var stdListError = function(res) {
            debugger;
        }
        $scope.getStudentsList = function(selClassId) {

            ServerCall.getData('student/' + selClassId, 'GET', '', stdListSuccess, stdListError);

        }
        var stdRegSuccess=function(res){

        }
        var stdRegError=function(res){

        }
        $scope.fnRegisterStudent = function() {
            var fd = new FormData();
            fd.append('Image', $scope.stdImg);
            fd.append('Email', $scope.parentEmail);
            fd.append('FirstName', $scope.firstName);
            fd.append('LastName', $scope.LastName);
            fd.append('Gender', $scope.gender);
            fd.append('DateOfBirth', $scope.dob);
            fd.append('RollNumber', $scope.rollNo);
            fd.append('Discount', 0);
            fd.append('ClassID', $scope.selClass);
            fileUpload.uploadData('registration/'+$scope.selClass+'/student',fd,stdRegSuccess,stdRegError)
        }
    });

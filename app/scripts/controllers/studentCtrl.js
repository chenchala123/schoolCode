'use strict';

angular.module('schoolApp')
    .controller('StudentCtrl', function($scope, $timeout, ServerCall, fileUpload, CommonService) {
        $scope.gender = 'male';
        $scope.classList = CommonService.getClassList();
        var stdListSuccess = function(res) {
            $scope.stdList = res;
        }
        var stdListError = function(res) {
            debugger;
        }
        $scope.getStudentsList = function(selClassId) {

            ServerCall.getData('student/' + selClassId, 'GET', '', stdListSuccess, stdListError);

        }
        var stdRegSuccess = function(res) {

        }
        var stdRegError = function(res) {

        }

        $scope.fnRegisterStudent = function() {
                  

            if ($('#studentRegistration').valid()) {
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
                fileUpload.uploadData('registration/' + $scope.selClass + '/student', fd, stdRegSuccess, stdRegError)
            }

        }
        $timeout(function() {
            $('#studentRegistration').validate({
               
                rules: {
                    'firstName': 'required',
                    'lastName': 'required',
                    'parentEmail': {
                        'required': true,
                        'parentEmail': true
                    },
                    'rollNumber': 'required',
                    'class': 'required',
                    'dob': 'required',
                    'gender': 'required',
                    'stdImg': 'required'
                },
                messages: {
                    'firstName': 'Please Enter First Name',
                    'lastName': 'Please Enter lastName',
                    'parentEmail': 'Please Enter Correct Email',
                    'rollNumber': 'Please Enter RollNumber',
                    'class': 'Please Enter class',
                    'dob': 'Please Select DateOfBirth',
                    'gender': 'Please Select Gender',
                    'stdImg': 'Please Upload Image'
                }
            });
        }, 1000);





    });

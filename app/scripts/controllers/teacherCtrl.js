'use strict';

angular.module('schoolApp')
    .controller('TeacherCtrl', function($scope, $rootScope, $timeout, ServerCall, CommonService) {
        $scope.gender = 'male';
        $scope.phoneNumList = [1];
        $scope.addList = [1];
        $scope.phoneType = {};
        $scope.phoneNumber = {};
        $scope.addType = {};
        $scope.addline1 = {};
        $scope.addline2 = {};
        $scope.addCity = {};
        $scope.addState = {};
        $scope.addCountry = {};
        $scope.addPostalCode = {};
        
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
        $rootScope.$on('teachersList', function() {
            $scope.fnEmployeeList();
        });
        $scope.addPhoneNumbers = function() {
            var count = $scope.phoneNumList.length;
            $scope.phoneNumList.push(count + 1);
        };
        $scope.deletePhoneNumbers = function(delItem) {
            $scope.phoneNumList.splice(delItem, 1);
            var _tempList = [],
                _tempPhoneType = {},
                _tempPhoneNumber = {};
            for (var i = 0; i < $scope.phoneNumList.length; i++) {
                _tempList.push(i + 1);
                _tempPhoneType[i + 1] = $scope.phoneType[$scope.phoneNumList[i]];
                _tempPhoneNumber[i + 1] = $scope.phoneNumber[$scope.phoneNumList[i]];
            }
            $scope.phoneNumList = _tempList;
            $scope.phoneType = _tempPhoneType;
            $scope.phoneNumber = _tempPhoneNumber;
        };
        $scope.addAddress = function() {
            var count = $scope.addList.length;
            $scope.addList.push(count + 1);
        };
        $scope.deleteAddress = function(delItem) {
            $scope.addList.splice(delItem, 1);
            var _tempList = [],
                _tempAddType = {},
                _tempAdd1 = {},
                _tempAdd2 = {},
                _tempCity = {},
                _tempState = {},
                _tempCountry = {},
                _tempPostal = {};

            for (var i = 0; i < $scope.addList.length; i++) {
                _tempList.push(i + 1);
                _tempAddType[i + 1] = $scope.addType[$scope.addList[i]];
                _tempAdd1[i + 1] = $scope.addline1[$scope.addList[i]];
                _tempAdd2[i + 1] = $scope.addline2[$scope.addList[i]];
                _tempCity[i + 1] = $scope.addCity[$scope.addList[i]];
                _tempCountry[i + 1] = $scope.addCountry[$scope.addList[i]];
                _tempPostal[i + 1] = $scope.addPostalCode[$scope.addList[i]];
                _tempState[i + 1] = $scope.addState[$scope.addList[i]];
            }
            $scope.addList = _tempList;
            $scope.addType = _tempAddType;
            $scope.addline1 = _tempAdd1;
            $scope.addline2 = _tempAdd2;
            $scope.addCity = _tempCity;
            $scope.addState = _tempState;
            $scope.addCountry = _tempCountry;
            $scope.addPostalCode = _tempPostal;
        };


        $scope.fnRegisterEmployee = function() {

            if ($('#teacherRegistrationForm').valid()) {
                var phoneNumersArr = [],
                    addArr = [];
                for (var i = 1; i <= $scope.phoneNumList.length; i++) {
                    var _tempObj = {
                        "PhoneTypeID": $scope.phoneType[i],
                        "PhoneNumber": $scope.phoneNumber[i],
                        "PhoneExt": null
                    }
                    phoneNumersArr.push(_tempObj);
                }
                for (var i = 1; i <= $scope.addList.length; i++) {
                    var _tempObj = {
                        "AddressTypeID": $scope.addType[i],
                        "Address1": $scope.addline1[i],
                        "Address2": $scope.addline2[i],
                        "City": $scope.addCity[i],
                        "State": $scope.addState[i],
                        "CountryID": $scope.addCountry[i],
                        "PostalCode": $scope.addPostalCode[i]
                    }
                    addArr.push(_tempObj);

                }
            }



        };

        var empListSuccess = function(res) {
            $scope.empList = res;
        }
        var empListError = function(res) {
            debugger;
        }
        $scope.fnEmployeeList = function(selClassId) {

            ServerCall.getData('teacher/teacherObject', 'GET', '', empListSuccess, empListError);

        }
        $scope.fnRegisterEmployee = function() {
            var _oTheme = {
                "BoxedLayout": false,
                "FixedHeader": false,
                "FixedSidebar": false,
                "ClosedSideBar": false,
                "HeaderColour": null,
                "SideBarColour": null,
            }
            var _aAddress = [{
                "AddressTypeID": 0,
                "Address1": null,
                "Address2": null,
                "City": null,
                "State": null,
                "CountryID": 0,
                "PostalCode": null
            }]
            var _aPhone = [{
                "PhoneTypeID": 0,
                "PhoneNumber": null,
                "PhoneExt": null
            }];
            var _aSecurityQues = [{
                "SecurityAnswer": null,
                "SecurityQuestionID": null
            }]

            var dataObj = {
                "Theme": _oTheme,
                "Email": null,
                "Password": null,
                "FirstName": null,
                "LastName": null,
                "Gender": false,
                "DateOfBirth": null,
                "Image": null,
                "Address": _aAddress,
                "Phone": _aPhone ,
                "Security": _aSecurityQues
            }
        }

        $timeout(function() {
            $('#teacherRegistrationForm').validate({
                rules: {
                    'firstName': 'required',
                    'lastName': 'required',

                    'Email': {

                        'required': true,
                        'email': true

                    },
                    'Password': 'required',
                    'cpwd': 'required',
                    'date': 'required',
                    'question': 'required',
                    'Answer': 'required',
                    'question1': 'required',
                    'Answer1': 'required',
                    'question2': 'required',
                    'Answer2': 'required',

                },
                messages: {
                    'firstName': 'Please Enter First Name',
                    'lastName': 'Please Enter First Name',
                    'Email': {
                        'required': "Please Enter Email",
                        'email': 'Please Enter User Email'
                    },


                    'password': 'Please Enter Password',
                    'cpwd': 'Please Enter Confirm Password',
                    'date': 'Please Enter Date',
                    'question': 'Select Question',
                    'Answer': 'Please Enter Answer',
                    'question1': 'Select Question',
                    'Answer': 'Please Enter Answer',
                    'question2': 'Select Question',
                    'Answer': 'Please Enter Answer'
                }
            });
        }, 1000);
    });


// 9666676908... narendra

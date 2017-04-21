'use strict';

angular.module('schoolApp')
    .controller('TeacherCtrl', function($scope, $rootScope, $timeout, ServerCall, CommonService) {
        $scope.gender = 'male';
        $scope.phoneNumList = [1];
        $scope.addList = [1];
        $scope.phoneType = {};
        $scope.phoneNumber = {};
        $scope.extention = {};
        $scope.addType = {};
        $scope.addline1 = {};
        $scope.addline2 = {};
        $scope.addCity = {};
        $scope.addState = {};
        $scope.addCountry = {};
        $scope.addPostalCode = {};
        $scope.isShowError=false;
        $scope.constants = sessionStorage.getItem('constantsData');
        if ($scope.constants == null) {
            var constantSuccCB = function(data) {
                $scope.constants = data;
            }
            var ConstantErrCB = function(data) {
                $scope.constants = data;
            }
            $scope.constants = CommonService.getConstantData(constantSuccCB, ConstantErrCB);
        } else {
            $scope.constants = JSON.parse($scope.constants);
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
                _tempPhoneNumber = {},
                _tempExtention = {};
            for (var i = 0; i < $scope.phoneNumList.length; i++) {
                _tempList.push(i + 1);
                _tempPhoneType[i + 1] = $scope.phoneType[$scope.phoneNumList[i]];
                _tempPhoneNumber[i + 1] = $scope.phoneNumber[$scope.phoneNumList[i]];
                _tempExtention[i + 1] = $scope.extention[$scope.phoneNumList[i]];
            }
            $scope.phoneNumList = _tempList;
            $scope.phoneType = _tempPhoneType;
            $scope.phoneNumber = _tempPhoneNumber;
            $scope.extention = _tempExtention;
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
        $scope.chagePhoneType = function(type, model) {
            debugger;
            var _aTemp=[];
            angular.forEach($scope.phoneType, function(v, k) {
                if(v==type){
                    _aTemp.push(type);
                }
            });
            if(_aTemp.length !=1){
                $scope.phoneType[model]='';
                $scope.errorMsg="Phone number type already selected";
                $scope.isShowError=true;
            }
        }
        $scope.chageAddType=function(type,model){
            var _aTemp=[];
            angular.forEach($scope.addType, function(v, k) {
                if(v==type){
                    _aTemp.push(type);
                }
            });
            if(_aTemp.length !=1){
                $scope.addType[model]='';
                $scope.errorMsg="Address type already selected";
                $scope.isShowError=true;
            }
        }
        
        $scope.changeQue = function(que,model) {
            var _temp=0;
            for(var i=1;i<=3;i++){
                if($scope['que'+i]==que){
                    _temp=_temp+1;
                }
            }
            if(_temp!=1){
               $scope[model]=''; 
               $scope.errorMsg="You selected duplicate question";
               $scope.isShowError=true;
            }

            
        }

        var empListSuccess = function(res) {
            $scope.empList = res;
        }
        var empListError = function(res) {
            debugger;
        }
        $scope.fnEmployeeList = function(selClassId) {

            ServerCall.getData('teacher/teacherObject', 'GET', '', empListSuccess, empListError);

        }
        var empRegSuccess = function(res) {
            debugger;
        };
        var empRegError = function(res) {
            debugger;
        };
        $scope.fnRegisterEmployee = function() {
            if ($('#teacherRegistrationForm').valid()) {
                var _aPhone = [],
                    _aAddress = [];
                for (var i = 1; i <= $scope.phoneNumList.length; i++) {
                    var _tempObj = {
                        "PhoneTypeID": $scope.phoneType[i],
                        "PhoneNumber": $scope.phoneNumber[i],
                        "PhoneExt": $scope.extention[i]
                    }
                    _aPhone.push(_tempObj);
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
                    _aAddress.push(_tempObj);
                }

                var _oTheme = {
                    "BoxedLayout": false,
                    "FixedHeader": false,
                    "FixedSidebar": false,
                    "ClosedSideBar": false,
                    "HeaderColour": null,
                    "SideBarColour": null,
                }

                var _aSecurityQues = [{
                    "SecurityAnswer": $scope.ans1,
                    "SecurityQuestionID": $scope.que1
                }, {
                    "SecurityAnswer": $scope.ans2,
                    "SecurityQuestionID": $scope.que2
                }, {
                    "SecurityAnswer": $scope.ans3,
                    "SecurityQuestionID": $scope.que3
                }]




                var dataObj = {
                    "Theme": _oTheme,
                    "Email": $scope.emailId,
                    "Password": $scope.pwd,
                    "FirstName": $scope.firstName,
                    "LastName": $scope.lastName,
                    "Gender": $scope.gender,
                    "DateOfBirth": $scope.dob,
                    "Image": null,
                    "Address": _aAddress,
                    "Phone": _aPhone,
                    "Security": _aSecurityQues
                }

                ServerCall.getData('registration/teacher', 'POST', dataObj, empRegSuccess, empRegError);
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

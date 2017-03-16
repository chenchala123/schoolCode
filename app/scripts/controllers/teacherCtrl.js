'use strict';

angular.module('schoolApp')
    .controller('TeacherCtrl', function($scope) {
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
                _tempAddType, _tempAdd1, _tempAdd2, _tempCity, _tempState, _tempCountry, _tempPostal;

            for (var i = 1; i <= $scope.addList.length; i++) {
                _tempList.push(i);
                _tempAddType[i + 1] = $scope.addType[$scope.addList[i]];
                _tempAdd1[i + 1] = $scope.addline1[$scope.addList[i]];
                _tempAdd2[i + 1] = $scope.addline2[$scope.addList[i]];
                _tempCity[i + 1] = $scope.addCity[$scope.addList[i]];
                _tempState[i + 1] = $scope.state[$scope.addList[i]];
                _tempCountry[i + 1] = $scope.addCountry[$scope.addList[i]];
                _tempPostal[i + 1] = $scope.addPostalCode[$scope.addList[i]];
            }
            $scope.addList = _tempList;
            $scope.addType=_tempAddType;
            $scope.addline1=_tempAdd1;
            $scope.addline2=_tempAdd2;
            $scope.addCity=_tempCity;
            $scope.addState=_tempState;
            $scope.addCountry=_tempCountry;
            $scope.addPostalCode=_tempPostal;
        };
        $scope.fnRegisterEmployee = function() {
            var phoneNumersArr = [];
            for (var i = 1; i <= $scope.phoneNumList.length; i++) {
                var _tempObj = {
                    "PhoneTypeID": $scope.phoneType[i],
                    "PhoneNumber": $scope.phoneNumber[i],
                    "PhoneExt": null
                }
                phoneNumersArr.push(_tempObj);
            }

        };
    });


// 9666676908... narendra

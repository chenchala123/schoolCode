'use strict';
angular.module('schoolApp')
    .service('CommonService', function($http, ServerCall) {
        var _self = this;
        _self.getClassList = function() {
            var classList = sessionStorage.getItem('classList');

            if (classList == null) {
                ServerCall.getData('lookup/class', 'GET', '', function(data) {
                    debugger;
                    sessionStorage.setItem('classList', JSON.stringify(redatas.classList));

                    classList = data.classList
                    return classList;
                }, function(data) {
                    debugger;
                });
            } else {
                classList = JSON.parse(sessionStorage.getItem('classList'));
            }
            return classList;
        }
        _self.getConstantData = function(succCB,errCB) {
                var reqObj = {
                    'url': 'scripts/json/constants.json',
                    'method': 'get',
                };

                $http(reqObj).then(function(res) {
                    if(res.data){
                    sessionStorage.setItem('constantsData', JSON.stringify(res.data));
                    }
                    succCB(res.data);
                }, function(res) {
                    errCB({})
                });
        };
        return _self;
    });

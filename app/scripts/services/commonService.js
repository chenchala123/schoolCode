'use strict';
angular.module('schoolApp')
    .service('CommonService', function($http,ServerCall) {
        var _self = this;
        _self.getClassList = function() {
            var classList = JSON.parse(sessionStorage.getItem('classList'));
            if (classList == null) {
                ServerCall.getData('lookup/class', 'GET', '', function(data) {
                    debugger;
                    sessionStorage.setItem('classList', JSON.stringify(redatas.classList));
                    classList=data.classList
                    return classList;
                }, function(data) {
                    debugger;
                });
            }
            return classList;
        }
        return _self;
    });

'use strict';
angular.module('schoolApp')
    .service('CommonService', function($http,ServerCall) {
        var _self = this;
        _self.getClassList = function() {
            var classList=sessionStorage.getItem('classList');
            
            if (classList == null) {
                ServerCall.getData('lookup/class', 'GET', '', function(data) {
                    debugger;
                    sessionStorage.setItem('classList', JSON.stringify(redatas.classList));
                    classList=data.classList
                    return classList;
                }, function(data) {
                    debugger;
                });
            }else{
                 classList = JSON.parse(sessionStorage.getItem('classList'));
            }
            return classList;
        }
        return _self;
    });

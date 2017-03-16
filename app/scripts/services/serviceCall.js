'use strict';
angular.module('schoolApp')
    .service('fileUpload', ['$http', function($http) {
        this.uploadData = function(uploadUrl, data, sucessCB, errorCB) {
            $('#spinner').css("display", "block");
            $('#bigDiv').css('display', 'block');
            $http.post(uploadUrl, data, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined, 'Process-Data': false }
                })
                .then(function(data) {
                    sucessCB(data);
                    _self.hideLoader();
                }, function(data) {
                    errorCB(data);
                    _self.hideLoader();
                });
        };
    }])
    .service('ServerCall', function($http) {
        var _self = this;
        _self.globalURL = "http://www.schooldiaryonline.com/api/";
        _self.getData = function(path, method, data, sucessCB, errorCB) {
            $('#spinner').css("display", "block");
            $('#bigDiv').css('display', 'block');

            var reqObj = {
                'url': _self.globalURL + path,
                'method': method,
                'data': data,
                "headers": {
                   "Content-Type":"application/json; charset=utf8"
                }
            };

            $http(reqObj).then(function(data) {
                sucessCB(data);
                _self.hideLoader();
            }, function(data) {
                errorCB(data);
                _self.hideLoader();
            });
        };
        _self.hideLoader = function() {
            $('#spinner').css("display", "none");
            $('#bigDiv').css('display', 'none');
        };
        return _self;
    });

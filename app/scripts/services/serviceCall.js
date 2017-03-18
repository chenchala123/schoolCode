'use strict';
angular.module('schoolApp')
    .service('fileUpload', ['$http', function($http) {
         this.token=localStorage.getItem('token');
        this.uploadData = function(uploadUrl, data, sucessCB, errorCB) {
            $('#spinner').css("display", "block");
            $('#bigDiv').css('display', 'block');
            var token=localStorage.getItem('token');
            $http.post(uploadUrl, data, {
                    transformRequest: angular.identity,
                    headers: {'Authorization':_self.token, 'Content-Type': undefined, 'Process-Data': false }
                })
                .then(function(res) {
                    sucessCB(res);
                    _self.hideLoader();
                }, function(res) {
                    errorCB(res);
                    _self.hideLoader();
                });
        };
    }])
    .service('ServerCall', function($http) {
        var _self = this;
        _self.globalURL = "http://www.schooldiaryonline.com/api/";
        _self.token=sessionStorage.getItem('token');
        _self.getData = function(path, method, data, sucessCB, errorCB) {
            $('#spinner').css("display", "block");
            $('#bigDiv').css('display', 'block');

            var reqObj = {
                'url': _self.globalURL + path,
                'method': method,
                'data': data,
                "headers": {
                   'Authorization':_self.token,
                   "Content-Type":"application/json; charset=utf8"
                }
            };

            $http(reqObj).then(function(res) {
                sucessCB(res.data);
                _self.hideLoader();
            }, function(res) {
                errorCB(res.data);
                _self.hideLoader();
            });
        };
        _self.hideLoader = function() {
            $('#spinner').css("display", "none");
            $('#bigDiv').css('display', 'none');
        };
        return _self;
    });

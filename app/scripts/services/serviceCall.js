'use strict';
angular.module('schoolApp')
.service('ServerCall',function($http){
var _self=this;
_self.globalURL="www.schooldiaryonline.com/api/";
_self.getData=function(path,method,data,sucessCB, errorCB){
    $('#spinner').css("display","block");
    $('#bigDiv').css('display','block');

var reqObj={
	'url':_self.globalURL+path,
	'method':method,
	'data':data,
         "headers":
            {
               "Content-Type": "application/x-www-form-urlencoded"
            }
};
$http(reqObj)
.success(function(data, status, headers, config) {
	sucessCB(data);
_self.hideLoader();
    	})
.error(function(data, status, headers, config) {
	errorCB(data);
_self.hideLoader();
});
};
_self.hideLoader=function(){
     $('#spinner').css("display","none");
    $('#bigDiv').css('display','none');
};
return _self;
});
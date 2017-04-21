'use strict';

angular.module('schoolApp')
    .controller('PaymentCtrl', function($scope, $rootScope, $timeout, ServerCall, CommonService) {
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
        $scope.fnPayment = function() {
            if ($('#paymentForm').valid()) {
              
            }
        }

        $timeout(function() {
            $('#paymentForm').validate({
                rules: {
                    'slectclass': 'required',
                    'selstudent': 'required',
                    'amount': 'required',
                    'paymenttype': 'required',
                    'date': 'required',


                },
                messages: {
                    'slectclass': 'Please Select Class',
                    'selstudent': 'Please Select Student',
                    'amount': 'please Enter Amount',
                    'paymenttype': 'please select Payment type',
                    'date': 'please Enter Date',


                }
            });
        }, 1000);

    });

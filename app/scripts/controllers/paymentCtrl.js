'use strict';

angular.module('schoolApp')
    .controller('PaymentCtrl', function($scope, $rootScope, $timeout, ServerCall, CommonService) {

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

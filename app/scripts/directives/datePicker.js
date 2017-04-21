'use strict';
angular.module('schoolApp')
        .directive('featureDate', function () {
            return{
                restrict: 'E',
                scope: {
                    fdate: '='
                },
                template: '<div id="featureDate" class="input-append date"><input type="text" name="fdate" id="fdate" class="form-control txt-width" ng-model="fdate" placeholder="Select Date"><span class="add-on"><i class="icon-th"></i></span></div>',
                link: function (scope, element, att, ctrl) {
                    element.find('#featureDate').datepicker({
                        format: 'dd-mm-yyyy',
                        autoclose: true,
                        todayBtn: "linked",
                        startDate: new Date(),
                        orientation: 'auto top'
                    })
                }
            }

        })
        .directive('pastDate', function () {
            return{
                restrict: 'E',
                scope: {
                    pastDate: '='
                },
                template: '<div id="pastDate" class="input-append date"><input type="text" id="pastDate" name="pastDate" ng-model="pastDate" class="form-control txt-width" placeholder="select Date"><span class="add-on"><i class="icon-th"></i></span></div>',
                link: function (scope, element, att, ctrl) {
                    element.find('#pastDate').datepicker({
                        format: 'dd-mm-yyyy',
                        autoclose: true,
                        todayBtn: "linked",
                        endDate: new Date(),
                        orientation: 'auto top'

                    });

                }
            }
        })
        .directive('curDate', function () {
            return{
                restrict: 'E',
                scope: {
                    selDate: '='
                },
                template: '<div id="pastDate" class="input-append date"><input type="text" id="date" name="pastDate" ng-model="selDate" class="form-control txt-width" placeholder="select Date"><span class="add-on"><i class="icon-th"></i></span></div>',
                link: function (scope, element, att, ctrl) {
                    element.find('#date').datepicker({
                        format: 'dd-mm-yyyy',
                        autoclose: true,
                        todayBtn: "linked",
                        orientation: 'auto bottom'
                    });
                }
            };

        })
         .directive('fileModel', ['$parse', function ($parse) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        var model = $parse(attrs.fileModel);
                        var modelSetter = model.assign;

                        element.bind('change', function () {
                            scope.$apply(function () {
                                modelSetter(scope, element[0].files[0]);
                            });
                        });
                    }
                };
            }])
      
'use strict';

angular.module('schoolApp')
    .controller('EventCtrl', function($scope, $rootScope, CommonService, ServerCall) {
        $scope.classList = CommonService.getClassList();

        $scope.eventSources = [];
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay',
                    // left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        /* event source that contains custom events on the scope */
        $scope.events = [
            { title: 'All Day Event', start: new Date(y, m, 1) },
            { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
            { title: 'Repeating Event', start: new Date(y, m, d - 3), end: new Date(y, m, d - 2) },
            { title: 'Repeating Event', start: new Date(y, m, d + 4), end: new Date(y, m, d - 2) },
            { title: 'Birthday Party', start: new Date(y, m, d + 1), end: new Date(y, m, d + 1), }
        ];

        $scope.eventSources = [$scope.events];
        var addEventSuccess = function(res) {
            $scope.empList = res;
        }
        var addEventError = function(res) {
            debugger;
        }
        $scope.addEvent = function() {
            var dataObj = {
                "EventID": 0,
                "EventName": $scope.eventName, 
                "Date": new Date($scope.eventdate),
                "Description": $scope.description, 
                "EventTypeID": $scope.eventType,
                "ClassID": $scope.selClass, 
                "Class": null
            }
            ServerCall.getData('event', 'POST', dataObj, addEventSuccess, addEventError);
        };
        $rootScope.$on('eventsDiary', function() {
            $scope.fnGetEventsDairy();
        })
        var eventsDairySuccess = function(res) {
            $scope.empList = res;
        }
        var eventsDairyError = function(res) {
            debugger;
        }
        $scope.fnGetEventsDairy = function() {
            ServerCall.getData('', 'GET', '', eventsDairySuccess, eventsDairyError);
        }

        var eventsListSuccess = function(res) {
            $scope.empList = res;
        }
        var eventsListError = function(res) {
            debugger;
        }
        $scope.getEvents=function(){
            ServerCall.getData('event/events/'+$scope.month+'/'+$scope.year+'/'+$scope.classId, 'GET', '', eventsListSuccess, eventsListError);
        }

    });

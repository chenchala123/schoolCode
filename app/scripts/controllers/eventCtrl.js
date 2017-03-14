'use strict';

angular.module('schoolApp')
    .controller('EventCtrl', function($scope) {
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
            { title: 'Repeating Event', start: new Date(y, m, d - 3),  end: new Date(y, m, d - 2) },
            { title: 'Repeating Event', start: new Date(y, m, d + 4),  end: new Date(y, m, d - 2) },
            { title: 'Birthday Party', start: new Date(y, m, d + 1), end: new Date(y, m, d + 1),  }
        ];
        
         $scope.eventSources = [$scope.events];
    });

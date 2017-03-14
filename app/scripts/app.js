'use strict';

angular
  .module('schoolApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.calendar'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin/class', {
        templateUrl: 'views/admin/class/class.html',
        controller: 'ClassCtrl',
      })
      .when('/admin/dairy', {
        templateUrl: 'views/admin/dairy/dairy.html',
        controller: 'DairyCtrl',
      })
      .when('/admin/event/list', {
        templateUrl: 'views/admin/event/eventsList.html',
        controller: 'EventCtrl',
      })
      .when('/admin/event/new', {
        templateUrl: 'views/admin/event/newEvent.html',
        controller: 'EventCtrl',
      })
      .when('/admin/library', {
        templateUrl: 'views/admin/library/library.html',
        controller: 'LibraryCtrl',
      })
      .when('/admin/payment', {
        templateUrl: 'views/admin/payment/payment.html',
        controller: 'PaymentCtrl',
      })
      .when('/admin/student/list', {
        templateUrl: 'views/admin/student/studentsList.html',
        controller: 'StudentCtrl',
      })
      .when('/admin/student/new', {
        templateUrl: 'views/admin/student/newStudent.html',
        controller: 'StudentCtrl',
      })
      .when('/admin/teacher/list', {
        templateUrl: 'views/admin/teacher/teachersList.html',
        controller: 'TeacherCtrl',
      })
      .when('/admin/teacher/new', {
        templateUrl: 'views/admin/teacher/newTeacher.html',
        controller: 'TeacherCtrl',
      })
      .when('/admin/resetPassword', {
        templateUrl: 'views/admin/resetpwd.html',
        controller: 'MainCtrl',
      })
      .when('/admin/dashboard', {
        templateUrl: 'views/admin/adminDashBoard.html',
        controller: 'MainCtrl',
      })
      .otherwise({
        redirectTo: '/admin/dashboard'
      });
  });

'use strict';

angular.module('schoolApp')
    .controller('MainCtrl', function($scope,$modal, $rootScope, $location, $timeout) {
        $scope.isAdminLoggedIn = false;
        if (sessionStorage.getItem('token') != null) {
            $scope.isAdminLoggedIn = true;
        }

        $rootScope.$on('loggedIn', function() {
            $location.path('/admin/dashboard');
            $scope.isAdminLoggedIn = true;
        });


        $scope.clickMainTab = function(tabName) {
            $('.top-li').removeClass('sel-topmenu-bg');
            $('.inner-ul li').removeClass('sel-submenu-bg');
            $('.inner-ul').removeClass('in');
            $('#' + tabName).addClass('sel-topmenu-bg');

            $scope.fnRouteChange(tabName);
        }
        $scope.clickSubTab = function(subTab) {
            $('.inner-ul li').removeClass('sel-submenu-bg');
            $('#' + subTab).addClass('sel-submenu-bg');
            $scope.fnRouteChange(subTab);
        }
        $scope.fnRouteChange = function(tabName) {
            switch (tabName) {
                case 'dashboard':
                    $location.path('/admin/dashboard');
                    break;
                case 'stdSubMenu1':
                    $location.path('/admin/student/new');

                    break;
                case 'stdSubMenu2':
                    $location.path('/admin/student/list');
                    break;
                case 'teaSubMenu1':
                    $location.path('/admin/teacher/new');
                    break;
                case 'teaSubMenu2':
                    $location.path('/admin/teacher/list');
                    $rootScope.$broadcast('teachersList');
                    break;
                case 'eveSubMenu1':
                    $location.path('/admin/event/new');
                    break;
                case 'eveSubMenu2':
                    $location.path('/admin/event/diary');
                    $rootScope.$broadcast('eventsDiary');
                    break;
                case 'eveSubMenu3':
                    $location.path('/admin/event/list');
                    break;
                case 'class':
                    $location.path('/admin/class');
                    break;
                case 'dairy':
                    $location.path('/admin/dairy');
                    break;
                case 'library':
                    $location.path('/admin/library');
                    break;
                case 'payment':
                    $location.path('/admin/payment');
                    break;
                case 'reset':
                    $location.path('/admin/resetPassword');
                    break;


            }
        }
        $scope.fnRefresh = function() {
            var url = $location.$$path;
            switch (url) {
                case '/admin/dashboard':
                    $scope.clickMainTab('dashboard');
                    break;
                case '/admin/student/new':
                    $scope.clickMainTab('student');
                    $scope.clickSubTab('stdSubMenu1');
                    $timeout(function() {
                        $('#studentMenu').addClass('in');
                    }, 100);
                    break;
                case '/admin/student/list':
                    $scope.clickMainTab('student');
                    $scope.clickSubTab('stdSubMenu2');
                    $timeout(function() {
                        $('#studentMenu').addClass('in');
                    }, 100);
                    break;
                case '/admin/teacher/new':
                    $scope.clickMainTab('teacher');
                    $scope.clickSubTab('teaSubMenu1');
                    $timeout(function() {
                        $('#teacherMenu').addClass('in');
                    }, 100);
                    break;
                case '/admin/teacher/list':
                    $scope.clickMainTab('teacher');
                    $scope.clickSubTab('teaSubMenu2');
                    $timeout(function() {
                        $('#teacherMenu').addClass('in');
                    }, 100);
                    break;
                case '/admin/event/new':
                    $scope.clickMainTab('events');
                    $scope.clickSubTab('eveSubMenu1');
                    $timeout(function() {
                        $('#eventsMenu').addClass('in');
                    }, 100);
                    break;
                case '/admin/event/list':
                    $scope.clickMainTab('events');
                    $scope.clickSubTab('eveSubMenu2');
                    $timeout(function() {
                        $('#eventsMenu').addClass('in');
                    }, 100);
                    break;
                case '/admin/class':
                    $scope.clickMainTab('class');
                    break;
                case '/admin/dairy':
                    $scope.clickMainTab('dairy');
                    break;
                case '/admin/library':
                    $scope.clickMainTab('library');
                    break;
                case '/admin/payment':
                    $scope.clickMainTab('payment');
                    break;
                case '/admin/resetPassword':
                    $scope.clickMainTab('reset');
                    break;

            }
        }
        $scope.fnLogout=function() {
            $modal.open({
                templateUrl: 'views/confirmationModal.html',
                controller: function($scope, $modalInstance, $location, $rootScope, ServerCall) {
                    $scope.close = function() {
                        $modalInstance.close();
                    }
                    var sucCB = function(res) {
                        debugger;
                        $locaton.path('/');
                        sessionStorage.removeItem('token');
                    }
                    var errCB = function(res) {
                        
                    }
                    $scope.yes = function() {
                        ServerCall.getData('authentication/logout', 'get', '', sucCB, errCB)
                    }
                },
                size: 'sm',
                backdrop: 'static',
                keyboard: 'false'
            })
        }
        $timeout(function() {
            $scope.fnRefresh();
        }, 1000);

    });

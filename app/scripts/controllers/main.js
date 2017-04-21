'use strict';

angular.module('schoolApp')
    .controller('MainCtrl', function($scope,$modal, $rootScope, $location, $timeout,CommonService) {
        $scope.isAdminLoggedIn = false;
        $scope.boxlayout=false;
        $scope.fixheader=false;
        $scope.fixsidebar=false;
        $scope.closesidebar=false;
        $scope.count= 10;
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

        if (sessionStorage.getItem('token') != null) {
            $scope.isAdminLoggedIn = true;
           $rootScope.colors = $scope.constants.Colour;
           $scope.roles = $scope.constants.Roles;
           sessionStorage.getItem('uname');
           console.log(sessionStorage.getItem('uname'));
           sessionStorage.getItem('profilepic');
           $scope.userName = sessionStorage.getItem('uname');
            if(sessionStorage.getItem('profilepic') != null){
              $scope.profileimg = sessionStorage.getItem('profilepic');
            }else{
              $scope.profileimg = "images/admin.jpg";
            }
        }

        $rootScope.$on('loggedIn', function(eve,data) {
            debugger;
            if(data==true){
                $location.path('/admin/dashboard');
                $scope.isAdminLoggedIn = true;
                $rootScope.colors = $scope.constants.Colour;

            }else{
                $scope.isAdminLoggedIn = false;
                 $location.path('/login');
            }
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

    //FULL SCREEN SECTION
        $scope.fnFullscreen = function(){
        var _el = document.body;
        var request = _el.requestFullScreen || _el.webkitRequestFullScreen || _el.mozRequestFullScreen || _el.msRequestFullScreen;
        console.log(request);
          if(request){
            request.call(_el);
          }
          else if(typeof window.ActiveXObject !== "undefined"){
            var oldwindows = new ActiveXObject("WScript.Shell");
            if(oldwindows !== null){
              oldwindows.SendKeys("{F11}");
            }
          }
        }

      //SWitching THEME colors
        $rootScope.themeSwitch = function(theme,item){
          switch(item){
            case 0: $scope.themestyleheader = {"background" : "linear-gradient(154deg, #008fe2 0, #00b29c 100%)",};
                    break;
            case 1: $scope.themestyleheader = {"background" : theme.Colour,};
                    break;
            case 2: $rootScope.themestylesidebar = {"background" : theme.Colour,};
                    break;
            case 3: $rootScope.themestylesidebar = {"background" : "linear-gradient(154deg, #008fe2 0, #00b29c 100%)",};
                    break;
          }
        }

        //Switching Theme Header, Side bar Sizes
        $rootScope.themebuttons = function(item){
          $scope.boxlayout = !$scope.boxlayout;
          $scope.fixheader = !$scope.fixheader;
          $scope.fixsidebar = !$scope.fixsidebar;
          $scope.closesidebar = !$scope.closesidebar;
          switch(item){
            case 0: if($scope.boxlayout){
                      $rootScope.boxedlayout= 'bx-80';
                      $rootScope.boxedlayout1='bx-81';
                    }else{
                      $rootScope.boxedlayout = '';
                      $rootScope.boxedlayout1='';
                    }
                    break;
            case 1: if($scope.fixheader){
                        $rootScope.fixedhead2= 'fx-hd';
                        $rootScope.fixedhead= {"overflow-y":"scroll","height":"500px"};
                    }else{
                      $rootScope.fixedhead2= '';
                      $rootScope.fixedhead= {"overflow-y":"scroll","height":"auto"};
                    }
                    break;
            case 2: if($scope.fixsidebar){
                      $rootScope.sidefixed = 'fx-sd';
                      $rootScope.sidefixed2 = 'fx-sd2';
                    }else{
                      $rootScope.sidefixed = '';
                      $rootScope.sidefixed2 = '';
                    }
                    break;
            case 3: if($scope.closesidebar){
                            $rootScope.closesidebar = true;
                    }else{
                      $rootScope.closesidebar = false;
                    }
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
                        sessionStorage.clear();
                        $scope.close();
                        $rootScope.$broadcast('loggedIn',false);
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

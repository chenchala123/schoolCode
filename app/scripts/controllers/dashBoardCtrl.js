'use strict';

angular.module('schoolApp')
    .controller('DashBoardCtrl', function($scope,ServerCall,CommonService,$rootScope) {
        $scope.constants=sessionStorage.getItem('constantsData');
        if( $scope.constants===null){
            var constantSuccCB=function(data){
                $scope.constants=data;
            };
            var ConstantErrCB=function(data){
                $scope.constants=data;
            };
             $scope.constants=CommonService.getConstantData(constantSuccCB,ConstantErrCB);
            }else{
                $scope.constants=JSON.parse($scope.constants);
            }


        var classListSuccess = function(res) {
            sessionStorage.setItem('classList', JSON.stringify(res));
        };
        var classListError = function(res) {
        };
        $scope.fnGetClassList = function() {
            ServerCall.getData('lookup/class', 'GET', '', classListSuccess, classListError);
        };
        $scope.fnGetClassList();

        $rootScope.userName = sessionStorage.getItem('uname');
        if(sessionStorage.getItem('profilepic') != null){
          $rootScope.profileimg = sessionStorage.getItem('profilepic');
        }else{
          $rootScope.profileimg = "images/admin.jpg";
        }

// CHARTS Related

        $scope.todoedit = false;
        $scope.per_teacher = 65;
        $scope.per_student = 45;
        $scope.per_event = 76;
        $scope.options = {
            animate:{
                duration:1500,
                enabled:true
            },
            barColor:'#000F48',
            scaleColor:false,
            lineWidth:5,
            lineCap:'circle',
        };

// TODO section
        $scope.editmode = false;
        $scope.togglenew = false;
        $scope.titlevalid = true;
        $scope.nhead = "TODO";
        $scope.nameedit = false;

    // Adding TODO items
        $scope.todopop = function(n){
          if($scope.togglenew==false){
            $scope.togglenew = true;
          }
          else{
          //  if($scope.editmode == false){
              $scope.todos.push({title:$scope.newtitle,description:$scope.newdesc,duedate:$scope.newdate});
          //  }

            $scope.togglenew = false;
          }
        }

    //Editing TODO items
        $scope.edittodo = function(data,condition)
        {
          console.log(data);
          $scope.togglenew = true;
          $scope.editmode = condition;
          $scope.newtitle = data.title;
          $scope.newdesc = data.description;
          $scope.newdate = data.duedate;
        }

    // Cancel TODO edit
        $scope.editcanceltodo=function(){
          $scope.newtitle = '';
          $scope.newdesc = '';
          $scope.newdate = '';
          $scope.togglenew = false;
        }

        $scope.closepop= function(){
          $scope.togglenew = false;
        }
        $scope.togglecolor= function(bgcolor){
          $scope.tcolor = bgcolor;
        }


       $scope.nameclick = function(){
        $scope.nameedit = true;
      }
      $scope.namechange = function(){
        $scope.nhead = $scope.nhead;
        $scope.nameedit = false;
      }
      $scope.namecancel = function(){
        $scope.nameedit = false;
      }
      $scope.todos = [{title:'Floor cool cinders',description:'Thunder fulfilled travellers folly, wading, lake.',duedate:'04-09-2017'}];


//Notes Section

        $scope.noteslist= [
          {"ID":1,"MESSAGE":"Send e-mails."},
          {"ID":2,"MESSAGE":"Sometimes on purpose"},
          {"ID":3,"MESSAGE":"It is a long established"},
          {"ID":4,"MESSAGE":"Contrary to popular belief."},
          {"ID":5,"MESSAGE":"Bootstrap4 admire admin"},
          {"ID":6,"MESSAGE":"Company status"},
          {"ID":7,"MESSAGE":"Sometime is special"},
          {"ID":8,"MESSAGE":"Meeting with CEO"},
          {"ID":9,"MESSAGE":"Team out"},
          {"ID":10,"MESSAGE":"welcome to admire"},
        ]
    });

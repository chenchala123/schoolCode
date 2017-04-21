'use strict';

angular.module('schoolApp')
  .controller('LibraryCtrl', function ($scope,$rootScope,CommonService,ServerCall,fileUpload) {
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
      $scope.classlist = CommonService.getClassList();
      $scope.ClassID = 5; //selectClass.ClassID

      var getDocumentSuccess = function(result){

      };

      var getDocumensError = function(error){


      };

      ServerCall.getData('document/'+$scope.ClassID, 'GET', '', getDocumentSuccess, getDocumensError);

      //Temporary data to load
      $scope.tabledata = [{"Title":"tiltle1","Subject":"Maths","Description":"Descript1"}
                          ,{"Title":"tiltle1","Subject":"Physics","Description":"Descript2"}
                          ,{"Title":"tiltle1","Subject":"Chemistry","Description":"Descript3"}];
      $scope.classChanged = function(option){
        if(option !== null){
          if(CommonService.getclassSubjects(option.ClassID) !== null){
            $scope.tabledata = CommonService.getclassSubjects(option.ClassID);
          }
        }
      };

   var validtrue = function(){
     $rootScope.title_v = false;
     $rootScope.file_v = false;
     $rootScope.subject_v = false;
   }
// Adding New Documents
      $scope.adddoc = false;
      $scope.toggledoc = function(element){
        validtrue();
        $scope.adddoc = !$scope.adddoc;
        $scope.docPopupConfig.isShow = !$scope.docPopupConfig.isShow;
      };
      $scope.popDialog = function ($element) {
                $scope.docPopupConfig.position.top = $element.pageY;
                $scope.docPopupConfig.position.left = $element.pageX;
                $scope.docPopupConfig.isShow = true;
      };
      $scope.docPopupConfig = {
          modelName: "docaddpopup",
          width: 500,
          height:380,
          resizable:false,
          templateUrl:"views/admin/library/librarydoc.html",
          hasTitleBar:true,
          isShow:false,
          draggable:true,
          title:"Add Document",
          position: { top : 100, left : 250},
          onOpen: function(){
        }
      };

      var getsubjetSuccess = function(S_S){
          $scope.subjectID = S_S.SubjectID;
      };
      var getsubjectError = function(S_E){

      };
      ServerCall.getData('/lookup/subject/'+$scope.ClassID,'GET','',getsubjetSuccess,getsubjectError);

      var addDocumentSuccess = function(result){

      };
      var addDocumensError = function(error){


      };

      var validationsfunc = function(data){
        var checkcondition = true;
                              if(data == null){
                                $rootScope.title_v = true;
                              //  $rootScope.file_v = true;
                                $rootScope.subject_v = true;
                                checkcondition = false;
                              }
                              else {
                                        if(data.title==null){
                                        $rootScope.title_v = true;
                                          checkcondition = false;
                                        };
                                        if(data.title.length>100){
                                          $rootScope.title_max = true;
                                          checkcondition = false;
                                        }
                                        if(data.file==null){
                                      //    $rootScope.file_v = true;
                                      //    checkcondition = false;
                                        };
                                        if(data.subject==null){
                                          $rootScope.subject_v = true;
                                          checkcondition = false;
                                        };
                                      };
                  return checkcondition;
      }
      // UPLOAD files

      var uploadsuccess = function(success){
          console.log(success);
      };
      var uploadfail = function(fail){
        console.log(fail);
      };
      $rootScope.upload_submit = function(filedata){
        validtrue();
       var valid_succses =  validationsfunc(filedata);
       if(valid_succses==false){return;}
        var file = document.getElementById('file_up').files[0];
        var read = new FileReader();
           read.onloadend = function(e){
              //fileUpload.uploadData('',$scope.file,uploadsuccess,uploadfail);
            };
              $scope.docPopupConfig.isShow = !$scope.docPopupConfig.isShow;
            read.readAsArrayBuffer(file);

            var docData ={
                          "classID": $scope.ClassID,
                          "DocumentDescription": $rootScope.upload.description,
                          "DocumentID": 0,
                          "DocumentName": $rootScope.upload.title,
                          "DocumentPath": null,
                          "DocumentType": null,
                          "SubjectID": $scope.subjectID,
                          "Editable": false
                        };

            ServerCall.getData('document','POST',docData,addDocumentSuccess,addDocumensError);
        };


        var editDocumentSuccess = function(){


        };
        var editDocumensError = function(){


        };
        $rootScope.editmode = false;
        $scope.editDocument   = function(result){
          validtrue();
          $rootScope.editmode = true;
          if(result.Editable===true) {return;}
          $scope.docPopupConfig.isShow = !$scope.docPopupConfig.isShow;
          $rootScope.upload.description = result.Description;
          $rootScope.upload.title = result.Title;
          $rootScope.upload.subject = result.Subject;
          var editdata ={
                        "classID": $scope.ClassID,
                        "DocumentDescription": $rootScope.upload.description,
                        "DocumentID": 0,
                        "DocumentName": $rootScope.upload.title,
                        "DocumentPath": null,
                        "DocumentType": null,
                        "SubjectID": editdata.subjectID,
                        "Editable": false
                      };
          ServerCall.getData('document/'+result.documentID,'PUT',editdata,editDocumentSuccess,editDocumensError);
        };

        var deleteDocumentSuccess = function(d_S){

        };
        var deleteDocumensError = function(d_E){

        };
        $scope.deleteDocument   = function(result){
          ServerCall.getData('document/'+result.documentID,'DELETE','',deleteDocumentSuccess,deleteDocumensError);
        };
});

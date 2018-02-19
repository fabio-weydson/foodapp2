/*global app */
'use strict';
app.controller('pagamentoCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  'dataservice',
  'appConfig',
  '$ionicLoading',
  function(
    $scope,
    $rootScope,
    $stateParams,
    dataservice,
    appConfig,
    $ionicLoading
  ){
    
    $scope.pedidoid = $stateParams;
    $scope.$on('$ionicView.enter',function(){
    
      $ionicLoading.hide();
               
  }); 


  
}]);

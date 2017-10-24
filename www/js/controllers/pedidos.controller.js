/*global app */
'use strict';
app.controller('pedidosCtrl', [
  '$scope', 
  '$ionicLoading',
  'dataservice', 
  'appConfig', 
  '$ionicModal',
function(
  $scope, 
  $ionicLoading,
  dataservice, 
  appConfig,
  $ionicModal
  ){
  dataservice.pedidos(1)
  .then(function(d){
    $scope.pedidos = d.data;
    $ionicLoading.hide();
  });

 $ionicModal.fromTemplateUrl('templates/pedido.modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.$on('$ionicView.enter',function(){
    if($scope.pedidos) {
      $ionicLoading.hide();
    }             
  }); 

}]);


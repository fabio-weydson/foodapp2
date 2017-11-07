/*global app */
'use strict';
app.controller('pedidosCtrl', [
  '$scope', 
  '$ionicLoading',
  'dataservice', 
  'appConfig', 
  '$ionicModal',
  '$filter',
function(
  $scope, 
  $ionicLoading,
  dataservice, 
  appConfig,
  $ionicModal,
  $filter
  ){
  dataservice.pedidos(1)
  .then(function(d){
    $scope.pedidos = d.pedidos;
    $scope.statusPedidos = ["Pendente", "Em preparação", "Concluído", "Saiu para entrega"];
    $ionicLoading.hide();
  });

  $scope.converteData = function(data){
    console.log(data)
    var novadata = new Date(data.replace(/-/g,"/"));
    return $filter('date')(novadata, "dd/MM/yyyy");
  }

  $scope.open = function(item) { $scope.modal=$ionicModal.fromTemplate(''+item.PED_CodigoPedido+' ',{ animation: 'slide-in-up'}); $scope.modal.open(); }

  $scope.$on('$ionicView.enter',function(){
    if($scope.pedidos) {
      $ionicLoading.hide();
    }             
  }); 

}]);


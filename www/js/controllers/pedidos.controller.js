/*global app */
'use strict';
app.controller('pedidosCtrl', [
  '$scope', 
  '$ionicLoading',
  'dataservice', 
  'appConfig', 
  '$ionicModal',
  '$filter',
  '$state', 
function(
  $scope, 
  $ionicLoading,
  dataservice, 
  appConfig,
  $ionicModal,
  $filter,
  $state
  ){
  dataservice.pedidos(2)
  .then(function(d){
    $scope.pedidos = d.pedidos;
    $scope.statusPedidos = ["Pendente", "Em preparação", "Pronto", "Cancelado", "Finalizado"];
    $ionicLoading.hide();
  });

  $ionicModal.fromTemplateUrl('templates/pedido.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });

  $scope.open = function(item) { 
    $scope.modal.pedido = item;
    $scope.modal.show();
  }

  $scope.pagarPedido = function(id){
     $state.go('app.pagamento', {id: id});
  }

  $scope.$on('$ionicView.enter',function(){
    if($scope.pedidos) {
      $ionicLoading.hide();
    }             
  }); 

}]);
/*
0 - Pedido Recebido
1 - Pedido em Preparo
2 - Pedido Pronto
3 - Pedido Cancelado 
4 - Pedido Finalizado 
*/



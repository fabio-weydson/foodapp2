/*global app */
'use strict';
app.controller('pagamentoCtrl', [
  '$scope',
  '$rootScope',
  '$stateParams',
  'settings',
  'dataservice',
  'appConfig',
  '$ionicLoading',
  '$interval',
  function(
    $scope,
    $rootScope,
    $stateParams,
    settings,
    dataservice,
    appConfig,
    $ionicLoading,
    $interval
  ){
    $scope.pedidoid = $stateParams.pedidoid;
    $scope.step_active = 1;
    $scope.estabelecimento = JSON.parse(localStorage.getItem('estabelecimento'));
    $scope.metodos = $scope.estabelecimento.MetodosPagamento;

    $scope.changeMetodo = function(metodo){
        $scope.step_active = 2;
        $scope.selected_method = metodo;
        $scope.pagam = {'Metodo':$scope.selected_method,'Pedido':$scope.pedidoid, 'Valor':50};

        dataservice.registraPagamento($scope.pagam)
        .then(function(d){
          $ionicLoading.show();
          $scope.result = d.result;
          $scope.info_pagamento = d.data;
          console.log(d)
        })

       var mytimer = $interval(function() {
           dataservice.statusPagamento($scope.pedidoid)
          .then(function(d){
            $ionicLoading.show();
            $scope.result = d.result;
            $scope.status_pagamento = d.status_pagamento;
            $scope.status_pedido = d.status_pedido;
            console.log(d)
            if($scope.result==true) {
              if($scope.status_pagamento==2) {
                  $interval.cancel(mytimer);
                  $scope.step_active = 3;
                  $ionicLoading.hide();
              } else if($scope.status_pagamento==3) {
                  console.log(d.msg);
                  $scope.step_active = 1;
                  $interval.cancel(mytimer);
                  $ionicLoading.hide();
              }
            }
          })
        }, 5000);
        

    }

    $scope.$on('$ionicView.enter',function(){
      $ionicLoading.hide();
    }); 


  
}]);

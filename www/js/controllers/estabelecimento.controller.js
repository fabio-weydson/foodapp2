/*global app */
'use strict';
app
.controller('estabelecimentoCtrl', ['$scope', '$stateParams', '$filter', 'dataservice', 'appConfig', '$ionicLoading', 'curSymbol',
  function($scope, $stateParams, $filter, dataservice, appConfig , $ionicLoading, curSymbol){
    $scope.curSymbol = curSymbol;

    $scope.imgroot = appConfig.imgserver+'/';
    
    var id = $stateParams.estabelecimentoid;

    dataservice.estabelecimento(id).then(function(d){
   
      $scope.estabelecimento = d.data;
      $ionicLoading.hide();
    
    });

    $scope.$on('$ionicView.enter',function(){
      $ionicLoading.hide();
    });

}]);
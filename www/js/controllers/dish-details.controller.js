/*global app */
'use strict';
app
.controller('dishDetailsCtrl', ['$scope', '$stateParams', '$filter', 'dataservice', 'appConfig', '$ionicLoading', 'curSymbol',
  function($scope, $stateParams, $filter, dataservice, appConfig , $ionicLoading, curSymbol){
    $scope.curSymbol = curSymbol;

  	// analytic event
    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('dishDetailsCtrl');
    }     

    $scope.imgroot = appConfig.imgserver+'/';
    
    var id = $stateParams.dishid;
    dataservice.dishDetails(id).then(function(d){
      $scope.dish = d.cardapio;
      $ionicLoading.hide();
    });

    $scope.$on('$ionicView.enter',function(){
      $ionicLoading.hide();
    });

}]);
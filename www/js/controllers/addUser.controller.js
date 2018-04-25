/*global app */
'use strict';
app
.controller('adduserCtrl', ['$scope', '$timeout', '$state', '$ionicLoading', 'dataservice',
  function($scope, $timeout, $state,  $ionicLoading, dataservice){
  
  $scope.estabelecimento = localStorage.getItem('estabelecimento');
  $scope.scan = function(estabelecimento) {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            var estabelecimento = $scope.result.text.split(' - ');
            dataservice.estabelecimento(estabelecimento[1]).then(function(d){
              console.log(d.empresa)
              localStorage.setItem('estabelecimento', d.empresa)
            });
            localStorage.setItem('id_estabelecimento', estabelecimento[1]);
            localStorage.setItem('mesa_estabelecimento', estabelecimento[2]);
            $scope.estabelecimento = estabelecimento[1];
            $timeout(function(){
              $scope.createUser($scope.estabelecimento);
            },1000);
            $scope.$apply();

        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };

    // clear 
    //$scope.estabelecimento = localStorage.getItem('estabelecimento');
    
    // redirect if user present
    if ($scope.estabelecimento) {
      $state.go('app.dishitems');
    }
    // else enter estabelecimento
    $scope.createUser = function(estabelecimento) {
      localStorage.setItem('estabelecimento', $scope.estabelecimento);
      $state.go('app.dishitems');
    };

    

    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('adduserCtrl');
    }
    $scope.$on('$ionicView.enter',function(){

   var height =  window.screen.height-250;
  $scope.mapheight = {
    'bottom': "-" + height + "px"
};
   console.log(height);
     $ionicLoading.hide();
    });
    

}]);
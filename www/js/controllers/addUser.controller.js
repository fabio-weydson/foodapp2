/*global app */
'use strict';
app
.controller('adduserCtrl', ['$scope', '$timeout', '$state', '$ionicLoading', 
  function($scope, $timeout, $state,  $ionicLoading){
  
  $scope.estabelecimento = localStorage.getItem('estabelecimento');
  $scope.scan = function(estabelecimento) {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            var estabelecimento = $scope.result.text.split(' - ');
            localStorage.setItem('estabelecimento', estabelecimento[0]);
            localStorage.setItem('id_estabelecimento', estabelecimento[1]);
            $scope.estabelecimento = estabelecimento[1];

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
      $state.go('app.userPage');
    }
    // else enter estabelecimento
    $scope.createUser = function(estabelecimento) {
      localStorage.setItem('estabelecimento', $scope.estabelecimento);
      $state.go('app.userPage');
    };

    

    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('adduserCtrl');
    }
    $scope.$on('$ionicView.enter',function(){
     $ionicLoading.hide();
    });
    

}]);
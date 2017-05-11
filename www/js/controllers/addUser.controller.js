/*global app */
'use strict';
app
.controller('adduserCtrl', ['$scope', '$timeout', '$state', '$ionicLoading', 
  function($scope, $timeout, $state,  $ionicLoading){
  
  $scope.estabelecimento = localStorage.getItem('estabelecimento');
  $scope.scan = function(estabelecimento) {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            $scope.$apply();
            $scope.estabelecimento = result.text;
            localStorage.setItem('estabelecimento', estabelecimento);
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
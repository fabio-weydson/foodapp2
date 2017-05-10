/*global app */
'use strict';
app
.controller('adduserCtrl', ['$scope', '$timeout', '$state', '$ionicLoading', 
  function($scope, $timeout, $state,  $ionicLoading){
  
  var estabelecimento = localStorage.getItem('estabelecimento');
  $scope.scan = function(estabelecimento) {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            $scope.$apply();
            estabelecimento = result.text;
            localStorage.setItem('estabelecimento', estabelecimento);
        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };

    // clear 
    var estabelecimento = localStorage.getItem('estabelecimento');
    
    // redirect if user present
    if (estabelecimento) {
      $state.go('app.userPage');
    }
    // else enter estabelecimento
    $scope.createUser = function(estabelecimento) {
      localStorage.setItem('estabelecimento', estabelecimento);
      $state.go('app.userPage');
    };

    

    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('adduserCtrl');
    }
    $scope.$on('$ionicView.enter',function(){
     $ionicLoading.hide();
    });
    

}]);
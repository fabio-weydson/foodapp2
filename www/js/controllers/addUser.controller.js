/*global app */
'use strict';
app
.controller('adduserCtrl', ['$scope', '$timeout', '$state', '$ionicLoading', 
  function($scope, $timeout, $state,  $ionicLoading){

     $scope.scan = function() {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            $scope.$apply();
            $username = result.text;
        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };

    // clear 
    var username = localStorage.getItem('username');
    // redirect if user present
    if (username) {
      $state.go('app.userPage');
    }
    // else enter username
    $scope.createUser = function(username) {
      localStorage.setItem('username', username);
      $state.go('app.userPage');
    };

    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('adduserCtrl');
    }
    $scope.$on('$ionicView.enter',function(){
     $ionicLoading.hide();
    });
    

}]);
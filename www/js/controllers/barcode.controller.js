/*global app */
'use strict';
app
.controller('BarcodescannerCtrl', ['$scope', '$stateParams','appConfig', 'dataservice','$timeout', '$ionicLoading',
  function($scope, $stateParams, appConfig, dataservice, $timeout, $ionicLoading){
  // Barcodescanner Controller    
    $scope.scan = function() {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            $scope.$apply();
        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };
    
})

}]);

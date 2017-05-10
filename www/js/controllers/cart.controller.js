/*global app */
'use strict';
app
.controller('cartCtrl', ['$scope', 'appConfig', 'FCcart', '$ionicLoading', 'curSymbol',
  function($scope, appConfig, FCcart, $ionicLoading, curSymbol){
    $scope.curSymbol = curSymbol;
    $scope.imgroot = appConfig.imgserver;

    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('cartCtrl');
    }

    // get data
    $scope.$on('$ionicView.enter', function() {
      $scope.cartItems = FCcart.getCartItems();
    });

    $scope.totalAmount = function() {
      return FCcart.getTotal();
    };

    $scope.$on('$ionicView.leave',function(){
      FCcart.setCartItems($scope.cartItems);
    });

     // show Add
    if(window.AdMob) {
      AdMob.showInterstitial();
    } 

    // remove from cart
    $scope.cartRemove = function(index) {
       $scope.cartItems.splice(index, 1);
       FCcart.setCartItems($scope.cartItems);
    };

    $scope.$on('$ionicView.enter',function(){
      $ionicLoading.hide();      
    });
}]);
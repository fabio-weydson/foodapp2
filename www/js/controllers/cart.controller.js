/*global app */
'use strict';
app
.controller('cartCtrl', ['$scope', 'appConfig', 'FCcart', '$ionicLoading', 'curSymbol', '$filter', '$ionicPopup', 
  function($scope, appConfig, FCcart, $ionicLoading, curSymbol, $filter,$ionicPopup){
    $scope.curSymbol = curSymbol;
    $scope.imgroot = appConfig.imgserver;

    if(typeof analytics !== 'undefined') {
     // window.analytics.trackView('cartCtrl');
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
      //AdMob.showInterstitial();
    } 
    $scope.update_obs = function(item) {
      console.log(item)
      var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
       angular.forEach(cartItems,function(i, v) {
              if (i && i.id == item.id) {    
                  cartItems.splice(v, 1, item);
                }
        });
       console.log(cartItems);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    // remove from cart
    $scope.cartRemove = function(index) {
       $scope.cartItems.splice(index, 1);
       FCcart.setCartItems($scope.cartItems);
       console.log($scope.cartItems)
    };

    $scope.showPopup = function(item,key) {

   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-change="update_obs(item)">',
     title: 'Adicionar observação',
     subTitle: 'Deseja retirar ou adicionar algo à este item?',
     scope: $scope,
     buttons: [
       { text: 'Cancelar' },
       {
         text: '<b>Salvar</b>',
         type: 'button-assertive',
         onTap: function(e) {
           if (item.PRA_Observacao) {
             $scope.update_obs(item)
             e.preventDefault();
           } else {
             return item.PRA_Observacao;
           }
         }
       },
     ]
   });
  };

    $scope.$on('$ionicView.enter',function(){

      $scope.hasCart = FCcart.hasCart();
      $ionicLoading.hide();      
    });
}]);
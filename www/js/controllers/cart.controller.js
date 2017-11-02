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
 
    // remove from cart
    $scope.cartRemove = function(index) {
       $scope.cartItems.splice(index, 1);
       FCcart.setCartItems($scope.cartItems);
    };

    $scope.update_obs = function(item,key) {
      item.PRA_Observacao = $scope.data.nova_obs;
      var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
       angular.forEach(cartItems,function(i, v) {
              if (i && i.id == item.id) {    
                  cartItems.splice(v, 1, item);
                }
        });
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    $scope.showPopup = function(item,key) {

       $scope.data = {}

       // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
           scope: $scope,
         template: '<input type="text" ng-model="data.nova_obs"">',
         title: 'Adicionar observação',
         subTitle: 'Deseja retirar ou adicionar algo à este item?',
      
         buttons: [
           { text: 'Cancelar' },
           {
             text: '<b>Salvar</b>',
             type: 'button-assertive',
             onTap: function(e) {
               if (item.PRA_Observacao) {
                 $scope.update_obs(item,key);
                 myPopup.close();
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
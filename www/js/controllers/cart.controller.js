/*global app */
'use strict';
app
.controller('cartCtrl', ['$scope',  'appConfig',  '$state', 'dataservice', 'FCcart', 'FCUser', '$ionicLoading', 'curSymbol', '$filter', '$ionicPopup', 
  function($scope, appConfig, $state, dataservice, FCcart, FCUser, $ionicLoading, curSymbol, $filter,$ionicPopup){
    $scope.curSymbol = curSymbol;
    $scope.imgroot = appConfig.imgserver;
    $scope.pedido = {};

    // get data
    $scope.$on('$ionicView.enter', function() {
      $scope.hasCart = FCcart.hasCart();
      $scope.cartItems = FCcart.getCartItems();
      $scope.UserData =  FCUser.isLogged();
      $scope.isRegistered =  $scope.UserData.length;
       $ionicLoading.hide(); 
    });

    $scope.FecharPedido = function() {
      if($scope.UserData.length){
          FCcart.FecharPedido();
      } else {
          $state.go('app.register', {checkout:true});
      }
    }

    $scope.totalAmount = function() {
      return FCcart.getTotal();
    };

    // $scope.$on('$ionicView.leave',function(){
    //   FCcart.setCartItems($scope.cartItems);
    // });

    
    $scope.cartRemove = function(index) {
         var confirmPopup = $ionicPopup.confirm({
           title: 'Remover item',
           template: 'Tem certeza que deseja remover este item do seu pedido?',
            buttons: [
                { text: 'Não' },
                { text: 'Sim',type: 'button-positive' }
            ]
         });
         confirmPopup.then(function(res) {
           if(res) {
              $scope.cartItems.splice(index, 1);
              FCcart.setCartItems($scope.cartItems);
           } else {
            return false
           }
         });
      
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

       $scope.data = {
        nova_obs : item.PRA_Observacao
       }

       // An elaborate, custom popup
       var myPopup = $ionicPopup.show({
           scope: $scope,
         template: '<input type="text" ng-model="data.nova_obs" placeholder="Digite aqui...">',
         title: 'Adicionar observação',
         subTitle: 'Deseja retirar ou adicionar algo à este item?',
      
         buttons: [
           { text: 'Cancelar' },
           {
             text: '<b>Adicionar</b>',
             type: 'button-positive',
             onTap: function(e) {
              
                 $scope.update_obs(item,key);
                 myPopup.close();
                 e.preventDefault();
             
             }
           },
         ]
       });

    };

}]);
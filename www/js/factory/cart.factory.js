/*global app */
'use strict';
app.factory('FCcart', ['dataservice', '$q', '$state', '$filter', 'FCUser', '$ionicLoading', 
  function(dataservice, $q, $state, $filter, FCUser, $ionicLoading, FCcart){
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var totalAmount = 0;
    var ms = this;
    return {
      addCart: function (item, type) {
        var current = $filter('filter')(cartItems, {id: item.PRA_CodigoPrato, type: type});

        if (current.length) {

          current[0].qty = parseInt(current[0].qty) + 1;
        }
        else {
          var cartItem = {
            qty: 1,
            id: item.PRA_CodigoPrato,
            PRA_Nome: item.PRA_Nome,
            PRA_Imagem: item.PRA_Imagem,
            PRA_Preco: item.PRA_Preco,
            PRA_Observacao: '',
            type: type
          };
          cartItems.push(cartItem);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        return cartItems;
      },

      removeCart: function (item, type) {
        var current = $filter('filter')(cartItems, {id: item.PRA_CodigoPrato, type: type});
        if (parseInt(current[0].qty)>=1) {
            current[0].qty = parseInt(current[0].qty) - 1;
            if(current[0].qty==0) {
               angular.forEach(cartItems,function(i, v) {
              if (i && i.id == item.PRA_CodigoPrato) {    
                  cartItems.splice(v, 1);
                }
              });
            }
        } else {
             angular.forEach(cartItems,function(i, v) {
              if (i && i.id == item.PRA_CodigoPrato) {    
              cartItems.remove(v); 
              }
            });
                 }
                 this.setCartItems(cartItems);
        //localStorage.setItem('cart', JSON.stringify(cartItems));
        return cartItems;
      },

      hasCart: function() {

        var hasCart = {};
        for (var i = 0; i < cartItems.length; i++) {
          hasCart[cartItems[i].id] = cartItems[i].qty;
        }
        return hasCart;
      },

      getTotal: function() {
        totalAmount = 0;
        angular.forEach(cartItems, function(item){
          totalAmount += (item.PRA_Preco * item.qty);
        });
        return totalAmount;
      },

      getCartItems: function() {
        return cartItems;
      },

      getCartItemsTotal: function() {
        var totalitems = 0;
        angular.forEach(cartItems, function(item){
          totalitems =  totalitems+item.qty;
        });
        console.log(totalitems)
        return totalitems;
      },

      clearCart: function() {
        cartItems = [];
        localStorage.setItem('cart', JSON.stringify(cartItems));
        return cartItems;
      },

      setCartItems: function(items) {
        cartItems = items;
        localStorage.setItem('cart', JSON.stringify(cartItems));
      },

      dishCats: function() {
        var dfd = $q.defer();
        dataservice.dishCategories().then(function(d){
          dfd.resolve(d.categorias);
        });
        return dfd.promise;
      },
      
      FecharPedido: function() {
        var pedido = {};
        var cartItems = this.getCartItems();
        var UserData =  FCUser.isLogged();
      
          $ionicLoading.show(); 
          pedido['CLI_CodigoCliente'] = UserData[0].CLI_CodigoCliente; 
          pedido['CLI_CodigoEmpresa'] = 1;
          pedido['CodigoMesa'] = 3;
          pedido['Subtotal'] = this.getTotal();
          pedido['cartItems'] = cartItems; 
          dataservice.requestOrder(pedido).then(function(d){
            if(d.result==true) {
              var pedidorealizado = d;
              localStorage.setItem('last_order', JSON.stringify(pedidorealizado.dados));
              localStorage.setItem('cart',null);
              $state.go('app.pedidorealizado');
              $ionicLoading.hide(); 
            } else {
              alert("Falha na requisicao");
              $ionicLoading.hide(); 
            }
           
          });
      
    }
    };
}]);
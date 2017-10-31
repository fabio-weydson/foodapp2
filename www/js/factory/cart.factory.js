/*global app */
'use strict';
app.factory('FCcart', ['dataservice', '$q', '$filter',
  function(dataservice, $q, $filter, FCcart){
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var totalAmount = 0;
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
          dfd.resolve(d.data);
        });
        return dfd.promise;
      }
    };
}]);
/*global app */
'use strict';
app.factory('FCcart', ['dataservice', '$q', '$filter', 
  function(dataservice, $q, $filter){
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var totalAmount = 0;
    return {
      addCart: function (item, type) {
        var current = $filter('filter')(cartItems, {id: item.id, type: type});

        if (current.length) {
          current[0].qty = parseInt(current[0].qty) + 1;
        }
        else {
          var cartItem = {
            qty: 1,
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            type: type
          };
          cartItems.push(cartItem);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
        return cartItems;
      },

      removeCart: function (item, type) {
        var current = $filter('filter')(cartItems, {id: item.id, type: type});

        if (current.length>1) {
          current[0].qty = parseInt(current[0].qty) - 1;
        }
        else {
          // var cartItem = {
          //   qty: 1,
          //   id: item.id,
          //   name: item.name,
          //   image: item.image,
          //   price: item.price,
          //   type: type
          // };
          // cartItems.remove(cartItem);
             angular.forEach(cartItems,function(i, v) {
              if (v && v.id == item.id) {    
              cartItems.splice(i, 1);    
              }
            });
         
          console.log(cartItems);
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));
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
          totalAmount += (item.price * item.qty);
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
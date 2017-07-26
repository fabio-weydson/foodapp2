/*global app */
'use strict';
app.directive('cartBtn', ['FCcart', 
  function(FCcart){
    return {
      restrict: 'AE',
      template: '<button class="button button-with-icon ion-android-remove-circle remove cart-btn" ng-click="removeItem()"'+
       'ng-class="{\'selected\' : hasCart[dish.id] && hasCart[dish.id] > 0}"></button><span class="badger" ng-if="hasCart[dish.id] && hasCart[dish.id]">{{hasCart[dish.id]}}</span>'+
       '<button class="button button-with-icon ion-android-add-circle cart-btn" ng-click="addItem()"'+
       'ng-class="{\'selected\' : hasCart[dish.id] && hasCart[dish.id] > 0}"></button>',
      scope: {
        dish: '=',
        type: '='
      },
      link: function(scope) {
        scope.$watch('dish', function () {
          scope.cartItems = FCcart.getCartItems();
          scope.hasCart = FCcart.hasCart();
        }, true);

        scope.addItem = function() {
          scope.cartItems = FCcart.addCart(scope.dish, scope.type);
          scope.hasCart = FCcart.hasCart();
        };

         scope.removeItem = function() {
          scope.cartItems = FCcart.removeCart(scope.dish, scope.type);
          scope.hasCart = FCcart.hasCart();
        };
      }
    };
  }
])
.directive('carttBtn',  ['FCcart', function(FCcart){
    return {
      template : '<button ng-if="cartItems.length" class="button button-icon iconic ion-bag" ui-sref="app.cart"></button>',
      
      link : function(scope) {
        scope.cartItems = FCcart.getCartItems();
      }
    };

  }
]);

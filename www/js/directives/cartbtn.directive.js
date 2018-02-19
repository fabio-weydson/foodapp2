/*global app */
'use strict';
app.directive('cartBtn', ['FCcart', 
  function(FCcart){
    return {
      restrict: 'AE',
      template: '<button class="button button-with-icon ion-minus-round remove cart-btn" ng-show="hasCart[dish.PRA_CodigoPrato]" ng-click="removeItem()"'+
       'ng-class="{\'selected\' : hasCart[dish.PRA_CodigoPrato] && hasCart[dish.PRA_CodigoPrato] > 0}"></button><span class="badger" ng-if="hasCart[dish.PRA_CodigoPrato]">{{hasCart[dish.PRA_CodigoPrato]}}</span>'+
       '<button class="button button-with-icon ion-plus-round cart-btn" ng-click="addItem()"'+
       'ng-class="{\'selected\' : hasCart[dish.PRA_CodigoPrato] && hasCart[dish.PRA_CodigoPrato] > 0}" ng-if="hasCart[dish.PRA_CodigoPrato] > 0"></button>'+
       '<button class="button button-with-icon ion-android-cart cart-btn selected" ng-if="!hasCart[dish.PRA_CodigoPrato]" ng-click="addItem()"'+
       '></button>',
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

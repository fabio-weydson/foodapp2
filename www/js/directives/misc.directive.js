/*global app */
'use strict';
app.directive('ngOfferamount', function() {
   return {
    restrict: 'A',
    scope: {
      type : 'type',
      price: 'price'
    },
    template: '<span ng-if="(type == \'Percentage\')">Flat</span> {{price}} <span ng-if="(type == \'Flat\')">Offer</span>'
  };
});
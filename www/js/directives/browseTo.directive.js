/*global app */
'use strict';
app.directive('browseTo', function ($ionicGesture, $window) {
  console.log('clicked');
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      var handleTap = function () {
        // todo: capture Google Analytics here
        $window.open(encodeURI($attrs.browseTo), '_system');
      };
      var tapGesture = $ionicGesture.on('tap', handleTap, $element);
      $scope.$on('$destroy', function () {
        // Clean up - unbind drag gesture handler
        $ionicGesture.off(tapGesture, 'tap', handleTap);
      });
    }
  };
});
/* global app */
'use strict';
app.controller('AdCtrl', ['$scope', 'adMob', '$ionicLoading', function($scope, adMob, $ionicLoading){
  $ionicLoading.hide();
  $scope.manageAdMob = {
    showBanner: adMob.showBanner,
    showInterstitial: adMob.showInterstitial,
    remove: adMob.removeAds
	};

}]);

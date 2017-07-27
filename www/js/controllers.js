/*global app */
'use strict';
app
.controller('AppCtrl',[
	'$scope',
	'$ionicModal',
	'$timeout', '$window',
	'$ionicTabsDelegate',
	'$cordovaAppRate',
	'FCcart',
	'dataservice',
	'$rootScope',
	'appConfig',   '$cordovaPush', '$airbopClient',
      'GOOGLE_SENDER_ID', 'AIRBOP_APP_KEY', 'AIRBOP_APP_SECRET',
 function(
 	$scope, 
 	$ionicModal, 
 	$timeout,  $window, 
 	$ionicTabsDelegate, 
 	$cordovaAppRate, 
 	FCcart, 
 	dataservice, 
 	$rootScope, 
 	appConfig, $cordovaPush, $airbopClient,
      GOOGLE_SENDER_ID, AIRBOP_APP_KEY, AIRBOP_APP_SECRET
 	) {

	document.addEventListener('deviceready', function () {

	$scope.apprate = function(){
		$cordovaAppRate.navigateToAppStore();
	};
	
	  var googleSenderId = GOOGLE_SENDER_ID;

    var airbopClientParams = {
      'regid': '', // arrives from Google server
      'airbopAppKey': AIRBOP_APP_KEY,
      'airbopAppSecret': AIRBOP_APP_SECRET
    };

    $scope.app = {};
    $scope.app.title = 'GCM Demo App';
    $scope.app.log = '';

    var androidConfig = {
      'senderID': googleSenderId
    };

    function isBrowser() {
      return (!$window.cordova && !$window.PhoneGap && !$window.phonegap);
    }


    function log(level, message) {
      if (isBrowser()) {
        console[level].call(console, message);
      } else {
        if (typeof message === 'object') {
          message = JSON.stringify(message);
        }
        $timeout(function () {
          $scope.app.log += level.toUpperCase() + ' ' + message + '\n';
        });
      }
    }


    function successHandler(result) {
      log('info', result);
    }

    function errorHandler(error) {
      log('error', error);
    }


    $scope.app.register = function() {
      if (typeof device === 'undefined') {
        alert('No device plugin found. Install `cordova-plugin-device`.');
        return;
      }

      if ( $window.device.platform === 'Android' ){
        alert('Register android device');
        $cordovaPush.register(androidConfig).then(successHandler, errorHandler);
      }
    };


    function notificationHandler(event, notification) {

      /*
        Example notification:
        {
          "regid":"APA91b....",
          "event":"registered"
        }
      */
      if (notification.event === 'registered') {
        log('debug', 'GCM REGISTRATION ID: ' + notification.regid);
        airbopClientParams.regid = notification.regid;
        $airbopClient.register(airbopClientParams).then(successHandler, errorHandler);
      }

      /*
        Example notification:
        {
          "message":"DEMOMESSAGE",
          "payload":{"message":"DEMOMESSAGE","title":"DEMOTITLE","url":""},
          "collapse_key":"do_not_collapse",
          "from":"1000000000000",
          "foreground":true,
          "event":"message"
        }
        'from' field equals GOOGLE_SENDER_ID
      */
      if (notification.event === 'message') {
        log('info', 'INCOMING MESSAGE');
        log('info', notification);
      }
    }

    // You have to use $rootScope when the current controller has bound to a different HTML node as 'ng-app'
    // $rootScope.$on('$cordovaPush:notificationReceived', notificationHandler);

    $scope.$on('$cordovaPush:notificationReceived', notificationHandler);


	}, false);

	$scope.$on('$ionicView.beforeEnter',function(){
		$scope.cats = FCcart.dishCats().then(function(d){
			$scope.cats= d;
		});
	});

	




	$scope.filterCat = [];
	$scope.filterCattest = {};

	$scope.filteration = function(cat){
		if($scope.filterCat.indexOf(cat) === -1){
			$scope.filterCat.push(cat);
		}else{
			$scope.filterCat.splice($scope.filterCat.indexOf(cat), 1);
		}
		$rootScope.$broadcast('filter', $scope.filterCat);
	};

$scope.facebookPage = appConfig.facebookPage;

}]);

/*global app */
'use strict';
app
.controller('userCtrl', [
	'$scope', 
	'dataservice', 
	'appConfig', 
	'$ionicLoading',
function(
	$scope, 
 	dataservice, 
 	appConfig,
 	$ionicLoading
 ){
	$scope.imgroot = appConfig.imgserver+'/';
	
	$scope.$on('$ionicView.enter',function(){
		$scope.username = localStorage.getItem('username');
	});


	dataservice.slideView().then(function(d){
		$scope.slides = d.data;
		$scope.slideslodded = true;
	});

	dataservice.offerView().then(function(d){
		$scope.offers = d.data;
		$scope.offerViewloadded = true;
	});

		
	//Special Items

	dataservice.specials().then(function(d){
		var log = [];
		var log2 = [];

		angular.forEach(d.data, function(value, key) {
			if(key % 2 === 0){
				log2.push(value);
			}else{
				log2.push(value);
				log.push(log2);
				log2 = [];
			}
		});

		$scope.specials = log;
		$scope.specialsloded = true;

		$ionicLoading.hide();

	});

	$scope.$on('$ionicView.enter',function(){
	  $ionicLoading.hide();      
	});

	
}]);
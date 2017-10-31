/*global app */
'use strict';
app.controller('catsCtrl', [
	'$scope', 
	'$ionicLoading',
	'dataservice', 
	'appConfig', 
function(
	$scope, 
	$ionicLoading,
	dataservice, 
	appConfig
	){
	$scope.imageroot = appConfig.imgserver+'/categories/';
	dataservice.dishCategories()
	.then(function(d){
		$scope.cats = d;
		console.log(cats)
		$ionicLoading.hide();
	});

	$scope.$on('$ionicView.enter',function(){
		if($scope.cats) {
			$ionicLoading.hide();
		}			        
	});	

}]);


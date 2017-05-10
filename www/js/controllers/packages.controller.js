/*global app */
'use strict';
app.controller('packagesCtrl',[
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
		$scope.imageroot = appConfig.imgserver+'/packages/';

		dataservice.packages()
		.then(function(d){
			$scope.packages = d.data;
			$ionicLoading.hide();  
		});

		$scope.$on('$ionicView.enter',function(){
		  $ionicLoading.hide();      
		});
		
}]);
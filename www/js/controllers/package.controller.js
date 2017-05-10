/*global app */
'use strict';
app.controller('packageCtrl', [
		'$scope',
		'$ionicLoading',
		'$stateParams',
		'dataservice',
		'appConfig',
		'curSymbol',
		function(
			$scope,
			$ionicLoading,
			$stateParams,
			dataservice,
			appConfig,
			curSymbol
		){
			$scope.curSymbol = curSymbol;
			$scope.imgroot = appConfig.imgserver;
			var id = $stateParams.packageid;
			dataservice.package(id)
			.then(function(d){
				$scope.package = d.data;
				$scope.dishes = d.data.foods;
				$ionicLoading.hide();
			});
			$scope.$on('$ionicView.enter',function(){
			  $ionicLoading.hide();
			});
		

}]);
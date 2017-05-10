/*global app */
'use strict';
app.controller('catCtrl', [
	'$scope',
	'$rootScope',
	'$stateParams',
	'dataservice',
	'appConfig',
	function(
		$scope,
    $rootScope,
		$stateParams,
		dataservice,
		appConfig
	){

	$scope.imageroot = appConfig.imgserver;
	var id = $stateParams.catid;
	dataservice.getCategories(id)
	.then(function(d){
		$scope.dishes = d.data.foods;
    $rootScope.$broadcast('hideloader');
	});

}]);

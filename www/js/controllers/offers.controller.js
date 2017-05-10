/*global app */
'use strict';
app
.controller('offersCtrl', [
	'$scope', 
	'$stateParams', 
	'$ionicLoading',
	'appConfig', 
	'dataservice',
	function(
		$scope,
		$stateParams,
		$ionicLoading,
		appConfig,
	 	dataservice
	 	){
		$scope.imgroot = appConfig.imgserver;
		dataservice.offerItems().then(function(d){
			$scope.offers = d.data;
			$ionicLoading.hide();
		});
		
		$scope.$on('$ionicView.enter',function(){
			if($scope.offers) {
				$ionicLoading.hide();
			}			        
		});		

}]);
/*global app */
'use strict';
app
.controller('offerDetailsCtrl', [
	'$scope',
	'$stateParams',
	'$ionicLoading',
	'dataservice',
	'appConfig',
	'curSymbol',
	function(
		$scope,
		$stateParams,
		$ionicLoading,
		dataservice,
		appConfig,
		curSymbol
		){	
		$scope.curSymbol = curSymbol;
		$scope.imgroot = appConfig.imgserver+'/'; 		
		var id = $stateParams.offerid;
		dataservice.offerDetails(id).then(function(d){
		$scope.dish = d.data;		
		$ionicLoading.hide();
		});


		$scope.$on('$ionicView.enter',function(){
			if ($scope.dish) {
				$ionicLoading.hide(); 
			}		       
		});
		


}]);
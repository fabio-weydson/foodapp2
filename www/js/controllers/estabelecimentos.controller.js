/*global app */
'use strict';
app.controller('estabelecimentosCtrl', [
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
	console.log('sdsds');
	$scope.imageroot = appConfig.imgserver;
	dataservice.settings()

	.then(function(d){
		$scope.estabelecimentos = d.data;
		$ionicLoading.hide();
		//getDistances($scope.estabelecimentos);
	})

	function getDistances(businesses) {

			var origins = _.map(businesses, function(business) {
				console.log(business.latlong)
				return business.latlong;
			})
			distanceService.getDistancesToOrigins(origins).then(function(distances) {
				for (var i = 0; i < businesses.length; i++) {
					businesses[i].distance = distances[i];
				}
			});
		}

	$scope.$on('$ionicView.enter',function(){
		if($scope.estabelecimentos) {
			$ionicLoading.hide();
		}			        
	});	

}]);


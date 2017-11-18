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
	$scope.imageroot = appConfig.imgserver;
	dataservice.estabelecimento()

	.then(function(d){
		$scope.estabelecimentos = d.empresa;
		$ionicLoading.hide();
		console.log($scope.estabelecimentos)
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


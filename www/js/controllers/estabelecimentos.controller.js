/*global app */
'use strict';
app.controller('estabelecimentosCtrl', [
	'$scope', 
	'$ionicLoading',
	'dataservice', 
	'appConfig', 
	'distanceService',
	'_',
function(
	$scope, 
	$ionicLoading,
	dataservice, 
	appConfig,
	distanceService,
	_
	){
	$scope.imageroot = appConfig.imgserver;
	dataservice.estabelecimento(null)

	.then(function(d){
		$scope.estabelecimentos = d.empresa;
		$ionicLoading.hide();
		$scope.getDistances($scope.estabelecimentos)		
	})

	$scope.getDistances = function(businesses) {
			distanceService.getDistancesToOrigins(businesses).then(function(distances) {
				for (var i = businesses.length - 1; i >= 0; i--) {
					$scope.estabelecimentos[i].EMP_Distancia = distances[i];
				};
			});

	}

	$scope.$on('$ionicView.enter',function(){
		if($scope.estabelecimentos) {
			$ionicLoading.hide();
		}			        
	});	

}]);


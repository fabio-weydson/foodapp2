/*global app */
'use strict';
app
.controller('pedidorealizadoCtrl', [
	'$scope', 
	'$stateParams', 
	'$timeout',
	'$ionicLoading', 
	'appConfig', 
	'dataservice',
	function(
		$scope, 
		$stateParams, 
		$timeout,
		$ionicLoading,
		appConfig, 
		dataservice
		){

		// analytics
		if(typeof analytics !== 'undefined') {
			//window.analytics.trackView('contactCtrl');
		}
	
		$scope.$on('$ionicView.enter',function(){			
			$ionicLoading.hide();
		});	


}]);
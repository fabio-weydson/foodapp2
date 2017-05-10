/*global app */
'use strict';
app
.controller('contactCtrl', [
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
			window.analytics.trackView('contactCtrl');
		}

		// 
		$scope.contact = {};
		$scope.contactRequest = function() {
			dataservice.contact($scope.contact)
			.then(function(d){
				$scope.contact = {};
				$scope.messageShow = true;
				$scope.message = d.message;
				$timeout(function(){
					$scope.messageShow = false;
				},5000);	
			});
		};

		$scope.$on('$ionicView.enter',function(){			
			$ionicLoading.hide();
		});	


}]);
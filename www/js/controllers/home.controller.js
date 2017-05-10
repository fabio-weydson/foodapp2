/*global app */
'use strict';
app
.controller('homeCtrl', [
	'$scope', 
	'$timeout', 
	'$state', 
function(
	$scope, 
	$timeout, 
	$state
	){
	$timeout(function() {
		//
    if(typeof analytics !== 'undefined') {
			window.analytics.trackView('homeCtrl');
		}
      $state.go('app.addUser');
    }, 3000);
}]);

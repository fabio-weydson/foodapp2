/*global app */
'use strict';
app.directive('cuppunActivate', function(){	
	return {
		restrict: 'E',
		scope: { code:'=' },

		template: '<label class="checkbox" ng-class="{\'activated\' : cupponActivated}" ng-click="toggleCuppon()">' +
	   	 					 '<input type="checkbox" ng-checked="cupponActivated">' +
	   					'</label>',
		link: function(scope){

			scope.cupponActivatedCode =  localStorage.getItem('cupponCode');
			

			scope.$watch('code', function(){
				if (scope.cupponActivatedCode!==null 	&& scope.code===scope.cupponActivatedCode) {
					scope.cupponActivated = true;
				}else {
					scope.cupponActivated = false;
				}	
			});
			
			scope.toggleCuppon = function() {
				scope.cupponActivatedCode =  localStorage.getItem('cupponCode');
				if (scope.code===scope.cupponActivatedCode) {
					localStorage.removeItem('cupponCode');
				}else {
					localStorage.setItem('cupponCode',scope.code);
				}
				
			};


		}
	};
});
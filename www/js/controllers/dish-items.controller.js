/*global app */
'use strict';
app
.controller('dishitemsCtrl', ['$scope', '$stateParams', '$ionicLoading', 'appConfig', 'dataservice', '$filter', 'FCcart', '$rootScope', '$ionicScrollDelegate', 'curSymbol', '$interval',
	function($scope, $stateParams, $ionicLoading, appConfig, dataservice, $filter, FCcart, $rootScope, $ionicScrollDelegate, curSymbol, $interval){

		$scope.imgroot = appConfig.imgserver;

		$scope.filterdata = {};
		$scope.filterdata.catids = [];

		$rootScope.$on('filter', function(e, f){
			$scope.dishfilter = f;
      		$ionicScrollDelegate.scrollTop();
		});

		$scope.$on('$ionicView.beforeEnter',function(){
			$scope.doRefresh();
			$ionicLoading.hide();
			$interval(function() {	
				$scope.hasCart = null;
				$scope.hasCart = FCcart.hasCart();
			}, 3000);
			
		});

		$scope.doRefresh = function(){
			dataservice.dishItems().then(function(d){
				$scope.cats = d.cardapios;
				$scope.$broadcast('scroll.refreshComplete');
			});
		}


		$scope.dishLike = function (foodid) {

			//Update Like
			var dishItem = $filter('filter')($scope.dishes, {id : foodid});
			var likeddishes;
			//Update localstore and database
			if(localStorage.getItem('dishlike')){
				likeddishes = localStorage.getItem('dishlike').split(',');
				if(likeddishes.indexOf(foodid.toString()) !== -1){
					likeddishes.splice(likeddishes.indexOf(foodid.toString()), 1);
					dataservice.dishLike(foodid,false).then(function(){
						dishItem[0].likes = String(parseInt(dishItem[0].likes) -1);
					});
				}else{					
					likeddishes.push(foodid.toString());
					dataservice.dishLike(foodid,true).then(function(){
						dishItem[0].likes = String(parseInt(dishItem[0].likes) + 1);
					});
				}
			}else{
				likeddishes = [ foodid ];
			}			
			localStorage.setItem('dishlike', likeddishes.toString());		
		};

		$scope.getImage = function(obj){
		    return 'http://easyresto.esy.es/assets/media/'+obj.replace('.jpg', '_thumb.jpg')
		  };


}]);
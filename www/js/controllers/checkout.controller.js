/*global app */
'use strict';
app
.controller('checkoutCtrl', [
		'$scope', 
		'$timeout', 
		'$state',
		'$rootScope',
		'$ionicLoading', 
		'dataservice', 
		'FCcart', 
		'curSymbol',
	function(
		$scope, 
		$timeout, 
		$state,
		$rootScope, 
		$ionicLoading,
		dataservice, 
		FCcart,
		curSymbol
	){
		
		$scope.curSymbol = curSymbol;
		$scope.desejoRegistrar = false;
		$scope.desejoLogar = true;
		//

		$scope.checkout = {};
		$scope.$on('$ionicView.enter',function(){
			$scope.cartItems = FCcart.getCartItems();
			$scope.totalAmount = FCcart.getTotal();			
			$scope.checkout.id_estabelecimento = localStorage.getItem('id_estabelecimento');
			$scope.checkout.cupon = localStorage.getItem('cupponCode');
		    $scope.checkout.price = $scope.totalAmount;
		    $scope.checkout.package_ids = [];
		    $scope.checkout.food_ids = [];
		    
		    angular.forEach($scope.cartItems, function(item){
		     	if (item.type==='food') {
		     	 $scope.checkout.food_ids.push({'id':item.id,'qty':item.qty});
		     	}else {
		     		$scope.checkout.package_ids.push({'id':item.id,'qty':item.qty});
		     	}
		    });
	     $ionicLoading.hide();
		});

		$scope.actionOrder = function() {
			var data = $scope.checkout;
			$rootScope.$broadcast('showloader');
			dataservice.requestOrder(data)
			.then(function(d){
				$ionicLoading.hide();
				if (d.data==='Ok') {
					$state.go('app.thankyou');
					FCcart.clearCart();
				}else {
					$scope.messageShow = true;
					$scope.message = d.message;
					$timeout(function(){
						$scope.messageShow = false;
					},5000);
				}
				
			});
		};

}]);
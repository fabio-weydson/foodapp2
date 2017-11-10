/*global app */
'use strict';
app
.controller('registerCtrl', [
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
		
		$scope.desejoRegistrar = false;
		$scope.desejoLogar = false;
		$scope.curSymbol = curSymbol;

		//
		if(typeof analytics !== 'undefined') {
			window.analytics.trackView('registerCtrl');
		}

		$scope.isRegistered =  localStorage.getItem('id_cliente');

		$scope.checkout = {};
		$scope.$on('$ionicView.enter',function(){
			$scope.cartItems = FCcart.getCartItems();
			$scope.totalAmount = FCcart.getTotal();			
			$scope.checkout.id_estabelecimento = localStorage.getItem('id_estabelecimento');
	   
	     $ionicLoading.hide();
		});

		$scope.actionRegister = function() {
			var data = $scope.checkout;
			$rootScope.$broadcast('showloader');
			dataservice.requestOrder(data)
			.then(function(d){
				$ionicLoading.hide();
				if (d.data==='Ok') {
					$state.go('app.thankyou');
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
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
		'FCUser',
		'FCcart', 
		'curSymbol',
		'$stateParams',
	function(
		$scope, 
		$timeout, 
		$state,
		$rootScope, 
		$ionicLoading,
		dataservice, 
		FCUser,
		FCcart,
		curSymbol,
		$stateParams
	){
		$scope.register  = {};
		$scope.desejoRegistrar = false;
		$scope.desejoLogar = true;
		$scope.curSymbol = curSymbol;


		//
		if(typeof analytics !== 'undefined') {
			window.analytics.trackView('registerCtrl');
		}

		$scope.isRegistered =  FCUser.isLogged.length;

		$scope.checkout = {};
		$scope.$on('$ionicView.enter',function(){
			$scope.userData = FCUser.isLogged();
			console.log($scope.userData);
			$scope.cartItems = FCcart.getCartItems();
			$scope.totalAmount = FCcart.getTotal();			
			$scope.checkout.id_estabelecimento = localStorage.getItem('id_estabelecimento');
			$scope.nextCheckout = $stateParams.checkout;
	   
	     $ionicLoading.hide();
		});

		$scope.actionRegister = function(checkout) {
			var data = $scope.register;
			$rootScope.$broadcast('showloader');
			dataservice.login(data)
			.then(function(d){
				$ionicLoading.hide();
				if (d.result==true) {
					$scope.userData = FCUser.Login(d.data);
					if(checkout=='true'){
					FCcart.FecharPedido();
					} else {
						$state.go('app.checkout');
					}
				}else if (d.result==false){
					$scope.isRegistered = false;
					$scope.desejoRegistrar = true;
					$scope.desejoLogar = false;
					$scope.messageShow = true;
					$scope.message = d.msg;
					
				}
				
			});
		};

}]);
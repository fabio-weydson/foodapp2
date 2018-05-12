/*global app */
'use strict';
app
.service('dataservice', [
	'$http', 
	'$q', 
	'appConfig', 
	'CacheFactory',
	function(
	$http, 
	$q, 
	appConfig,
	CacheFactory
	){
			 var appCache;
		  if (!CacheFactory.get('appCache')) {
		    appCache = CacheFactory('appCache');
		  }


	function _dishDetails (id) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getCardapios/?id_cardapio='+id;
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _pageDetails (id) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'/pages/'+id;
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _dishItems () {	
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getCardapios/?id_empresa=1';
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);		
			 appCache.put('/empresas/2/cardapio', data.cardapios);	
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _pedidos (id) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getPedido/?id_cliente='+id;
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
	}



	function _bookTable (data) {

		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'bookings';
		$http.post(url,data)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _requestOrder (data) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'adicionarPedido';
		$http.post(url, data, {
    headers : {
        'Content-Type' : 'multipart/form-data-encoded'
    }})
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
			dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _login (data) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'logon';
		$http.post(url, data,{
    headers : {
        'Content-Type' : 'multipart/form-data-encoded'
    }})
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
			dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _dishCategories () {
		var url = appConfig.apiEndPoint+'getCategorias/?id_empresa=1';
		var dfd = $q.defer();
		
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
					dfd.reject(data);
		});
		return dfd.promise;		
	}



	function _estabelecimento (id_estabelecimento) {
		var dfd = $q.defer();
		if(!id_estabelecimento) {
			// id_estabelecimento = localStorage.getItem('id_estabelecimento');
			var url = appConfig.apiEndPoint+'getEstabelecimentos';
		} else {
			var url = appConfig.apiEndPoint+'getEstabelecimentos/'+id_estabelecimento;
		}
		
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;			
	}

	function _statusPagamento(idpedido) {
		var dfd = $q.defer();
		var url = 'http://easyresto.esy.es/pagamento/statusPagamento/'+idpedido;
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;			
	}

	function _registraPagamento (data) {
		var dfd = $q.defer();
		var url = 'http://easyresto.esy.es/pagamento/registraPagamento';
		$http.post(url, data, {
		    headers : {
		        'Content-Type' : 'multipart/form-data-encoded'
		}})
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
			dfd.reject(data);
		});
		return dfd.promise;		
	}





	return {
		 dishDetails : _dishDetails,
		 dishItems : _dishItems,
		 estabelecimento : _estabelecimento,
		 pageDetails : _pageDetails,
		 bookTable : _bookTable,
		 requestOrder : _requestOrder,
		 login : _login,
		 dishCategories : _dishCategories,
		 pedidos : _pedidos,
		 statusPagamento : _statusPagamento,
		 registraPagamento : _registraPagamento,
	};

}])
.service('settings', ['$http', '$q', 'appConfig', 'curSymbol', function($http, $q, appConfig, curSymbol){
	function _roSettigns() {
		var dfd = $q.defer();
		var id_estabelecimento = localStorage.getItem('id_estabelecimento');
		var url = appConfig.apiEndPoint+'getEstabelecimentos/'+id_estabelecimento;
		$http.get(url)
		.success(function(d){
			return d;
		})
		.error(function(d){
			dfd.reject(d);
		});
	}

	return {
		roSettigns : _roSettigns
	};

}])
.service('hexafy', function() {
    function myFunc(x) {
        return x.toString(16);
    }
});
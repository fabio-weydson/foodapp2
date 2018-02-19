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
	function _slideView () {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'foods/sliders';
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
			dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _offerView () {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'offers';
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
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

	function _estabelecimento (id) {
		if(!id) {
			id = "";
		}
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getEstabelecimentos/'+id;
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
		 // Check to make sure the cache doesn't already exist
	
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

	function _offerItems () {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'offers';
		
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
	}
	function _offerDetails (id) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'offers/'+id;
		
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);			
		})
		.error(function(data){					
					dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _dishLike (id, flag) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint + 'foods/';
		url += (flag) ? 'like/' : 'dislike/';
		url += id;

		$http.get(url)
			.success(function(data){
				dfd.resolve(data);
			})
			.error(function(data){
				dfd.reject(data);
			});
		return dfd.promise;
	}

	function _specials () {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'foods/specials';
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
	function _getCategories (id) {
		var url = appConfig.apiEndPoint+'categories/'+id;
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

	function _dishFilter (data) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'categories/cats';
		$http.post(url,data)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _contact (data) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getEstabelecimentos/1';
		$http.post(url,data)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;		
	}


	function _settings (data) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getEstabelecimentos/1';
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;			
	}

	function _cliente (data) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getCliente/?id_cliente=1';
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;			
	}



	function _packages () {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'packages';
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _package (id) {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'packages/'+id;
		$http.get(url)
		.success(function(data){
			dfd.resolve(data);
		})
		.error(function(data){
				dfd.reject(data);
		});
		return dfd.promise;		
	}


	return {
		 slideView : _slideView,
		 offerView : _offerView,
		 dishLike : _dishLike,
		 specials : _specials,
		 dishDetails : _dishDetails,
		 dishItems : _dishItems,
		 estabelecimento : _estabelecimento,
		 pageDetails : _pageDetails,
		 offerItems : _offerItems,
		 offerDetails : _offerDetails,
		 bookTable : _bookTable,
		 requestOrder : _requestOrder,
		 login : _login,
		 dishCategories : _dishCategories,
		 getCategories : _getCategories,
		 dishFilter : _dishFilter,
		 contact : _contact,
		 cliente : _cliente,
		 settings : _settings,
		 pedidos : _pedidos,
		 packages: _packages,
		 package : _package
	};

}])
.service('settings', ['$http', '$q', 'appConfig', 'curSymbol', function($http, $q, appConfig, curSymbol){
	function _roSettigns() {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'getEstabelecimentos/1';
		$http.get(url)
		.success(function(d){
			// if (d.data[0].currencytype==='Real') {
			// 	d.data[0].currencytype = 'R$';
			// }
			// d.data[0].currencytype = d.data[0].currencytype + ' ';		
			// curSymbol.symbol = d.data[0].currencytype;
			// curSymbol.estabelecimento = 'sdsdsdsd';
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
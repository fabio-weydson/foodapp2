/*global app */
'use strict';
app
.service('dataservice', [
	'$http', 
	'$q', 
	'appConfig', 
	function(
	$http, 
	$q, 
	appConfig
	){
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
		var url = appConfig.apiEndPoint+'food/'+id;
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
		var url = appConfig.apiEndPoint+'foods';
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
		var url = appConfig.apiEndPoint+'order_post';
		$http.post(url, data, {
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }})
		.success(function(data){
			console.log(data)
			dfd.resolve(data);
		})
		.error(function(data){
					dfd.reject(data);
		});
		return dfd.promise;		
	}

	function _dishCategories () {
		var url = appConfig.apiEndPoint+'categories';
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
		var url = appConfig.apiEndPoint+'contacts';
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
		var url = appConfig.apiEndPoint+'settings';
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
		 pageDetails : _pageDetails,
		 offerItems : _offerItems,
		 offerDetails : _offerDetails,
		 bookTable : _bookTable,
		 requestOrder : _requestOrder,
		 dishCategories : _dishCategories,
		 getCategories : _getCategories,
		 dishFilter : _dishFilter,
		 contact : _contact,
		 settings : _settings,
		 packages: _packages,
		 package : _package
	};

}])
.service('settings', ['$http', '$q', 'appConfig', 'curSymbol', function($http, $q, appConfig, curSymbol){
	function _roSettigns() {
		var dfd = $q.defer();
		var url = appConfig.apiEndPoint+'settings';
		$http.get(url)
		.success(function(d){
			return d;
			if (d.data[0].currencytype==='Real') {
				d.data[0].currencytype = 'R$';
			}
			d.data[0].currencytype = d.data[0].currencytype + ' ';		
			curSymbol.symbol = d.data[0].currencytype;
			curSymbol.estabelecimento = 'sdsdsdsd';
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
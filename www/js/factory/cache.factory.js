/*global app */
'use strict';
app.config(function (CacheFactoryProvider) {
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });
  })
  .service('BookService', function (CacheFactory, $http) {
    if (!CacheFactory.get('bookCache')) {
      // or CacheFactory('bookCache', { ... });
      CacheFactory.createCache('bookCache', {
        deleteOnExpire: 'aggressive',
        recycleFreq: 60000
      });
    }

    var bookCache = CacheFactory.get('bookCache');

    return {
      findBookById: function (id) {
        return $http.get('/api/books/' + id, { cache: bookCache });
      }
    };
  });
/*global app */
'use strict';
app.factory('FCUser', ['dataservice', '$q', '$filter',
  function(dataservice, $q, $filter, FCUser){
    var userData = JSON.parse(localStorage.getItem('user')) || [];
    return {
      Login: function (userdata) {
        userData.push(userdata);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      },

      Logout: function () {
        userData = [];
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      },

      isLogged: function() {
        var isLogged = JSON.parse(localStorage.getItem('user')) || [];
        return isLogged;
      },



    };
}]);
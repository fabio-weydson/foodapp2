'use strict';
angular.module('templates', []);
var app = angular.module('restaurant',
  ['ionic', 'templates', 'angularMoment', 'angular.filter', 'ionic-datepicker', 'ionic-timepicker', 'ngAnimate', 'ngCordova']);
app.value('convert', window.convert)
app.value('geolib', window.geolib)
  app.run(function($ionicPlatform, $rootScope, $ionicLoading, settings, $state,$ionicPopup) {
    $ionicPlatform.ready(function() {
       navigator.splashscreen.hide();
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }



          // Enable to debug issues.
  //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };
  
  window.plugins.OneSignal
    .startInit("bd5c8c99-d161-45be-b48a-a62ff4ffb408")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
      // google analytic integration
      if(typeof analytics !== 'undefined') {
          window.analytics.startTrackerWithId('UA-XXXXX-1');
        } else {
          console.log('Google Analytics Unavailable');
      }
    

    });

    settings.roSettigns();

    // loader event
    $rootScope.$on('$stateChangeStart',
      function(event, toState ){
        $rootScope.$broadcast('showloader');
        if (toState.name==='app.thankyou') {
          $ionicLoading.hide();
        }
    });
    $rootScope.$on('showloader', function () {
      $ionicLoading.show({
        template: 'Carregando...'
      });
    });
    $rootScope.$on('hideloader', function () {
      $ionicLoading.hide();
    });


    // Disable BACK button on home
    $ionicPlatform.registerBackButtonAction(function(event) {
      if($state.current.name == "app.userPage") { // your check here
        $ionicPopup.confirm({
          title: 'Sair?',
          template: 'Deseja realmente sair?'
        }).then(function(res) {
          if (res) {
            ionic.Platform.exitApp();
          }
        })
      }
      else {
        navigator.app.backHistory();
      }
    }, 100);
  })


  // VIEWS AND THEIR CONTROLLERS
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl : 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl : 'templates/home.html',
            controller:'homeCtrl'
          }
        }
      })
      .state('app.addUser', {
        url: '/adduser',
        views: {
          'menuContent': {
            templateUrl : 'templates/addUser.html',
            controller:'adduserCtrl'
          }
        }
      })
       .state('app.estabelecimentos', {
        url: '/estabelecimentos',
        views: {
          'menuContent': {
            templateUrl : 'templates/estabelecimentos.html',
            controller:'estabelecimentosCtrl'
          }
        }
      })
       .state('app.estabelecimento', {
        url: '/estabelecimento/:estabelecimentoid',
        views: {
          'menuContent': {
            templateUrl : 'templates/estabelecimento.html',
            controller:'estabelecimentoCtrl'
          }
        }
      })
      .state('app.userPage', {
        url: '/userpage',
        views: {
          'menuContent': {
            templateUrl : 'templates/userpage.html',
            controller:'userCtrl'
          }
        }
      })
      .state('app.dishitems', {
        url: '/dishitems',
        views: {
          'menuContent': {
            templateUrl : 'templates/dishitems.html',
            controller : 'dishitemsCtrl'
          }
        }
      })
      .state('app.categories', {
        url: '/categories',
        views: {
          'menuContent': {
            templateUrl : 'templates/categories.html',
            controller : 'catsCtrl'
          }
        }
      })
      .state('app.categorie', {
        url: '/cat/:catid',
        views: {
          'menuContent': {
            templateUrl : 'templates/categories-details.html',
            controller : 'catCtrl'
          }
        }
      })
      .state('app.offers', {
        url: '/offers',
        views: {
          'menuContent': {
            templateUrl : 'templates/offers.html',
            controller : 'offersCtrl'
          }
        }
      })
      .state('app.offerdetails', {
        url: '/offer/:offerid',
        views: {
          'menuContent': {
            templateUrl : 'templates/offer-details.html',
            controller : 'offerDetailsCtrl'
          }
        }
      })
      .state('app.packages', {
        url : '/packages',
        views : {
          'menuContent' : {
            templateUrl : 'templates/packages.html',
            controller : 'packagesCtrl'
          }
        }
      })
      .state('app.package', {
        url : '/package/:packageid',
        views : {
          'menuContent' : {
            templateUrl : 'templates/package.html',
            controller : 'packageCtrl'
          }
        }
      })
      .state('app.dishdetails', {
        url: '/dishdetails/:dishid',
        views: {
          'menuContent': {
            templateUrl : 'templates/dish-details.html',
            controller:'dishDetailsCtrl'
          }
        }
      })
      .state('app.contact', {
        url: '/contact',
        views: {
          'menuContent': {
            templateUrl : 'templates/contact.html',
            controller : 'contactCtrl'
          }
        }
      })
      .state('app.booktable', {
        url: '/booktable',
        views: {
          'menuContent': {
            templateUrl : 'templates/booktable.html',
            controller : 'booktableCtrl'
          }
        }
      })
      .state('app.cart',{
        url : '/cart',
        views : {
          'menuContent': {
            templateUrl : 'templates/cart.html',
            controller : 'cartCtrl'
          }
        }
      })
       .state('app.pedidos',{
        url : '/pedidos',
        views : {
          'menuContent': {
            templateUrl : 'templates/pedidos.html',
            controller : 'pedidosCtrl'
          }
        }
      })
      .state('app.checkout',{
        url : '/checkout',
        views : {
          'menuContent': {
            templateUrl : 'templates/checkout.html',
            controller : 'checkoutCtrl'
          }
        }
      })
       .state('app.register',{
        url : '/register',
        views : {
          'menuContent': {
            templateUrl : 'templates/register.html',
            controller : 'registerCtrl'
          }
        }
      })
      .state('app.thankyou',{
        url : '/thankyou',
        views : {
          'menuContent': {
            templateUrl : 'templates/thank-you.html'
          }
        }
      })
      .state('app.walkthrough', {
          url: '/walkthrough',
          views: {
            'menuContent': {
              templateUrl : 'templates/walkthrough.html',
              controller : 'walkthrough'
            }
          }
        })
  .state('app.admob', {
    url: '/admob',
    views: {
      'menuContent': {
        templateUrl : 'templates/admob.html',
        controller : 'AdCtrl'
      }
    }
  });

        // if none of the above states are matched, use this as the fallback
    var appFirstRun = localStorage.getItem('appFirstRun');

    var estabelecimento = localStorage.getItem('estabelecimento');

    if(appFirstRun === 'true'){
      var username = localStorage.getItem('username');
      // redirect if user present
      if (username) {
        // $state.go('app.userPage');
        $urlRouterProvider.otherwise('/app/dishitems');
      }
      else {
        $urlRouterProvider.otherwise('/app/adduser');
      }
    }
    else {
      $urlRouterProvider.otherwise('/app/walkthrough');
    }
  })

  .config(function ($cordovaAppRateProvider) {
    // configration for app rate
    document.addEventListener('deviceready', function () {


      // var prefs = {
      //   language: 'en',
      //   appName: 'Talking Tom Cat 2',
      //   iosURL: '123456',
      //   androidURL: 'market://details?id=com.outfit7.talkingtom2free',
      //   windowsURL: 'ms-windows-store:Review?name=<...>'
      // };

     // $cordovaAppRateProvider.setPreferences(prefs);
    }, false);
  });

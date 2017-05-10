/*global app */
'use strict';

app.controller('walkthrough', ['$ionicSideMenuDelegate', '$scope', '$ionicSlideBoxDelegate', '$state', '$ionicLoading',
 function($ionicSideMenuDelegate, $scope, $ionicSlideBoxDelegate, $state, $ionicLoading){

  $ionicSideMenuDelegate.canDragContent(false);

  $scope.slideDetails = [{
    title: 'Bem vindo ao <b>NomedoAPP</b>',
    buttonText: 'Próximo',
    image: 'img/screen/screen-1.png'
  },
  {
    title: 'Acesse o cardápio',
    buttonText: 'Próximo',
    image: 'img/screen/screen-2.png'
  },
  {
    title: 'Reserve mesas',
    buttonText: 'Próximo',
    image: 'img/screen/screen-3.png'
  },
  {
    title: 'Pague pelo celular',
    buttonText: 'Acessar',
    image: 'img/screen/screen-4.png'
  }];

  $scope.slide = {
    current: 0,
    total: $scope.slideDetails.length,
    pagerClick: function (index) {
      $ionicSlideBoxDelegate.slide(index, 250);
    },
    slideChanged: function (index){
      $scope.slide.current = index;
    }
  };

  $scope.wkButton = function () {
    var lastslide = $scope.slide.total - 1;
    if ($scope.slide.current === lastslide) {
      localStorage.setItem('appFirstRun', 'true');
      $state.go('app.addUser');
    }else {
      $ionicSlideBoxDelegate.next();
    }
  };

	// button events
	$scope.$on('$ionicView.enter', function(){
	  $scope.slide.current = 0;
    $ionicLoading.hide();
	});
}]);

/*global app */
'use strict';
app
.controller('dishDetailsCtrl', ['$scope', '$rootScope', '$stateParams', '$filter', '$ionicViewSwitcher', '$ionicHistory', 'FCcart', 'dataservice', 'appConfig', '$ionicLoading', 'curSymbol',
  function($scope, $rootScope, $stateParams, $filter, $ionicViewSwitcher, $ionicHistory, FCcart, dataservice, appConfig , $ionicLoading, curSymbol){
    $scope.curSymbol = curSymbol;
    $scope.dish = {};
  	// analytic event
    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('dishDetailsCtrl');
    }     

    $scope.imgroot = appConfig.imgserver+'/';
    
    var id = $stateParams.dishid;

    dataservice.dishDetails(id).then(function(d){
      if(d.cardapio) {
        $scope.dish = d.cardapio;
        $scope.dish.PRA_DataAtualizacao = new Date($scope.dish.PRA_DataAtualizacao.replace(/-/g,"/"));
      } else {
        alert("Produto não encontrado.")
        $state.go('app.dishitems');
      }
      // $ionicLoading.hide();
    });
    
    $scope.getImage = function(obj){
        return 'http://easyresto.esy.es/assets/media/'+obj.replace('.jpg', '_thumb.jpg')
      };
    $scope.share = function() {
        var options = {
            subject : '',
            imagem : '',
            link: '',
        }

        window.plugins.socialsharing.share(options,onSuccess, onError);

        var onSuccess = function(result) {
          console.log("Compartilhadoo com sucesso!"); 
        }

        var onError = function(msg) {
          console.log("Falha ao compartilhar, Tente novamente");
        }

      }

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    }); 

    $scope.$watch("dish", function (value) {//I change here
      if(value) {
        $ionicLoading.hide();
      }
    });

    $rootScope.goBackState = function(){
      $ionicViewSwitcher.nextDirection('back');
      $ionicHistory.goBack(); 
    }

    $scope.$on('$ionicView.enter',function(){

      $ionicLoading.hide();
    });

}]);
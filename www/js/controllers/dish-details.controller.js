/*global app */
'use strict';
app
.controller('dishDetailsCtrl', ['$scope', '$stateParams', '$filter', 'dataservice', 'appConfig', '$ionicLoading', 'curSymbol',
  function($scope, $stateParams, $filter, dataservice, appConfig , $ionicLoading, curSymbol){
    $scope.curSymbol = curSymbol;

  	// analytic event
    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('dishDetailsCtrl');
    }     

    $scope.imgroot = appConfig.imgserver+'/';
    
    var id = $stateParams.dishid;

    dataservice.dishDetails(id).then(function(d){
      $scope.dish = d.cardapio;
      $ionicLoading.hide();
    });

    $scope.share = function() {
        var options = {
            subject : '',
            imagem : '',
            link: '',
        }

        window.plugins.socialsharing.share(options,onSuccess, onError);

        var onSuccess = function(result) {
          console.log("Compartilhadoo com sucesso!"); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }

        var onError = function(msg) {
          console.log("Falha ao compartilhar, Tente novamente");
        }

      }



    $scope.$on('$ionicView.enter',function(){
      $ionicLoading.hide();
    });

}]);
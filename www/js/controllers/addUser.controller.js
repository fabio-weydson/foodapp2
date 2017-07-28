/*global app */
'use strict';
app
.controller('adduserCtrl', ['$scope', '$timeout', '$state', '$ionicLoading',  '$http',
  function($scope, $timeout, $state,  $ionicLoading,$http){
  
  $scope.estabelecimento = localStorage.getItem('estabelecimento');
  $scope.scan = function(estabelecimento) {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            var estabelecimento = $scope.result.text.split(' - ');
            localStorage.setItem('estabelecimento', estabelecimento[0]);
            localStorage.setItem('id_estabelecimento', estabelecimento[1]);
            localStorage.setItem('mesa_estabelecimento', estabelecimento[2]);
            $scope.estabelecimento = estabelecimento[1];
            $timeout(function(){
              $scope.createUser($scope.estabelecimento);
            },1000);
            $scope.$apply();

        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };

    // clear 
    //$scope.estabelecimento = localStorage.getItem('estabelecimento');
    
    // redirect if user present
    if ($scope.estabelecimento) {
      $state.go('app.dishitems');
    }
    // else enter estabelecimento
    $scope.createUser = function(estabelecimento) {
      localStorage.setItem('estabelecimento', $scope.estabelecimento);
      $state.go('app.dishitems');
    };

    

     $scope.formData = {};
  $scope.send = function(){
    //FCMPlugin.subscribeToTopic( topic, successCallback(msg), errorCallback(err) );
    //All devices are subscribed automatically to 'all' and 'ios' or 'android' topic respectively.
    //Must match the following regular expression: "[a-zA-Z0-9-_.~%]{1,900}".
    FCMPlugin.subscribeToTopic('all');

    $http({
      method: "POST",
      dataType: 'jsonp',
      headers: {'Content-Type': 'application/json', 'Authorization': 'key=AIzaSyD9v1rbmMMAj3_KJv6woQvgOF2fSW22Ljs'},
      url: "https://fcm.googleapis.com/fcm/send",
      data: JSON.stringify(
          {
            "notification":{
              "title":"Ionic FCM Starter",  //Any value
              "body": $scope.formData.message,  //Any value
              "sound": "default", //If you want notification sound
              "click_action": "FCM_PLUGIN_ACTIVITY",  //Must be present for Android
              "icon": "fcm_push_icon"  //White icon Android resource
            },
            "data":{
              "param1":"value1",  //Any data to be retrieved in the notification callback
              "param2": $scope.formData.message
            },
            "to":"/topics/all", //Topic or single device
            "priority":"high", //If not set, notification won't be delivered on completely closed iOS app
            "restricted_package_name":"" //Optional. Set for application filtering
          }
        )
    }).success(function(data){
      $scope.reply = $scope.formData.message;
      alert("Success: " + JSON.stringify(data));
    }).error(function(data){
      alert("Error: " + JSON.stringify(data));
    });
  }

    if(typeof analytics !== 'undefined') {
      window.analytics.trackView('adduserCtrl');
    }
    $scope.$on('$ionicView.enter',function(){

   var height =  window.screen.height-250;
  $scope.mapheight = {
    'bottom': "-" + height + "px"
};
   console.log(height);
     $ionicLoading.hide();
    });
    

}]);
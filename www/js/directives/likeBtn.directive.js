/*global app */
'use strict';
app.directive('likeBtn', ['FCcart', 'dataservice', 
  function(FCcart, dataservice){
    return {
      restrict: 'AE',
      template: '<button class="button-like" ng-class="{\'selected\': thisDishLike, \'button-like--clean\': clearBtn}" ng-click="like()"><span ng-if="clearBtn">{{dishLikes}}</span></button>',
      scope: {
        dishId: '=',
        dishLikes: '=',
        clearBtn: '='
      },
      link: function(scope) {
        var likeddishes = JSON.parse(localStorage.getItem('dishlike')) || [];

        scope.$watch('dishId', function () {
          scope.thisDishLike = (likeddishes.indexOf(scope.dishId) !== -1);
        }, true);

        scope.like = function () {
          var temp = scope.thisDishLike;
          dataservice.dishLike(scope.dishId, !temp).then(function(){
            if(scope.thisDishLike){
              likeddishes.splice(likeddishes.indexOf(scope.dishId), 1);
              scope.dishLikes = String(parseInt(scope.dishLikes) - 1);
            }
            else{
              likeddishes.push(scope.dishId);
              scope.dishLikes = String(parseInt(scope.dishLikes) + 1);
            }
            //Updating like status
            scope.thisDishLike = !scope.thisDishLike;
            //Save to LS
            localStorage.setItem('dishlike', JSON.stringify(likeddishes));
          });
        };
      }
    };
  }
]);

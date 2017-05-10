/*global app */
'use strict';
app.directive('standardTimeMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: '<span>{{stime}}</span>',
    link: function(scope) {

      function prependZero(param) {
        if (String(param).length < 2) {
          return '0' + String(param);
        }
        return param;
      }

      function epochParser(val, opType) {
        if (val === null) {
          return '00:00';
        } else {
          var meridian = ['AM', 'PM'];

          if (opType === 'time') {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;
            var hoursRes = hours > 12 ? (hours - 12) : hours;

            var currentMeridian = meridian[parseInt(hours / 12)];

            return (prependZero(hoursRes) + ':' + prependZero(minutes) + ' ' + currentMeridian);
          }
        }
      }

      scope.stime = epochParser(scope.etime, 'time');
      scope.$watch('etime', function() {
        scope.stime = epochParser(scope.etime, 'time');       
      });

    }
  };
});

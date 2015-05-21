'use strict';

/* global angular:true */

angular.module('TSC', ['ui.bootstrap'])
.controller('TSCCtrl', ['$scope', '$window',
  function ($scope, $window) {
    $scope.names = ['Kilo', 'Mega', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta'];
    $scope.sizes = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    $scope.overheads = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    $scope.kilosizes = [1024, 1000];

    // Init values.
    $scope.values = {
      factor: {
        size: $scope.sizes[2],
        speed: $scope.sizes[1],
      },

      overhead: $scope.overheads[1],
      kilosize: $scope.kilosizes[0],

      size: 5,
      speed: 1,
    };

    $scope.durations = ['year', 'month', 'day', 'hour', 'minute', 'second'];

    $scope.setFactor = function (type, factor) {
      $scope.values.factor[type] = $scope.sizes[factor];
    };

    var calc = function () {
      var x = $scope.sizes.indexOf($scope.values.factor.size) + 1,
          y = $scope.sizes.indexOf($scope.values.factor.speed) + 1,

          sx = $scope.values.size * Math.pow($scope.values.kilosize, x),
          xs = sx + (sx * $scope.values.overhead / 100),
          ys = $scope.values.speed * Math.pow($scope.values.kilosize, y),

          d = $window.moment.duration(xs / ys, 'seconds');
          if (d._milliseconds < 1000) {
            d = $window.moment.duration(1, 'seconds');
          }

          $scope.duration = {
            year: d.years(),
            month: d.months(),
            day: d.days(),
            hour: d.hours(),
            minute: d.minutes(),
            second: d.seconds(),
            m: d.milliseconds(),
          };
    };

    // Watch on the values will make calc() run one time at init.
    // Or does it run in the next digest?
    $scope.$watch('values', function() {
      calc();
    }, true);
  }]);

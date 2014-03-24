;(function (ng, app) {
  'use strict'

  function computerPlayer(AIPlayers) {
    return {
      restrict: 'A',

      scope: true,
      // scope: {
      //   seat: '=computerPlayer'
      // },

      templateUrl: 'computer-player.html',


      controller: function ($scope) {
        $scope.player = null

        $scope.addPlayer = function () {
          var i = 0,
              len = AIPlayers.length,
              indexes = [],
              r
          for (; i < len; i++) {
            indexes[i] = i
          }
          while ((len = indexes.length) > 0) {
            r = Math.floor(Math.random () * len)
            if (AIPlayers[indexes[r]].seated === 0) {
              $scope.player = AIPlayers[indexes[r]]
              $scope.player.seated = $scope.seat
              $scope.player.chips = Math.floor(Math.random() * 100 + 50)
              break
            }
            indexes.splice(r, 1)
          }
        }

        $scope.removePlayer = function () {
          $scope.player.seated = 0
          $scope.player = null
        }
      },



      link: function ($scope, $el, $attrs) {
        $scope.seat = $attrs['computerPlayer']
        $scope.visible = true

        $scope.$watch('status.active', function (active) {
          $scope.visible = (active
            && $scope.player
            && $scope.player.seated)
            || !active
        })
      }
    }
  }



  app.directive('computerPlayer', ['AIPlayers', computerPlayer])

}(angular, GAME));

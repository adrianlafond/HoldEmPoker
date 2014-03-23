;(function (ng, game, poker) {
  'use strict'

  function CtrlApp($scope) {
    $scope.poker = poker

    $scope.options = {
      limits: [
        { label: 'Fixed', value: poker.FIXED_LIMIT },
        { label: 'Spread', value: poker.SPREAD_LIMIT },
        { label: 'Pot', value: poker.POT_LIMIT },
        { label: 'None', value: poker.NO_LIMIT }
      ],
      players: (function () {
        var i = 2, n = 9, arr = []
        while (i <= n) {
          arr.push(i++)
        }
        return arr
      }())
    }

    $scope.settings = {
      limit: $scope.options.limits[0],
      players: 5
    }


    $scope.startGame = function () {
      console.log('startGame()',
        $scope.settings.limit.value,
        $scope.settings.players)
    }
  }



  game.controller('CtrlApp', ['$scope', CtrlApp])

}(angular, GAME, POKER));

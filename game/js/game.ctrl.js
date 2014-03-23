;(function (ng, game, poker) {
  'use strict'

  function CtrlApp($scope, AIPlayers) {
    $scope.poker = poker

    $scope.options = {
      limits: [
        { label: 'Fixed Limit', value: poker.FIXED_LIMIT },
        { label: 'Spread Limit', value: poker.SPREAD_LIMIT },
        { label: 'Pot Limit', value: poker.POT_LIMIT },
        { label: 'No Limit', value: poker.NO_LIMIT }
      ]
    }

    $scope.settings = {
      limit: $scope.options.limits[0]
    }

    $scope.hand = {
      active: false
    }

    $scope.startGame = function () {
      console.log('startGame()',
        poker.lingo.en.limit[$scope.settings.limit.value],
        AIPlayers)
    }
  }




  game.controller('CtrlApp', ['$scope', 'AIPlayers', CtrlApp])

}(angular, GAME, POKER));

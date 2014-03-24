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

    $scope.status = {
      error: null,
      active: false
    }

    $scope.startGame = function () {
      // console.log('startGame()',
      //   poker.lingo.en.limit[$scope.settings.limit.value],
      //   AIPlayers)
      if ($scope.numPlayers() < 2) {
        $scope.status.error = 'There must be at least two players.'
      }
    }


    $scope.closeError = function () {
      $scope.status.error = null
    }

    /**
     * Returns the number of seated players, starting at 1 to include the
     * human player.
     */
    $scope.numPlayers = function () {
      var n = 1
      ng.forEach(AIPlayers, function (player, index) {
        n += player.seated ? 1 : 0
      })
      return n
    }
  }




  game.controller('CtrlApp', ['$scope', 'AIPlayers', CtrlApp])

}(angular, GAME, POKER));

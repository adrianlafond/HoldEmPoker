;(function (ng, app, poker) {
  'use strict'

  function CtrlApp($scope, AIPlayers) {
    $scope.dealer = null
    $scope.poker = poker

    $scope.options = {
      limits: [
        { label: 'Fixed Limit', value: poker.FIXED_LIMIT },
        { label: 'Spread Limit', value: poker.SPREAD_LIMIT },
        { label: 'Pot Limit', value: poker.POT_LIMIT },
        { label: 'No Limit', value: poker.NO_LIMIT }
      ],
      human: { name: 'Human', seated: 6, chips: 100 }
    }

    $scope.settings = {
      limit: $scope.options.limits[0]
    }

    $scope.status = {
      error: null,
      active: false
    }



    $scope.deal = function () {
      var opts = {
            players: getSeatedPlayers()
          },
          startOutput

      $scope.dealer = $scope.dealer || new poker.games.Holdem(opts)
      if ((startOutput = $scope.dealer.deal()).status === 200) {
        // Hand started.
        $scope.status.error = null
        $scope.status.active = true

      } else {
        // Error
        $scope.status.error = startOutput.message
        $scope.dealer = null
      }
    }


    $scope.closeError = function () {
      $scope.status.error = null
    }



    function getSeatedPlayers() {
      var players = [$scope.options.human]
      ng.forEach(AIPlayers, function (player, index) {
        if (player.seated) {
          players.push(player)
        }
      })
      players.sort(function (a, b) {
        return a.seated - b.seated
      })
      return players
    }
  }




  app.controller('CtrlApp', ['$scope', 'AIPlayers', CtrlApp])

}(angular, GAME, POKER));

;(function (ng, app, poker) {
  'use strict'


  /**
   * Main app controller.
   */
  function CtrlApp($scope, players) {
    $scope.dealer = null
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
      seats: 9,
      limit: $scope.options.limits[0]
    }

    $scope.status = {
      error: null,
      active: false,
      button: null
    }



    $scope.deal = function () {
      var opts = {
            players: getSeatedPlayers(),
            action: onAction,
            seats: 9
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


    function onAction(event) {
      console.log(event)
      switch (event.type) {
        case 'button':
          $scope.status.button = event.data.player
          break
        case 'deal:hole':
          getPlayerById(event.data.to).cards.push(event.data.card)
          break
      }
    }


    function getPlayerById(id) {
      var i = 0,
          len = players.length
      for (; i < len; i++) {
        if (players[i].id === id) {
          return players[i]
        }
      }
      return null
    }


    function getSeatedPlayers() {
      var seated = []
      ng.forEach(players, function (player, index) {
        if (player.seated) {
          seated.push(player)
        }
      })
      seated.sort(function (a, b) {
        return a.seated - b.seated
      })
      return seated
    }
  }



  /**
   * AI player controller.
   */
  function CtrlAIPlayer($scope, players) {
    $scope.player = null

    $scope.addPlayer = function () {
      var i = 0,
          len = players.length,
          indexes = [],
          r
      this.removePlayer()
      for (; i < len; i++) {
        indexes[i] = i
      }
      while ((len = indexes.length) > 0) {
        r = Math.floor(Math.random () * len)
        if (players[indexes[r]].seated === 0) {
          $scope.player = players[indexes[r]]
          $scope.player.seated = $scope.seat
          $scope.player.chips = Math.floor(Math.random() * 100 + 50)
          break
        }
        indexes.splice(r, 1)
      }
    }

    $scope.removePlayer = function () {
      if ($scope.player) {
        $scope.player.seated = 0
        $scope.player = null
      }
    }
  }



  /**
   * Human controller.
   */
  function CtrlHuman($scope, players) {
    $scope.player = players[0]
  }



  app.controller('CtrlApp', ['$scope', 'players', CtrlApp])
  app.controller('CtrlAIPlayer', ['$scope', 'players', CtrlAIPlayer])
  app.controller('CtrlHuman', ['$scope', 'players', CtrlHuman])

}(angular, GAME, POKER));

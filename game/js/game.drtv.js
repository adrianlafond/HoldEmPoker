;(function (ng, app) {
  'use strict'

  function computerPlayer(players) {
    return {
      restrict: 'A',

      scope: true,

      templateUrl: 'computer-player.html',

      controller: 'CtrlAIPlayer',

      link: function ($scope, $el, $attrs) {
        $scope.seat = +$attrs['computerPlayer']
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


  function playerCards() {
    return function ($scope, $el, $attrs) {
      var $cards = $el.find('.card')

      $scope.type = $attrs['playerCards'] || 'ai'
      $scope.cards = [null, null]
      $cards[0] = $($cards[0])
      $cards[1] = $($cards[1])

      $scope.$watch('player.cards[0]', function (card) {
        if ($scope.player) {
          $scope.cards[0] = card
          drawCard(0)
        }
      })

      $scope.$watch('player.cards[1]', function (card) {
        if ($scope.player) {
          $scope.cards[1] = card
          drawCard(1)
        }
      })

      function drawCard(index) {
        if ($scope.type === 'ai') {
          // $cards[index].css('backgroundImage')
          $cards[index].addClass('up')
        } else {

        }
      }
    }
  }



  app.directive('computerPlayer', ['players', computerPlayer])
  app.directive('playerCards', [playerCards])

}(angular, GAME));

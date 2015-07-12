(function () {
  'use strict';

  var app = {
    title: 'Hold \'em Poker',
    error: null,
    button: 0,
    players: [
      { name: 'Eamon', id: 'eamon', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Elizabeth', id: 'elizabeth', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Falstaff', id: 'falstaff', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Hal', id: 'hal', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Bill', id: 'bill', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Bebop', id: 'bebop', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Human', id: 'human', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Sophie', id: 'sophie', seated: true, chips: 100, cards: [], bet: 0 },
      { name: 'Tulip', id: 'tulip', seated: true, chips: 100, cards: [], bet: 0 }
    ],
    live: false,
    updateGame: function () {},
    gameContext: null
  };

  function initApp(handleAppUpdateFn, context) {
    // 1) randomize players (except for human)
    app.updateGame = handleAppUpdateFn;
    app.gameContext = context;
    update();
  }

  function update() {
    app.updateGame.call(app.gameContext);
  }

  function addPlayer(seat) {
    app.players[seat].seated = true;
    update();
  }

  function removePlayer(seat) {
    app.players[seat].seated = false;
    console.log(app.players[seat])
    update();
  }


  /**
   *
   */
  var PokerGame = React.createClass({

    getInitialState: function () {
      return {
        app: app
      }
    },

    componentDidMount: function () {
      initApp(this.onAppUpdate);
    },

    onAppUpdate: function () {
      this.setState({ app: app });
    },

    render: function () {
      return (
        <div>
          <PageHeader title={this.state.app.title} />
          <AlertError message={this.state.app.error} />
          <PokerTable app={this.state.app} />
        </div>
      );
    }
  });

  /**
   * Page Header: "Hold 'em Poker"
   */
  var PageHeader = React.createClass({
    propTypes: {
      title: React.PropTypes.string
    },
    render: function () {
      return (
        <div className="page-header">
          <h1>{this.props.title}</h1>
        </div>
      );
    }
  });

  /**
   * Error status box.
   */
  var AlertError = React.createClass({
    propTypes: {
      message: React.PropTypes.string
    },
    render: function () {
      if (this.props.message) {
        return (
          <div
            className="alert alert-danger">
            <p>{this.props.message}</p>
          </div>
        );
      }
      return null;
    }
  });

  /**
   *
   */
  var PokerTable = React.createClass({
    propTypes: {
      app: React.PropTypes.object.required
    },

    render: function () {
      return (
        <div className="table">
          {this.top()}
          {this.middle()}
          {this.bottom()}
        </div>
      );
    },

    // players 1 - 4
    top: function () {
      return (
        <div className="row">
          <ComputerPlayer app={this.props.app} seat={0} />
          <ComputerPlayer app={this.props.app} seat={1} />
          <ComputerPlayer app={this.props.app} seat={2} />
          <ComputerPlayer app={this.props.app} seat={3} />
        </div>
      );
    },

    // the board / center of table
    middle: function () {
      return (
        <div className="row">
          <div className="col-md-12">

            <div className="board">
              <div className="community-cards">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </div>

              <div className="pots" ng-if="status.active">
                <span ng-repeat="chips in status.pots">
                  chips
                </span>
              </div>

              <div className="setup" ng-if="!status.active">
                <select
                  className="form-control"
                  ng-model="settings.limit"
                  ng-options="opt as opt.label for opt in options.limits">
                </select>

                <button
                  className="btn btn-primary"
                  ng-click="deal()"
                  ng-disabled="">
                  Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    },

    // players 5 - 9 including human
    bottom: function () {
      return (
        <div className="row">
          <ComputerPlayer app={this.props.app} seat={8} />
          <ComputerPlayer app={this.props.app} seat={7} />
          <HumanPlayer app={this.props.app} seat={6} />
          <ComputerPlayer app={this.props.app} seat={5} />
          <ComputerPlayer app={this.props.app} seat={4} />
        </div>
      );
    }
  });

  var PlayerMixin = {
    classes: function () {
      var str = 'col-md-2 player';
      switch (this.props.seat) {
        case 2:
          str += ' col-md-offset-4';
          break;
        case 6:
          str = 'col-md-4 player';
          break;
      }
      return str;
    }
  }

  /**
   *
   */
  var ComputerPlayer = React.createClass({

    mixins: [PlayerMixin],

    propTypes: {
      app: React.PropTypes.object.required,
      seat: React.PropTypes.number.required
    },

    render: function () {
      var app = this.props.app;
      var player = app.players[this.props.seat];
      var bet = (player.bet > 0) ?
        <span className="bet">{player.bet}</span> : null;
      return (
        <div className={this.classes()}>
          <PlayerCards />
          <h4 className={player.seated ? 'seated' : null}>
            { player.name }
            <Button dealer={app.button === this.props.seat} />
          </h4>
          <h5>
            { player.seated ? player.chips : null }
            { bet }
          </h5>
          { this.props.app.live ? null : this.admin(player) }
        </div>
      );
    },

    admin: function (player) {
      if (player.seated) {
        return (
          <button
            className="btn btn-default"
            onClick={this.remove}>
            Stand up
          </button>
        );
      } else {
        return (
          <button
            className="btn btn-default"
            onClick={this.add}>
            Sit down
          </button>
        );
      }
    },

    remove: function () {
      removePlayer(this.props.seat);
    },

    add: function () {
      addPlayer(this.props.seat);
    }
  });

  /**
   *
   */
  var HumanPlayer = React.createClass({

    mixins: [PlayerMixin],

    propTypes: {
      player: React.PropTypes.object,
      seat: React.PropTypes.number
    },

    render: function () {
      return (
        <div className={this.classes()} ng-controller="CtrlHuman">
          <PlayerCards />
          <h4 className="human" contenteditable>
            Human
            <Button dealer={app.button === this.props.seat} />
          </h4>
          <h5>
            $100
            <span className="bet" ng-if="player.hasOwnProperty('bet')">
              player.bet
            </span>
          </h5>
        </div>
      );
    }
  });

  var Button = React.createClass({
    propTypes: {
      dealer: React.PropTypes.bool
    },
    render: function () {
      return this.props.dealer ?
        (
          <span className="label label-info button">
            D
          </span>
        ) :
        null;
    }
  });

  /**
   *
   */
  var PlayerCards = React.createClass({
    render: function () {
      return (
        <div className="hole-cards">
          <Card />
          <Card />
        </div>
      );
    }
  });

  /**
   *
   */
  var Card = React.createClass({
    render: function () {
      return <div className="card"></div>;
    }
  });

  React.render(
    <PokerGame />,
    document.getElementById('demo')
  );
}());

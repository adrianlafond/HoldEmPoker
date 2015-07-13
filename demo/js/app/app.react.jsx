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
    variants: [
      { label: 'Fixed Limit', value: Poker.FIXED_LIMIT },
      { label: 'Pot Limit', value: Poker.POT_LIMIT },
      { label: 'No Limit', value: Poker.NO_LIMIT }
    ],
    variant: Poker.FIXED_LIMIT,
    pots: [0],
    community: [],
    live: false,
    game: null,
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

  // Start the hand.
  function deal() {
    app.live = true;
    var players = [];
    app.players.map(function (player) {
      players.push({
        id: player.id,
        chips: player.chips
      });
    });
    app.game = new Poker.game({
      id: 'demo',
      type: Poker.HOLDEM,
      action: onGameAction,
      players: players
    });
    update();
  }

  // Callback from
  function onGameAction(action) {
    console.log(action)
  }

  function playerById(id) {
    for (var i = 0; i < app.players.length; i++) {
      if (app.players[i].id === id) {
        return app.players[i];
      }
    }
    return null;
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
              <CommunityCards app={this.props.app} />
              <Pots app={this.props.app} />
              <GameSetup app={this.props.app} />
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


  var CommunityCards = React.createClass({
    propTypes: {
      app: React.PropTypes.object.required
    },
    render: function () {
      var cards = [];
      for (var i = 0; i < 5; i++) {
        cards[i] = <Card card={this.props.app.community[i]} face="up" />
      }
      return (
        <div className="community-cards">{cards}</div>
      );
    }
  })

  var Pots = React.createClass({
    propTypes: {
      app: React.PropTypes.object.required
    },
    render: function () {
      var items = [];
      this.props.app.pots.map(function (chips, index) {
        items[index] = (<span>{chips}</span>);
      });
      return this.props.app.live ? (
        <div className="pots">{items}</div>
      ) : null;
    }
  })

  /**
   * Set game options and start/deal.
   */
  var GameSetup = React.createClass({
    propTypes: {
      app: React.PropTypes.object.required
    },
    render: function () {
      var variants = [];
      app.variants.map(function (item, index) {
        variants[index] = <option value={item.value}>{item.label}</option>
      });
      return this.props.app.live ? null : (
        <div className="setup form-inline">
          <div className="form-group">
            <select
              className="form-control"
              value={app.variant}>
              {variants}
            </select>
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              onClick={this.deal}>
              Deal
            </button>
          </div>
        </div>
      );
    },
    deal: function () {
      deal();
    }
  });

  /**
   *
   */
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
          <PlayerCards cards={player.cards.slice(0, 2)} />
          <h4 className={player.seated ? 'seated' : null}>
            { player.name }
            <DealerButton dealer={app.button === this.props.seat} />
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

    //  cards={player.cards.slice(0, 2)} cards={player.cards.slice(0, 2)}
    render: function () {
      return (
        <div className={this.classes()} ng-controller="CtrlHuman">
          <PlayerCards />
          <h4 className="human" contenteditable>
            Human
            <DealerButton dealer={app.button === this.props.seat} />
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

  var DealerButton = React.createClass({
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
    propTypes: {
      cards: React.PropTypes.array,
      face: React.PropTypes.oneOf['up', 'down']
    },
    getDefaultProps: function() {
      return {
        cards: [],
        face: 'down'
      };
    },
    render: function () {
      return (
        <div className="hole-cards">
          <Card card={this.props.cards[0]} face={this.props.face} />
          <Card card={this.props.cards[1]} face={this.props.face} />
        </div>
      );
    }
  });

  /**
   *
   */
  var Card = React.createClass({
    propTypes: {
      card: React.PropTypes.string,
      face: React.PropTypes.string
    },
    render: function () {
      var up = this.props.face === 'up';
      var classes = 'card';
      var file = this.file(this.props.card);
      var style = (up && file) ? { backgroundImage: file } : null;
      if (file) {
        classes += up ? ' up' : ' down';
      }
      return (
        <div
          className={classes}
          style={style}>
        </div>
      );
    },
    file: function (card) {
      var files = {
        '2C': '5_of_clubs.png',
        '2D': '5_of_diamonds.png',
        '2H': '5_of_hearts.png',
        '2S': '5_of_spades.png',
        '3C': '3_of_clubs.png',
        '3D': '3_of_diamonds.png',
        '3H': '3_of_hearts.png',
        '3S': '3_of_spades.png',
        '4C': '4_of_clubs.png',
        '4D': '4_of_diamonds.png',
        '4H': '4_of_hearts.png',
        '4S': '4_of_spades.png',
        '5C': '5_of_clubs.png',
        '5D': '5_of_diamonds.png',
        '5H': '5_of_hearts.png',
        '5S': '5_of_spades.png',
        '6C': '6_of_clubs.png',
        '6D': '6_of_diamonds.png',
        '6H': '6_of_hearts.png',
        '6S': '6_of_spades.png',
        '7C': '7_of_clubs.png',
        '7D': '7_of_diamonds.png',
        '7H': '7_of_hearts.png',
        '7S': '7_of_spades.png',
        '8C': '8_of_clubs.png',
        '8D': '8_of_diamonds.png',
        '8H': '8_of_hearts.png',
        '8S': '8_of_spades.png',
        '9C': '9_of_clubs.png',
        '9D': '9_of_diamonds.png',
        '9H': '9_of_hearts.png',
        '9S': '9_of_spades.png',
        'TC': '10_of_clubs.png',
        'TD': '10_of_diamonds.png',
        'TH': '10_of_hearts.png',
        'TS': '10_of_spades.png',
        'JC': 'jack_of_clubs.png',
        'JD': 'jack_of_diamonds.png',
        'JH': 'jack_of_hearts.png',
        'JS': 'jack_of_spades.png',
        'QC': 'queen_of_clubs.png',
        'QD': 'queen_of_diamonds.png',
        'QH': 'queen_of_hearts.png',
        'QS': 'queen_of_spades.png',
        'KC': 'king_of_clubs.png',
        'KD': 'king_of_diamonds.png',
        'KH': 'king_of_hearts.png',
        'KS': 'king_of_spades.png',
        'AC': 'ace_of_clubs.png',
        'AD': 'ace_of_diamonds.png',
        'AH': 'ace_of_hearts.png',
        'AS': 'ace_of_spades.png',
        'down': 'down.png'
      };
      var filename = files[card];
      return filename ? ('url(/demo/cards/' + filename +')') : null;
    }
  });

  React.render(
    <PokerGame />,
    document.getElementById('demo')
  );
}());

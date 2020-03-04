import React from 'react';
import CurrentGame from './CurrentGame';
import StartNewGame from './StartNewGame';
import ScoreCalculator from '../ScoreCalculator';

interface IState {
  players: any;
  currentGame: any;
  points: any
}

class App extends React.Component<IState> {
  readonly state: IState = {
    players: {},
    currentGame: {
      currentPlayers: {
        jan: {},
        jos: {},
        wim: {},
        kak: {}
      }
    },
    points: {
      samen8: {
        results: [-31, -28, -25, -22, -19, -16, -13, -10, 7, 10, 13, 16, 19, 30],
        amountOfPlayers: 2
      },
      samen9: {
        results: [-39, -34, -31, -28, -25, -22, -19, -16, -13, 10, 13, 16, 19, 30],
        amountOfPlayers: 2
      },
      solo6: {
        results: [-30, -27, -24, -21, -18, -15, 12, 15, 18, 18, 18, 18, 18, 18],
        amountOfPlayers: 1
      },
      abondance9: {
        results: 32,
        amountOfPlayers: 1
      },
      grotemiserie: {
        results: 36,
        amountOfPlayers: 'nvt'
      }
    }
  }

  addPlayersToCurrentGame = (players: string[]) => {
    const currentPlayers = players.reduce((acc: any, cur: any) => {
      acc[cur] = {
        scores: [],
        going: false,
        active: true
      }
      return acc;
    }, {});
    this.setState({
      currentGame: { currentPlayers }
    });
  }

  render() {
    return (
      <div className="App">
        <StartNewGame addPlayersToCurrentGame={this.addPlayersToCurrentGame} />
        <CurrentGame currentGame={this.state.currentGame} />
        <ScoreCalculator points={this.state.points} />
      </div>
    );
  }
}

export default App;

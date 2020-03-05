import React from 'react';
import CurrentGame from './CurrentGame';
import StartNewGame from './StartNewGame';
import ScoreCalculator from '../ScoreCalculator';

interface IState {
  players: any;
  currentGame: any;
  points: any;
  scoreCalcInputs: any;
}

class App extends React.Component<IState> {
  readonly state: IState = {
    players: {},
    currentGame: {
      currentPlayers: {
        //tijdelijk als voorbeeld
        jan: {
          active: true,
          going: false,
          results: [10, -5, 15, 30]
        },
        jos: {
          active: true,
          going: false,
          results: [10, -5, 15, 30]
        },
        wim: {
          active: true,
          going: false,
          results: [10, -5, 15, 30]
        },
        kak: {
          active: true,
          going: false,
          results: [10, -5, 15, 30]
        },
        //tijdelijk als voorbeeld
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
    },
    scoreCalcInputs: {
      typeInput: 'samen8',
      slagenInput: 0,
      geslaagdInput: 'geslaagd'
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

  setScoreInputsState = (id: string, value: any) => {
    const scoreCalcInputs = this.state.scoreCalcInputs;
    scoreCalcInputs[id] = value
    console.log(id, value);
    this.setState({
      scoreCalcInputs
    });
  }

  toggleNameGoing = (name: string) => {
    console.log(name);
    const currentPlayers = this.state.currentGame.currentPlayers;
    currentPlayers[name].going = !currentPlayers[name].going;
    this.setState({
      currentGame: {
        currentPlayers
      }
    })
  }

  convertScoresInHTML = (scores: number[]) => { //kan eenvoudiger??
    let totalScore = 0;
    return scores.map((el: any) => {
      totalScore += el;
      return <p>{totalScore}</p>
    });
  }

  renderScores = () => {
    const currentPlayers = this.state.currentGame.currentPlayers;
    return Object.keys(currentPlayers).map((el: any) => <td key={el}>{this.convertScoresInHTML(currentPlayers[el].results)}</td>);
  }

  render() {
    return (
      <div className="App">
        <StartNewGame addPlayersToCurrentGame={this.addPlayersToCurrentGame} />
        <CurrentGame currentGame={this.state.currentGame} toggleNameGoing={this.toggleNameGoing} renderScores={this.renderScores} />
        <ScoreCalculator points={this.state.points} setScoreInputsState={this.setScoreInputsState} />
      </div>
    );
  }
}

export default App;

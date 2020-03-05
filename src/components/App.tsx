import React from 'react';
import CurrentGame from './CurrentGame';
import StartNewGame from './StartNewGame';
import ScoreCalculator from '../ScoreCalculator';
import LeaderBoards from './LeaderBoard';

interface IState {
  players: any;
  currentGame: any;
  points: any;
  scoreCalcInputs: any;
}

class App extends React.Component<IState> {
  readonly state: IState = {
    players: {
      Miguel: {
        totScore: 100,
        gamesPlayed: 20
      },
      Jangen: {
        totScore: -50,
        gamesPlayed: 22
      },
      Jarrku: {
        totScore: 5,
        gamesPlayed: 9
      },
      Jengen: {
        totScore: -500,
        gamesPlayed: 12
      },
    },
    currentGame: {
      currentPlayers: {
        //tijdelijk als voorbeeld
        jan: {
          active: true,
          going: false,
          scores: [10, -5, 15, 30]
        },
        jos: {
          active: true,
          going: false,
          scores: [10, -5, 15, 30]
        },
        wim: {
          active: true,
          going: false,
          scores: [10, -5, 15, 30]
        },
        kak: {
          active: true,
          going: false,
          scores: [10, -5, 15, 30]
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

  convertScoresInHTML = (scores: number[]) => { //kan eenvoudiger om html terug te geven??
    let totalScore = 0;
    if (!scores) return
    return scores.map((el: any) => {
      totalScore += el;
      return <p>{totalScore}</p>
    });
  }

  renderScores = () => {
    const currentPlayers = this.state.currentGame.currentPlayers;
    return Object.keys(currentPlayers).map((el: any) => <td key={el}>{this.convertScoresInHTML(currentPlayers[el].scores)}</td>);
  }

  checkIfValid = () => {
    return true;
  };

  addScores = () => {
    //arrays maken met going en not going spelers
    let goingPlayers: any = [];    //going players ook in state steken?
    let notGoingPlayers: any = [];
    const currentPlayers = this.state.currentGame.currentPlayers;
    Object.keys(currentPlayers).map((el: any) => {   //dubbele reduce?
      this.state.currentGame.currentPlayers[el].going ? goingPlayers.push(el) : notGoingPlayers.push(el);
    });
    //info over spel en uitkomst in vars steken
    const typeSpel = this.state.scoreCalcInputs.typeInput;
    const aantalSlagen = this.state.scoreCalcInputs.slagenInput;
    const isGeslaagd = this.state.scoreCalcInputs.geslaagdInput;
    console.log(typeSpel, aantalSlagen, isGeslaagd, goingPlayers, notGoingPlayers);
    //meerdere opties: spel waar aantal slagen van belang is of spel geslaagd of niet geslaagd
    console.log(this.state.points[typeSpel].results.length);
    const results = this.state.points[typeSpel].results;
    // normaal spel
    let soloOrSamen: number;
    goingPlayers.length === 2 ? soloOrSamen = 1 : soloOrSamen = 3;
    if (results.length === 14) {
      goingPlayers.map((el: any) => {
        currentPlayers[el].scores.push(results[aantalSlagen] * soloOrSamen);
      });
      notGoingPlayers.map((el: any) => {
        currentPlayers[el].scores.push(results[aantalSlagen] * -1);
      });
      // specialekes
    } else {
      let geslaagd: number;
      isGeslaagd === 'geslaagd' ? geslaagd = 1 : geslaagd = -1;
      goingPlayers.map((el: any) => {
        currentPlayers[el].scores.push(results * soloOrSamen * geslaagd);
      });
      notGoingPlayers.map((el: any) => {
        currentPlayers[el].scores.push(results * -1 * geslaagd);
      });
    }
    this.setState({
      currentGame: {
        currentPlayers
      }
    });
  }

  render() {
    return (
      <div className="App">
        <StartNewGame addPlayersToCurrentGame={this.addPlayersToCurrentGame} />
        <CurrentGame currentGame={this.state.currentGame} toggleNameGoing={this.toggleNameGoing} renderScores={this.renderScores} />
        <ScoreCalculator points={this.state.points} setScoreInputsState={this.setScoreInputsState} checkIfValid={this.checkIfValid} addScores={this.addScores} />
        <LeaderBoards players={this.state.players} />
      </div>
    );
  }
}

export default App;

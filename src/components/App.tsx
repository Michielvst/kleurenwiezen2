import React from 'react';
import CurrentGame from './CurrentGame';
import StartNewGame from './StartNewGame';
import ScoreCalculator from '../ScoreCalculator';
import LeaderBoards from './LeaderBoard';
import base from '../base';

interface IState {
  players: any;
  currentGame: any;
  points: any;
  scoreCalcInputs: any;
}

class App extends React.Component<any> { //voor match???
  readonly state: any = {
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
        totScore: 56,
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
        wim: {
          active: true,
          amountOfGames: 0,
          going: false,
          scores: [0, 7, -3]
        },
        jos: {
          active: true,
          amountOfGames: 0,
          going: false,
          scores: [0, -7, -3]
        },
        kak: {
          active: true,
          amountOfGames: 0,
          going: false,
          scores: [0, 7, 3]
        },
        dep: {
          active: true,
          amountOfGames: 0,
          going: false,
          scores: [0, -7, 3]
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
      samen10: {
        results: [-45, -42, -39, -34, -31, -28, -25, -22, -19, -16, 13, 16, 19, 30],
        amountOfPlayers: 2
      },
      samen11: {
        results: [-51, -48, -45, -42, -39, -34, -31, -28, -25, -22, -19, 16, 19, 30],
        amountOfPlayers: 2
      },
      samen12: {
        results: [-57, -54, -51, -48, -45, -42, -39, -34, -31, -28, -25, -22, 19, 30],
        amountOfPlayers: 2
      },
      samen13: {
        results: [-63, -60, -57, -54, -51, -48, -45, -42, -39, -34, -31, -28, -25, 30],
        amountOfPlayers: 2
      },
      solo6: {
        results: [-30, -27, -24, -21, -18, -15, 12, 15, 18, 18, 18, 18, 18, 18],
        amountOfPlayers: 1
      },
      solo7: {
        results: [-36, -33, -30, -27, -24, -21, -18, 15, 18, 18, 18, 18, 18, 18],
        amountOfPlayers: 1
      },
      solo8: {
        results: [-45, -42, -39, -36, -33, -30, -27, -24, 21, 21, 21, 21, 21, 21],
        amountOfPlayers: 1
      },
      piccolo: {
        results: 24,
        amountOfPlayers: 'nvt'
      },
      kleinemiserie: {
        results: 18,
        amountOfPlayers: 'nvt'
      },
      troel: {
        results: 13,
        amountOfPlayers: 2
      },
      abondance9: {
        results: 32,
        amountOfPlayers: 1
      },
      abondance10: {
        results: 42,
        amountOfPlayers: 1
      },
      abondance11: {
        results: 60,
        amountOfPlayers: 1
      },
      grotemiserie: {
        results: 36,
        amountOfPlayers: 'nvt'
      },
      blotemiserie: {
        results: 75,
        amountOfPlayers: 'nvt'
      },
      kleinesoloslim: {
        results: 100,
        amountOfPlayers: 1
      },
      grotesoloslim: {
        results: 200,
        amountOfPlayers: 1
      },
    },
    scoreCalcInputs: {
      typeInput: 'samen8',
      slagenInput: 0,
      geslaagdInput: 'geslaagd'
    }
  }

  componentDidMount() {
    const { params } = this.props.match;
    //this.ref = base.syncState(`${params.gameId}`, {
    //  context: this,
    //  state: this.state
    //});
  }

  // StartNewGame functies

  addPlayersToCurrentGame = (players: string[]) => {
    const currentPlayers = players.reduce((acc: any, cur: any) => {
      acc[cur] = {
        scores: [],
        going: false,
        active: true,
        amountOfGames: 0
      }
      return acc;
    }, {});
    this.setState({
      currentGame: { currentPlayers }
    });
  }

  // CurrentGame functies

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
      return <p key={el}>{totalScore}</p>
    });
  }

  renderScores = () => {
    const currentPlayers = this.state.currentGame.currentPlayers;
    return Object.keys(currentPlayers).map((el: any) => <td key={el}>{this.convertScoresInHTML(currentPlayers[el].scores)}</td>);
  }

  // ScoreCalculator functies

  resetCurrentGame = () => {
    this.setState({
      currentGame: {
        currentPlayers: {
        }
      }
    });
  }

  addScoresToLeaderboard = () => {
    const players = this.state.players;
    console.log(players);
    const currentPlayers = this.state.currentGame.currentPlayers;
    Object.keys(currentPlayers).map((el: any) => {
      console.log(el);
      console.log(this.totScore(el));
      const amountOfGames = currentPlayers[el].amountOfGames
      const score = this.totScore(el) + amountOfGames;

      if (players[el]) {
        console.log(score, amountOfGames, players[el].amountOfGames);
        players[el].totScore += score;
        players[el].gamesPlayed += amountOfGames;
      } else {
        players[el] = {
          totScore: score,
          gamesPlayed: amountOfGames
        }
      }
    })
    this.setState({
      players
    });
  }

  setScoreInputsState = (id: string, value: any) => {
    const scoreCalcInputs = this.state.scoreCalcInputs;
    scoreCalcInputs[id] = value
    this.setState({
      scoreCalcInputs
    });
  }

  checkIfValid = () => {
    const typeInput = this.state.scoreCalcInputs.typeInput;
    const amount = this.state.points[typeInput].amountOfPlayers;
    const goingPlayers = Object.keys(this.state.currentGame.currentPlayers).filter((el: any) => {
      return this.state.currentGame.currentPlayers[el].going === true;
    });
    if (goingPlayers.length === amount || amount === 'nvt') {
      return true;
    }
    console.log(typeInput, amount, goingPlayers);
    return false;
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
    //meerdere opties: spel waar aantal slagen van belang is of spel geslaagd of niet geslaagd
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
    Object.keys(currentPlayers).map((el: any) => {
      currentPlayers[el].amountOfGames += 1;
    });
    this.setState({
      currentGame: {
        currentPlayers
      }
    });
  }

  // Algemene functies

  totScore = (player: string) => {
    const currentPlayer = this.state.currentGame.currentPlayers[player];
    if (currentPlayer.scores.length === 0) {
      return;
    }
    return currentPlayer.scores.reduce((acc: any, cur: any) => {
      acc += cur;
      return acc;
    });
  }

  render() {
    return (
      <div className="App">
        <StartNewGame addPlayersToCurrentGame={this.addPlayersToCurrentGame} />
        <CurrentGame
          currentGame={this.state.currentGame}
          toggleNameGoing={this.toggleNameGoing}
          renderScores={this.renderScores} />
        <ScoreCalculator
          points={this.state.points}
          currentGame={this.state.currentGame}
          addScoresToLeaderboard={this.addScoresToLeaderboard}
          setScoreInputsState={this.setScoreInputsState}
          checkIfValid={this.checkIfValid}
          totScore={this.totScore}
          addScores={this.addScores}
          resetCurrentGame={this.resetCurrentGame}
        />
        <LeaderBoards players={this.state.players} />
      </div>
    );
  }
}

export default App;

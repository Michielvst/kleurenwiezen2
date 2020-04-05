import React from "react";
import CurrentGame from "./CurrentGame";
import StartNewGame from "./StartNewGame";
import ScoreCalculator from "./ScoreCalculator";
import LeaderBoards from "./LeaderBoard";
import { points } from "./types";
import base from "./base";
import { RebaseBinding } from "re-base";

interface IState {
  players: any;
  currentGame: any;
  points: any;
  scoreCalcInputs: any;
  ref: any;
}

class App extends React.Component<any> {
  //voor match???
  readonly state: any = {
    players: {
      Miguel: {
        totScore: 100,
        stats: {
          gamesPlayed: 20,
          alleSpellen: [],
        },
      },
      Jangen: {
        totScore: -50,
        stats: {
          gamesPlayed: 25,
          alleSpellen: [],
        },
      },
      Jarrku: {
        totScore: 56,
        stats: {
          gamesPlayed: 26,
          alleSpellen: [],
        },
      },
      Jengen: {
        totScore: -500,
        stats: {
          gamesPlayed: 28,
          alleSpellen: [],
        },
      },
    },
    currentGame: {
      currentPlayers: {
        //tijdelijk als voorbeeld
        wim: {
          active: true,
          going: false,
          scores: [0, 7, -3],
          stats: {
            amountOfGames: 0,
            alleSpellenCurrent: [],
          },
        },
        jos: {
          active: true,
          going: false,
          scores: [0, -7, -3],
          stats: {
            amountOfGames: 0,
            alleSpellenCurrent: [],
          },
        },
        kak: {
          active: true,
          going: false,
          scores: [0, 7, 3],
          stats: {
            amountOfGames: 0,
            alleSpellenCurrent: [],
          },
        },
        dep: {
          active: true,
          going: false,
          scores: [0, -7, 3],
          stats: {
            amountOfGames: 0,
            alleSpellenCurrent: [],
          },
        },
        //tijdelijk als voorbeeld
      },
    },
    scoreCalcInputs: {
      typeInput: "samen8",
      slagenInput: 0,
      geslaagdInput: "geslaagd",
    },
    test: "currentGame",
  };

  ref: RebaseBinding | null = null;

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.gameId}`, {
      context: this,
      state: "currentGame",
      defaultValue: {
        currentPlayers: {
          wim: {
            active: true,
            going: false,
            scores: [0, 7, -3],
            stats: {
              amountOfGames: 0,
              alleSpellenCurrent: [],
            },
          },
          jos: {
            active: true,
            going: false,
            scores: [0, -7, -3],
            stats: {
              amountOfGames: 0,
              alleSpellenCurrent: [],
            },
          },
          kak: {
            active: true,
            going: false,
            scores: [0, 7, 3],
            stats: {
              amountOfGames: 0,
              alleSpellenCurrent: [],
            },
          },
          dep: {
            active: true,
            going: false,
            scores: [0, -7, 3],
            stats: {
              amountOfGames: 0,
              alleSpellenCurrent: [],
            },
          },
        },
      },
    });
  }

  // StartNewGame functies

  addPlayersToCurrentGame = (players: string[]) => {
    const currentPlayers = players.reduce((acc: any, cur: any) => {
      acc[cur] = {
        scores: [],
        going: false,
        active: true,
        stats: {
          amountOfGames: 0,
          alleSpellenCurrent: [],
        },
      };
      return acc;
    }, {});
    this.setState({
      currentGame: { currentPlayers },
    });
  };

  // CurrentGame functies

  toggleNameGoing = (name: string) => {
    console.log(name);
    const currentPlayers = this.state.currentGame.currentPlayers;
    currentPlayers[name].going = !currentPlayers[name].going;
    this.setState({
      currentGame: {
        currentPlayers,
      },
    });
  };

  // Gespeeld spel toevoegen aan stats

  addPlayedGameToStats = (
    player: any,
    type: any,
    aantalSlagen: any,
    geslaagd: any
  ) => {};

  convertScoresInHTML = (scores: number[]) => {
    //kan eenvoudiger om html terug te geven??
    let totalScore = 0;
    if (!scores) return;
    return scores.map((el: any) => {
      totalScore += el;
      return <p key={el}>{totalScore}</p>;
    });
  };

  renderScores = () => {
    const currentPlayers = this.state.currentGame.currentPlayers;
    return Object.keys(currentPlayers).map((el: any) => (
      <td key={Math.random()}>
        {this.convertScoresInHTML(currentPlayers[el].scores)}
      </td>
    ));
  };

  // ScoreCalculator functies

  resetCurrentGame = () => {
    this.setState({
      currentGame: {
        currentPlayers: {},
      },
    });
  };

  addScoresToLeaderboard = () => {
    const players = this.state.players;
    console.log(players);
    const currentPlayers = this.state.currentGame.currentPlayers;
    Object.keys(currentPlayers).map((el: any) => {
      console.log(el);
      console.log(this.totScore(el));
      const amountOfGames = currentPlayers[el].stats.amountOfGames;
      const score = this.totScore(el) + amountOfGames;

      if (players[el]) {
        console.log(score, amountOfGames, players[el].amountOfGames);
        players[el].totScore += score;
        players[el].stats.gamesPlayed += amountOfGames;
      } else {
        players[el] = {
          totScore: score,
          stats: { gamesPlayed: amountOfGames },
        };
      }
    });
    this.setState({
      players,
    });
  };

  setScoreInputsState = (id: string, value: any) => {
    const scoreCalcInputs = this.state.scoreCalcInputs;
    scoreCalcInputs[id] = value;
    this.setState({
      scoreCalcInputs,
    });
  };

  checkIfValid = () => {
    const typeInput = this.state.scoreCalcInputs.typeInput;
    const amount = points[typeInput].amountOfPlayers;
    const goingPlayers = Object.keys(
      this.state.currentGame.currentPlayers
    ).filter((el: any) => {
      return this.state.currentGame.currentPlayers[el].going === true;
    });
    if (goingPlayers.length === amount || amount === "nvt") {
      return true;
    }
    console.log(typeInput, amount, goingPlayers);
    return false;
  };

  addScores = () => {
    //arrays maken met going en not going spelers
    let goingPlayers: any = []; //going players ook in state steken?
    let notGoingPlayers: any = [];
    const currentPlayers = this.state.currentGame.currentPlayers;
    Object.keys(currentPlayers).map((el: any) => {
      //dubbele reduce?
      this.state.currentGame.currentPlayers[el].going
        ? goingPlayers.push(el)
        : notGoingPlayers.push(el);
    });
    //info over spel en uitkomst in vars steken
    const typeSpel = this.state.scoreCalcInputs.typeInput;
    const aantalSlagen = this.state.scoreCalcInputs.slagenInput;
    const isGeslaagd = this.state.scoreCalcInputs.geslaagdInput;
    //meerdere opties: spel waar aantal slagen van belang is of spel geslaagd of niet geslaagd
    const results: any = points[typeSpel].results;
    // normaal spel
    let soloOrSamen: number;
    goingPlayers.length === 2 ? (soloOrSamen = 1) : (soloOrSamen = 3);
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
      isGeslaagd === "geslaagd" ? (geslaagd = 1) : (geslaagd = -1);
      goingPlayers.map((el: any) => {
        currentPlayers[el].scores.push(results * soloOrSamen * geslaagd);
      });
      notGoingPlayers.map((el: any) => {
        currentPlayers[el].scores.push(results * -1 * geslaagd);
      });
    }
    Object.keys(currentPlayers).map((el: any) => {
      currentPlayers[el].stats.amountOfGames += 1;
    });
    this.setState({
      currentGame: {
        currentPlayers,
      },
    });
  };

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
  };

  render() {
    return (
      <div className="App">
        <StartNewGame addPlayersToCurrentGame={this.addPlayersToCurrentGame} />
        <CurrentGame
          currentGame={this.state.currentGame}
          toggleNameGoing={this.toggleNameGoing}
          renderScores={this.renderScores}
        />
        <ScoreCalculator
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

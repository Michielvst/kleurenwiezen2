import React, { useEffect, useState } from "react";
import CurrentGame from "./CurrentGame";
import StartNewGame from "./StartNewGame";
import ScoreCalculator from "./ScoreCalculator";
import LeaderBoards from "./LeaderBoard";
import { points } from "./types";
import base from "./base";
import { RebaseBinding } from "re-base";

// interface IState {
//   players: any;
//   currentGame: any;
//   points: any;
//   scoreCalcInputs: any;
//   ref: any;
// }

const playersState = {
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
};

const currentGameState = {
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
};

const scoreCalcInputsState = {
  typeInput: "samen8",
  slagenInput: 0,
  geslaagdInput: "geslaagd",
};

export default function AppFunction(props) {
  const [players, setPlayers] = useState(playersState);
  const [currentGame, setCurrentGame] = useState(currentGameState);
  const [scoreCalcInputs, setScoreCalcInputs] = useState(scoreCalcInputsState);

  // useEffect(() => {
  //   const { params } = props.match;
  //   const ref = base.syncState(`${params.storeId}`, {
  //     context: {
  //       setState: ({ players }) => setPlayers({ ...players }),
  //       state: { players },
  //     },
  //     state: "players",
  //   });
  //   return () => base.removeBinding(ref);
  // }, []);

  // StartNewGame functies

  function addPlayersToCurrentGame(players) {
    const currentPlayers = players.reduce((acc, cur) => {
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
    setCurrentGame({ currentPlayers: currentPlayers });
  }

  // CurrentGame functies

  function toggleNameGoing(name) {
    currentGame.currentPlayers[name].going = !currentGame.currentPlayers[name]
      .going;
    setCurrentGame({ ...currentGame });
  }

  function convertScoresInHTML(scores) {
    let totalScore = 0;
    if (!scores) return;
    return scores.map((el) => {
      totalScore += el;
      return <p key={el}>{totalScore}</p>;
    });
  }

  function renderScores() {
    return Object.keys(currentGame.currentPlayers).map((el) => (
      <td key={Math.random()}>
        {convertScoresInHTML(currentGame.currentPlayers[el].scores)}
      </td>
    ));
  }

  // ScoreCalculator functies

  function resetCurrentGame() {
    setCurrentGame({ currentPlayers: {} });
  }

  function addScoresToLeaderboard() {
    const currentPlayers = currentGame.currentPlayers;
    Object.keys(currentPlayers).map((el) => {
      const amountOfGames = currentPlayers[el].stats.amountOfGames;
      const score = totScore(el) + amountOfGames;
      if (players[el]) {
        players[el].totScore += score;
        players[el].stats.gamesPlayed += amountOfGames;
      } else {
        players[el] = {
          totScore: score,
          stats: { gamesPlayed: amountOfGames },
        };
      }
    });
    setPlayers({ ...players });
  }

  function setScoreInputsState(id, value) {
    scoreCalcInputs[id] = value;
    setScoreCalcInputs({ ...scoreCalcInputs });
  }

  function checkIfValid() {
    const typeInput = scoreCalcInputs.typeInput;
    const amount = points[typeInput].amountOfPlayers;
    const goingPlayers = Object.keys(currentGame.currentPlayers).filter(
      (el) => {
        return currentGame.currentPlayers[el].going === true;
      }
    );
    if (goingPlayers.length === amount || amount === "nvt") {
      return true;
    }
    return false;
  }

  function addScores() {
    //arrays maken met going en not going spelers
    let goingPlayers = []; //going players ook in state steken?
    let notGoingPlayers = [];
    const currentPlayers = currentGame.currentPlayers;
    Object.keys(currentPlayers).map((el) => {
      //dubbele reduce?
      currentGame.currentPlayers[el].going
        ? goingPlayers.push(el)
        : notGoingPlayers.push(el);
    });
    //info over spel en uitkomst in vars steken
    const typeSpel = scoreCalcInputs.typeInput;
    const aantalSlagen = scoreCalcInputs.slagenInput;
    const isGeslaagd = scoreCalcInputs.geslaagdInput;
    //meerdere opties: spel waar aantal slagen van belang is of spel geslaagd of niet geslaagd
    const results = points[typeSpel].results;
    // normaal spel
    let soloOrSamen;
    goingPlayers.length === 2 ? (soloOrSamen = 1) : (soloOrSamen = 3);
    if (results.length === 14) {
      goingPlayers.map((el) => {
        currentPlayers[el].scores.push(results[aantalSlagen] * soloOrSamen);
      });
      notGoingPlayers.map((el) => {
        currentPlayers[el].scores.push(results[aantalSlagen] * -1);
      });
      // specialekes
    } else {
      let geslaagd;
      isGeslaagd === "geslaagd" ? (geslaagd = 1) : (geslaagd = -1);
      goingPlayers.map((el) => {
        currentPlayers[el].scores.push(results * soloOrSamen * geslaagd);
      });
      notGoingPlayers.map((el) => {
        currentPlayers[el].scores.push(results * -1 * geslaagd);
      });
    }
    Object.keys(currentPlayers).map((el) => {
      currentPlayers[el].stats.amountOfGames += 1;
    });
    setCurrentGame({ currentPlayers });
  }

  // Algemene functies

  function totScore(player) {
    const currentPlayer = currentGame.currentPlayers[player];
    if (currentPlayer.scores.length === 0) {
      return;
    }
    return currentPlayer.scores.reduce((acc, cur) => {
      acc += cur;
      return acc;
    });
  }

  return (
    <div className="App">
      <StartNewGame addPlayersToCurrentGame={addPlayersToCurrentGame} />
      <CurrentGame
        currentGame={currentGame}
        toggleNameGoing={toggleNameGoing}
        renderScores={renderScores}
      />
      <ScoreCalculator
        currentGame={currentGame}
        addScoresToLeaderboard={addScoresToLeaderboard}
        setScoreInputsState={setScoreInputsState}
        checkIfValid={checkIfValid}
        totScore={totScore}
        addScores={addScores}
        resetCurrentGame={resetCurrentGame}
      />
      <LeaderBoards players={players} />
    </div>
  );
}

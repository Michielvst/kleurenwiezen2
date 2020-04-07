import React from "react";
import { points } from "./types";

interface Player {
  active: boolean;
  going: boolean;
  scores: number[];
  stats: {
    amountOfGames: number;
  };
}

interface Props {
  addScores: () => void;
  addScoresToLeaderboard: () => void;
  checkIfValid: () => boolean;
  resetCurrentGame: () => void;
  setScoreInputsState: (
    id: "typeInput" | "slagenInput" | "geslaagdInput",
    value: string
  ) => void;
  totScore: (player: string) => number;

  currentGame: {
    currentPlayers: {
      [name: string]: Player;
    };
  };
}

enum GameType {
  SLAGEN,
  WIN_OR_LOSE,
}

export default function ScoreCalc({
  addScoresToLeaderboard,
  addScores,
  checkIfValid,
  resetCurrentGame,
  setScoreInputsState,
  totScore,
  currentGame,
}: Props) {
  const [typeOfGame, setTypeGame] = React.useState(GameType.SLAGEN);
  const [chosenGame, setChosenGame] = React.useState(Object.keys(points)[0]);
  const [showModal, setShowModal] = React.useState(false);

  function submitScores(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIfValid()) {
      window.alert(
        "Aantal spelers klopt niet! Klik op de spelersnamen om aan te duiden wie gaat!"
      );
      return;
    }
    addScores();
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const results = points[e.currentTarget.value].results;
    setChosenGame(e.currentTarget.value);
    if (!Array.isArray(results) || results.length !== 14) {
      setTypeGame(GameType.WIN_OR_LOSE);
    } else {
      setTypeGame(GameType.SLAGEN);
    }

    setScoreInputsState("typeInput", e.currentTarget.value);
  }

  function handleAddToLoaderboard() {
    setShowModal(false);
    addScoresToLeaderboard();
    resetCurrentGame();
  }

  return (
    <div className="flex">
      <a
        href="https://nl.wikipedia.org/wiki/Kleurenwiezen"
        target="_blank"
        className="wikilink"
      >
        Spelregels en puntenrooster
      </a>
      <form className="scoreCalc" onSubmit={submitScores}>
        <select onChange={handleTypeChange} value={chosenGame}>
          {Object.keys(points).map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>
        {typeOfGame === GameType.SLAGEN && (
          <input
            type="number"
            min={0}
            max={13}
            defaultValue={0}
            onChange={(e) =>
              setScoreInputsState("slagenInput", e.currentTarget.value)
            }
          ></input>
        )}
        {typeOfGame === GameType.WIN_OR_LOSE && (
          <select
            onChange={(e) =>
              setScoreInputsState("geslaagdInput", e.currentTarget.value)
            }
          >
            <option value="geslaagd">Geslaagd</option>
            <option value="gefaald">Gefaald</option>
          </select>
        )}

        <button type="submit">Bereken Score</button>
      </form>
      <div className="endGameButton">
        <button onClick={() => setShowModal(true)}>Beëindig Spel</button>
      </div>
      {showModal && (
        <div className="endGameModal">
          <p>Zeker dat je dit spel wil beëindigen?</p>
          <button onClick={() => setShowModal(false)} className="xButton">
            x
          </button>
          <div>
            {Object.keys(currentGame.currentPlayers).map((player) => (
              <p key={player}>
                {player}: Totaalscore {totScore(player)} + Participatiebonus{" "}
                {currentGame.currentPlayers[player].stats.amountOfGames} ={" "}
                {totScore(player) +
                  currentGame.currentPlayers[player].stats.amountOfGames}
              </p>
            ))}
          </div>
          <button onClick={handleAddToLoaderboard}>
            Toevoegen aan leaderboard
          </button>
        </div>
      )}
    </div>
  );
}

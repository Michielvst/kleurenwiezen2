import React from "react";

interface IProps {
  currentGame: {
    currentPlayers: {
      [name: string]: {
        active: boolean;
        going: boolean;
        scores: number[];
        stats: {
          amountOfGames: number;
        };
      };
    };
  };
  toggleNameGoing: (name: string) => void;
  renderScores: () => JSX.Element[];
}

export default function CurrentGame2({
  currentGame,
  toggleNameGoing,
  renderScores
}: IProps) {
  return (
    <>
      <h2>Huidig Spel</h2>
      <table className="currentGameTable">
        <thead>
          <tr>
            {Object.entries(currentGame.currentPlayers).map(
              ([name, player]) => (
                <th
                  className={player.going ? "going" : undefined}
                  key={name}
                  onClick={() => toggleNameGoing(name)}
                >
                  {name}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          <tr>{renderScores()}</tr>
        </tbody>
      </table>
    </>
  );
}

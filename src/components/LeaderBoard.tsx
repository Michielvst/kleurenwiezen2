import React from "react";

interface IProps {
  players: {
    [name: string]: {
      totScore: number;
      gamesPlayed: number;
    };
  };
}

const colors: {
  [x: string]: string | undefined;
} = {
  1: "gold",
  2: "silver",
  3: "#cd7f32",
  default: "transparant"
};

export default function LeaderBoard({ players }: IProps) {
  const sortedPlayers = Object.entries(players)
    .map(([key, value]) => ({
      ...value,
      name: key
    }))
    .sort((a, b) => b.totScore - a.totScore);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table className="leaderboardTable">
        <thead>
          <tr>
            <th className="rang">Rang</th>
            <th>Speler</th>
            <th className="score">Score</th>
            <th className="spellenGespeeld">Gespeeld</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((el, idx) => (
            <tr key={el.name}>
              <td
                style={{
                  backgroundColor: colors[idx + 1] || colors.default
                }}
              >
                {idx + 1}
              </td>
              <td>{el.name}</td>
              <td>{el.totScore}</td>
              <td>{el.gamesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// export default LeaderBoards;

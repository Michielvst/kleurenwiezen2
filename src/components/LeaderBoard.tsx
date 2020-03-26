import React from "react";
interface IProps {
  players: {
    [name: string]: {
      totScore: number;
      stats: { gamesPlayed: number };
    };
  };
}

export default function LeaderBoard({ players }: IProps) {
  function topColors(rang: number): any {
    if (rang === 1) {
      return { backgroundColor: "gold" };
    } else if (rang === 2) {
      return { backgroundColor: "silver" };
    } else if (rang === 3) {
      return { backgroundColor: "#cd7f32" };
    }
  }

  function renderLeaderBoard(): any {
    const playersSorted = Object.keys(players).sort((a: any, b: any) => {
      return players[b].totScore - players[a].totScore;
    });
    return playersSorted.map((el: string) => {
      return (
        <tr key={el}>
          <td style={topColors(playersSorted.indexOf(el) + 1)}>
            {playersSorted.indexOf(el) + 1}
          </td>
          <td>{el}</td>
          <td>{players[el].totScore}</td>
          <td>{players[el].stats.gamesPlayed}</td>
        </tr>
      );
    });
  }
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
        <tbody>{renderLeaderBoard()}</tbody>
      </table>
    </div>
  );
}

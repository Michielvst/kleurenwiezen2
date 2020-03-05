import React from 'react';

interface IProps {
  players: any;
}


class LeaderBoards extends React.Component<IProps> {
  renderLeaderBoard = (): any => {
    const players = this.props.players;
    const playersSorted = Object.keys(players).sort((a: any, b: any) => {
      return players[b].totScore - players[a].totScore;
    })
    return playersSorted.map((el: string) => {
      return <tr>
        <td>{playersSorted.indexOf(el) + 1}</td>
        <td>{el}</td>
        <td>{players[el].totScore}</td>
        <td>{players[el].gamesPlayed}</td>
      </tr>
    })
  }


  render() {
    return (
      <>
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>
                Rang
              </th>
              <th>
                Speler
              </th>
              <th>
                Score
              </th>
              <th>
                Spellen Gespeeld
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderLeaderBoard()}
          </tbody>
        </table>
      </>
    );
  }
}

export default LeaderBoards;
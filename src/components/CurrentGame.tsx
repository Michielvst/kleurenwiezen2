import React from "react";

interface IProps {
  currentGame: {
    currentPlayers: {
      [name: string]: {
        active: boolean;
        amountOfGames: number;
        going: boolean;
        scores: number[];
      };
    };
  };
  toggleNameGoing: (name: string) => void;
  renderScores: () => JSX.Element[];
}

export default function CurrentGame2({ currentGame, toggleNameGoing, renderScores }: IProps) {
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
class CurrentGame extends React.Component<IProps> {
  handleNameClick = (e: any) => {
    const target = e.currentTarget;
    this.props.toggleNameGoing(target.innerText);
    target.classList.toggle("going");
  };

  render() {
    console.log(this.props);
    return (
      <>
        <h2>Huidig Spel</h2>
        <table className="currentGameTable">
          <thead>
            <tr>
              {Object.keys(this.props.currentGame.currentPlayers).map(
                (el: any) => (
                  <th key={el} onClick={this.handleNameClick}>
                    {el}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr>{this.props.renderScores()}</tr>
          </tbody>
        </table>
      </>
    );
  }
}

// export default CurrentGame;

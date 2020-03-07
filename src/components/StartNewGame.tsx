import React from "react";

interface IProps {
  addPlayersToCurrentGame: (players: string[]) => void;
}

export default function StartNewGame2({ addPlayersToCurrentGame }: IProps) {
  const [player1, setPlayer1] = React.useState("");
  const [player2, setPlayer2] = React.useState("");
  const [player3, setPlayer3] = React.useState("");
  const [player4, setPlayer4] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const valid = Boolean(player1 && player2 && player3 && player4);
        if (!valid) {
          // err msg
          return;
        }
        addPlayersToCurrentGame([player1, player2, player3, player4]);
        setPlayer1("");
        setPlayer2("");
        setPlayer3("");
        setPlayer4("");
      }}
      className="startGame"
    >
      <h2>Geef spelersnamen:</h2>
      <br></br>
      <input
        type="text"
        value={player1}
        onChange={e => setPlayer1(e.currentTarget.value)}
      />
      <input
        type="text"
        value={player2}
        onChange={e => setPlayer2(e.currentTarget.value)}
      />
      <input
        type="text"
        value={player3}
        onChange={e => setPlayer3(e.currentTarget.value)}
      />
      <input
        type="text"
        value={player4}
        onChange={e => setPlayer4(e.currentTarget.value)}
      />
      <button type="submit">Start spel</button>
    </form>
  );
}

class StartNewGame extends React.Component<IProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    const players = Array.from(e.currentTarget.elements).reduce<string[]>(
      (acc, cur: any) => {
        //waarom niet string[]?
        if (cur.type === "text") {
          acc.push(cur.value);
        }
        return acc;
      },
      []
    );
    this.props.addPlayersToCurrentGame(players);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="startGame">
        <h2>Geef spelersnamen:</h2>
        <br></br>
        <input type="text" required />
        <input type="text" required />
        <input type="text" required />
        <input type="text" required />
        <button type="submit">Start spel</button>
      </form>
    );
  }
}

// export default StartNewGame;

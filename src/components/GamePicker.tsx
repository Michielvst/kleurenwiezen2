import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

export default function GamePicker({ history }: Props) {
  const [gameName, setGameName] = React.useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        history.push(`/game/${gameName}`);
      }}
      className="gamePicker"
    >
      <h2>Please Enter Gamecode</h2>
      <input
        type="text"
        required
        placeholder="Gamecode"
        value={gameName}
        onChange={e => setGameName(e.currentTarget.value)}
      />
      <button type="submit">Go to Game</button>
    </form>
  );
}

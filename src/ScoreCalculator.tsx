import React from "react";

interface IProps {
  points: any; //waarom niet void?
  currentGame: any;
  setScoreInputsState: any;
  checkIfValid: any;
  addScores: any;
  addScoresToLeaderboard: any;
  totScore: any;
  resetCurrentGame: any;
}

interface Player {
  active: boolean;
  amountOfGames: number;
  going: boolean;
  scores: number[];
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
  points: {
    [x: string]: {
      results: number | number[];
      amountOfPlayers: number | "nvt";
    };
  };
}

enum GameType {
  SLAGEN,
  WIN_OR_LOSE
}

export default function ScoreCalc({
  addScoresToLeaderboard,
  addScores,
  checkIfValid,
  resetCurrentGame,
  setScoreInputsState,
  totScore,
  currentGame,
  points
}: Props) {
  const [typeOfGame, setTypeGame] = React.useState(GameType.SLAGEN);
  const [chosenGame, setChosenGame] = React.useState(Object.keys(points)[0]);
  const [showModal, setShowModal] = React.useState(false);

  function submitScores(e: React.FormEvent) {
    e.preventDefault();
    if (!checkIfValid()) {
      window.alert("Aantal spelers klopt niet!");
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
          {Object.keys(points).map(el => (
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
            onChange={e =>
              setScoreInputsState("slagenInput", e.currentTarget.value)
            }
          ></input>
        )}
        {typeOfGame === GameType.WIN_OR_LOSE && (
          <select
            onChange={e =>
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
            {Object.keys(currentGame.currentPlayers).map(player => (
              <p key={player}>
                {player}: Totaalscore {totScore(player)} + Participatiebonus{" "}
                {currentGame.currentPlayers[player].amountOfGames} ={" "}
                {totScore(player) +
                  currentGame.currentPlayers[player].amountOfGames}
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

class ScoreCalculator extends React.Component<IProps> {
  typeRef: any = React.createRef();
  slagenRef: any = React.createRef();
  geslaagdRef: any = React.createRef();
  endModalRef: any = React.createRef();
  endGameButtonRef: any = React.createRef();

  componentDidMount() {
    this.props.setScoreInputsState();
  }

  handleTypeChange = (e: any) => {
    if (this.props.points[this.typeRef.current.value].results.length !== 14) {
      this.slagenRef.current.hidden = true;
      this.geslaagdRef.current.hidden = false;
    } else {
      this.slagenRef.current.hidden = false;
      this.geslaagdRef.current.hidden = true;
    }
    this.handleChange(e);
  };

  handleChange = (e: any) => {
    this.props.setScoreInputsState(e.currentTarget.id, e.currentTarget.value);
  };

  submitScores = (e: any) => {
    e.preventDefault();
    if (!this.props.checkIfValid()) {
      window.alert("Aantal spelers klopt niet!");
      return;
    }
    this.props.addScores();
  };

  restoreEndGameButton = () => {
    this.endGameButtonRef.current.hidden = false;
    this.endModalRef.current.hidden = true;
  };

  handleEndGameButton = () => {
    this.endModalRef.current.hidden = false;
    this.endGameButtonRef.current.hidden = true;
  };

  handleAddToLeaderboardButton = () => {
    this.restoreEndGameButton();
    this.props.addScoresToLeaderboard();
    this.props.resetCurrentGame();
  };

  render() {
    console.log(this.props);
    return (
      <div className="flex">
        <a
          href="https://nl.wikipedia.org/wiki/Kleurenwiezen"
          target="_blank"
          className="wikilink"
        >
          Spelregels en puntenrooster
        </a>
        <form className="scoreCalc" onSubmit={this.submitScores}>
          <select
            onChange={this.handleTypeChange}
            ref={this.typeRef}
            id="typeInput"
          >
            {Object.keys(this.props.points).map((el: any) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={0}
            max={13}
            ref={this.slagenRef}
            defaultValue={0}
            id="slagenInput"
            onChange={this.handleChange}
          ></input>
          <select
            ref={this.geslaagdRef}
            id="geslaagdInput"
            onChange={this.handleChange}
            hidden
          >
            <option value="geslaagd">Geslaagd</option>
            <option value="gefaald">Gefaald</option>
          </select>
          <button type="submit">Bereken Score</button>
        </form>
        <div className="endGameButton">
          <button
            onClick={this.handleEndGameButton}
            ref={this.endGameButtonRef}
          >
            Beëindig Spel
          </button>
        </div>
        <div ref={this.endModalRef} hidden className="endGameModal">
          <p>Zeker dat je dit spel wil beëindigen?</p>
          <button onClick={this.restoreEndGameButton} className="xButton">
            x
          </button>
          <div>
            {Object.keys(this.props.currentGame.currentPlayers).map(
              (el: any) => {
                return (
                  <p key={el}>
                    {el}: Totaalscore {this.props.totScore(el)} +
                    Participatiebonus{" "}
                    {this.props.currentGame.currentPlayers[el].amountOfGames} ={" "}
                    {this.props.totScore(el) +
                      this.props.currentGame.currentPlayers[el].amountOfGames}
                  </p>
                );
              }
            )}
          </div>
          <button onClick={this.handleAddToLeaderboardButton}>
            Toevoegen aan leaderboard
          </button>
        </div>
      </div>
    );
  }
}

// export default ScoreCalculator;

import React from 'react';

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
  }

  handleChange = (e: any) => {
    this.props.setScoreInputsState(e.currentTarget.id, e.currentTarget.value);
  }

  submitScores = (e: any) => {
    e.preventDefault();
    if (!this.props.checkIfValid()) {
      return;
    };
    console.log(e.currentTarget);
    this.props.addScores();
  }

  restoreEndGameButton = () => {
    this.endGameButtonRef.current.hidden = false;
    this.endModalRef.current.hidden = true;
  }

  handleEndGameButton = () => {
    this.endModalRef.current.hidden = false;
    this.endGameButtonRef.current.hidden = true;
  }

  handleAddToLeaderboardButton = () => {
    this.restoreEndGameButton();
    this.props.addScoresToLeaderboard();
    this.props.resetCurrentGame();
  }

  render() {
    return (
      <>
        <form className='scoreCalc' onSubmit={this.submitScores}>
          <select onChange={this.handleTypeChange} ref={this.typeRef} id='typeInput' >
            {Object.keys(this.props.points).map((el: any) => (
              <option value={el} key={el} >{el}</option>
            ))}
          </select>
          <input
            type='number'
            min={0} max={13}
            ref={this.slagenRef}
            defaultValue={0} id='slagenInput'
            onChange={this.handleChange} >
          </input>
          <select ref={this.geslaagdRef} id='geslaagdInput' onChange={this.handleChange} hidden >
            <option value='geslaagd'>Geslaagd</option>
            <option value='gefaald'>Gefaald</option>
          </select>
          <button type='submit'>Bereken Score</button>
        </form>
        <div className='endGameButton'>
          <button onClick={this.handleEndGameButton} ref={this.endGameButtonRef}>Beëindig Spel</button>
        </div>
        <div ref={this.endModalRef} hidden className='endGameModal' >
          <p>Zeker dat je dit spel wil beëindigen?</p>
          <button onClick={this.restoreEndGameButton}>x</button>
          <p>
            {Object.keys(this.props.currentGame.currentPlayers).map((el: any) => {
              return <p>{el}: Totaalscore {this.props.totScore(el)} + Participatiebonus {this.props.currentGame.currentPlayers[el].amountOfGames} = {this.props.totScore(el) + this.props.currentGame.currentPlayers[el].amountOfGames}</p>;
            })}
          </p>
          <button onClick={this.handleAddToLeaderboardButton}>Toevoegen aan leaderboard</button>
        </div>
      </>
    )
  }
}

export default ScoreCalculator;
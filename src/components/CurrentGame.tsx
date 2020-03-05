import React from 'react';

interface IProps {
  currentGame: any;
  toggleNameGoing: any;
  renderScores: any;
}



class CurrentGame extends React.Component<IProps> {
  isEmpty = (obj: any) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  handleNameClick = (e: any) => {
    const target = e.currentTarget;
    this.props.toggleNameGoing(target.innerText);
    target.classList.toggle('going');
  }

  render() {
    return (
      <>
        <h2>Huidig Spel</h2>
        <table>
          <thead>
            <tr>
              {Object.keys(this.props.currentGame.currentPlayers).map((el: any) =>
                <th key={el} onClick={this.handleNameClick}>{el}</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.props.renderScores()}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default CurrentGame;
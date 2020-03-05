import React from 'react';

interface IProps {
  currentGame: any;
  toggleNameActive: any;
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
    console.log(e.currentTarget.innerText);
    this.props.toggleNameActive();
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
              {Object.keys(this.props.currentGame.currentPlayers).map((el: any) =>
                <td key={el}>0</td>
              )}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default CurrentGame;
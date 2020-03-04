import React from 'react';

interface IProps {
  currentGame: any;
}

class CurrentGame extends React.Component<IProps> {
  isEmpty = (obj: any) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(this.props.currentGame.currentPlayers).map((el: any) =>
              <th key={el}>{el}</th>
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

    );
  }
}

export default CurrentGame;
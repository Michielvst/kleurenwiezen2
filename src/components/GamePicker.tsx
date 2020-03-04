import React from 'react';

class GamePicker extends React.Component<any> {
  goToGame = (e: any) => {
    e.preventDefault();
    const gameName = e.currentTarget[0].value;
    this.props.history.push(`/game/${gameName}`);
  }

  render() {
    return (
      <form onSubmit={this.goToGame} className='gamePicker'>
        <h2>Please Enter Gamecode</h2>
        <input type='text' required placeholder='Gamecode' />
        <button type='submit'>Go to Game</button>
      </form>
    );
  }
}

export default GamePicker;
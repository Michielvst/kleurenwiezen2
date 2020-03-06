import React from 'react';

interface IProps {
  addPlayersToCurrentGame: any; //waarom niet void?
}

class StartNewGame extends React.Component<IProps> {

  handleSubmit = (e: any) => {
    e.preventDefault();
    const players: any = Array.from(e.currentTarget.elements).reduce((acc: string[], cur: any) => {  //waarom niet string[]?
      if (cur.type === 'text') {
        acc.push(cur.value);
      }
      return acc;
    }, []);
    this.props.addPlayersToCurrentGame(players);
    e.currentTarget.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='startGame' >
        <h2>Geef spelersnamen:</h2><br></br>
        <input type="text" required />
        <input type="text" required />
        <input type="text" required />
        <input type="text" required />
        <button type='submit'>Start spel</button>
      </form>
    );
  }
}

export default StartNewGame;
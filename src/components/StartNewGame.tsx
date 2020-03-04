import React from 'react';

interface IProps {
  addPlayerToCurrentGame: any; //waarom niet void?
}

class StartNewGame extends React.Component<IProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    const players: any = Array.from(e.currentTarget.elements).reduce((acc: any, cur: any) => {  //waarom niet string[]?
      console.log(cur.type);
      if (cur.type === 'text') {
        acc.push(cur.value);
      }
      return acc;
    }, []);
    players.map((el: any) => this.props.addPlayerToCurrentGame(el));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
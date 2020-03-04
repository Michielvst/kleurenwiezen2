import React from 'react';

interface IProps {
  points: any; //waarom niet void?
}

class ScoreCalculator extends React.Component<IProps> {
  typeRef: any = React.createRef();
  slagenRef: any = React.createRef();
  geslaagdRef: any = React.createRef();

  componentDidMount() {
    this.handleTypeChange();
  }

  handleTypeChange = () => {
    if (this.props.points[this.typeRef.current.value].results.length !== 14) {
      this.slagenRef.current.hidden = true;
      this.geslaagdRef.current.hidden = false;
    } else {
      this.slagenRef.current.hidden = false;
      this.geslaagdRef.current.hidden = true;
    }
  }
  render() {
    return (
      <>
        <form>
          <select onChange={this.handleTypeChange} ref={this.typeRef}>
            {Object.keys(this.props.points).map((el: any) => (
              <option value={el} key={el}>{el}</option>
            ))}
          </select>
          <input type='number' min={0} max={13} ref={this.slagenRef}></input>
          <select ref={this.geslaagdRef}>
            <option value='geslaagd'>Geslaagd</option>
            <option value='gefaald'>Gefaald</option>
          </select>
          <button type='submit'>Bereken Score</button>
        </form>
      </>
    )
  }
}

export default ScoreCalculator;
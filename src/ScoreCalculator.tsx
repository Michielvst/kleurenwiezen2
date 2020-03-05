import React from 'react';

interface IProps {
  points: any; //waarom niet void?
  setScoreInputsState: any;
}

class ScoreCalculator extends React.Component<IProps> {
  typeRef: any = React.createRef();
  slagenRef: any = React.createRef();
  geslaagdRef: any = React.createRef();

  componentDidMount() {
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

  render() {
    return (
      <>
        <form className='scoreCalc' >
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
      </>
    )
  }
}

export default ScoreCalculator;
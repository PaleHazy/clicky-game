import React from "react";
import "./App.css";
import Card from "./components/card/card.component";
import DATA from "./data.js";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      default: DATA,
      entitys: DATA,
      points: 0,
      lost: false,
    };
  }
 
  resetData = () => {
    this.setState({entitys: this.state.default, points: 0, lost:false})
  }

  shuffleData = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  handleClick = event => {
    this.state.entitys.forEach(x => {

      let selectedId = parseInt(event.target.id);

      if (x.id === selectedId) {

        if (x.clicked === false) {

          this.setState(prevState => {
            let newArr = prevState.entitys.map(item => {
              if (selectedId === item.id) {

                return { ...item, clicked: true };
              }
              return item;
            });
            this.shuffleData(newArr);
            return { entitys: newArr, points: (prevState.points += 1) };
          });
        } else {
          console.log("uou lose");
          this.setState(prevState => {
            return ({...prevState, lost: true})
          })
        }
      }
    });
  };

  render() {
    const { entitys } = this.state;
    const output = (<div><div>You Lose</div>
      <button onClick={this.resetData}>Reset</button></div>)
    return (
      <div className="App">
        <div className="cards-container">
        {entitys.map(robot => (
          <Card click={this.handleClick} key={robot.id} id={robot.id} />
        ))}
        </div>
        
        <div className="panel" >
        <div>Points = {this.state.points}</div>
        {this.state.lost && output}
      </div>
      </div>
    );
  }
}

export default App;

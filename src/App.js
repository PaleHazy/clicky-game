import React from "react";
import "./App.styles.scss";
import Card from "./components/card/card.component";
import DATA from "./data.js";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      default: DATA,
      entitys: DATA,
      points: 0,
      lost: false
    };
  }

  resetData = () => {
    this.setState({ entitys: this.state.default, points: 0, lost: false });
  };

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
    if (!this.state.lost) {
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
              return { ...prevState, lost: true };
            });
          }
        }
      });
    } else {
      console.log("no");
    }
  };

  render() {
    const { entitys, lost } = this.state;
    const pointsOutput = `Points = ${this.state.points}`;

    const lossOutput = (
      <div className='loss-output'>
        <h3>You Lose</h3>
        <button onClick={this.resetData}>Reset</button>
      </div>
    );
    return (
      <div className="App">
        <div className="cards-container">
          {entitys.map(robot => (
            <Card click={this.handleClick} key={robot.id} id={robot.id} />
          ))}
        </div>

        <div className="panel">
          <h1>Don't click the same person twice in a row..</h1>
          <div>
            <h4>{pointsOutput}</h4>
          </div>
          {lost && lossOutput}
        </div>
      </div>
    );
  }
}

export default App;

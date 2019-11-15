import React from "react";
import "./App.css";
import Card from "./components/card/card.component";
import DATA from "./data.js";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      entitys: DATA,
      points: 0,
      lost: false,
    };
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

  handleClick = e => {
    this.state.entitys.forEach(x => {
      let selectedId = parseInt(e.target.id);
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

    // let selectedId = parseInt(e.target.id);
    // this.setState(prevState => {
    //   let newArr = prevState.entitys.map(item => {
    //     if (selectedId === item.id) {
    //       return { ...item, clicked: true };
    //     }
    //     return item;
    //   });
    //   this.shuffleData(newArr);
    //   return { ...this.state, entitys: newArr };
    // });
  };
  render() {
    const { entitys } = this.state;
    return (
      <div className="App">
        {entitys.map(robot => (
          <Card click={this.handleClick} key={robot.id} id={robot.id} />
        ))}

        <div>Points = {this.state.points}</div>
        {this.state.lost && <div>You Lose</div>}
      </div>
    );
  }
}

export default App;

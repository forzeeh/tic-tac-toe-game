import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      squares: Array(9).fill(null),
      buttonShadow: '0 0 0px 1px red',
      chooseSign: 'X',
      scoreX: 0,
      scoreY: 0,
      alertText: '',
      alertShow: 'none',
      resetBtn: 1,
    }

    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  }

  scoreReset = () => {
    this.restatrGame();
    this.setState({
      scoreX: 0,
      scoreY: 0,
      buttonShadow: '0 0 13px 1px red',
    })
    setTimeout(() => {
      this.setState({ buttonShadow: '0 0 0px 1px red', });
    }, 100);
  }

  restatrGame = () => {
    this.setState({
      squares: Array(9).fill(null),
      counter: 0,
      bg: '#f5f6fa',
      displayBlock: 'flex',
      chooseSign: 'X',
    });
  }

  isWinner = (sign) => {
    let checkDraw = true;
    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i];
      // check winner
      if (this.state.squares[line[0]] === sign
        && this.state.squares[line[1]] === sign
        && this.state.squares[line[2]] === sign) {
        checkDraw = false;
        setTimeout(() => {
          if (sign === 'X') this.setState({ scoreX: this.state.scoreX + 1, alertShow: 'flex', alertText: 'x won', resetBtn: 0 });
          else if (sign === 'O') this.setState({ scoreY: this.state.scoreY + 1, alertShow: 'flex', alertText: 'o won', resetBtn: 0 });
          this.restatrGame();
        }, 50);
      }
    }
    // Check draw
    if (this.state.counter === 8 && checkDraw === true) {
      setTimeout(() => {
        this.setState({ alertShow: 'flex', alertText: 'Draw', resetBtn: 0 });
        this.restatrGame();
      }, 50);
    }
  }

  clickHandler = (e) => {
    if (e.target.innerHTML === '') {
      let data = e.target.getAttribute('data'); // clicked square
      let currentSquares = this.state.squares;
      if (currentSquares[data] === null) {  // X or Y drowing
        if (this.state.chooseSign === 'X') {
          currentSquares[data] = (this.state.counter % 2 === 0) ? 'X' : 'O';
        }
        else {
          currentSquares[data] = (this.state.counter % 2 === 0) ? 'O' : 'X';
        }
        this.setState({
          squares: currentSquares,
          displayBlock: 'none',
        });
        this.setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
      }
      // color of sign
      if (currentSquares[data] === 'X') e.target.style.color = 'red';
      else e.target.style.color = 'black';

      this.isWinner(currentSquares[data]);
    }
  }

  chooseSign = (e) => {
    if (e.target.innerHTML === 'X') {
      this.setState({ chooseSign: 'X' })
    }
    else if (e.target.innerHTML === 'O') {
      this.setState({ chooseSign: 'Y' });
    }
  }

  alertBtn = () => {
    this.setState({ alertShow: 'none', resetBtn: 1 });
    this.restatrGame();
  }

  render() {
    return (
      <div className="App container">
        <div className="game">
          <div data='0' className="squares" onClick={this.clickHandler} >{this.state.squares[0]}</div>
          <div data='1' className="squares" onClick={this.clickHandler} >{this.state.squares[1]}</div>
          <div data='2' className="squares" onClick={this.clickHandler} >{this.state.squares[2]}</div>
          <div data='3' className="squares" onClick={this.clickHandler} >{this.state.squares[3]}</div>
          <div data='4' className="squares" onClick={this.clickHandler} >{this.state.squares[4]}</div>
          <div data='5' className="squares" onClick={this.clickHandler} >{this.state.squares[5]}</div>
          <div data='6' className="squares" onClick={this.clickHandler} >{this.state.squares[6]}</div>
          <div data='7' className="squares" onClick={this.clickHandler} >{this.state.squares[7]}</div>
          <div data='8' className="squares" onClick={this.clickHandler} >{this.state.squares[8]}</div>

          <div className="score">
            <p className="x">X: {this.state.scoreX}</p>
            <p className="y">O: {this.state.scoreY}</p>
          </div>

          <div style={{ display: this.state.displayBlock }} onClick={this.chooseSign} className="choose-sign">
            <p>X</p>
            <p>O</p>
          </div>

          <div className="alert" style={{ display: this.state.alertShow }} >
            {this.state.alertText}
            <button onClick={this.alertBtn} >OK</button>
          </div>

        </div>

        <button style={{ boxShadow: this.state.buttonShadow, opacity: this.state.resetBtn }} className="restart-gameBtn" onClick={this.scoreReset} >Restart</button>



      </div>
    );
  }
}

export default App;
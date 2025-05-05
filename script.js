const Gameboard = (function () {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => gameboard;
    const setMark = (index, mark) => {
        if (index >= 0 && index < gameboard.length && gameboard[index] === "") {
          gameboard[index] = mark;
          cells = GameController.getCells();
          cells.forEach((cell) => {
            if (index === cell.dataset.index) {
              cell.innerHTML = mark;
            };
          });
          return true;
        } else {
          return false;
        }
    };
    const showBoard = () => {
      let boardDisplay = '';
      for (let i = 0; i < gameboard.length; i += 1) {
        if (gameboard[i] === "") {
          boardDisplay += "  ";
        } else {
          boardDisplay += gameboard[i];
        };
        boardDisplay += " | ";
        if ((i+1) % 3 == 0) {
          boardDisplay += '\n';
          boardDisplay += '----------';
          boardDisplay += '\n';
        };
      };
      console.log(boardDisplay);
    };
    const resetBoard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
        cells = GameController.getCells();
        cells.forEach((cell) => {
          cell.innerHTML = "";
        });
        document.getElementById('message').innerHTML="";
    }
    return { getBoard, setMark, showBoard, resetBoard };
  })();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
};



const GameController = (function () {
    const cells = document.querySelectorAll(".cell");
    const getCells = () => cells;

    

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
          if(!gameOver ) {
            StartGame(cell.dataset.index);
            console.log(123)
          }
        });
    });
    
    let player1 = Player("Player 1", "X");
    let player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const getCurrentPlayer = () => {
        return currentPlayer;
    };

    const WinPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    const CheckWin = () => {
      const board = Gameboard.getBoard();
      return WinPatterns.some(pattern => {
        [a,b,c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          gameOver = true;
          document.getElementById('message').innerHTML=`${currentPlayer.getName()} Wins!!!`
          console.log(`${currentPlayer.getName()} Wins!`);
        };
      });
    };

    const CheckTie = () => {
      if (Gameboard.getBoard().every(cell => cell !== "" )) {
        gameOver = true;
        document.getElementById('message').innerHTML=`Uh Oh Tie!!!`
        console.log("TIE!");
      };
    };

    const StartGame = (number) => {
      if (Gameboard.setMark(number, getCurrentPlayer().getMark())) {
        Gameboard.showBoard();
        CheckTie();
        CheckWin();
        switchPlayer();
      };
    }

    const restartGame = () => {
      Gameboard.resetBoard();
      player1Name = document.getElementById("player1").value;
      player2Name = document.getElementById("player2").value;
      player1 = Player(player1Name, "X");
      player2 = Player(player2Name, "O");
      currentPlayer = player1;
      gameOver = false;
    }
    
    const restartButton = document.getElementById("restart-btn");
    restartButton.addEventListener("click", restartGame);

    

    return {StartGame, getCells };

})();
  

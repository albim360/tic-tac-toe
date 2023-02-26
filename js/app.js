const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      player: 'X',
      winner: null,
      gameOver: false
    };
  },
  methods: {
    makeComputerMove() {
        if (!this.gameOver && this.player === 'O') {
          let availableCells = [];
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (this.board[i][j] === '') {
                availableCells.push({ row: i, col: j });
              }
            }
          }
          if (availableCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableCells.length);
            let randomCell = availableCells[randomIndex];
            this.board[randomCell.row][randomCell.col] = 'O';
            this.checkForWinner();
            this.player = 'X';
          }
        }
      },
      makeMove(row, col) {
        if (this.board[row][col] === '' && !this.gameOver) {
          this.board[row][col] = this.player;
          this.checkForWinner();
          if (!this.gameOver) {
            this.player = 'O';
            this.makeComputerMove();
          }
        }
      },      
    checkForWinner() {
      // Controllo righe
      for (let i = 0; i < 3; i++) {
        if (this.board[i][0] !== '' && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
          this.winner = this.board[i][0];
          this.gameOver = true;
          return;
        }
      }
      // Controllo colonne
      for (let j = 0; j < 3; j++) {
        if (this.board[0][j] !== '' && this.board[0][j] === this.board[1][j] && this.board[1][j] === this.board[2][j]) {
          this.winner = this.board[0][j];
          this.gameOver = true;
          return;
        }
      }
      // Controllo diagonali
      if (this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
        this.winner = this.board[0][0];
        this.gameOver = true;
        return;
      }
      if (this.board[0][2] !== '' && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
        this.winner = this.board[0][2];
        this.gameOver = true;
        return;
      }
      // Controllo pareggio
      if (this.isBoardFull()) {
        this.gameOver = true;
      }
    },
    isBoardFull() {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] === '') {
            return false;
          }
        }
      }
      return true;
    },
    restartGame() {
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      this.player = 'X';
      this.winner = null;
      this.gameOver = false;
    }
  }
});

app.mount('#app');

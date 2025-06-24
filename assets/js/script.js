/**
 * Chess Master - Professional Chess Game
 * * This software is the intellectual property of Nurkhan Masimzada.
 * All rights reserved. No part of this software may be reproduced,
 * distributed, or transmitted in any form or by any means without
 * the prior written permission of the author.
 *
 * For permissions and licensing inquiries, please contact:
 * Nurkhan Masimzada
 *
 * @author Nurkhan Masimzada
 * @version 1.0.0
 * @description A fully featured chess game with modern Apple-inspired design
 * @copyright 2025 Nurkhan Masimzada. All rights reserved.
 */

class ChessGame {
  constructor() {
    this.board = this.initializeBoard();
    this.currentPlayer = "white";
    this.selectedSquare = null;
    this.gameOver = false;
    this.moveHistory = [];
    this.moveCount = 1;
    this.inCheck = false;
    this.checkmate = false;

    this.pieces = {
      white: {
        king: "./assets/img/chess-figures/beyaz şah.svg",
        queen: "./assets/img/chess-figures/beyaz vezir.svg",
        rook: "./assets/img/chess-figures/beyaz kale.svg",
        bishop: "./assets/img/chess-figures/beyaz fil.svg",
        knight: "./assets/img/chess-figures/beyaz at.svg",
        pawn: "./assets/img/chess-figures/beyaz piyon.svg",
      },
      black: {
        king: "./assets/img/chess-figures/siyah şah.svg",
        queen: "./assets/img/chess-figures/siyah vezir.svg",
        rook: "./assets/img/chess-figures/siyah kale.svg",
        bishop: "./assets/img/chess-figures/siyah fil.svg",
        knight: "./assets/img/chess-figures/siyah at.svg",
        pawn: "./assets/img/chess-figures/siyah piyon.svg",
      },
    };

    this.createBoard();
    this.renderBoard();
    this.updateGameInfo();
  }

  initializeBoard() {
    const board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    for (let col = 0; col < 8; col++) {
      board[1][col] = { type: "pawn", color: "black" };
      board[6][col] = { type: "pawn", color: "white" };
    }

    const backRow = [
      "rook",
      "knight",
      "bishop",
      "queen",
      "king",
      "bishop",
      "knight",
      "rook",
    ];
    for (let col = 0; col < 8; col++) {
      board[0][col] = { type: backRow[col], color: "black" };
      board[7][col] = { type: backRow[col], color: "white" };
    }

    return board;
  }

  createBoard() {
    const boardElement = document.getElementById("chessBoard");
    boardElement.innerHTML = "";

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.className = `square ${(row + col) % 2 === 0 ? "light" : "dark"}`;
        square.dataset.row = row;
        square.dataset.col = col;
        square.addEventListener("click", () =>
          this.handleSquareClick(row, col)
        );
        boardElement.appendChild(square);
      }
    }
  }

  renderBoard() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      const row = parseInt(square.dataset.row);
      const col = parseInt(square.dataset.col);
      const piece = this.board[row][col];

      square.classList.remove("selected", "possible-move", "in-check");
      square.innerHTML = "";

      if (piece) {
        const pieceElement = document.createElement("img");
        pieceElement.className = `piece ${piece.color}`;
        pieceElement.src = this.pieces[piece.color][piece.type];
        pieceElement.alt = `${piece.color} ${piece.type}`;
        pieceElement.draggable = false;
        square.appendChild(pieceElement);
      }
    });

    if (this.selectedSquare) {
      const selectedElement = document.querySelector(
        `[data-row="${this.selectedSquare.row}"][data-col="${this.selectedSquare.col}"]`
      );
      selectedElement.classList.add("selected");

      const possibleMoves = this.getPossibleMoves(
        this.selectedSquare.row,
        this.selectedSquare.col
      );
      possibleMoves.forEach((move) => {
        const moveElement = document.querySelector(
          `[data-row="${move.row}"][data-col="${move.col}"]`
        );
        moveElement.classList.add("possible-move");
      });
    }

    if (this.inCheck) {
      const kingPos = this.findKing(this.currentPlayer);
      if (kingPos) {
        const kingElement = document.querySelector(
          `[data-row="${kingPos.row}"][data-col="${kingPos.col}"]`
        );
        kingElement.classList.add("in-check");
      }
    }
  }

  handleSquareClick(row, col) {
    if (this.gameOver) return;

    const piece = this.board[row][col];

    if (this.selectedSquare) {
      if (
        this.isValidMove(
          this.selectedSquare.row,
          this.selectedSquare.col,
          row,
          col
        )
      ) {
        this.makeMove(
          this.selectedSquare.row,
          this.selectedSquare.col,
          row,
          col
        );
        this.selectedSquare = null;
      } else if (piece && piece.color === this.currentPlayer) {
        this.selectedSquare = { row, col };
      } else {
        this.selectedSquare = null;
      }
    } else if (piece && piece.color === this.currentPlayer) {
      this.selectedSquare = { row, col };
    }

    this.renderBoard();
  }

  isValidMove(fromRow, fromCol, toRow, toCol) {
    const piece = this.board[fromRow][fromCol];
    if (!piece || piece.color !== this.currentPlayer) return false;

    const possibleMoves = this.getPossibleMoves(fromRow, fromCol);
    return possibleMoves.some(
      (move) => move.row === toRow && move.col === toCol
    );
  }

  getPossibleMoves(row, col) {
    const piece = this.board[row][col];
    if (!piece) return [];

    let moves = [];

    switch (piece.type) {
      case "pawn":
        moves = this.getPawnMoves(row, col, piece.color);
        break;
      case "rook":
        moves = this.getRookMoves(row, col);
        break;
      case "knight":
        moves = this.getKnightMoves(row, col);
        break;
      case "bishop":
        moves = this.getBishopMoves(row, col);
        break;
      case "queen":
        moves = this.getQueenMoves(row, col);
        break;
      case "king":
        moves = this.getKingMoves(row, col);
        break;
    }

    return moves.filter(
      (move) => !this.wouldBeInCheck(row, col, move.row, move.col)
    );
  }

  getPawnMoves(row, col, color) {
    const moves = [];
    const direction = color === "white" ? -1 : 1;
    const startRow = color === "white" ? 6 : 1;

    if (
      this.isInBounds(row + direction, col) &&
      !this.board[row + direction][col]
    ) {
      moves.push({ row: row + direction, col });

      if (row === startRow && !this.board[row + 2 * direction][col]) {
        moves.push({ row: row + 2 * direction, col });
      }
    }

    for (const dc of [-1, 1]) {
      const newRow = row + direction;
      const newCol = col + dc;
      if (this.isInBounds(newRow, newCol)) {
        const targetPiece = this.board[newRow][newCol];
        if (targetPiece && targetPiece.color !== color) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    }

    return moves;
  }

  getRookMoves(row, col) {
    const moves = [];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const [dr, dc] of directions) {
      for (let i = 1; i < 8; i++) {
        const newRow = row + i * dr;
        const newCol = col + i * dc;

        if (!this.isInBounds(newRow, newCol)) break;

        const targetPiece = this.board[newRow][newCol];
        if (!targetPiece) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (targetPiece.color !== this.board[row][col].color) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    }

    return moves;
  }

  getKnightMoves(row, col) {
    const moves = [];
    const knightMoves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    for (const [dr, dc] of knightMoves) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (this.isInBounds(newRow, newCol)) {
        const targetPiece = this.board[newRow][newCol];
        if (!targetPiece || targetPiece.color !== this.board[row][col].color) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    }

    return moves;
  }

  getBishopMoves(row, col) {
    const moves = [];
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    for (const [dr, dc] of directions) {
      for (let i = 1; i < 8; i++) {
        const newRow = row + i * dr;
        const newCol = col + i * dc;

        if (!this.isInBounds(newRow, newCol)) break;

        const targetPiece = this.board[newRow][newCol];
        if (!targetPiece) {
          moves.push({ row: newRow, col: newCol });
        } else {
          if (targetPiece.color !== this.board[row][col].color) {
            moves.push({ row: newRow, col: newCol });
          }
          break;
        }
      }
    }

    return moves;
  }

  getQueenMoves(row, col) {
    return [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
  }

  getKingMoves(row, col) {
    const moves = [];
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (this.isInBounds(newRow, newCol)) {
        const targetPiece = this.board[newRow][newCol];
        if (!targetPiece || targetPiece.color !== this.board[row][col].color) {
          moves.push({ row: newRow, col: newCol });
        }
      }
    }

    return moves;
  }

  isInBounds(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  makeMove(fromRow, fromCol, toRow, toCol) {
    const piece = this.board[fromRow][fromCol];
    const capturedPiece = this.board[toRow][toCol];

    this.board[toRow][toCol] = piece;
    this.board[fromRow][fromCol] = null;

    const moveNotation = this.getMoveNotation(
      piece,
      fromRow,
      fromCol,
      toRow,
      toCol,
      capturedPiece
    );
    this.recordMove(moveNotation);

    if (piece.type === "pawn" && (toRow === 0 || toRow === 7)) {
      this.board[toRow][toCol] = { type: "queen", color: piece.color };
    }

    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";

    this.checkGameState();
    this.updateGameInfo();
  }

  getMoveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece) {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

    let notation = "";

    if (piece.type !== "pawn") {
      notation += piece.type.charAt(0).toUpperCase();
    }

    if (capturedPiece) {
      if (piece.type === "pawn") {
        notation += files[fromCol];
      }
      notation += "x";
    }

    notation += files[toCol] + ranks[toRow];

    return notation;
  }

  recordMove(moveNotation) {
    if (this.currentPlayer === "white") {
      this.moveHistory.push({
        number: this.moveCount,
        white: moveNotation,
        black: "",
      });
    } else {
      this.moveHistory[this.moveHistory.length - 1].black = moveNotation;
      this.moveCount++;
    }

    this.updateMoveHistory();
  }

  updateMoveHistory() {
    const historyContent = document.getElementById("historyContent");
    historyContent.innerHTML = "";

    this.moveHistory.forEach((move) => {
      const moveRow = document.createElement("div");
      moveRow.className = "move-row";

      const moveNumber = document.createElement("div");
      moveNumber.className = "move-number";
      moveNumber.textContent = move.number;

      const whiteMove = document.createElement("div");
      whiteMove.className = "white-move";
      whiteMove.textContent = move.white || "-";

      const blackMove = document.createElement("div");
      blackMove.className = "black-move";
      blackMove.textContent = move.black || "-";

      moveRow.appendChild(moveNumber);
      moveRow.appendChild(whiteMove);
      moveRow.appendChild(blackMove);

      historyContent.appendChild(moveRow);
    });

    historyContent.scrollTop = historyContent.scrollHeight;
  }

  wouldBeInCheck(fromRow, fromCol, toRow, toCol) {
    const originalPiece = this.board[toRow][toCol];
    const movingPiece = this.board[fromRow][fromCol];

    this.board[toRow][toCol] = movingPiece;
    this.board[fromRow][fromCol] = null;

    const inCheck = this.isInCheck(movingPiece.color);

    this.board[fromRow][fromCol] = movingPiece;
    this.board[toRow][toCol] = originalPiece;

    return inCheck;
  }

  isInCheck(color) {
    const kingPos = this.findKing(color);
    if (!kingPos) return false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color !== color) {
          const moves = this.getPossibleMovesWithoutCheckValidation(row, col);
          if (
            moves.some(
              (move) => move.row === kingPos.row && move.col === kingPos.col
            )
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  getPossibleMovesWithoutCheckValidation(row, col) {
    const piece = this.board[row][col];
    if (!piece) return [];

    switch (piece.type) {
      case "pawn":
        return this.getPawnMoves(row, col, piece.color);
      case "rook":
        return this.getRookMoves(row, col);
      case "knight":
        return this.getKnightMoves(row, col);
      case "bishop":
        return this.getBishopMoves(row, col);
      case "queen":
        return this.getQueenMoves(row, col);
      case "king":
        return this.getKingMoves(row, col);
      default:
        return [];
    }
  }

  findKing(color) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.type === "king" && piece.color === color) {
          return { row, col };
        }
      }
    }
    return null;
  }

  checkGameState() {
    this.inCheck = this.isInCheck(this.currentPlayer);

    let hasValidMoves = false;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (piece && piece.color === this.currentPlayer) {
          const moves = this.getPossibleMoves(row, col);
          if (moves.length > 0) {
            hasValidMoves = true;
            break;
          }
        }
      }
      if (hasValidMoves) break;
    }

    if (!hasValidMoves) {
      this.gameOver = true;
      if (this.inCheck) {
        this.checkmate = true;
        const winner = this.currentPlayer === "white" ? "Black" : "White";
        this.showModal("Checkmate!", `${winner} wins!`);
      } else {
        this.showModal("Draw!", "Game ended in a draw (Stalemate).");
      }
    } else if (this.inCheck) {
      this.showModal(
        "Check!",
        `${this.currentPlayer === "white" ? "White" : "Black"} is in check!`
      );
    }
  }

  updateGameInfo() {
    const currentPlayerText = document.getElementById("current-player-text");
    const gameStatus = document.getElementById("game-status");

    if (this.gameOver) {
      if (this.checkmate) {
        const winner = this.currentPlayer === "white" ? "Black" : "White";
        currentPlayerText.textContent = "Game Over";
        gameStatus.textContent = `Checkmate! ${winner} Wins!`;
      } else {
        currentPlayerText.textContent = "Game Over";
        gameStatus.textContent = "Draw (Stalemate)";
      }
    } else {
      const playerName = this.currentPlayer === "white" ? "White" : "Black";
      currentPlayerText.textContent = `${playerName}'s Turn`;

      if (this.inCheck) {
        gameStatus.textContent = `${playerName} in Check!`;
      } else {
        gameStatus.textContent = "";
      }
    }
  }

  showModal(title, message) {
    const modal = document.getElementById("gameModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = "block";

    modal.onclick = (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    };
  }

  closeModal() {
    const modal = document.getElementById("gameModal");
    modal.style.display = "none";
  }

  reset() {
    this.board = this.initializeBoard();
    this.currentPlayer = "white";
    this.selectedSquare = null;
    this.gameOver = false;
    this.moveHistory = [];
    this.moveCount = 1;
    this.inCheck = false;
    this.checkmate = false;

    this.renderBoard();
    this.updateGameInfo();
    this.updateMoveHistory();
  }
}

let game;

class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("chess-theme") || "light";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.updateToggleIcon();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(this.currentTheme);
    this.updateToggleIcon();
    localStorage.setItem("chess-theme", this.currentTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  updateToggleIcon() {
    const themeIcon = document.querySelector(".theme-icon");
    if (themeIcon) {
      themeIcon.textContent = this.currentTheme === "light" ? "🌙" : "☀️";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  game = new ChessGame();
  const themeManager = new ThemeManager();

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.onclick = () => themeManager.toggleTheme();
  }

  document.getElementById("closeModal").onclick = () => game.closeModal();
  document.getElementById("modalButton").onclick = () => game.closeModal();
});

function resetGame() {
  game.reset();
}

function closeModal() {
  game.closeModal();
}

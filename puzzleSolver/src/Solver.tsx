// src/utils/solver.ts

const SIZE = 9;

// Check if placing a queen at (row, col) is valid
const isValidPlacement = (board: number[][], row: number, col: number, color: number): boolean => {
  // Check the row and column for the same color
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === color || board[i][col] === color) {
      return false;
    }
  }

  // Check diagonals for the same color
  for (let i = -SIZE + 1; i < SIZE; i++) {
    if (
      (row + i >= 0 && row + i < SIZE && col + i >= 0 && col + i < SIZE && board[row + i][col + i] === color) ||
      (row + i >= 0 && row + i < SIZE && col - i >= 0 && col - i < SIZE && board[row + i][col - i] === color)
    ) {
      return false;
    }
  }

  return true;
};

// Backtracking function to solve the board
const solve = (board: number[][], row: number): boolean => {
  // If we have placed pieces in all rows, the board is solved
  if (row === SIZE) {
    return true;
  }

  // Try placing a piece of each color in the current row
  for (let col = 0; col < SIZE; col++) {
    for (let color = 1; color <= 8; color++) {
      if (isValidPlacement(board, row, col, color)) {
        board[row][col] = color;

        // Recursively solve for the next row
        if (solve(board, row + 1)) {
          return true;
        }

        // Backtrack if placing the piece did not lead to a solution
        board[row][col] = 0;
      }
    }
  }

  return false;
};

// Solve the board and return whether a solution was found
export const solveBoard = (board: number[][]): number[][] | null => {
  const solutionBoard = board.map(row => [...row]);
  return solve(solutionBoard, 0) ? solutionBoard : null;
};

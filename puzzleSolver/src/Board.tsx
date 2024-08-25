import React, { useState } from 'react';
import Cell from './Cell';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A8', '#33FFF7', '#FF8633', '#6B33FF', '#FF333D'];

const initialBoard = Array(5).fill(null).map(() => Array(5).fill(''));

const Board: React.FC = () => {
  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [solutionFound, setSolutionFound] = useState<boolean>(false);

  const handleCellClick = (x: number, y: number) => {
    const newBoard = board.map(row => [...row]);
    newBoard[y][x] = selectedColor; // Mevcut rengi üzerine yazar
    setBoard(newBoard);
  };

  const isSafe = (board: string[][], row: number, col: number, color: string): boolean => {
    // Aynı sütunda başka bir kraliçe var mı kontrol et
    for (let i = 0; i < 5; i++) {
      if (i !== row && board[i][col] === 'Q') {
        console.log(`Hata: Satır ${row}, Sütun ${col} - Aynı sütunda başka bir kraliçe var.`);
        return false;
      }
    }

    // Aynı satırda başka bir kraliçe var mı kontrol et
    for (let j = 0; j < 5; j++) {
      if (j !== col && board[row][j] === 'Q') {
        console.log(`Hata: Satır ${row}, Sütun ${col} - Aynı satırda başka bir kraliçe var.`);
        return false;
      }
    }

    // Aynı renkte başka bir kraliçe var mı kontrol et
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (board[i][j] === 'Q' && board[i][j] === color) {
          console.log(`Hata: Satır ${row}, Sütun ${col} - Aynı renkte başka bir kraliçe var.`);
          return false;
        }
      }
    }

    
// Çaprazlarda kraliçe var mı kontrol et
  const checkDiagonal = (dx: number, dy: number) => {
    let r = row + dx;
    let c = col + dy;
    while (r >= 0 && r < 5 && c >= 0 && c < 5) {
      if (board[r][c] === 'Q') {
        console.log(`Hata: Satır ${row}, Sütun ${col} - Bir birim çaprazda bir kraliçe var.`);
        return false;
      }
      r += dx;
      c += dy;
    }
    return true;
  };

  // Sol üstten sağ alta çapraz
  if (!checkDiagonal(-1, -1)) return false;

  // Sağ üstten sol alta çapraz
  if (!checkDiagonal(-1, 1)) return false;

  // Sol alttan sağ üste çapraz
  if (!checkDiagonal(1, -1)) return false;

  // Sağ alttan sol üste çapraz
  if (!checkDiagonal(1, 1)) return false;

    

    return true;
  };

  const placeQueens = (board: string[][], row: number, usedColors: Set<string>): boolean => {
    if (row === 5) {
      console.log("Çözüm bulundu:");
      console.table(board); 
      setSolutionFound(true);
      return true; 
    }

    for (let col = 0; col < 5; col++) {
      const color = board[row][col];
      if (color !== '' && !usedColors.has(color)) {
        if (isSafe(board, row, col, color)) {
          board[row][col] = 'Q'; // Kraliçeyi yerleştir
          usedColors.add(color);

          console.log(`Satır: ${row}, Sütun: ${col}, Renk: ${color}`);
          console.table(board); 

          if (placeQueens(board, row + 1, usedColors)) return true;

         
          console.log(`Geri izleme: Satır ${row}, Sütun ${col}, Renk ${color}`);
          board[row][col] = color; // Rengi geri yükle
          usedColors.delete(color);
        }
      }
    }

    return false;
  };

  const solvePuzzle = () => {
    const newBoard = board.map(row => [...row]); // Tahtanın kopyasını oluştur
    const usedColors = new Set<string>(); // Kullanılan renkler seti

    if (placeQueens(newBoard, 0, usedColors)) {
      setBoard(newBoard); // Kraliçelerin yerleştiği tahtayı güncelle
    } else {
      setSolutionFound(false);
      console.log("Çözüm bulunamadı.");
    }
  };

  return (
    <div>
      <div className="color-picker">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <div className="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 40px)', gap: '1px' }}>
        {board.map((row, y) => 
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} x={x} y={y} color={color} onClick={handleCellClick} />
          ))
        )}
      </div>
      <button onClick={solvePuzzle}>Çözümü Hesapla</button>
      {solutionFound && <div>Çözüm bulundu!</div>}
    </div>
  );
};

export default Board;

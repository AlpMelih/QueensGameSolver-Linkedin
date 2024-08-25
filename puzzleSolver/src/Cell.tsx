import React from 'react';

interface CellProps {
  x: number;
  y: number;
  color: string;
  onClick: (x: number, y: number) => void;
}

const Cell: React.FC<CellProps> = ({ x, y, color, onClick }) => {
  return (
    <div
      onClick={() => onClick(x, y)}
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color ? 'white' : 'black', // Q harfi için beyaz renk
        fontWeight: 'bold',
        fontSize: '18px',
        cursor: 'pointer',
        border: '1px solid #ccc',
      }}
    >
      {color === 'Q' ? 'Q' : ''} {/* Kraliçe varsa göster */}
    </div>
  );
};

export default Cell;

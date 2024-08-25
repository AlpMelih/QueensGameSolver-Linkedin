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
        backgroundColor: color || 'white',
        border: '1px solid black',
        cursor: 'pointer',
      }}
    />
  );
};

export default Cell;

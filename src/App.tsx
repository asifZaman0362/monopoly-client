import React from 'react';
import './App.css';
import { Board, Cell, CellKind, isChance, isCity, isCommunityChest, isGotoJail, isIncomeTax, isParking, isSuperTax, isTrainStation, isUtility } from './protocol';

function getOtherName(kind: CellKind): string {
  if (isCommunityChest(kind)) return "Community Chest";
  else if (isGotoJail(kind)) return "Go To Jail";
  else if (isParking(kind)) return "Free Parking";
  else if (isIncomeTax(kind)) return "Income Tax";
  else if (isSuperTax(kind)) return "Super Tax";
  else return kind.toString();
}

function CellItem({ cell }: { cell: Cell }) {
  if (isCity(cell.kind)) {
    return <div className='city'>
      <div className={`${cell.kind.City.color} color`}></div>
      <p className="name">{cell.kind.City.name}</p>
    </div>
  } else if (isTrainStation(cell.kind)) {
    return <div className='station'>
      <p className="name">{`${cell.kind.TrainStation} Station`}</p>
    </div>
  } else if (isUtility(cell.kind)) {
    return <div className='utility'>
      <p className="name">{cell.kind.Utility}</p>
    </div>
  } else {
    return <div className='other'>
      <p className="name">{getOtherName(cell.kind)}</p>
    </div>
  }
}

function App() {
  const [board, setBoard] = React.useState<Board>();
  const canvas = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    fetch("http://localhost:8080/board")
      .then(res => res.json()
        .then(setBoard)
        .catch(console.error))
      .catch(console.error);
  }, []);
  React.useEffect(() => {
    function drawCell(cell: Cell, ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      const width = 1000 / 9;
      const height = 200;
      ctx.rect(cell.pos % 10 * width, Math.floor(cell.pos / 10) * height, 1000 / 9, 200);
      if (isCity(cell.kind)) {
        ctx.fillStyle = cell.kind.City.color.toLowerCase();
        ctx.fillRect(cell.pos % 10 * width, Math.floor(cell.pos / 10) * height, 1000 / 9, 30);
      }
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
    if (canvas.current) {
      let ctx = canvas.current.getContext("2d");
      if (ctx) {
        if (board) {
          for (let cell of board) {
            drawCell(cell, ctx);
          }
        }
      }
    }
    console.log("wow");
  }, [canvas, board]);
  return (
    <canvas ref={canvas} width={1400} height={1400} />
  );
}

export default App;

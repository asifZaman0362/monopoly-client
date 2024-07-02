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
  React.useEffect(() => {
    fetch("http://localhost:8080/board")
      .then(res => res.json()
        .then(setBoard)
        .catch(console.error))
      .catch(console.error);
  }, []);
  return (
    <div className="App">
      <div className='grid'>
        <div className='topRow'>
          {board && board.slice(20, 31).map(cell => {
            return <div className="cell">
              <CellItem cell={cell} />
            </div>;
          })}
        </div>
        <div className="centre-parent">
          <div className="leftColumn">
            {board && board.slice(11, 20).reverse().map(cell => {
              return <div className="cell">
                <CellItem cell={cell} />
              </div>;
            })}
          </div>
          <div className="centre">

          </div>
          <div className="rightColumn">
            {board && board.slice(31, 40).map(cell => {
              return <div className="cell">
                <CellItem cell={cell} />
              </div>;
            })}
          </div>
        </div>
        <div className='bottomRow'>
          {board && board.slice(0, 11).reverse().map(cell => {
            return <div className="cell">
              <CellItem cell={cell} />
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

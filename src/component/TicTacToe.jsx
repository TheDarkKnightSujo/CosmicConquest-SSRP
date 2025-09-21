
import { useState } from 'react';
import usetictactoe from '../hooks/use-tic-tac-toe';

const TicTacToe = () => {
  
  const {board,getStatusMessage,resetGame,handleChangeSize,handleClick}=usetictactoe();
  const [nboard,setNboard]=useState(3);
  const boardTemplate=`repeat(${nboard},1fr)`;
  
  return (
    <div>
      <div className="cosmic-container">
        <h1 className="cosmic-title">
        🚀 Cosmic Conquest 🪐
      </h1>
      <div className="game">
      <div className="status">
        <form onSubmit={(e) => {
        e.preventDefault();
        handleChangeSize(nboard);
        }}>
      <input type="number" id="boardSizeInput" min="3" className='size-input'  placeholder="min 3" value={nboard} onChange={(e) => setNboard(Number(e.target.value))}/>
      <button className='button' type='submit'  >Apply Size</button>
        </form>
      </div>
      <div className="status">
        {getStatusMessage()}
        <button className='button' onClick={resetGame}>Reset Game</button>  
      </div>  
      <div className="board" style={{
        gridTemplateColumns: boardTemplate,
      }}>
        {board.map((b,index)=>{
          return (
          <button className="cell" key={index} onClick={()=>{handleClick(index)}} disabled={b!==(null)}>
            {b}
          </button>)
        })} 
      </div>
      </div>
      </div>
    </div>
  )
}

export default TicTacToe

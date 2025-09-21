import React from 'react'
import {useState} from 'react'

const initialBoard= (i) => Array(i*i).fill(null);
const usetictactoe = () => {
    const ROCKET = "🚀";
    const EARTH = "🌍";
    const [size,setSize]=useState(3);
    const [board,setBoard]=useState(initialBoard(size));
    const [isXNext,setIsXNext]=useState(true);  
    const WINNING_PATTERNS=[];
    const findWinningPatterns=(size)=>{
        WINNING_PATTERNS.length=0;
        let temp=[];
        for(let i=0;i<size;i++)
        {
         temp.push((size+1)*i);
        }
        WINNING_PATTERNS.push(temp);
        temp=[];
        for(let i=1;i<=size;i++)
        {
            temp.push((size-1)*i);
        }
        WINNING_PATTERNS.push(temp);
        temp=[];
        // let k=0;
        // for(let i=0;i<size;i++)
        // {
        //     k=i+size;
        //     for(let j=0;j<size;j++)
        //     {
        //         temp.push(k*j);
        //     }
        //     WINNING_PATTERNS.push(temp);
        //     temp=[];
        // }
        let c=0;
        for(let i=0;i<size;i++)
        {
            c=0;
            for(let j=i;c<size;j+=size)
            {
                temp.push(j);
                c++;
            }
            WINNING_PATTERNS.push(temp);
            temp=[];
        }
        c=0;
        for(let i=0;i<size*size;i++)
        {
            temp.push(i);
            c++;
            if(c==size)
            {
            WINNING_PATTERNS.push(temp);
            temp=[];
            c=0;
            }
        }
        return WINNING_PATTERNS;
    }
    const handleChangeSize=(n)=>{
        setSize(n);
        setBoard(initialBoard(n));
    }
    const calaculateWinner=(currentboard)=>{
        const wp=findWinningPatterns(size);
        for (let i =0 ; i< wp.length;i++) {
            const pattern=wp[i];
            const first=currentboard[pattern[0]];
            if(first && pattern.every(index=>currentboard[index]==first))
                return first;
        } 
        return null;

    }
    const handleClick=(index)=>{
        const winner=calaculateWinner(board);
        console.log(winner);
        if(winner||board[index]) return
        const newBoard=[... board];
        newBoard[index]=isXNext?ROCKET : EARTH;
        setBoard(newBoard);
        setIsXNext(!isXNext);
    }
    const getStatusMessage=()=>{
        const winner=calaculateWinner(board);
        if(winner) 
            return `Player ${winner} wins!`;
        if(!board.includes(null))
            return 'Draw'
        return `Player ${isXNext?ROCKET : EARTH}'s Turn`;
    }
    const resetGame=()=>{
        setBoard(initialBoard(size));
        setIsXNext(true);
    }
  return (
    {
        board, handleClick,calaculateWinner,getStatusMessage,resetGame,handleChangeSize
    }
  )
}

export default usetictactoe
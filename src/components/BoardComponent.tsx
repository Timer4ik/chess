import React, { useEffect, useState } from 'react'
import { Board, IBoard } from '../models/Board'
import { ICell } from '../models/Cell'

const BoardComponent = () => {


    const [board, setBoard] = useState<Board>(new Board())
    const [selectedCell, setSelectedCell] = useState<ICell | null>()

    function updateBoard() {

        setBoard(board)
    }

    function handleSelectCell(cell: ICell) {

        if (!selectedCell && cell.figure) {
            if (cell?.figure.color !== board.currentPlayer){
                return
            }
        }

        if (selectedCell && cell.available) {
            board.moveFigureFromTo(selectedCell, cell)
            board.highlightAvailableMoves(null)
            setSelectedCell(null)
        }
        else if (cell.figure) {
            board.highlightAvailableMoves(cell)
            setSelectedCell(cell)
        }
        else {
            setSelectedCell(null)
            board.highlightAvailableMoves(cell)
        }
        updateBoard()


    }

    const isSelectedCell = (cell: ICell) => cell.id === selectedCell?.id

    return (
        <div className='board'>
            {board.cells.map((rows, idx) => {
                return (
                    <div key={idx} className="rows">
                        {rows.map(cell => {
                            return (
                                <div
                                    onClick={() => handleSelectCell(cell)}
                                    key={cell.id}
                                    className={["cell", cell.color, isSelectedCell(cell) ? "selected" : ""].join(" ")}
                                >
                                    {cell.figure && cell.available && <div className='cell-available' />}
                                    {!cell.figure && cell.available && <div className='available' />}
                                    {cell.figure?.image && <img src={cell.figure?.image} alt="" />}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default BoardComponent
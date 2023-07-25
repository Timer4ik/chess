import React, { useEffect, useState } from 'react'
import { Board, IBoard } from '../models/Board'
import { ICell } from '../models/Cell'

const BoardComponent = () => {


    const [board, setBoard] = useState<IBoard>(new Board())
    const [selectedCell, setSelectedCell] = useState<ICell | null>()

    function updateBoard() {
        const newBoard = new Board()
        newBoard.cells = board.cells

        setBoard(newBoard)
    }

    function handleSelectCell(cell: ICell) {

        if (!selectedCell) {
            board.highlightAvailableMoves(cell)
        }

        if (!cell.figure || cell.available) {

            if (selectedCell) board.moveFigureFromTo(selectedCell, cell)

            setSelectedCell(null)

            if (selectedCell) {
                board.highlightAvailableMoves(selectedCell)
            }

            return
        }

        updateBoard()

        

        setSelectedCell(cell)
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
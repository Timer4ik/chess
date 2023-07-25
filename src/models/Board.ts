import { v4 } from "uuid";
import { Cell, CellColors, ICell } from "./Cell";
import { Pawn } from "./figures/Pawn";
import { FigureColors, FigureNames, IFigure } from "./figures/Figure";
import { King } from "./figures/King";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";

export interface IBoard {
    cells: Cell[][]
    initCells(): void
    initFigures(): void
    highlightAvailableMoves(cell: ICell | null): void
    moveFigureFromTo(fromCell: ICell, toCell: ICell): void
    addPawns(): void
    addKings(): void
    addQueens(): void
    addRooks(): void
    addKnights(): void
    addBishops(): void
}

export class Board implements IBoard {

    cells: Cell[][] = []

    constructor() {
        this.initCells()
        this.initFigures()
    }

    initCells() {
        for (let y = 0; y < 8; y++) {
            let row: Cell[] = []
            for (let x = 0; x < 8; x++) {
                row.push(new Cell(x, y, null, (x + y) % 2 == 0 ? CellColors.Black : CellColors.White))
            }
            this.cells.push(row)
        }
    }

    initFigures() {
        this.addBishops()
        this.addKings()
        this.addKnights()
        // this.addPawns()
        this.addQueens()
        this.addRooks()
    }

    moveFigureFromTo(fromCell: ICell, toCell: ICell) {
        if (this.canMove(fromCell, toCell)) {
            toCell.figure = fromCell.figure
            fromCell.figure = null
        }
    }

    canMove(fromCell: ICell, toCell: ICell) {
        if (toCell.figure?.name === FigureNames.KING) {
            return false
        }

        if (toCell.figure?.color === fromCell.figure?.color) {
            return false
        }

        switch (fromCell.figure?.name) {
            case FigureNames.QUEEN:
                if (this.isEmptyVertical(fromCell, toCell)) {
                    return true
                }
                if (this.isEmptyHorizontal(fromCell, toCell)) {
                    return true
                }
                if (this.isEmptyDiagonal(fromCell, toCell)) {
                    return true
                }
                break
            case FigureNames.PAWN:
                if (fromCell.color == "black") {
                    if (fromCell.x) {

                    }
                }
                break
        }

        return false
    }

    highlightAvailableMoves(cell: Cell) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {

                if (cell.figure === null) {
                    this.cells[y][x].available = false
                    continue
                }

                if (this.canMove(cell, this.cells[y][x])) {
                    this.cells[y][x].available = true
                }
                else {
                    this.cells[y][x].available = false
                }
            }
        }
    }

    isEmptyVerticalMoveCount(fromCell: ICell, toCell: Cell, moveCount: number): boolean {

        if (fromCell.x !== toCell.x) {
            return false
        }

        const min = fromCell.y
        const max = min + moveCount

        for (let y = min + 1; y < max; y++) {
            if (this?.getCell(fromCell.x, y).figure) {
                return false
            }
        }

        return true
    }
    isEmptyVertical(fromCell: ICell, toCell: Cell): boolean {

        if (fromCell.x !== toCell.x) {
            return false
        }

        for (let y = fromCell.y + 1; y < toCell.y; y++) {
            if (this?.getCell(fromCell.x, y).figure) {
                return false
            }
        }

        for (let y = fromCell.y - 1; y > toCell.y; y--) {
            if (this?.getCell(fromCell.x, y).figure) {
                return false
            }
        }

        return true
    }
    isEmptyHorizontal(fromCell: ICell, toCell: Cell): boolean {

        if (fromCell.y !== toCell.y) {
            return false
        }

        for (let x = fromCell.x + 1; x < toCell.x; x++) {
            if (this?.getCell(x, fromCell.y).figure) {
                return false
            }
        }

        for (let x = fromCell.x - 1; x > toCell.x; x--) {
            if (this?.getCell(x, fromCell.y).figure) {
                return false
            }
        }

        return true
    }
    isEmptyDiagonal(fromCell: ICell, toCell: Cell): boolean {

        if (fromCell.x - fromCell.y !== toCell.x - toCell.y && 8-fromCell.x - 8-fromCell.y !== 8-toCell.y - 8-toCell.x ) {
            return false
        }

        for (let x = fromCell.x + 1, y = fromCell.y + 1; x < toCell.x && y < toCell.y; x++, y++) {
            if (this?.getCell(x, y).figure) {
                return false
            }
        }
        for (let x = fromCell.x - 1, y = fromCell.y - 1; x > toCell.x && y > toCell.y; x--, y--) {
            if (this?.getCell(x, y).figure) {
                return false
            }
        }

        for (let x = fromCell.x - 1, y = fromCell.y + 1; x > toCell.x && y < toCell.y; x--, y++) {
            if (this?.getCell(x, y).figure) {
                return false
            }
        }
        for (let x = fromCell.x + 1, y = fromCell.y - 1; x < toCell.x && y > toCell.y; x++, y--) {
            if (this?.getCell(x, y).figure) {
                return false
            }
        }


        return true
    }

    getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    setCellFigure(x: number, y: number, figure: IFigure) {
        this.cells[x][y].figure = figure
    }

    setCellAvailable(x: number, y: number, available: boolean) {
        this.cells[x][y].available = available
    }

    addPawns() {
        for (let i = 0; i < 8; i++) {
            this.setCellFigure(6, i, new Pawn(FigureColors.WHITE))
            this.setCellFigure(1, i, new Pawn(FigureColors.BLACK))
        }
    }

    addKings() {
        this.setCellFigure(7, 4, new King(FigureColors.WHITE))
        this.setCellFigure(0, 3, new King(FigureColors.BLACK))
    }
    addQueens() {
        this.setCellFigure(7, 3, new Queen(FigureColors.WHITE))
        this.setCellFigure(0, 4, new Queen(FigureColors.BLACK))
    }
    addRooks() {
        this.setCellFigure(0, 0, new Rook(FigureColors.BLACK))
        this.setCellFigure(0, 7, new Rook(FigureColors.BLACK))
        this.setCellFigure(7, 0, new Rook(FigureColors.WHITE))
        this.setCellFigure(7, 7, new Rook(FigureColors.WHITE))
    }
    addKnights() {
        this.setCellFigure(0, 1, new Knight(FigureColors.BLACK))
        this.setCellFigure(0, 6, new Knight(FigureColors.BLACK))
        this.setCellFigure(7, 1, new Knight(FigureColors.WHITE))
        this.setCellFigure(7, 6, new Knight(FigureColors.WHITE))
    }
    addBishops() {
        this.setCellFigure(0, 2, new Bishop(FigureColors.BLACK))
        this.setCellFigure(0, 5, new Bishop(FigureColors.BLACK))
        this.setCellFigure(7, 2, new Bishop(FigureColors.WHITE))
        this.setCellFigure(7, 5, new Bishop(FigureColors.WHITE))
    }
}


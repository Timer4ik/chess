import { v4 } from "uuid"
import { FigureNames, IFigure } from "./figures/Figure"

export enum CellColors {
    Black = "black",
    White = "white"
}

export interface ICell {
    readonly id: string
    readonly x: number
    readonly y: number
    readonly color: CellColors
    available: boolean
    figure: IFigure | null
    // canMove(cell: ICell): void
}

export class Cell implements ICell {
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly color: CellColors
    available: boolean
    figure: IFigure | null


    constructor(x: number, y: number, figure: IFigure | null, color: CellColors) {
        this.id = v4()
        this.x = x
        this.y = y
        this.figure = figure
        this.color = color
        this.available = false
    }
}

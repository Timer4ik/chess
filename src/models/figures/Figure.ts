import { v4 } from "uuid";

export enum FigureNames {
    PAWN = "Пешка",
    KNIGHT = "Конь",
    BISHOP = "Слон",
    ROOK = "Ладья",
    QUEEN = "Ферзь",
    KING = "Король"
}

export enum FigureColors {
    BLACK = "black",
    WHITE = "white"
}

export interface IFigure {
    readonly id: string
    readonly name: FigureNames | null
    readonly color: FigureColors
    isFirstMove:boolean
    image: string | undefined
}

export class Figure implements IFigure {
    readonly id: string;
    readonly name: FigureNames | null
    readonly color: FigureColors
    isFirstMove:boolean
    image: string | undefined

    constructor(color:FigureColors) {
        this.id = v4()
        this.name = null
        this.color = color
        this.isFirstMove = true
    }
}

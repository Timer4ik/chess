import whitePawnImage from "../../assets/figures/white-pawn.png"
import blackPawnImage from "../../assets/figures/black-pawn.png"
import { Figure, FigureColors, FigureNames } from "./Figure"

export class Pawn extends Figure {

    name: FigureNames | null;

    constructor(color: FigureColors) {
        super(color)

        this.name = FigureNames.PAWN
        this.image = color == FigureColors.BLACK ? blackPawnImage : whitePawnImage
    }

}
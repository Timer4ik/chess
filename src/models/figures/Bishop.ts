
import whiteBishopImage from "../../assets/figures/white-bishop.png"
import blackBishopImage from "../../assets/figures/black-bishop.png"
import { Figure, FigureColors, FigureNames } from "./Figure"

export class Bishop extends Figure {

    name: FigureNames | null;

    constructor(color:FigureColors) {
       super(color)

       this.name = FigureNames.BISHOP
       this.image = color == FigureColors.BLACK ? blackBishopImage : whiteBishopImage
    }

}
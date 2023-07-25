
import whiteQueenImage from "../../assets/figures/white-queen.png"
import blackQueenImage from "../../assets/figures/black-queen.png"
import { Figure, FigureColors, FigureNames } from "./Figure"

export class Queen extends Figure {

    name: FigureNames | null;

    constructor(color: FigureColors) {
        super(color)

        this.name = FigureNames.QUEEN
        this.image = color == FigureColors.BLACK ? blackQueenImage : whiteQueenImage
    }

}
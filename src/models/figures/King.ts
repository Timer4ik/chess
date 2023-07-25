
import whiteKingImage from "../../assets/figures/white-king.png"
import blackKingImage from "../../assets/figures/black-king.png"
import { Figure, FigureColors, FigureNames } from "./Figure"

export class King extends Figure {

    name: FigureNames | null;

    constructor(color: FigureColors) {
        super(color)

        this.name = FigureNames.KING
        this.image = color == FigureColors.BLACK ? blackKingImage : whiteKingImage
    }

}
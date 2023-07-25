
import whiteKnightImage from "../../assets/figures/white-knight.png"
import blackKnightImage from "../../assets/figures/black-knight.png"

import { Figure, FigureColors, FigureNames } from "./Figure"

export class Knight extends Figure {

    name: FigureNames | null;

    constructor(color: FigureColors) {
        super(color)

        this.name = FigureNames.KNIGHT
        this.image = color == FigureColors.BLACK ? blackKnightImage : whiteKnightImage
    }

}
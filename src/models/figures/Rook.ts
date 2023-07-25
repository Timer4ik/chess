
import whiteRookImage from "../../assets/figures/white-rook.png"
import blackRookImage from "../../assets/figures/black-rook.png"
import { Figure, FigureColors, FigureNames } from "./Figure"

export class Rook extends Figure {

    name: FigureNames | null;

    constructor(color: FigureColors) {
        super(color)

        this.name = FigureNames.ROOK
        this.image = color == FigureColors.BLACK ? blackRookImage : whiteRookImage
    }

}
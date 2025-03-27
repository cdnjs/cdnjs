import Despot from "../../../../util/Despot";
import Visuals from "../../../visuals";
import { VideomailClientOptions } from "../../../../types/options";
declare class FacingMode extends Despot {
    private visuals;
    private facingModeElement?;
    constructor(visuals: Visuals, options: VideomailClientOptions);
    private initEvents;
    build(): void;
    hide(): void;
    show(): void;
}
export default FacingMode;

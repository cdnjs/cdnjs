import { VideomailClientOptions } from "../../../../types/options";
import Visuals from "../../../visuals";
declare class PausedNote {
    private visuals;
    private options;
    private pausedBlockElement?;
    private pausedHeaderElement?;
    private pausedHintElement?;
    constructor(visuals: Visuals, options: VideomailClientOptions);
    private hasPausedHintText;
    build(): void;
    hide(): void;
    show(): void;
}
export default PausedNote;

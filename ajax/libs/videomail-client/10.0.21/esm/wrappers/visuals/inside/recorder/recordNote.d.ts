import Visuals from "../../../visuals";
declare class RecordNote {
    private visuals;
    private recordNoteElement;
    constructor(visuals: Visuals);
    build(): void;
    stop(): void;
    setNear(): void;
    setNigh(): void;
    hide(): void;
    show(): void;
}
export default RecordNote;

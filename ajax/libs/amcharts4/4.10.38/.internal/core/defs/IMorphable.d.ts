import { Morpher } from "../utils/Morpher";
import { IPoint } from "./IPoint";
export interface IMorphable {
    morpher: Morpher;
    points: Array<Array<Array<IPoint>>>;
    currentPoints: Array<Array<Array<IPoint>>>;
}

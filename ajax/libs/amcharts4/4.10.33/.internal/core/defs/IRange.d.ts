import { Optional } from "../utils/Type";
export interface IRange {
    start: Optional<number>;
    end: Optional<number>;
    priority?: "start" | "end";
}

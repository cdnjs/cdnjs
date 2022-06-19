import { QueueItem, Sides } from "../types";
interface countStepsToSelectorArgs {
    queueItems: QueueItem[];
    selector: string | number;
    cursorPosition: number;
    to: Sides;
}
declare const countStepsToSelector: ({ queueItems, selector, cursorPosition, to, }: countStepsToSelectorArgs) => number;
export default countStepsToSelector;

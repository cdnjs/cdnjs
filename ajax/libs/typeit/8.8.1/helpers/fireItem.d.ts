import { CursorOptions, El, QueueMapPair } from "../types";
interface FireItemArgs {
    index: number;
    queueItems: QueueMapPair[];
    wait: (...args: any) => Promise<void>;
    cursor: El | undefined;
    cursorOptions: CursorOptions;
}
declare let fireItem: ({ index, queueItems, wait, cursor, cursorOptions, }: FireItemArgs) => Promise<number>;
export default fireItem;

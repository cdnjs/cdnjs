import { El, QueueMapPair } from "../types";
interface FireItemArgs {
    index: number;
    queueItems: QueueMapPair[];
    wait: (...args: any) => Promise<void>;
    cursor: El | undefined;
}
declare let fireItem: ({ index, queueItems, wait, cursor, }: FireItemArgs) => Promise<number>;
export default fireItem;

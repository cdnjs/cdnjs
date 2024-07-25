import { QueueItem } from "./types";
export interface QueueI {
    add: (steps: QueueItem[] | QueueItem) => typeof Queue;
    set: (index: number, item: QueueItem) => void;
    wipe: () => void;
    done: (key: Symbol, shouldDestroy?: boolean) => void;
    reset: () => void;
    destroy: (key: Symbol) => void;
    getItems: (all?: boolean) => QueueItem[];
    getQueue: () => Map<Symbol, QueueItem>;
    getTypeable: () => QueueItem[];
}
declare let Queue: (initialItems: QueueItem[]) => QueueI;
export default Queue;

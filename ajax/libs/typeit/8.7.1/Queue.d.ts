import { QueueItem } from "./types";
declare let Queue: (initialItems: QueueItem[]) => {
    add: (steps: QueueItem[] | QueueItem) => typeof Queue;
    set: (index: number, item: QueueItem) => void;
    wipe: () => void;
    reset: () => void;
    destroy: (key: Symbol) => boolean;
    done: (key: Symbol, shouldDestroy?: boolean) => boolean;
    getItems: (all?: boolean) => QueueItem[];
    getQueue: () => Map<any, any>;
    getTypeable: () => QueueItem[];
};
export default Queue;

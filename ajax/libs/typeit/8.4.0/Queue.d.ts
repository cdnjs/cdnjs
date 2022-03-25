import { QueueItem } from "./types";
declare let Queue: (initialItems: QueueItem[]) => {
    add: (steps: QueueItem[] | QueueItem) => typeof Queue;
    set: (index: number, item: QueueItem) => void;
    reset: () => void;
    wipe: () => void;
    getItems: (all?: boolean) => QueueItem[];
    markDone: (index: number) => void;
};
export default Queue;

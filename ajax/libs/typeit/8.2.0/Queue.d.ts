import { QueueItem } from "./types";
declare const Queue: (initialItems: QueueItem[]) => {
    add: (steps: QueueItem[] | QueueItem) => typeof Queue;
    set: (index: number, item: QueueItem) => void;
    reset: () => void;
    getItems: () => QueueItem[];
    markDone: (index: number) => void;
};
export default Queue;

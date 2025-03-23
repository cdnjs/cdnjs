import { QueueMapPair } from "../types";
declare const cleanUpSkipped: ({ index, newIndex, queueItems, cleanUp, }: {
    index: number;
    newIndex: number;
    queueItems: QueueMapPair[];
    cleanUp: (key: Symbol) => void;
}) => void;
export default cleanUpSkipped;

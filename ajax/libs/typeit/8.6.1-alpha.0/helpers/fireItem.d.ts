import { QueueMapPair } from "../types";
declare let fireItem: (index: number, queueItems: QueueMapPair[], wait: any) => Promise<number>;
export default fireItem;

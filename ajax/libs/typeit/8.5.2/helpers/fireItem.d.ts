import { QueueItem } from "../types";
declare let fireItem: (queueItem: QueueItem, wait: any) => Promise<void>;
export default fireItem;

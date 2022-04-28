/**
 * Fire a callback after a delay, and add the timeout ID to a referenced array.
 */
declare let wait: (callback: Function, delay: number | undefined, timeouts: any) => Promise<void>;
export default wait;

import type { Plugin } from '../types';
interface LogData {
    metadata?: any;
}
export interface LogAPI {
    setMetadata(metadata: any): void;
}
/**
 * Plugin that makes it possible to add metadata to log entries.
 * During a move, you can set metadata using ctx.log.setMetadata and it will be
 * available on the log entry for that move.
 */
declare const LogPlugin: Plugin<LogAPI, LogData>;
export default LogPlugin;

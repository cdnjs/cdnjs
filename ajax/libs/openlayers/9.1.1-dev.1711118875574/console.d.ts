/**
 * Set the logging level.  By default, the level is set to 'info' and all
 * messages will be logged.  Set to 'warn' to only display warnings and errors.
 * Set to 'error' to only display errors.  Set to 'none' to silence all messages.
 *
 * @param {Level} l The new level.
 */
export function setLevel(l: Level): void;
/**
 * @param  {...any} args Arguments to log
 */
export function log(...args: any[]): void;
/**
 * @param  {...any} args Arguments to log
 */
export function warn(...args: any[]): void;
/**
 * @param  {...any} args Arguments to log
 */
export function error(...args: any[]): void;
export type Level = 'info' | 'warn' | 'error' | 'none';
//# sourceMappingURL=console.d.ts.map
import { VideomailClientOptions } from "../types/options";
declare class CollectLogger {
    private browser;
    private logger;
    private stack;
    private options;
    constructor(options: VideomailClientOptions);
    private lifo;
    debug(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    info(...args: any[]): void;
    getLines(): string[];
}
export default CollectLogger;

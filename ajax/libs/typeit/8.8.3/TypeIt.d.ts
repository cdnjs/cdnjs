import { QueueI } from "./Queue";
import { ActionOpts, El, Options, QueueItem, Statuses } from "./types";
export type { Options, QueueI, QueueItem, Statuses };
declare class TypeIt {
    #private;
    private element;
    private timeouts;
    private cursorPosition;
    private predictedCursorPosition;
    private statuses;
    private opts;
    private id;
    private queue;
    private cursor;
    unfreeze: () => void;
    constructor(element: El | string, options?: Options);
    /**
     * Can only be called once.
     */
    go(): this;
    destroy(shouldRemoveCursor?: boolean): void;
    reset(rebuild: ((TypeIt: any) => typeof TypeIt) | undefined): this;
    is: (key: any) => boolean;
    type(string: string | (() => string), actionOpts?: ActionOpts): this;
    break(actionOpts?: ActionOpts): this;
    move(movementArg: string | number | (() => string | number) | null, actionOpts?: ActionOpts): this;
    exec(func: (instance: TypeIt) => any, actionOpts?: ActionOpts): this;
    options(opts: Options | (() => Options), actionOpts?: ActionOpts): this;
    pause(milliseconds: number | (() => number), actionOpts?: ActionOpts): this;
    delete(numCharacters?: number | string | (() => number | null), actionOpts?: ActionOpts): this;
    freeze(): void;
    /**
     * Like `.go()`, but more... "off the grid."
     *
     * - won't trigger `afterComplete` callback
     * - items won't be replayed after `.reset()`
     *
     * When called, all non-done items will be "flushed" --
     * that is, executed, but not remembered.
     */
    flush(cb?: () => any): this;
    getQueue(): QueueI;
    getOptions(): Options;
    updateOptions(options: Options): Promise<void>;
    getElement(): El;
    empty(actionOpts?: ActionOpts): this;
}
export default TypeIt;

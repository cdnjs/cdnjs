declare module "types" {
    export type Character = {
        node: Node | null;
        content: string | Node;
    };
    export type Options = {
        breakLines?: boolean;
        cursor?: boolean;
        cursorChar?: string;
        cursorSpeed?: number;
        deleteSpeed?: null | number;
        html?: boolean;
        lifeLike?: boolean;
        loop?: boolean;
        loopDelay?: number;
        nextStringDelay?: number;
        speed?: number;
        startDelay?: number;
        startDelete?: boolean;
        strings?: string[];
        waitUntilVisible?: boolean;
        beforeString?: Function;
        afterString?: Function;
        beforeStep?: Function;
        afterStep?: Function;
        afterComplete?: Function;
    };
    export type ActionOpts = Options & {
        to?: "START" | "END";
        instant?: boolean;
        delay?: number;
    };
    export type QueueItem = [Function?, any?, {
        [key: string]: any;
    }?];
    export type Element = HTMLElement & {
        value: string | number;
    };
    export type Sides = "START" | "END";
}
declare module "helpers/guaranteeThreeKeys" {
    import { QueueItem } from "types";
    const _default: (q: QueueItem[]) => QueueItem[];
    /**
     * Guarantees that a queue has three
     * items with default values.
     *
     * @param {array} queueItem
     * @return {array}
     */
    export default _default;
}
declare module "helpers/merge" {
    const _default_1: (originalObj: any, newObj: any) => any;
    export default _default_1;
}
declare module "Queue" {
    import { QueueItem } from "types";
    const Queue: (initialItems: QueueItem[]) => {
        add: (steps: QueueItem[]) => typeof Queue;
        set: (index: number, item: QueueItem) => void;
        reset: () => void;
        getItems: () => QueueItem[];
        setMeta: (index: number, meta: any) => void;
    };
    export default Queue;
}
declare module "helpers/toArray" {
    const _default_2: (val: any) => any[];
    /**
     * Literally just wraps toArray() to save a few bytes
     * when it's repeatedly used.
     *
     * @param {any}
     * @return {array}
     */
    export default _default_2;
}
declare module "helpers/getParsedBody" {
    const _default_3: (content: any) => HTMLElement;
    /**
     * Parse a string as HTML and return the body
     * of the parsed document.
     */
    export default _default_3;
}
declare module "helpers/isTypeableNode" {
    import { Element } from "types";
    const _default_4: (node: Element) => boolean;
    /**
     * Returns `true` if node is of type `text` or is a <br> element.
     *
     * @param {object} node
     * @return {boolean}
     */
    export default _default_4;
}
declare module "helpers/getAllTypeableNodes" {
    /**
     * Retrieve all text/BR nodes that exist inside within an element. These
     * will be the nodes we're capable of typing onto the screen.
     */
    const getAllTypeableNodes: (element: Element, parentToExclude?: HTMLElement | null, shouldReverse?: boolean) => Node[];
    export default getAllTypeableNodes;
}
declare module "helpers/chunkStrings" {
    import { Character } from "types";
    /**
     * Given a node, generate an array of split text and nodes.
     */
    export const constructQueueFromNodes: (el: Element) => Character[];
    /**
     * Construct a character object to be placed in the queue.
     * When a `null` node is passed, it's being used as a quick
     * way to add a single text node to the element.
     */
    export const createCharacterObject: (content: string | Node, node?: null | Node) => Character;
    /**
     * Convert string to array of chunks that will be later
     * used to construct a TypeIt queue.
     */
    export function chunkStringAsHtml(string: string): Character[];
    /**
     * Given a string, chunk it into array items to be later
     * converted to queue items for typing.
     *
     * @param {string} str
     * @param {boolean} asHtml
     * @return {array}
     */
    export function maybeChunkStringAsHtml(str: string, asHtml?: boolean): Character[];
}
declare module "helpers/createElement" {
    const _default_5: (el: any) => HTMLElement;
    export default _default_5;
}
declare module "helpers/createTextNode" {
    const _default_6: (content: string) => Text;
    export default _default_6;
}
declare module "helpers/appendStyleBlock" {
    const _default_7: (styles: string, id?: string) => void;
    export default _default_7;
}
declare module "helpers/isArray" {
    const _default_8: (thing: any) => boolean;
    export default _default_8;
}
declare module "helpers/asArray" {
    const _default_9: <T>(value: any) => T[];
    /**
     * Converts value as within array, unless the value itself already is one.
     */
    export default _default_9;
}
declare module "helpers/isNumber" {
    const isNumber: (value: any) => boolean;
    export default isNumber;
}
declare module "helpers/select" {
    const select: (selector: string, element?: Node, all?: boolean) => Node | NodeList | null;
    export default select;
}
declare module "contants" {
    import { Options } from "types";
    export const DATA_ATTRIBUTE = "data-typeit-id";
    export const CURSOR_CLASS = "ti-cursor";
    export const START = "START";
    export const END = "END";
    export const DEFAULT_STATUSES: {
        started: boolean;
        completed: boolean;
        frozen: boolean;
        destroyed: boolean;
    };
    export const DEFAULT_OPTIONS: Options;
}
declare module "helpers/calculateStepsToSelector" {
    /**
     * Calculates the number of steps between the END of an element and a selector.
     */
    const calculateStepsToSelector: (selector: string, element: Element, to?: string) => number;
    export default calculateStepsToSelector;
}
declare module "helpers/calculateCursorSteps" {
    import { Element } from "types";
    type calculateCursorStepsArgs = {
        el: Element;
        move: number | string;
        cursorPos: number;
        to: string;
    };
    const _default_10: ({ el, move, cursorPos, to, }: calculateCursorStepsArgs) => number;
    export default _default_10;
}
declare module "helpers/calculateDelay" {
    const _default_11: (delayArg: number | number[]) => number[];
    /**
     * Given a delay value, form it into the type of object
     * that will be used by Instance().
     *
     * @param {integer | array}
     * @return {array}
     */
    export default _default_11;
}
declare module "helpers/randomInRange" {
    const _default_12: (value: number, range: number) => number;
    export default _default_12;
}
declare module "helpers/calculatePace" {
    import { Options } from "types";
    export default function (options: Options): number[];
}
declare module "helpers/destroyTimeouts" {
    const _default_13: (timeouts: number[]) => [];
    export default _default_13;
}
declare module "helpers/generateHash" {
    const _default_14: () => string;
    export default _default_14;
}
declare module "helpers/isInput" {
    const _default_15: (el: HTMLElement) => boolean;
    export default _default_15;
}
declare module "helpers/getAllChars" {
    import { Element } from "types";
    /**
     * Get a flattened array of text nodes that have been typed.
     * This excludes any cursor character that might exist.
     */
    const getAllChars: (element: Element) => any[];
    export default getAllChars;
}
declare module "helpers/fireWhenVisible" {
    const _default_16: (element: HTMLElement, func: Function) => void;
    export default _default_16;
}
declare module "helpers/handleFunctionalArg" {
    const handleFunctionalArg: <T>(arg: any) => T;
    export default handleFunctionalArg;
}
declare module "helpers/isBodyElement" {
    const _default_17: (node: any) => boolean;
    export default _default_17;
}
declare module "helpers/insertIntoElement" {
    import { Character, Element } from "types";
    /**
     * Given a node, find the corresponding PRINTED node already in an element.
     */
    export const findPrintedNode: (node: Element, elementToSearch: Element) => Element;
    /**
     * Determine if a given node is the _last_ child in the element.
     * This will allow us to know if we should continue typing into it,
     * or if we should create another node to append at the end.
     */
    export const isLastElement: (node: Node, nodeToIgnore: Node | null) => boolean;
    /**
     * Inserts a set of content into the element. Intended for SINGLE characters.
     */
    const insertIntoElement: (targetElement: Element, character: Character, cursorNode: Element, cursorPosition: number) => void;
    export default insertIntoElement;
}
declare module "helpers/updateCursorPosition" {
    const updateCursorPosition: (steps: number, cursorPosition: number, printedCharacters: Element[]) => number;
    export default updateCursorPosition;
}
declare module "helpers/removeNode" {
    import { Element } from "types";
    const _default_18: (node: Element | null) => void;
    /**
     * @param {object} HTML node
     */
    export default _default_18;
}
declare module "helpers/removeEmptyElements" {
    import { Element } from "types";
    const _default_19: (node: Element, nodeToIgnore: Element) => void;
    /**
     * Given a DOM scope and selector, remove any HTML element remnants,
     * EXCEPT for <br> tags, which may be typed but do not have any text content.
     */
    export default _default_19;
}
declare module "helpers/repositionCursor" {
    const _default_20: (element: Node, allChars: any[], cursor: Node, newCursorPosition: number) => void;
    export default _default_20;
}
declare module "helpers/selectorToElement" {
    import { Element } from "types";
    export default function (thing: string | Element): Element;
}
declare module "helpers/wait" {
    /**
     * Fire a callback after a delay, and add the timeout ID to a referenced array.
     */
    const wait: (callback: Function, delay: number, timeouts: any) => Promise<void>;
    export default wait;
}
declare module "helpers/setCursorStyles" {
    import { Element, Options } from "types";
    export const cursorFontStyles: {
        readonly "font-family": "";
        readonly "font-weight": "";
        readonly "font-size": "";
        readonly "font-style": "";
        readonly "line-height": "";
        readonly color: "";
        readonly "margin-left": "-.125em";
        readonly "margin-right": ".125em";
    };
    export const setCursorStyles: (id: string, options: Options, element: Element) => void;
}
declare module "TypeIt" {
    import { Element, Options } from "types";
    export default function TypeIt(element: Element | string, options?: Options): void;
}
declare module "helpers/getComputedStyle" {
    const _default_21: (el: any) => CSSStyleDeclaration;
    export default _default_21;
}

/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
//
// Type definitions for JSXGraph 1.4.x
// Project: https://jsxgraph.org
// Definitions by: David Holmes https://github.com/geometryzen
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
//
// Copyright 2015-2024 David Holmes, https://github.com/geometryzen
//

/**
 * JSXGraph in the namespace JXG.
 */
declare namespace JXG {
    /**
     * Store a reference to every board in this central list.
     * This will at some point replace JXG.JSXGraph.boards.
     */
    export const boards: unknown;

    /**
     *
     */
    export type CoordType = 1 | 2;

    /**
     * Screen coordinates in pixel relative to the upper left corner of the div element.
     */
    export const COORDS_BY_SCREEN: 0x0002;

    /**
     * User coordinates relative to the coordinates system defined by the bounding box.
     */
    export const COORDS_BY_USER: 0x0001;

    /**
     * A composition is a simple container that manages none or more GeometryElements.
     */
    export class Composition {
        /**
         * @param elements A list of elements with a descriptive name for the element as the key and a reference to the element as the value of every list entry. The name is used to access the element later on.
         */
        constructor(elements: { [what: string]: GeometryElement | Composition });
        /**
         * Adds an element to the composition container.

         * @param what Descriptive name for the element, e.g. startpoint or area. This is used to access the element later on. There are some reserved names: elements, add, remove, update, prepareUpdate, updateRenderer, highlight, noHighlight, and all names that would form invalid object property names in JavaScript.
         * @param element A reference to the element that is to be added. This can be another composition, too.
         * @returns True, if the element was added successfully. Reasons why adding the element failed include using a reserved name and providing an invalid element.
         */
        add(what: string, element: GeometryElement | Composition): boolean;
        /**
         * Invokes fullUpdate for every stored element with a fullUpdate method and hands over the given arguments. See JXG.GeometryElement#fullUpdate for further description, valid parameters and return values.
         */
        fullUpdate(): void;
        /**
         * Invokes highlight for every stored element with a highlight method and hands over the given arguments. See JXG.GeometryElement#highlight for further description, valid parameters and return values.
         */
        highlight(): void;
        /**
         * Invokes noHighlight for every stored element with a noHighlight method and hands over the given arguments. See JXG.GeometryElement#noHighlight for further description, valid parameters and return values.
         */
        noHighlight(): void;
        /**
         * Invokes prepareUpdate for every stored element with a prepareUpdate method and hands over the given arguments. See JXG.GeometryElement#prepareUpdate for further description, valid parameters and return values.
         */
        prepareUpdate(): void;
        /**
         * Remove an element from the composition container.
         * @param what The name used to access the element.
         * @returns True, if the element has been removed successfully.
         */
        remove(what: string): boolean;
        /**
         * Invokes setAttribute for every stored element with a setAttribute method and hands over the given arguments. See JXG.GeometryElement#setAttribute for further description, valid parameters and return values.
         */
        setAttribute(): void;
        /**
         * Invokes setParents for every stored element with a setParents method and hands over the given arguments. See JXG.GeometryElement#setParents for further description, valid parameters and return values.
         */
        setParents(parents: (string | GeometryElement)[]): this;
        // setParents(): void;
        /**
         * Invokes update for every stored element with a update method and hands over the given arguments. See JXG.GeometryElement#update for further description, valid parameters and return values.
         */
        update(): void;
        /**
         * Invokes updateRenderer for every stored element with a updateRenderer method and hands over the given arguments. See JXG.GeometryElement#updateRenderer for further description, valid parameters and return values.
         */
        updateRenderer(): void;
    }

    /**
     * This is the Coordinates class. All members a coordinate has to provide are defined here.
     */
    export class Coords {
        /**
         * Constructs a new Coordinates object.
         * @param method The type of coordinates given by the user. Accepted values are COORDS_BY_SCREEN and COORDS_BY_USER.
         * @param coordinates An array of affine coordinates.
         * @param board A reference to a board.
         * @param emitter If true, this coordinates object will emit update events every time the coordinates are set. Default is true.
         */
        constructor(
            method: CoordType,
            coordinates: [z: number, x: number, y: number] | [x: number, y: number],
            board: Board,
            emitter?: boolean
        );
        /**
         * Stores the board the object is used on.
         */
        board: Board;
        /**
         * If true, this coordinates object will emit update events every time the coordinates are set.
         */
        emitter: boolean;
        /**
         * Stores coordinates for screen view as homogeneous coordinates.
         */
        scrCoords: [z: number | null, x: number, y: number];
        /**
         * Stores coordinates for user view as homogeneous coordinates.
         */
        usrCoords: [z: number, x: number, y: number];
        /**
         * Copy array, either scrCoords or usrCoords. Uses slice() in case of standard arrays and set() in case of typed arrays.
         * @param obj Either 'scrCoords' for COORDS_BY_SCREEN coordinates or 'usrCoords' for COORDS_BY_USER coordinates.
         * @param offset The index to begin the copying from. Defaults to 0 if not given.
         */
        copy(obj: "scrCoords" | "usrCoords", offset?: number): number[];
        copy(obj: "scrCoords" | "usrCoords"): [number, number, number];
        copy(obj: "scrCoords" | "usrCoords", offset: 0): [number, number, number];
        copy(obj: "scrCoords" | "usrCoords", offset: 1): [number, number];
        copy(obj: "scrCoords" | "usrCoords", offset: 2): [number];
        /**
         * Calculate distance of one point to another.
         * @param method The type of coordinates used here. Possible values are JXG.COORDS_BY_USER and JXG.COORDS_BY_SCREEN.
         * @param coordinates The Coords object to which the distance is calculated.
         * @returns The distance.
         */
        distance(method: CoordType, coordinates: Coords): number;
        /**
         * Set coordinates by either user coordinates or screen coordinates and recalculate the other one.
         * @param method The type of coordinates used here. Possible values are COORDS_BY_USER and COORDS_BY_SCREEN.
         * @param coordinates An array of affine coordinates the Coords object is set to.
         * @param doRound flag If true or null round the coordinates in usr2screen. This is used in smooth curve plotting. Internet Explorer needs rounded coordinates. If doRound==false we have to round in updatePathString.
         * @param noevent
         * @returns A reference to this coords object.
         */
        setCoordinates(
            method: CoordType,
            coordinates: [number, number, number],
            doRound?: boolean,
            noevent?: boolean
        ): this;
        /**
         * Test if one of the usrCoords is NaN or the coordinates are infinite.
         * @returns true if the coordinates are finite, false otherwise.
         */
        isReal(): boolean;
    }

    /**
     * Associative array that keeps track of all constructable elements registered via JXG.registerElement.
     */
    export const elements: { [elementType: string]: unknown };

    /**
     * A JessieCode object provides an interface to the parser and stores all variables and objects used within a JessieCode script.
     * The optional argument code is interpreted after initializing.
     * To evaluate more code after initializing a JessieCode instance please use parse.
     * For code snippets like single expressions use snippet.
     */
    export class JessieCode {
        /**
         *
         */
        board: Board;
        /**
         *
         */
        constructor(code?: string, geonext?: boolean);
        /**
         *
         */
        dist(p1: Point, p2: Point): number;
        /**
         *
         */
        getElementId(id: string): GeometryElement;
        /**
         *
         */
        L(e: Line): number;
        /**
         * Parses JessieCode.
         * This consists of generating an AST with parser.parse, apply simplifying rules from CA and executing the ast by calling this.execute(ast).
         * @param code JessieCode code to be parsed.
         * @param geonext Geonext compatibility mode. Default is false.
         * @param dontstore If false, the code string is stored in this.code.
         */
        parse(code: string, geonext?: boolean, dontstore?: boolean): unknown;
        /**
         * Parses a JessieCode snippet, e.g. "3+4", and wraps it into a function, if desired.
         *
         * @param code A small snippet of JessieCode. Must not be an assignment.
         * @param funwrap If true, the code is wrapped in a function.
         * @param varname Name of the parameter(s)
         * @param geonext Geonext compatibility mode. Default: false.
         */
        snippet(code: string, funwrap: boolean, varname: string, geonext?: boolean): unknown;
        snippet(
            code: string,
            funwrap: true,
            varname: string,
            geonext?: boolean
        ): (...args: number[]) => number;
        /**
         * operator implementation.
         * @param a
         * @param b
         */
        sub(a: number | number[] | Point, b: number | number[] | Point): number | number[];
        /**
         * Implementation of the use() builtin function.
         */
        use(board: Board): void;
        /**
         * This is used as the global V() function.
         */
        V(e: Glider | Slider): number;
        /**
         * This is used as the global X() function.
         */
        X(e: Point | Text): number;
        /**
         * This is used as the global Y() function.
         */
        Y(e: Point | Text): number;
    }
    // ----------------------------------------------------------------------------------------------------------------
    //
    // ----------------------------------------------------------------------------------------------------------------
    /**
     * Adds an event listener to a DOM element.
     * @param target Reference to a DOM node.
     * @param eventName The event to catch, without leading 'on', e.g. 'mousemove' instead of 'onmousemove'.
     * @param handler The function to call when the event is triggered.
     * @param owner The scope in which the event trigger is called.
     */
    export function addEvent(
        target: HTMLElement,
        eventName: string,
        handler: () => void,
        owner: unknown
    ): void;
    export function autoDigits(val: unknown): number;
    export function autoHighlight(color: string): string;
    export function bind(fn: Function, owner: unknown): Function;
    export function capitalize(str: string): string;
    export function clearVisPropOld(el: GeometryElement): GeometryElement;
    export function clone<T>(obj: T): T;
    export function cloneAndCopy<S extends object, T extends object>(obj: S, obj2: T): S | T;
    export function cmpArrays(a1: unknown[], a2: unknown[]): boolean;
    export function coordsArrayToMatrix(coords: unknown[], split: boolean): unknown[];
    /**
     * Generates an attributes object that is filled with default values from the Options object and overwritten by the user specified attributes.
     * @param attributes user specified attributes
     * @param options defaults options
     * @param s variable number of strings, e.g. 'slider', subtype 'point1'.
     */
    export function copyAttributes<T>(attributes: T, options: JXGSettings, ...s: string[]): T;
    export function createEvalFunction<T>(
        board: Board,
        param: T[],
        n: number
    ): (k: number) => T;
    export function createFunction(
        term: string | number | Function,
        board: Board,
        variableName: string,
        evalGeonext?: boolean
    ): Function;
    export function createHTMLSlider(
        board: Board,
        parents: unknown[],
        attributes: SliderAttributes
    ): Slider;
    /**
     * Add something to the debug log.
     * If available a JavaScript debug console is used.
     * Otherwise we're looking for a HTML div with id "debug".
     * If this doesn't exist, too, the output is omitted.
     * @param args An arbitrary number of parameters.
     */
    export function debug(...args: any[]): void;
    /**
     * Add something to the debug log.
     * If available a JavaScript debug console is used.
     * Otherwise we're looking for a HTML div with id "debug".
     * If this doesn't exist, too, the output is omitted.
     * @param args An arbitrary number of parameters.
     */
    export function debugInt(...args: any[]): void;
    /**
     * Add something to the debug log.
     * If available a JavaScript debug console is used.
     * Otherwise we're looking for a HTML div with id "debug".
     * If this doesn't exist, too, the output is omitted.
     * This method adds a line of the stack trace (if available).
     * @param args An arbitrary number of parameters.
     */
    export function debugLine(...args: any[]): void;
    /**
     * Add something to the debug log.
     * If available a JavaScript debug console is used.
     * Otherwise we're looking for a HTML div with id "debug".
     * If this doesn't exist, too, the output is omitted.
     * This method adds a stack trace (if available).
     * @param args An arbitrary number of parameters.
     */
    export function debugWST(...args: any[]): void;
    export function deepCopy<U, V>(obj1: U, obj2: V, toLower?: boolean): U | V;
    export function def<T>(v: T | undefined | null, d: T): T;
    /**
     * This method issues a warning to the developer that the given function is deprecated and, if available, offers an alternative to the deprecated function.
     * @param what Describes the function that is deprecated.
     * @param replacement The replacement that should be used instead.
     */
    export function deprecated(what: string, replacement?: string): void;
    export function eliminateDuplicates(a: (number | string)[]): (number | string)[];
    export function escapeHTML(str: string): string;
    export function evalSlider(s: unknown): number;
    export function evaluate(val: unknown): unknown;
    /**
     * Checks if a given variable is neither undefined nor null. You should not use this together with global variables!
     * @param v A variable of any type.
     * @param checkEmptyString If set to true, it is also checked whether v is not equal to ''. Default: false.
     * @returns True, if v is neither undefined nor null.
     */
    export function exists(v: unknown, checkEmptyString?: boolean): boolean;
    /**
     * Copy all properties of the extension object to object.
     * @param obj
     * @param extension
     * @param onlyOwn Only consider properties that belong to extension itself, not any inherited properties. Default: false.
     * @param toLower If true the keys are convert to lower case. This is needed for visProp, see JXG#copyAttributes. Default: false.
     */
    export function extend(
        obj: object,
        extension: object,
        onlyOwn?: boolean,
        toLower?: boolean
    ): void;
    export function extendConstants(
        obj: object,
        constants: object,
        onlyOwn?: boolean,
        toUpper?: boolean
    ): void;
    export function filterElements<T>(list: T[], filter: object | Function): T[];
    export function getBoardByContainerId(s: string): Board | null;
    export function getCSSTransform(cPos: number[], obj: Element): number[];
    export function getCSSTransformMatrix(obj: unknown): number[];
    export function getDimensions(
        elementId: string | object,
        doc: Document
    ): { width: number; height: number };
    export function getOffset(obj: Element): [left: number, top: number];
    export function getPosition(
        e?: unknown,
        index?: number,
        doc?: Document
    ): [x: number, y: number];
    export function getProp(el: Element, css: string): number;
    export function hex2rgb(hex: string): string;
    /**
     * Converts HSV color to RGB color. Based on C Code in "Computer Graphics -- Principles and Practice," Foley et al, 1996, p. 593. See also http://www.efg2.com/Lab/Graphics/Colors/HSV.htm
     * @param H value between 0 and 360
     * @param S value between 0.0 (shade of gray) to 1.0 (pure color)
     * @param V value between 0.0 (black) to 1.0 (white)
     * @returns RGB color string
     */
    export function hsv2rgb(H: number, S: number, V: number): string;
    export function isAndroid(): boolean;
    export function isApple(): boolean;
    export function isArray(v: unknown): boolean;
    export function isFirefoxOS(): boolean;
    export function isFunction(v: unknown): v is Function;
    export function isGroup(board: Board, s: string): boolean;
    export function isId(board: Board, s: string): boolean;
    export function isInArray(arr: unknown[], val: unknown): boolean;
    export function isInObject(obj: unknown, val: unknown): boolean;
    export function isMetroApp(): boolean;
    export function isMozilla(): boolean;
    export function isName(board: Board, s: string): boolean;
    export function isNode(): boolean;
    export function isNumber(v: unknown): v is number;
    export function isObject(v: unknown): boolean;
    export function isPoint(v: unknown): v is Point;
    export function isPoint3D(v: unknown): boolean;
    export function isPointType(v: unknown): boolean;
    export function isPointType3D(v: unknown): boolean;
    export function isString(v: unknown): v is string;
    export function isTouchDevice(): boolean;
    export function isTransformationOrArray(v: unknown): boolean;
    export function isWebkitAndroid(): boolean;
    export function isWebkitApple(): boolean;
    export function isWebWorker(): boolean;
    export function keys(object: unknown, onlyOwn: boolean): string[];
    export function LMS2rgb(l: number, m: number, s: number): [r: number, g: number, b: number];
    export function merge<U, V>(obj1: U, obj2: V): U | V;
    export function normalizePointFace(
        s: string
    ): "x" | "o" | "[]" | "+" | "<>" | "^" | "v" | "<" | ">";
    export function providePoints(
        board: Board,
        parents: unknown[],
        attrClass: string,
        attrArray: unknown[]
    ): JXG.Point[] | false;
    /**
     * This registers a new construction element to JSXGraph for the construction via the JXG.Board.create interface.
     * @param element The elements name. This is case-insensitive, existing elements with the same name will be overwritten.
     * @param creator The factory function that creates the GeometryElement.
     */
    export function registerElement(
        element: string,
        creator: (
            board: Board,
            parents: unknown[],
            attributes: Record<string, unknown>
        ) => GeometryElement | Composition | Array<GeometryElement>
    ): void;
    export function registerReader(reader: Function, ext: unknown[]): void;
    export function removeAllEvents(obj: unknown, type: string, owner: unknown): void;
    export function removeElementFromArray<T>(ar: T[], el: T): T;
    export function removeEvent(obj: unknown, type: string, fn: Function, owner: unknown): void;
    export function rgb2bw(color: string): string;
    export function rgb2cb(
        color: string,
        deficiency: "protanopia" | "deuteranopia" | "tritanopia"
    ): string;
    export function rgb2css(
        color: string | [r: number, g: number, b: number] | number,
        ag: number,
        ab: number
    ): string;
    export function rgb2hex(
        color: string | [r: number, g: number, b: number] | number,
        ag: number,
        ab: number
    ): string;
    export function rgb2hsv(
        color: string | [r: number, g: number, b: number] | number,
        ag: number,
        ab: number
    ): [h: number, s: number, v: number];
    export function rgb2LMS(
        color: string | [r: number, g: number, b: number] | number,
        ag: number,
        ab: number
    ): [l: number, m: number, s: number];
    export function rgba2rgbo(rgba: string): [rgb: number, opacity: number];
    export function rgbo2rgba(rgb: string, o: number): string;
    export function rgbParser(
        color: string | number[] | number,
        ag?: number,
        ab?: number
    ): [r: number, g: number, b: number];
    export function sanitizeHTML(str: string, caja: boolean): string;
    export function shortcut(object: unknown, fun: string): Function;
    export function str2Bool(s: string): boolean;
    export function supportsCanvas(): boolean;
    export function supportsPointerEvents(): boolean;
    /**
     * Detect browser support for SVG.
     */
    export function supportsSVG(): boolean;
    /**
     * Detect browser support for VML.
     */
    export function supportsVML(): boolean;
    export function swap<T>(arr: T[], i: number, j: number): T[];
    export function timedChunk(
        items: unknown[],
        process: Function,
        context: unknown,
        callback: Function
    ): void;
    export function toFixed(num: number, digits: number): string;
    export function toFullscreen(wrap_id: string, jsxgraph_id: string, scale?: unknown): void;
    export function toJSON(obj: unknown, noquote?: boolean): string;
    export function trim(str: string): string;
    export function trimNumber(str: string): string;
    export function truncate(n: number, p: number): number;
    export function unescapeHTML(str: string): string;
    export function uniqueArray<T>(arr: T): T[];
    export function useBlackWhiteOptions(board: Board): void;
    export function useStandardOptions(board: Board): void;
    export function warn(warning: string): void;
    /**
     * This is the basic class for geometry elements like points, circles and lines.
     */
    export class GeometryElement {
        /**
         * Reference to the board associated with the element.
         */
        readonly board: Board;

        /**
         * The string used with Board.create.
         */
        readonly elType: string;

        /**
         * If element has a label subelement then this property will be set to true.
         * Default Value: false
         */
        readonly hasLabel: boolean;

        /**
         * True, if the element is currently highlighted.
         * Default Value: false
         */
        readonly highlighted: boolean;

        /**
         * Unique identifier for the element. Equivalent to id-attribute of renderer element.
         */
        id: string;

        /**
         * The label subelement (if it is defined).
         * @see hasLabel
         */
        label?: Text;

        /**
         * Not necessarily unique name for the element.
         */
        name: string;

        /**
         * Controls if updates are necessary.
         */
        needsUpdate: boolean;

        /**
         * Stores all Intersection Objects which in this moment are not real and so hide this element.
         */
        notExistingParents: unknown;

        /**
         * Counts the number of objects drawn as part of the trace of the element.
         */
        numTraces: number;

        /**
         * Ids of elements on which this element depends directly are stored here.
         */
        parents: string[];

        /**
         * Quadratic form representation of circles (and conics)
         */
        quadraticform: unknown[];

        /**
         * Stores the SVG (or VML) rendering node for the element.
         */
        rendNode: HTMLElement;

        /**
         * The homogeneous coordinates of the line ([C,A,B] where A*x+B*y+C*z=0).
         */
        stdform: [C: number, A: number, B: number];

        /**
         * Subs contains the subelements, created during the create method.
         */
        subs: unknown;

        /**
         * Stores variables for symbolic computations.
         */
        symbolic: unknown;

        /**
         * Keeps track of all objects drawn as part of the trace of the element.
         */
        traces: unknown;

        /**
         * Stores the transformations which are applied during update in an array
         */
        transformations: unknown[];

        /**
         * Type of the element.
         */
        type: number;

        /**
         * An associative array containing all visual properties.
         */
        visProp: { [name: string]: unknown };

        /**
         * An associative array containing visual properties which are calculated from the attribute values (i.e. visProp) and from other constraints.
         * An example: if an intersection point does not have real coordinates, visPropCalc.visible is set to false.
         * Additionally, the user can control visibility with the attribute "visible", even by supplying a functions as value.
         */
        visPropCalc: { [name: string]: unknown };

        /**
         *
         * @param board
         * @param attributes
         * @param type
         * @param oclass
         */
        constructor(
            board: Board,
            attributes: GeometryElementAttributes,
            type: number,
            oclass: number
        );

        /**
         * Add an element as a child to the current element. Can be used to model dependencies between geometry elements.
         * @param obj The dependent object.
         */
        addChild(obj: GeometryElement): void;

        /**
         * Adds ids of elements to the array this.parents.
         * This method needs to be called if some dependencies can not be detected automatically by JSXGraph.
         * For example if a function graph is given by a function which referes to coordinates of a point, calling addParents() is necessary.
         * @param parents Array of elements or ids of elements. Alternatively, one can give a list of objects as parameters.
         * @returns reference to the object itself.
         */
        addParents(parents: unknown[]): this;

        /**
         * Rotate texts or images by a given degree.
         * Works only for texts where JXG.Text#display equal to "internal".
         * @param angle The degree of the rotation (90 means vertical text).
         */
        addRotation(angle: number): void;

        /**
         * Get the value of the property key.
         * @param key The name of the property you are looking for.
         */
        getAttribute(key: string): any;

        /**
         * Returns the element name.
         */
        getName(): string;

        /**
         * Hide the element. It will still exist but not be visible on the board.
         * Alias for "element.setAttribute({visible: false});"
         * @returns Reference to the element
         */
        hide(): void;

        /**
         * Hides the element. It will still exist but not be visible on the board.
         * Alias for JXG.GeometryElement#hide
         * @returns Reference to the element
         */
        hideElement(): void;

        /**
         * Unregister an event handler.
         * For a list of possible events see documentation of the elements and objects implementing the EventEmitter interface.
         * @param event
         * @param handler
         * @returns Reference to the object.
         */
        off(event: string, handler?: (e: Event) => void): this;

        /**
         * Register a new event handler.
         * For a list of possible events see documentation of the elements and objects implementing the EventEmitter interface.
         * @param event
         * @param handler
         * @param context The context the handler will be called in, default is the element itself.
         * @returns Reference to the object.
         */
        on(event: string, handler: (e: Event) => void, context?: unknown): this;

        /**
         * Sets an arbitrary number of attributes.
         * @param attributes An object with attributes.
         */
        setAttribute(attributes: GeometryElementAttributes): this;

        setDash(dash: number): void;

        /**
         * Show the element or hide it. If hidden, it will still exist but not be visible on the board.
         * @param value true: show the element, false: hide the element
         */
        setDisplayRendNode(value: boolean): this;

        /**
         * Sets a label and its text. If the label doesn't exist, it creates one.
         */
        setLabel(label: string): void;

        /**
         * Updates the element's label text, strips all html.
         * @param text The element label text.
         */
        setLabelText(text: string): string;

        /**
         * Updates the element's label text and the element's attribute "name", strips all html.
         * @param name The element name.
         */
        setName(name: string): string;

        /**
         * Sets ids of elements to the array this.parents.
         * First, this.parents is cleared.
         * See JXG.GeometryElement#addParents.
         * @param parents Array of elements or ids of elements. Alternatively, one can give a list of objects as parameters.
         * @returns Reference to the element.
         */
        setParents(parents: (string | GeometryElement)[]): this;
        // setParents(parents: number[]): this;

        /**
         * Translates the object by (x, y).
         * In case the element is defined by points, the defining points are translated,
         * e.g. a circle constructed by a center point and a point on the circle line.
         * @param method The type of coordinates used here. Possible values are JXG.COORDS_BY_USER and JXG.COORDS_BY_SCREEN.
         * @param coords coordinates in screen/user units
         * @returns Reference to the element.
         */
        setPosition(method: number, coords: number[]): this;

        /**
         * Moves an element by the difference of two coordinates.
         * @param method The type of coordinates used here. Possible values are JXG.COORDS_BY_USER and JXG.COORDS_BY_SCREEN.
         * @param coords coordinates in screen/user units
         * @returns Reference to the element.
         */
        setPositionDirectly(method: number, coords: number[]): this;

        /**
         * Make the element visible.
         * Alias for "element.setAttribute({visible: true});"
         * @returns Reference to the element
         */
        show(): void;

        /**
         * Make the element visible.
         * Alias for JXG.GeometryElement#show
         * @returns Reference to the element
         */
        showElement(): void;

        /**
         * Snaps the element to points.
         * Only works for points.
         * Points will snap to the next point as defined in their properties JXG.Point#attractorDistance and JXG.Point#attractorUnit.
         * Lines and circles will snap their parent points to points.
         * @returns Reference to the element.
         */
        snapToPoints(): this;

        /**
         * General update method.
         * Should be overwritten by the element itself.
         * Can be used sometimes to commit changes to the object.
         * @returns Reference to the element.
         */
        update(): this;
    }

    type HTMLColorString = string;

    /**
     * Default color palette.
     */
    export const palette: {
        black: string;
        orange: string;
        skyblue: string;
        bluishgreen: string;
        yellow: string;
        darkblue: string;
        vermillion: string;
        reddishpurple: string;
        blue: string;
        red: string;
        green: string;
        purple: string;
        white: string;
    };

    /**
     * Bang Wong color palette, optimized for various type of color blindness.
     */
    export const paletteWong: {
        black: string;
        orange: string;
        skyblue: string;
        bluishgreen: string;
        yellow: string;
        darkblue: string;
        vermillion: string;
        reddishpurple: string;
        blue: string;
        red: string;
        green: string;
        purple: string;
        white: string;
    };

    /**
     * Use the color scheme of JSXGraph up to version 1.3.2.
     */
    export type setClassicColors = () => void;

    export type Coordinate = number | string | NumberFunction | Point | Transformation;

    /**
     *
     */
    export interface GeometryElementAttributes {
        /**
         * ???
         */
        color?: string;
        /**
         * Determines the elements border-style.
         * Possible values are:
         * 0 for a solid line,
         * 1 for a dotted line,
         * 2 for a line with small dashes,
         * 3 for a line with medium dashes,
         * 4 for a line with big dashes,
         * 5 for a line with alternating medium and big dashes and large gaps, and
         * 6 for a line with alternating medium and big dashes and small gaps.
         */
        dash?: number | string;

        /**
         * If true the element will be drawn in grey scale colors to visualize that it's only a draft.
         */
        draft?: boolean | GeometryElementAttributes;

        /**
         * ???
         */
        dragToTopOfLayer?: boolean;

        /**
         * The fill color of this geometry element.
         */
        fillColor?: string;

        /**
         * Opacity for fill color.
         */
        fillOpacity?: number | NumberFunction;

        /**
         * If true, the element is fixed and can not be dragged around.
         */
        fixed?: boolean;

        /**
         * If true the element is fixed and can not be dragged around. The element
         * will even stay at its position on zoom and moveOrigin events.
         * Only free elements like points, texts, curves can be frozen.
         */
        frozen?: boolean;

        /**
         * Gradient type.
         */
        gradient?: "linear" | "radial" | null;

        /**
         * Angle (in radians) of the gradiant in case the gradient is of type 'linear'. If the angle is 0, the first color is on
         * the left and the second color is on the right. If the angle is pi/4 the first color is on top and the second
         * color at the bottom.
         *
         * default 0
         */
        gradientAngle?: number | NumberFunction;

        /**
         * From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient.
         * The gradient will be drawn such that the 100% gradient stop is mapped to the perimeter of this largest
         * (i.e., outermost) circle. For radial gradients in canvas this is the value 'x1'. Takes a value between 0 and 1.
         *
         * default 0.5
         */
        gradientCX?: any;

        /**
         * From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient.
         * The gradient will be drawn such that the 100% gradient stop is mapped to the perimeter of this largest
         * (i.e., outermost) circle. For radial gradients in canvas this is the value 'y1'. Takes a value between 0 and 1.
         *
         * default 0.5
         */
        gradientCY?: any;

        /**
         * The gradientEndOffset attribute is a number (ranging from 0 to 1) which indicates where the second
         * gradient stop is placed, see the SVG specification for more information. For linear gradients, this attribute
         * represents a location along the gradient vector. For radial gradients, it represents a percentage distance
         * from (fx,fy) to the edge of the outermost/largest circle.
         *
         * default 1.0
         */
        gradientEndOffset?: any;

        /**
         * This attribute defines the radius of the start circle of the radial gradient. The gradient will be drawn such
         * that the 0% <stop> is mapped to the perimeter of the start circle. For radial gradients in canvas this is the
         * value 'r0'. Takes a value between 0 and 1.
         *
         * default 0.0
         */
        gradientFR?: any;

        /**
         * ‘fx’ and ‘fy’ define the focal point for the radial gradient. The gradient will be drawn such that the 0%
         * gradient stop is mapped to (fx, fy). For radial gradients in canvas this is the value 'x0'. Takes a value
         * between 0 and 1.
         *
         * default 0.5
         */
        gradientFX?: any;

        /**
         * y-coordinate of the circle center for the second color in case of gradient 'radial'. (The attribute fy in SVG)
         * For radial gradients in canvas this is the value 'y0'. Takes a value between 0 and 1.
         *
         * default 0.5
         */
        gradientFY?: any;

        /**
         * From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient.
         * The gradient will be drawn such that the 100% gradient stop is mapped to the perimeter of this largest
         * (i.e., outermost) circle. For radial gradients in canvas this is the value 'r1'. Takes a value between 0 and 1.
         *
         * default 0.5
         */
        gradientR?: any;

        /**
         * Second color for gradient.
         *
         * default '#ffffff'
         */
        gradientSecondColor?: any;

        /**
         * Opacity of second gradient color. Takes a value between 0 and 1.
         *
         * default 1
         */
        gradientSecondOpacity?: any;

        /**
         * The gradientStartOffset attribute is a number (ranging from 0 to 1) which indicates where the first
         * gradient stop is placed, see the SVG specification for more information. For linear gradients, this attribute
         * represents a location along the gradient vector. For radial gradients, it represents a percentage distance
         * from (fx,fy) to the edge of the outermost/largest circle.
         *
         * default 0.0
         */
        gradientStartOffset?: any;

        /**
         *
         */
        highlight?: boolean;

        /**
         * The fill color of the given geometry element when the mouse is pointed over it.
         */
        highlightFillColor?: string;

        /**
         * Opacity for fill color when the object is highlighted.
         */
        highlightFillOpacity?: number;

        /**
         * The stroke color of the given geometry element when the user moves the mouse over it.
         */
        highlightStrokeColor?: string;

        /**
         * Opacity for stroke color when the object is highlighted.
         */
        highlightStrokeOpacity?: number;

        /**
         * Width of the element's stroke when the mouse is pointed over it.
         */
        highlightStrokeWidth?: number;

        /**
         * ???
         * @private
         * By default, an element is not a label. Do not change this.
         */
        isLabel?: boolean;

        /**
         * ???
         * Display layer which will contain the element.
         */
        layer?: number;

        /**
         * Precision options for JSXGraph elements.
         * This attributes takes either the value 'inherit' or an object of the form:
         * <pre>
         * precision: {
         *      touch: 30,
         *      mouse: 4,
         *      pen: 4
         * }
         * </pre>
         *
         */
        precision?: PrecisionOptions;

        /**
         * ???
         * Not necessarily unique name for the element.
         */
        name?: string | (() => string);

        /**
         * If this is set to true, the element is updated in every update
         * call of the board. If set to false, the element is updated only after
         * zoom events or more generally, when the bounding box has been changed.
         */
        needsRegularUpdate?: boolean;

        /**
         * ???
         */
        opacity?: number;

        /**
         * ???
         * A private element will be inaccessible in certain environments, e.g. a graphical user interface.
         */
        priv?: boolean;

        /**
         * Determines whether two-finger manipulation of this object may change its size.
         * If set to false, the object is only rotated and translated.
         */
        scalable?: boolean;

        /**
         * If true the element will get a shadow.
         */
        shadow?: boolean;

        /**
         * Snaps the element or its parents to the grid. Currently only relevant for points, circles,
         * and lines. Points are snapped to grid directly, on circles and lines it's only the parent
         * points that are snapped
         */
        snapToGrid?: boolean;

        /**
         * The stroke color of the given geometry element.
         */
        strokeColor?: string | (() => string);

        /**
         * Opacity for element's stroke color.
         */
        strokeOpacity?: number;

        /**
         * Width of the element's stroke.
         */
        strokeWidth?: number | NumberFunction | string;

        /**
         * ???
         */
        style?: number | string;

        /**
         * Type, used for transformations
         */
        type?: string;

        /**
         * If true the element will be traced, i.e. on every movement the element will be copied
         * to the background. Use {@link JXG.GeometryElement#clearTrace} to delete the trace elements.
         */
        trace?: boolean;

        /**
         * Extra visual properties for traces of an element
         */
        traceAttributes?: {};

        /**
         * Transition duration (in milliseconds) for color and opacity changes.
         */
        transitionDuration?: number;

        /**
         * If false the element won't be visible on the board, otherwise it is shown.
         */
        visible?: boolean | BooleanFunction | "inherit";

        /**
         * If true, a label will display the element's name.
         */
        withLabel?: boolean;
    }
    export interface GeometryElementOptions extends GeometryElementAttributes {}

    /**
     * Options for the CoordsElement moveAlong method.
     */
    export interface MoveAlongOptions {
        /**
         * A function that is called as soon as the animation is finished.
         */
        callback?(): void;
        /**
         * If path is an array moveAlong() will interpolate the path using JXG.Math.Numerics.Neville.
         * Set this flag to false if you don't want to use interpolation.
         */
        interpolate?: boolean;
    }

    /**
     * Options for the CoordsElement moveTo method.
     */
    export interface MoveToOptions {
        /**
         * A function that is called as soon as the animation is finished.
         */
        callback?(): void;
        /**
         * Animation effects like speed fade in and out.
         * possible values are '<>' for speed increase on start and slow down at the end (default) and '--' for constant speed during the whole animation.
         */
        effect?: "<>" | "--";
    }

    /**
     * Options for the CoordsElement visit method.
     */
    export interface VisitOptions {
        /**
         * A function that is called as soon as the animation is finished.
         */
        callback?(): void;
        /**
         * Animation effects like speed fade in and out.
         * possible values are '<>' for speed increase on start and slow down at the end (default) and '--' for constant speed during the whole animation.
         * Default is '<>'.
         */
        effect?: "<>" | "--";
        /**
         * How often this animation should be repeated.
         * Default is 1.
         */
        repeat?: number;
    }

    /**
     *
     */
    export class CoordsElement extends GeometryElement {
        constructor(coordinates: unknown[], isLabel: boolean);
        /**
         * Coordinates of the element.
         */
        coords: Coords;
        /**
         * Getter method for x, this is used by for CAS-points to access point coordinates.
         */
        X(): number;
        /**
         * Getter method for y, this is used by for CAS-points to access point coordinates.
         */
        Y(): number;
        /**
         *
         * @param path The path the point is moved on. This can be either an array of arrays or containing x and y values of the points of the path, or an array of points, or a function taking the amount of elapsed time since the animation has started and returns an array containing a x and a y value or NaN. In case of NaN the animation stops.
         * @param time The time in milliseconds in which to finish the animation
         * @param options Optional settings for the animation.
         * @returns Reference to itself.
         */
        moveAlong(path: PointSpecification[], time: number, options?: MoveAlongOptions): this;
        /**
         * Starts an animated point movement towards the given coordinates where.
         * The animation is done after time milliseconds.
         * If the second parameter is not given or is equal to 0, setPosition() is called, see #setPosition.
         * @param where Array containing the x and y coordinate of the target location.
         * @param time Number of milliseconds the animation should last.
         * @param options Optional settings for the animation.
         * @returns Reference to itself.
         */
        moveTo(where: PointSpecification, time?: number, options?: MoveToOptions): this;
        /**
         * Animate the point.
         * @param direction: The direction the glider is animated. Can be +1 or -1.
         * @param stepCount: The number of steps.
         */
        startAnimation(direction: number, stepCount: number): void;
        /**
         * Stop animation.
         */
        stopAnimation(): void;

        /**
         * Starts an animated point movement towards the given coordinates where.
         * After arriving at where the point moves back to where it started.
         * The animation is done after time milliseconds.
         * @param where Array containing the x and y coordinate of the target location.
         * @param time Number of milliseconds the animation should last.
         * @param options Optional settings for the animation.
         * @returns Reference to itself.
         */
        visit(where: PointSpecification[], time?: number, options?: VisitOptions): this;
    }

    /**
     *
     */
    export interface CoordsElementAttributes extends GeometryElementAttributes {
        slideObject?: GeometryElement;
    }

    /**
     *
     */
    export class Text extends CoordsElement {
        /**
         * @param board The board the new text is drawn on.
         * @param coordinates The user coordinates of the text.
         * @param attributes The visual properties and an optional name and id.
         * @param content Provides the content of the text.
         */
        constructor(
            board: Board,
            coordinates: [unknown, unknown],
            attributes: TextAttributes,
            content: string | StringFunction
        );
        getSize(): [width: number, height: number];
        setText(text: string): this;
        setTextJessieCode(text: string): void;
    }

    /**
     *
     */
    export interface TextAttributes extends GeometryElementAttributes {
        /**
         * Anchor element of the text.
         * If it exists, the coordinates of the text are relative to this anchor element.
         */
        anchor?: GeometryElement | null;
        /**
         * The horizontal alignment of the text.
         * The default value is 'left'.
         */
        anchorX?: AnchorX;
        /**
         * The vertical alignment of the text.
         * The default value is 'middle'.
         */
        anchorY?: AnchorY;
        /**
         * List of attractor elements.
         * If the distance of the text is less than attractorDistance the text is made to glider of this element.
         */
        attractors?: GeometryElement[];
        color?: string;
        /**
         * The precision of the slider value displayed in the optional text.
         */
        cssClass?: string;
        cssDefaultStyle?: string;
        cssStyle?: string;
        /**
         * Used to round texts given by a number.
         * The default value is 2.
         */
        digits?: number;
        /**
         * Determines the rendering method of the text.
         */
        display?: "html" | "internal";
        /**
         * Sensitive area for dragging the text.
         * Possible values are 'all', or something else.
         * This may be extended to left, right, ... in the future.
         */
        dragArea?: "all" | string;
        /**
         * The font size in pixels.
         * The default value is 12.
         */
        fontSize?: number;
        /**
         *
         */
        highlightCssClass?: string;
        highlightCssDefaultStyle?: string;
        highlightCssStyle?: string;
        /**
         *
         */
        isLabel?: boolean;
        /**
         *
         */
        parse?: boolean;
        /**
         *
         */
        rotate?: number;
        /**
         *
         */
        snapSizeX?: number;
        /**
         *
         */
        snapSizeY?: number;
        /**
         *
         */
        useASCIIMathML?: boolean;
        /**
         *
         */
        useCaja?: boolean;
        /**
         *
         */
        useMathJax?: boolean;
    }

    /**
     *
     */
    export interface Button extends Text {
        setAttribute(attributes: ButtonAttributes): this;
    }

    /**
     *
     */
    export interface ButtonAttributes extends TextAttributes {
        /**
         * Control the attribute "disabled" of the HTML button.
         * Default Value: false.
         */
        disabled?: boolean;
    }

    export interface Cardinalspline extends Curve {}

    export interface CardinalsplineAttributes extends CurveAttributes {
        createPoints?: boolean;
        isArrayOfCoordinates?: boolean;
        points?: PointAttributes;
    }
    export interface CardinalsplineOptions extends CurveOptions {
        createPoints?: boolean;
        isArrayOfCoordinates?: boolean;
        points?: PointOptions;
    }

    /**
     *
     */
    export class Chart extends GeometryElement {
        // Nothing
    }

    /**
     *
     */
    export interface ChartAttributes extends GeometryElementAttributes {
        center?: PointSpecification;
        chartStyle: "bar" | "pie" | "line";
        colors?: string[];
        fillcolor?: string | null;
        gradient?: "linear";
        highlightcolors?: string[] | null;
        highlightonsector?: boolean;
        highlightbysize?: boolean;
        label?: LabelOptions;
        labels?: string[];
        withLines?: boolean;
    }

    /**
     *
     */
    export interface Checkbox extends Text {
        /**
         *
         */
        rendNodeCheckbox: HTMLInputElement;
        /**
         *
         */
        Value(): boolean;
    }

    /**
     *
     */
    export interface CheckboxAttributes extends TextAttributes {
        checked?: boolean;
        /**
         * Control the attribute "disabled" of the HTML checkbox.
         * Default value is false.
         */
        disabled?: boolean;
    }

    /**
     *
     */
    export class Circle extends GeometryElement {
        /**
         *
         */
        center: Point;
        /**
         *
         */
        midpoint: Point;
        /**
         * Checks whether (x,y) is near the segment.
         * @param x: Coordinate in x direction, screen coordinates.
         * @param y: Coordinate in y direction, screen coordinates.
         * @param start: Optional start index for search on data plots.
         */
        hasPoint(x: number, y: number, start?: number): boolean;
        /**
         *
         */
        Radius(): number;
    }

    /**
     *
     */
    export interface CircleAttributes extends GeometryElementAttributes {
        /**
         *
         */
        center?: Point;
        /**
         *
         */
        hasInnerPoints?: boolean;
        /**
         *
         */
        label?: LabelOptions;
        /**
         *
         */
        point?: Point;
    }

    export interface CircleOptions {
        center?: PointAttributes;
        fillColor?: string;
        fixed?: boolean;
        hasInnerPoints?: boolean;
        highlight?: boolean;
        highlightFillColor?: string;
        highlightStrokeColor?: string;
        label?: LabelOptions;
        strokeColor?: string;
    }

    export interface Circumcircle extends Circle {}

    export interface CircumcircleAttributes extends CircleAttributes {}

    export interface CircumcircleOptions extends CircleOptions {
        useDirection?: boolean;
    }

    export interface CircumcircleArc extends Arc {}
    export interface CircumcircleArcAttributes extends ArcAttributes {}

    export interface CircumcircleArcOptions extends ArcOptions {}

    export interface CircumcircleSector extends Sector {}
    export interface CircumcircleSectorAttributes extends SectorAttributes {}

    export interface CircumcircleSectorOptions extends SectorOptions {
        useDirection?: boolean;
        point?: PointOptions;
    }

    export interface Comb extends Curve {}
    export interface CombAttributes extends CurveAttributes {
        angle?: number;
        curve?: CurveAttributes;
        point1?: PointAttributes;
        point2?: PointAttributes;
        frequency?: number;
        reverse?: boolean;
        width?: number;
    }
    export interface CombOptions extends CurveOptions {
        angle?: number;
        curve?: CurveOptions;
        point1?: PointOptions;
        point2?: PointOptions;
        frequency?: number;
        reverse?: boolean;
        width?: number;
    }

    export class Complex {
        absval: number;
        angle: number;
        imaginary: number;
        isComplex: boolean;
        real: number;
        constructor(x?: number, y?: number);
        add(c: Complex | number): this;
        conj(): this;
        div(c: Complex | number): this;
        mult(c: Complex | number): this;
        sub(c: Complex | number): this;
        toString(): string;
    }

    /**
     * Curves are the common object for function graphs, parametric curves, polar curves, and data plots.
     */
    export class Curve extends GeometryElement {
        /**
         * Array holding the x-coordinates of a data plot.
         * This array can be updated during run time by overwriting the method updateDataArray.
         */
        dataX: number[];
        /**
         * Array holding the y-coordinates of a data plot.
         * This array can be updated during run time by overwriting the method updateDataArray.
         */
        dataY: number[];
        /**
         * Number of points on curves.
         * This value changes between numberPointsLow and numberPointsHigh.
         * It is set in updateCurve.
         */
        numberPoints: number;
        /**
         * Stores a quadtree if it is required.
         * The quadtree is generated in the curve updates and can be used to speed up the hasPoint method.
         */
        qdt: any;
        /**
         * For dynamic dataplots updateCurve can be used to compute new entries for the arrays dataX and dataY.
         * It is used in updateCurve.
         * Default is an empty method, can be overwritten by the user.
         */
        updateDataArray: (this: Curve) => void;
        /**
         * Add transformations to this curve.
         */
        addTransform(transform: unknown): Curve;
        /**
         * Allocate points in the Coords array this.points
         */
        allocatePoints(): void;
        /**
         *
         */
        checkReal(): any;
        /**
         *
         */
        generateTerm(
            varname: unknown,
            xterm: unknown,
            yterm: unknown,
            mi: unknown,
            ma: unknown
        ): any;
        /**
         * Checks whether (x,y) is near the curve.
         * @param x: Coordinate in x direction, screen coordinates.
         * @param y: Coordinate in y direction, screen coordinates.
         * @param start: Optional start index for search on data plots.
         */
        hasPoint(x: number, y: number, start?: number): boolean;
        /**
         * Gives the default value of the right bound for the curve.
         * May be overwritten in generateTerm.
         */
        maxX(): number;
        /**
         * Gives the default value of the left bound for the curve.
         * May be overwritten in generateTerm.
         */
        minX(): number;
        /**
         * Finds dependencies in a given term and notifies the parents by adding the dependent object to the found objects child elements.
         */
        notifyParents(contentStr: string): void;
        /**
         * Computes for equidistant points on the x-axis the values of the function.
         */
        update(): this;
        /**
         * Computes for equidistant points on the x-axis the values of the function.
         * If the mousemove event triggers this update, we use only few points.
         * Otherwise, e.g. on mouseup, many points are used.
         */
        updateCurve(): Curve;
        /**
         * Updates the data points of a parametric curve.
         * This version is used if doadvancedplot is true.
         */
        updateParametricCurve(mi: number, ma: number): Curve;
        /**
         * Updates the data points of a parametric curve.
         * This version is used if doadvancedplot is false.
         */
        updateParametricCurveNaive(mi: number, ma: number, len: number): Curve;
        /**
         * Updates the visual contents of the curve.
         */
        updateRenderer(): Curve;
        /**
         * Applies the transformations of the curve to the given point p.
         * Before using it, updateTransformMatrix has to be called.
         */
        updateTransform(p: Point): Point;
        /**
         * The parametric function which defines the x-coordinate of the curve.
         */
        X(t: number, suspendUpdate: boolean): number;
        /**
         * The parametric function which defines the y-coordinate of the curve.
         */
        Y(t: number, suspendUpdate: boolean): number;
        /**
         * Treat the curve as a curve with homogeneous coordinates.
         */
        Z(t: number): number;
    }
    /**
     *
     */
    export interface CurveAttributes extends GeometryElementAttributes {
        curveType?: "none" | "plot" | "parameter" | "functiongraph" | "polar" | "implicit";
    }
    export interface CurveOptions extends GeometryElementAttributes {
        curveType?:
            | "none"
            | "plot"
            | "parameter"
            | "functiongraph"
            | "polar"
            | "implicit"
            | null;
        doAdvancedPlot?: boolean;
        doAdvancedPlotOld?: boolean;
        handDrawing?: boolean;
        label?: LabelOptions;
        numberPointsHigh?: number;
        numberPointsLow?: number;
        plotVersion?: number;
        RDPsmoothing?: boolean;
        recursionDepthHigh?: number;
        recursionDepthLow?: number;
        useQDT?: boolean;
    }

    /**
     *
     */
    export interface Boxplot extends Curve {
        setAttribute(attributes: BoxplotAttributes): this;
    }
    /**
     *
     */
    export interface BoxplotAttributes extends CurveAttributes {
        /**
         * Direction of the box plot.
         */
        dir?: "horizontal" | "vertical";
        /**
         * Relative width of the maximum and minimum quantile.
         */
        smallWidth?: number;
    }

    /**
     * A grid is a set of vertical and horizontal lines to support the user with element placement.
     */
    export interface Grid extends Curve {
        setAttribute(attributes: GridAttributes): this;
    }
    export interface GridAttributes extends CurveAttributes {}

    export interface GridOptions extends CurveOptions {
        hasGrid?: boolean;
        gridX?: number;
        gridY?: number;
        gridColor?: string;
        gridOpacity?: number;
        gridDash?: unknown;
        /**
         * @deprecated
         */
        snapSizeX?: number;
        /**
         * @deprecated
         */
        snapSizeY?: number;
    }

    /**
     * In this class all group management is done.
     */
    export class Group extends GeometryElement {
        /**
         * Creates a new instance of Group.
         * @param board
         * @param id Unique identifier for this object. If null or an empty string is given, an unique id will be generated by Board.
         * @param name Not necessarily unique name, displayed on the board. If null or an empty string is given, an unique name will be generated.
         * @param objects Array of points to add to this group.
         * @param attributes Defines the visual appearance of the group.
         */
        constructor(
            board: Board,
            id: string,
            name: string,
            objects: Point[],
            attributes: GroupAttributes
        );
        /**
         * Adds all points in a group to this group.
         * @param group The group added to this group.
         */
        addGroup(group: Group): this;
        /**
         * Adds ids of elements to the array this.parents. This is a copy of Element.addParents.
         * @param parents Array of elements or ids of elements. Alternatively, one can give a list of objects as parameters.
         */
        addParents(parents: (string | GeometryElement)[]): this;
        /**
         * Adds an Point to this group.
         * @param object The point added to the group.
         */
        addPoint(object: Point): this;
        /**
         * Adds multiple points to this group.
         * @param objects An array of points to add to the group.
         */
        addPoints(objects: Point[]): this;
        /**
         * Adds a point to the set of rotation points of the group. Dragging at one of these points results into a rotation of the whole group around the rotation center of the group {@see JXG.Group#setRotationCenter}.
         * @param point
         */
        addRotationPoint(point: Point): this;
        /**
         * Adds a point to the set of the scale points of the group. Dragging at one of these points results into a scaling of the whole group.
         * @param point
         * @param direction Restricts the directions to be scaled. Possible values are 'x', 'y', 'xy'. Default value is 'xy'.
         */
        addScalePoint(point: Point, direction?: "x" | "y" | "xy"): this;
        /**
         * Adds a point to the set of the translation points of the group. Dragging one of these points results into a translation of the whole group.
         * @param point
         */
        addTranslationPoint(point: Point): this;
        /**
         * List of the element ids resp. values used as parents in JXG.Board#create.
         */
        getParents(): string[];
        /**
         * Removes a point from the group.
         * @param point
         */
        removePoint(point: Point): this;
        /**
         * Removes the rotation property from a point of the group.
         * @param point
         */
        removeRotationPoint(point: Point): this;
        /**
         * Removes the scaling property from a point of the group.
         * @param point
         */
        removeScalePoint(point: Point): this;
        /**
         * Removes the translation property from a point of the group.
         * @param point
         */
        removeTranslationPoint(point: Point): this;
        /**
         * Sets ids of elements to the array this.parents. This is a copy of Element.setParents First, this.parents is cleared. See Group#addParents.
         * @param parents
         */
        setParents(parents: (string | GeometryElement)[]): this;
        /**
         * Sets the center of rotation for the group. This is either a point or the centroid of the group.
         * @param object
         */
        setRotationCenter(
            object: Point | "centroid" | [number, number] | (() => [number, number])
        ): this;
        /**
         * Sets the rotation points of the group. Dragging at one of these points results into a rotation of the whole group around the rotation center of the group {@see JXG.Group#setRotationCenter}.
         * @param objects
         */
        setRotationPoints(objects: Point | Point[]): this;
        /**
         * Sets the center of scaling for the group. This is either a point or the centroid of the group.
         * @param object
         */
        setScaleCenter(
            object: Point | "centroid" | [number, number] | (() => [number, number])
        ): this;
        /**
         * Sets the scale points of the group. Dragging at one of these points results into a scaling of the whole group.
         * @param objects Array of JXG.Point or arbitrary number of JXG.Point elements.
         * @param direction Restricts the directions to be scaled. Possible values are 'x', 'y', 'xy'. Default value is 'xy'. By default, all points of the group are translation points.
         */
        setScalePoints(objects: Point | Point[], direction?: "x" | "y" | "xy"): this;
        /**
         * Sets the translation points of the group. Dragging at one of these points results into a translation of the whole group.
         * @param objects Array of JXG.Point or arbitrary number of JXG.Point elements. By default, all points of the group are translation points.
         */
        setTranslationPoints(objects: Point | Point[]): this;
        /**
         * Releases all elements of this group.
         */
        ungroup(): this;
        /**
         * Sends an update to all group members. This method is called from the points' coords object event listeners and not by the board.
         */
        update(): this;
        setAttribute(attributes: GroupAttributes): this;
    }
    export interface GroupAttributes extends GeometryElementAttributes {
        size?: number;
    }
    export interface GroupOptions extends GeometryElementAttributes {}

    /**
     *
     */
    export class Image extends CoordsElement {
        setAttribute(attributes: ImageAttributes): this;
    }

    export interface ImageAttributes extends CoordsElementAttributes {}
    export interface ImageOptions extends CoordsElementAttributes {
        attractors?: GeometryElementAttributes[];
        cssClass?: string;
        highlightCssClass?: string;
        imageString?: string | null;
        rotate?: number;
        snapSizeX?: number;
        snapSizeY?: number;
    }

    export interface Incircle extends Circle {}
    export interface IncircleAttributes extends CircleAttributes {}
    export interface IncircleOptions extends CircleOptions {}

    export interface Inequality extends Curve {}
    export interface InequalityAttributes extends CurveAttributes {}
    export interface InequalityOptions extends CurveOptions {
        inverse?: boolean;
    }

    export interface InfoboxOptions extends TextOptions {
        layer?: number;
        needsRegularUpdate?: boolean;
        transitionDuration?: number;
    }

    export interface Label extends Text {}

    /**
     *
     */
    export interface LabelOptions {
        anchorX?: AnchorX;
        anchorY?: AnchorY;
        autoPosition?: boolean;
        color?: string;
        display?: "internal";
        fixed?: boolean;
        fontSize?: number;
        highlight?: boolean;
        highlightStrokeColor?: string;
        highlightStrokeOpacity?: number;
        layer?: number;
        needsRegularUpdate?: boolean;
        /**
         * Label offset from the label anchor. The label anchor is determined by position.
         */
        offset?: [number, number];
        parse?: boolean;
        /**
         * Determines the label anchor.
         */
        position?: "lft" | "rt" | "top" | "bot" | "ulft" | "urt" | "llft" | "lrt";
        strokeColor?: string;
        strokeOpacity?: number;
        useMathJax?: boolean;
        visible?: "inherit" | boolean;
    }

    export interface Legend extends GeometryElement {}
    export interface LegendAttributes extends GeometryElementAttributes {}
    export interface LegendOptions extends GeometryElementAttributes {
        colors: string[];
        labels: string[];
        rowHeight?: number;
        style: "horizontal" | "vertical";
    }

    export interface Locus extends Curve {}
    export interface LocusAttributes extends CurveAttributes {}
    export interface LocusOptions extends CurveOptions {
        stretch?: boolean;
        toOrigin?: null;
        to10?: null;
        translateToOrigin?: boolean;
        translateTo10?: boolean;
    }

    export interface Mirrorelement extends GeometryElement {}
    export interface MirrorelementAttributes extends GeometryElementAttributes {
        point?: PointAttributes;
        center?: PointAttributes;
        type?: "Euclidean";
    }
    export interface MirrorelementOptions extends GeometryElementOptions {
        point?: PointOptions;
        center?: PointOptions;
        type?: "Euclidean";
    }

    export interface Normal extends Line {}
    export interface NormalAttributes extends LineAttributes {
        point?: PointAttributes;
    }
    export interface NormalOptions extends LineOptions {
        point?: PointOptions;
    }

    export interface Orthogonalprojection extends Point {}
    export interface OrthogonalprojectionAttributes extends PointAttributes {}
    export interface OrthogonalprojectionOptions extends PointOptions {}

    export interface Parallel extends Line {}
    export interface ParallelAttributes extends LineAttributes {
        point?: PointAttributes;
    }
    export interface ParallelOptions extends LineOptions {
        point?: PointOptions;
    }

    /**
     * This element is used to provide a constructor for a generic conic section uniquely defined by five points.
     */
    export interface Conic extends Curve {
        setAttribute(attributes: ConicAttributes): this;
    }
    export interface ConicAttributes extends CurveAttributes {}

    export interface ConicOptions extends CurveOptions {
        foci?: PointOptions;
        center?: PointOptions;
        point?: PointOptions;
        line?: LineAttributes;
    }

    /**
     *
     */
    export interface Ellipse extends Conic {
        setAttribute(attributes: EllipseAttributes): this;
    }
    export interface EllipseAttributes extends ConicAttributes {}

    /**
     *
     */
    export interface Hyperbola extends Conic {
        setAttribute(attributes: HyperbolaAttributes): this;
    }
    export interface HyperbolaAttributes extends ConicAttributes {}

    export interface Parabola extends Conic {
        setAttribute(attributes: ParabolaAttributes): this;
    }
    export interface ParabolaAttributes extends ConicAttributes {}

    /**
     *
     */
    export interface Sector extends Curve {
        anglePoint: Point;
        arc: Arc;
        center: Point;
        label: Label;
        radiusPoint: Point;
        selection: "minor" | "major" | "auto";
        setAttribute(attributes: SectorAttributes): this;
    }
    export interface SectorAttributes extends CurveAttributes {}
    export interface SectorOptions extends CurveOptions {
        anglePoint?: PointOptions;
        arc?: ArcOptions;
        center?: PointOptions;
        highlightOnSector?: boolean;
        radiuspoint?: PointOptions;
        selection?: "auto";
    }

    /**
     * The angle element is used to denote an angle defined by three points.
     * Visually it is just a Sector element with a radius not defined by the parent elements but by an attribute radius.
     * As opposed to the sector, an angle has two angle points and no radius point.
     * Sector is displayed if type=="sector".
     * If type=="square", instead of a sector a parallelogram is displayed.
     * In case of type=="auto", a square is displayed if the angle is near orthogonal.
     * If no name is provided the angle label is automatically set to a lower greek letter.
     */
    export interface Angle extends Sector {
        /**
         * Indicates a right angle.
         * Invisible by default, use dot.visible: true to show.
         * Though this dot indicates a right angle, it can be visible even if the angle is not a right one.
         */
        dot: Point;
        /**
         * The point defining the radius of the angle element.
         */
        point: Point;
        /**
         * Helper point for angles of type 'square'.
         */
        pointsquare: Point;
        /**
         * Frees an angle from a prescribed value.
         */
        free(): void;
        /**
         * Set an angle to a prescribed value given in radians.
         * This is only possible if the third point of the angle, i.e. the anglepoint is a free point.
         * @param val Number or Function which returns the size of the angle in Radians.
         */
        setAngle(val: number | NumberFunction): Angle;

        setAttribute(attributes: AngleAttributes): this;

        /**
         * Returns the value of the angle in Radians.
         */
        Value(): number;
    }
    export interface AngleAttributes extends SectorAttributes {
        arc?: ArcAttributes;
        dot?: PointAttributes;
        label?: LabelOptions;
        /**
         * Sensitivity (in degrees) to declare an angle as right angle.
         * If the angle measure is inside this distance from a right angle, the orthoType of the angle is used for display.
         * Default Value: 1.0
         */
        orthoSensitivity?: number;
        /**
         * Display type of the angle field in case of a right angle.
         * Default Value: 'square'
         */
        orthoType?: "sector" | "sectordot" | "square" | "none";
        /**
         * @deprecated
         */
        pointsquare?: PointAttributes;
        /**
         * Radius of the sector, displaying the angle.
         * Default Value: 1.0
         */
        radius?: number;
        radiuspoint?: PointAttributes;
        /**
         * Display type of the angle field.
         * Default Value: 'sector'
         */
        type?: "sector" | "sectordot" | "square" | "none";
    }
    export interface AngleOptions extends SectorOptions {
        arc?: ArcOptions;
        dot?: PointOptions;
        label?: LabelOptions;
        /**
         * Sensitivity (in degrees) to declare an angle as right angle.
         */
        orthoSensitivity?: number;
        /**
         * Display type of the angle field in case of a right angle.
         */
        orthoType?: "square" | "sectordot";
        /**
         * @deprecated
         */
        pointsquare?: PointOptions;
        /**
         * Radius of the sector, displaying the angle.
         */
        radius?: number;
        radiuspoint?: PointOptions;
        /**
         * Display type of the angle field.
         */
        type?: "sector";
    }

    /**
     *
     */
    export interface Functiongraph extends Curve {
        setAttribute(attributes: FunctiongraphAttributes): this;
    }
    export interface FunctiongraphAttributes extends GeometryElementAttributes {
        label?: LabelOptions;
    }

    /**
     *
     */
    export class Point extends CoordsElement {
        constructor(board: Board, coordinates: [number, number], attributes: PointAttributes);
        X(): number;
        Y(): number;
        Dist(point: Point): number;
        /**
         * Test if the point is on (is incident with) the element.
         * @param element The geometry element being used as a reference point.
         * @param tolerance The optional tolerance value. Defaults to Math.eps
         */
        isOn(element: GeometryElement, tolerance?: number): boolean;
        setAttribute(attributes: PointAttributes): this;
        ref: [x: number, y: number] | (() => [x: number, y: number]);
        scale: [x: number, y: number] | (() => [x: number, y: number]);
        dp: [x: number, y: number] | (() => [x: number, y: number]);
    }

    type FaceType =
        | "x"
        | "cross"
        | "o"
        | "circle"
        | "[]"
        | "square"
        | "+"
        | "plus"
        | "<>"
        | "diamond"
        | "<<>>"
        | "diamond2"
        | "^"
        | "triangleUp"
        | "triangleDown"
        | "<"
        | "triangleLeft"
        | ">"
        | "triangleRight";

    /**
     *
     */
    export interface PointAttributes extends CoordsElementAttributes {
        /**
         * If the distance of the point to one of its attractors is less than this number the point will be a glider on this attracting element.
         * If set to zero nothing happens.
         * Default Value: 0
         */
        attractorDistance?: number;
        /**
         * List of attractor elements.
         * If the distance of the point is less than attractorDistance the point is made to glider of this element.
         * Default Value: empty
         */
        attractors?: any[];
        /**
         * Unit for attractorDistance and snatchDistance, used for magnetized points and for snapToPoints.
         * Default Value: 'user'
         */
        attractorUnit?: "screen" | "user";
        /**
         * ???
         */
        color?: string;
        /**
         * There are different point styles which differ in appearance.
         */
        face?: FaceType;
        /**
         * ???
         */
        highlight?: any;
        /**
         * List of elements which are ignored by snapToPoints.
         */
        ignoredSnapToPoints?: GeometryElement[];
        /**
         * Truncating rule for the digits in the infobox.
         * 'auto' - done automatically.
         * 'none' - no truncation.
         * number: truncate after the specified number of digits with JXG.toFixed().
         * Default: 'auto'
         */
        infoboxDigits?: "auto" | "none" | number;
        /**
         * ???
         */
        label?: LabelOptions;
        /**
         * ???
         */
        radius?: number;
        /**
         * If true, the infobox is shown on mouse over, else not.
         * Default: true.
         */
        showInfobox?: boolean;
        /**
         * Size of a point, either in pixel or user coordinates.
         * Means radius resp. half the width of a point (depending on the face).
         * Default Value: 3
         */
        size?: number;
        /**
         * Unit for size.
         * Default Value: 'screen'
         */
        sizeUnit?: "screen" | "user";
        /**
         * Defines together with `snapSizeY` the grid the point snaps on to.
         * The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default x axes of the board.
         * Default Value: 1
         */
        snapSizeX?: number;
        /**
         * Defines together with `snapSizeX` the grid the point snaps on to.
         * The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default y axes of the board.
         * Default Value: 1
         */
        snapSizeY?: number;
        /**
         * If set to true, the point will snap to a grid defined by `snapSizeX` and `snapSizeY`.
         * Default Value: false
         */
        snapToGrid?: boolean;
        /**
         * If set to true, the point will snap to the nearest point in distance of `attractorDistance`.
         * Default Value: false
         */
        snapToPoints?: boolean;
        /**
         * If the distance of the point to one of its attractors is at least this number the point will be released from being a glider on the attracting element.
         * Default Value 0
         */
        snatchDistance?: number;
        /**
         * This attribute was used to determined the point layout.
         * It was derived from GEONExT and was replaced by Point#face and Point#size.
         * Default Value: 5
         */
        style?: number;
        /**
         * If true, the point size changes on zoom events.
         * Default Value: false
         */
        zoom?: boolean;
    }

    export interface PointOptions {
        /**
         *
         */
        fixed: boolean;
        /**
         *
         */
        highlight?: boolean;
        /**
         *
         */
        snapSizeX: number;
        /**
         *
         */
        snapSizeY: number;
        /**
         *
         */
        snapToGrid: boolean;
    }

    export interface Perpendicular extends Segment {
        setAttribute(attributes: PerpendicularAttributes): this;
    }
    export interface PerpendicularAttributes extends SegmentAttributes {}
    export interface PerpendicularOptions extends SegmentOptions {}

    export interface PerpendicularSegment extends Segment {}
    export interface PerpendicularSegmentAttributes extends SegmentAttributes {
        point?: PointAttributes;
    }
    export interface PerpendicularSegmentOptions extends SegmentOptions {
        point?: PointOptions;
    }

    /**
     *
     */
    export class Polygon extends GeometryElement {
        constructor(board: Board, vertices: unknown[], attributes: PolygonAttributes);
        /**
         * References to the points defining the polygon. The last vertex is the same as the first vertex.
         */
        vertices: Point[];
        addPoints(p: Point): this;
        Area(): number;
        /**
         * Bounding box of a polygon.
         * The bounding box is an array of four numbers:
         * the first two numbers determine the upper left corner,
         * the last two number determine the lower right corner of the bounding box.
         */
        boundingBox(): [minX: number, maxY: number, maxX: number, minY: number];
        findPoint(p: Point): number;
        getTextAnchor(): unknown;
        hasPoint(x: number, y: number): boolean;
        hideElement(borderless?: boolean): void;
        insertPoints(idx: number, p: Point): this;
        intersect(polygon: Polygon): number[][];
        Perimeter(): number;
        remove(): void;
        removePoints(p: Point): this;
        setAttribute(attributes: PolygonAttributes): this;
        /**
         * Moves an element by the difference of two coordinates.
         * @param method The type of coordinates used here. Possible values are JXG.COORDS_BY_USER and JXG.COORDS_BY_SCREEN.
         * @param coords coordinates in screen/user units
         * @param oldcoords
         * @returns Reference to this Polygon.
         */
        setPositionDirectly(method: number, coords: unknown[], oldcoords?: unknown[]): this;
        showElement(borderless?: boolean): void;
        updateRenderer(): void;
    }

    /**
     *
     */
    export interface PolygonAttributes extends GeometryElementAttributes {
        /**
         * Attributes for the polygon border lines.
         */
        borders?: LineAttributes;
        /**
         * If true, moving the mouse over inner points triggers hasPoint.
         */
        hasInnerPoints?: boolean;
        /**
         * Attributes for the polygon label.
         */
        label?: LabelOptions;
        /**
         * Attributes for the polygon vertices.
         */
        vertices?: PointAttributes;
        /**
         * Is the polygon bordered by lines?
         */
        withLines?: boolean;
    }

    export interface PolygonOptions extends GeometryElementAttributes {
        /**
         * Attributes for the polygon border lines.
         */
        borders: LineOptions;
        /**
         * If true, moving the mouse over inner points triggers hasPoint.
         */
        hasInnerPoints?: boolean;
        /**
         * Attributes for the polygon label.
         */
        label?: LabelOptions;
        /**
         * Attributes for the polygon vertices.
         */
        vertices?: PointAttributes;
        /**
         * Is the polygon bordered by lines?
         */
        withLines?: boolean;
    }

    export interface PolygonalChain extends Polygon {}
    export interface PolygonalChainAttributes extends PolygonAttributes {}
    export interface PolygonalChainOptions extends PolygonOptions {}

    export interface PrescribedAngleOptions extends AngleOptions {}

    /**
     * A glider is a point which lives on another geometric element like a line, circle, curve, turtle.
     */
    export interface Glider extends Point {
        /**
         * When used as a glider this member stores the object, where to glide on.
         * To set the object to glide on use the method makeGlider.
         * DO NOT set this property directly as it will break the dependency tree.
         */
        slideObject: GeometryElement;
        setAttribute(attributes: GliderAttributes): this;
    }
    export interface GliderAttributes extends PointAttributes {}
    export interface GliderOptions extends PointOptions {}

    /**
     * Hatch marks can be used to mark congruent lines.
     */
    export interface Hatch extends Ticks {
        setAttribute(attributes: HatchAttributes): this;
    }
    export interface HatchAttributes extends TicksAttributes {}

    /**
     *
     */
    export interface Input extends Text {
        /**
         *
         */
        Value(): string;
        setAttribute(attributes: InputAttributes): this;
    }
    export interface InputAttributes extends TextAttributes {}
    export interface InputOptions extends TextOptions {
        disabled?: boolean;
        maxlength?: number;
    }

    /**
     *
     */
    export interface Integral extends Curve {
        setAttribute(attributes: IntegralAttributes): this;
    }
    export interface IntegralAttributes extends CurveAttributes {
        baseLeft?: PointAttributes;
        baseRight?: PointAttributes;
        curveLeft?: CurveAttributes;
        curveRight?: CurveAttributes;
    }
    export interface IntegralOptions extends CurveOptions {
        axis?: "x" | "y";
        baseLeft?: PointOptions;
        baseRight?: PointOptions;
        curveLeft?: CurveOptions;
        curveRight?: CurveOptions;
    }

    export interface Normal extends Line {
        setAttribute(attributes: NormalAttributes): this;
    }
    export interface NormalAttributes extends LineAttributes {}

    /**
     * A slider can be used to choose values from a given range of numbers.
     */
    export interface Slider extends Glider {
        /**
         * End value of the slider range.
         */
        readonly _smax: number;
        /**
         * Start value of the slider range.
         */
        readonly _smin: number;
        /**
         * Returns the current slider value.
         */
        Value(): number;
        /**
         * Sets the attributes of the slider.
         * @param attributes The slider attributes.
         * @returns The instance of the slider, allowing method chaining.
         */
        setAttribute(attributes: SliderAttributes): this;
        /**
         * Sets the maximum value of the slider.
         * @param max The maximum value.
         * @returns The instance of the slider, allowing method chaining.
         */
        setMax(max: number): this;
        /**
         * Sets the minimum value of the slider.
         * @param max The minimum value.
         * @returns The instance of the slider, allowing method chaining.
         */
        setMin(min: number): this;
        /**
         * Sets the value of the slider.
         * This call must be followed by a board update call.
         * @param value The new value for the slider.
         * @returns The instance of the slider, allowing method chaining.
         */
        setValue(value: number): this;
    }

    export interface SliderAttributes extends GeometryElementAttributes {
        /**
         * Attributes for the base line of the slider.
         */
        baseline?: LineAttributes;
        /**
         * The number of digits of the slider value displayed in the optional text.
         * The default value is 2.
         */
        digits?: number;
        /**
         * Attributes for the highlighting line of the slider.
         */
        highline?: LineAttributes;
        /**
         * Attributes for the slider label.
         */
        label?: LabelOptions;
        firstArrow?: boolean | ArrowSpecification;
        lastArrow?: boolean | ArrowSpecification;
        /**
         * If true, 'up' events on the baseline will trigger slider moves.
         */
        moveOnUp?: boolean;
        /**
         * Attributes for first (left) helper point defining the slider position.
         */
        point1?: PointAttributes;
        /**
         * Attributes for second (right) helper point defining the slider position.
         */
        point2?: PointAttributes;
        /**
         * If not null, this is appended to the value and to unitLabel in the slider label.
         * Possible types: string, number or function.
         */
        postLabel?: string | StringFunction | number | NumberFunction | null;
        /**
         *
         */
        showInfobox?: boolean;
        /**
         * Size of slider point.
         * Default Value: 2
         */
        size?: number;
        /**
         * The slider only returns integer multiples of this value, e.g. for discrete values set this property to 1.
         * For continuous results set this to -1.
         */
        snapWidth?: number;
        /**
         * If not null, this replaces the part "name = " in the slider label.
         * Possible types: string, number or function.
         */
        suffixLabel?: string | StringFunction | number | NumberFunction | null;
        /**
         * Attributes for the ticks of the base line of the slider.
         */
        ticks?: TicksAttributes;
        /**
         * If not null, this is appended to the value in the slider label.
         * Possible types: string, number or function.
         */
        unitLabel?: string | StringFunction | number | NumberFunction | null;
        /**
         * Show slider label.
         */
        withLabel?: boolean;
        /**
         * Show slider ticks.
         */
        withTicks?: boolean;
    }

    export interface SliderOptions extends GeometryElementAttributes {
        anchorX?: AnchorX;
        anchorY?: AnchorY;
        baseline?: LineOptions;
        highline?: LineOptions;
        display?: "html";
        firstArrow?: boolean | ArrowSpecification;
        lastArrow?: boolean | ArrowSpecification;
        label?: LabelOptions;
        moveOnUp?: boolean;
        digits?: number;
        point1?: PointOptions;
        point2?: PointOptions;
        postLabel?: string | StringFunction | number | NumberFunction | null;
        showInfobox?: boolean;
        size?: number;
        snapWidth?: number;
        step?: number;
        suffixLabel?: string | StringFunction | number | NumberFunction | null;
        ticks?: TicksOptions;
        unitLabel?: string | StringFunction | number | NumberFunction | null;
        widthOut?: number;
        widthRange?: number;
        withTicks?: boolean;
    }

    /**
     *
     */
    export interface Slopetriangle extends Line {
        setAttribute(attributes: SlopetriangleAttributes): this;
    }
    export interface SlopetriangleAttributes extends LineAttributes {
        /**
         *
         */
        baseline?: LineAttributes;
        /**
         *
         */
        basepoint?: PointAttributes;
        /**
         *
         */
        borders?: LineAttributes;
        /**
         *
         */
        glider?: GliderAttributes;
        /**
         *
         */
        label?: any;
        /**
         *
         */
        tangent?: LineAttributes;
        /**
         *
         */
        toppoint?: PointAttributes;
    }
    export interface SlopetriangleOptions extends LineOptions {
        baseline?: LineOptions;
        basepoint?: PointOptions;
        borders?: LineOptions;
        glider?: GliderOptions;
        tangent?: LineOptions;
        topPoint?: PointOptions;
    }

    /**
     *
     */
    export interface Stepfunction extends Curve {
        setAttribute(attributes: StepfunctionAttributes): this;
    }
    export interface StepfunctionAttributes extends CurveAttributes {}
    export interface StepfunctionOptions extends CurveOptions {}
    /**
     * With the element tangent the slope of a line, circle, or curve in a certain point can be visualized.
     * A tangent is always constructed by a glider on a line, circle, or curve and describes the tangent in the glider point on that line, circle, or curve.
     */
    export interface Tangent extends Line {
        setAttribute(attributes: TangentAttributes): this;
    }
    export interface TangentAttributes extends LineAttributes {}

    export class Line extends GeometryElement {
        constructor(board: Board, p1: Point, p2: Point, attributes: LineAttributes);
        /**
         * Startpoint of the line.
         */
        point1: Point;

        /**
         * Endpoint of the line.
         */
        point2: Point;
        /**
         * Determines the angle between the positive x axis and the line.
         */
        getAngle(): number;

        /**
         * The distance between the two points defining the line.
         */
        L(): number;

        /**
         * Calculates the slope of the line.
         */
        Slope(): number;
        setAttribute(attributes: LineAttributes): this;
    }
    /**
     *
     */
    export interface LineAttributes extends GeometryElementAttributes {
        /**
         * Determines whether the line has an arrow at the first defining point.
         *
         * type=7 is the default for curves if firstArrow: true
         *
         * Default Value: false
         */
        firstArrow?:
            | boolean
            | {
                  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
                  highlightSize?: number;
                  size?: number;
              };
        /**
         * Attributes for the line label.
         */
        label?: LabelOptions;
        /**
         * Determines whether the line has an arrow at the second defining point.
         *
         * type=7 is the default for curves if lastArrow: true
         *
         * Default Value: false
         */
        lastArrow?:
            | boolean
            | {
                  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
                  highlightSize?: number;
                  size?: number;
              };
        /**
         * Line endings (linecap) of a stroke element, i.e. line, circle, curve.
         *
         * Not available for VML renderer.
         *
         * Default Value: 'butt'
         */
        lineCap?: "butt" | "round" | "square";
        /**
         * Attributes for first defining point of the line.
         */
        point1?: PointAttributes;
        /**
         * Attributes for second defining point of the line.
         */
        point2?: PointAttributes;
        /**
         * Defines together with Point#snapSizeY the grid the point snaps on to.
         * The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default x axes of the board.
         *
         * Default Value: 1
         */
        snapSizeX?: number;
        /**
         * Defines together with Point#snapSizeX the grid the point snaps on to.
         * The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than 0, it will use the grid displayed by the major ticks of the default ticks of the default y axes of the board.
         *
         * Default Value: 1
         */
        snapSizeY?: number;
        /**
         * If set to true, the point will snap to a grid defined by Point#snapSizeX and Point#snapSizeY.
         *
         * Default Value: false
         */
        snapToGrid?: boolean;
        /**
         * Determines whether the line is drawn beyond the first defining point.
         *
         * If true, line stretches infinitely in direction of its first point. Otherwise it ends at point1.
         *
         * Default Value: true
         */
        straightFirst?: boolean;
        /**
         * Determines whether the line is drawn beyond the second defining point.
         *
         * If true, line stretches infinitely in direction of its second point. Otherwise it ends at point2.
         *
         * Default Value: true
         */
        straightLast?: boolean;
        /**
         * Attributes for ticks of the line.
         */
        ticks?: TicksOptions;
        /**
         * If set to true and Line#firstArrow is set to true, the arrow head will just touch the circle line of the start point of the line.
         *
         * Default Value: false
         */
        touchFirstPoint?: boolean;
        /**
         * If set to true and Line#lastArrow is set to true, the arrow head will just touch the circle line of the start point of the line.
         *
         * Default Value: false
         */
        touchLastPoint?: boolean;
    }

    export interface LineOptions extends GeometryElementAttributes {
        /**
         * Determines whether the line has an arrow at the first defining point.
         */
        firstArrow?:
            | boolean
            | {
                  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
                  highlightSize?: number;
                  size?: number;
              };
        /**
         *
         */
        fixed?: boolean;
        /**
         *
         */
        label?: LabelOptions;
        /**
         * Determines whether the line has an arrow at the second defining point.
         */
        lastArrow?:
            | boolean
            | {
                  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
                  highlightSize?: number;
                  size?: number;
              };
        /**
         * Line endings (linecap) of a stroke element, i.e. line, circle, curve.
         *
         * Not available for VML renderer.
         *
         * Default Value: 'butt'
         */
        lineCap?: "butt" | "round" | "square";
        /**
         *
         */
        point1?: PointOptions;
        /**
         *
         */
        point2?: PointOptions;
        /**
         *
         */
        snapSizeX?: number;
        /**
         *
         */
        snapSizeY?: number;
        /**
         * Determines whether the line is drawn beyond the first defining point.
         */
        straightFirst?: boolean;
        /**
         * Determines whether the line is drawn beyond the second defining point.
         */
        straightLast?: boolean;
        /**
         *
         */
        ticks?: TicksOptions;
        /**
         *
         */
        touchFirstPoint?: boolean;
        /**
         *
         */
        touchLastPoint?: boolean;
        /**
         *
         */
        margin?: number;
        /**
         *
         */
        withTicks?: boolean;
    }

    /**
     *
     */
    export interface Arc extends Curve {
        /**
         * The point defining the arc's angle.
         */
        anglepoint: Point;
        /**
         * Center of the arc.
         */
        center: Point;
        /**
         * Point defining the arc's radius.
         */
        radiuspoint: Point;
        /**
         * Checks whether (x,y) is within the sector defined by the arc.
         * x: Coordinate in x direction, screen coordinates.
         * y: Coordinate in y direction, screen coordinates.
         */
        hasPointSector(x: number, y: number): boolean;
        /**
         * Determines the arc's current radius.
         * i.e. the distance between center and radiuspoint.
         */
        Radius(): number;
        setAttribute(attributes: ArcAttributes): this;

        /**
         * Returns the length of the arc.
         */
        Value(): number;
    }

    export interface ArrowSpecification {
        type?: number;
        highlightSize?: number;
        size?: number;
    }

    /**
     *
     */
    export interface ArcAttributes extends CurveAttributes {
        anglePoint?: PointAttributes;
        center?: PointAttributes;
        firstArrow?: ArrowSpecification | boolean | (() => ArrowSpecification | boolean);
        hasInnerPoints?: boolean;
        label?: LabelOptions;
        lastArrow?: ArrowSpecification | boolean | (() => ArrowSpecification | boolean);
        radiuspoint?: PointAttributes;
        selection?: "auto" | "major" | "minor";
        useDirection?: boolean;
    }

    export interface ArcOptions extends CurveOptions {
        anglePoint?: PointAttributes;
        center?: PointAttributes;
        firstArrow?: ArrowSpecification | boolean | (() => ArrowSpecification | boolean);
        hasInnerPoints?: boolean;
        label?: LabelOptions;
        lastArrow?: ArrowSpecification | boolean | (() => ArrowSpecification | boolean);
        radiuspoint?: PointAttributes;
        selection?: "auto" | "major" | "minor";
        useDirection?: boolean;
    }

    /**
     *
     */
    export interface Arrow extends Line {
        setAttribute(attributes: ArrowAttributes): this;
    }
    export interface ArrowAttributes extends GeometryElementAttributes {
        firstArrow?: boolean | ArrowSpecification;
        lastArrow?: boolean | ArrowSpecification;
    }
    export interface ArrowOptions extends GeometryElementOptions {}

    /**
     *
     */
    export interface Axis extends Line {
        /**
         *
         */
        defaultTicks: Ticks;
        setAttribute(attributes: AxisAttributes): this;
    }
    export interface AxisAttributes extends GeometryElementAttributes {
        /**
         * Attributes for the axis label.
         */
        label?: LabelOptions;
        lastArrow?: boolean | ArrowSpecification;
        margin?: number;
        /**
         * Attributes for the first point on the axis.
         */
        point1?: PointAttributes;
        /**
         * Attributes for the second point on the axis.
         */
        point2?: PointAttributes;
        straightFirst?: boolean;
        straightLast?: boolean;
        /**
         * Attributes for ticks of the axis.
         */
        ticks?: TicksOptions;
        /**
         * Show / hide ticks.
         * @deprecated Use "ticks: {visible: false}"
         */
        withTicks?: boolean;
    }

    export interface Bisector extends Line {}

    export interface BisectorAttributes extends LineAttributes {
        point?: PointAttributes;
    }

    export interface Intersection extends Point {
        setAttribute(attributes: IntersectionAttributes): this;
    }
    export interface IntersectionAttributes extends PointAttributes {}
    export interface IntersectionOptions extends PointOptions {}

    export interface Metapostspline extends Curve {}

    export interface MetapostsplineAttributes extends CurveAttributes {}

    export interface Midpoint extends Point {
        setAttribute(attributes: MidpointAttributes): this;
    }
    export interface MidpointAttributes extends PointAttributes {}

    export interface MinorArc extends Arc {
        setAttribute(attributes: MinorArcAttributes): this;
    }
    export interface MinorArcAttributes extends ArcAttributes {}

    /**
     * A mirror element is determined by the reflection of a given point across another given point.
     */
    export interface Mirroelement extends GeometryElement {}
    export interface MirrorelementAttributes extends GeometryElementAttributes {}

    /**
     * A reflected point is given by a point and a line.
     * It is determined by the reflection of the given point against the given line.
     */
    export interface Reflection extends Point {
        setAttribute(attributes: ReflectionAttributes): this;
    }
    export interface ReflectionAttributes extends PointAttributes {}
    export interface ReflectionOptions extends PointOptions {}

    export interface RegularPolygon extends Polygon {}
    export interface RegularPolygonAttributes extends PolygonAttributes {}
    export interface RegularPolygonOptions extends PolygonOptions {}

    /**
     *
     */
    export interface Riemannsum extends Curve {
        /**
         *
         */
        Value(): number;
        setAttribute(attributes: RiemannsumAttributes): this;
    }
    export interface RiemannsumAttributes extends CurveAttributes {}
    export interface RiemannsumOptions extends CurveOptions {}

    export interface Sector extends Curve {
        setAttribute(attributes: SectorAttributes): this;
    }
    export interface SectorAttributes extends CurveAttributes {}

    /**
     *
     */
    export interface Segment extends Line {
        /**
         * Checks whether (x,y) is near the segment.
         * @param x: Coordinate in x direction, screen coordinates.
         * @param y: Coordinate in y direction, screen coordinates.
         * @param start: Optional start index for search on data plots.
         */
        hasPoint(x: number, y: number, start?: number): boolean;

        setAttribute(attributes: SegmentAttributes): this;
    }
    export interface SegmentAttributes extends LineAttributes {}
    export interface SegmentOptions extends LineOptions {}

    export interface Semicircle extends Arc {}
    export interface SemicircleAttributes extends ArcAttributes {}
    export interface SemicircleOptions extends ArcOptions {}

    /**
     *
     */
    export class Ticks extends GeometryElement {
        constructor(line: Line, ticks: number | unknown[], attributes: TicksAttributes);

        /**
         * Equidistant ticks. Distance is defined by `ticksFunction`.
         */
        equidistant: boolean;

        /**
         * Array of fixed ticks.
         */
        fixedTicks: number[] | null;

        /**
         * To ensure the uniqueness of label ids this counter is used.
         */
        labelCounter: number;

        /**
         * Array where the labels are saved.
         */
        labels: Label[];

        /**
         * The line the ticks belong to.
         */
        line: Line;

        /**
         * Least distance between two ticks, measured in pixels.
         */
        minTicksDistance: number;

        /**
         * Stores the ticks coordinates as an array of length 3.
         *
         * The first two entries of the array are path coordinates in screen
         * coordinates of the tick (arrays of length 2). The 3rd entry is true if
         * the tick is a major tick, otherwise false.
         *
         * If the tick is outside of the canvas, the return array is empty.
         */
        ticks: Array<[[x1: number, x2: number], [y1: number, y2: number], boolean]>;

        /**
         * Distance between two major ticks in user coordinates
         */
        ticksDelta: number;

        /**
         * A function calculating ticks delta depending on the ticks number.
         */
        ticksFunction: () => number;

        setAttribute(attributes: TicksAttributes): this;
    }

    /**
     *
     */
    export interface TicksAttributes extends GeometryElementAttributes {
        /**
         *
         */
        anchor?: "left" | "middle" | "right";
        /**
         *
         */
        beautifulScientificTickLabels?: boolean;
        /**
         *
         */
        // defaultDistance?: number;
        /**
         *
         */
        drawLabels?: boolean;
        /**
         *
         */
        drawZero?: boolean;
        face?: "|" | "<" | ">";
        /**
         *
         */
        generateLabelText?:
            | ((labeled: Coords, center: Coords, value: null | Number | String) => string)
            | null;
        /**
         *
         */
        generateLabelValue?: ((labeled: Coords, center: Coords) => string) | null;
        /**
         *
         */
        includeBoundaries?: boolean;
        /**
         *
         */
        insertTicks?: boolean;
        /**
         *
         */
        label?: LabelOptions;
        /**
         *
         */
        labels?: string[];
        /**
         *
         */
        majorHeight?: number;
        /**
         *
         */
        maxLabelLength?: number;
        /**
         *
         */
        minTicksDistance?: number;
        /**
         *
         */
        minorHeight?: number;
        /**
         *
         */
        minorTicks?: number;
        /**
         *
         */
        digits?: number;
        /**
         *
         */
        scale?: number;
        /**
         *
         */
        scaleSymbol?: string;
        /**
         *
         */
        tickEndings?: number[];
        /**
         *
         */
        ticksDistance?: number;
        /**
         *
         */
        type?: "line" | "string";
        /**
         *
         */
        useUnicodeMinus?: boolean;
    }
    export interface TicksOptions extends GeometryElementOptions {
        anchor?: "left" | "middle" | "right";
        beautifulScientificTickLabels?: boolean;
        // defaultDistance?: number;
        drawLabels?: boolean;
        drawZero?: boolean;
        face?: "|" | "<" | ">";
        fillColor?: string;
        generateLabelText?:
            | ((one: Coords, two: Coords, value: null | Number | String) => void)
            | null;
        generateLabelValue?: ((labeled: Coords, center: Coords) => string) | null;
        highlightFillColor?: string;
        highlightStrokeColor?: string;
        includeBoundaries?: boolean;
        insertTicks?: boolean;
        label?: LabelOptions;
        labels?: any[];
        majorHeight?: number;
        maxLabelLength?: number;
        minorHeight?: number;
        minorTicks?: number;
        minTicksDistance?: number;
        needsRegularUpdate?: boolean;
        digits?: number;
        scale?: number;
        scaleSymbol?: string;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWidth?: number;
        ticksDistance?: number;
        tickEndings?: [number, number];
        /**
         *
         */
        ticksPerLabel?: number;
        // TODO: linear used in JSXGraph workshop Dec 16, 2020.
        type?: "line" | "linear" | "polar";
        useUnicodeMinus?: boolean;
        visible?: "inherit" | boolean;
    }

    /**
     *
     */
    export interface Tapemeasure extends Segment {
        setAttribute(attributes: TapemeasureAttributes): this;
    }
    export interface TapemeasureAttributes extends LineAttributes {
        label?: LabelOptions;
        point1?: PointAttributes;
        point2?: PointAttributes;
        digits?: number;
        ticks?: TicksOptions;
        withLabel?: boolean;
        withTicks?: boolean;
    }
    export interface TapemeasureOptions extends LineOptions {
        digits?: number;
    }

    export interface Tracecurve extends Curve {}
    export interface TracecurveAttributes extends CurveAttributes {
        numberPoints?: number;
    }
    export interface TracecurveOptions extends CurveOptions {
        numberPoints?: number;
    }

    export type TransformationType =
        | "generic"
        | "reflect"
        | "rotate"
        | "scale"
        | "shear"
        | "translate";

    /**
     * A transformation consists of a 3x3 matrix, i.e. it is a projective transformation.
     */
    export class Transformation extends GeometryElement {
        /**
         * @param board The board the new circle is drawn on.
         * @param type Can be 'translate', 'scale', 'reflect', 'rotate', 'shear', 'generic'
         * @param params The parameters depend on the transformation type.
         */
        constructor(board: Board, type: TransformationType, params: unknown);
        /**
         * Transform a GeometryElement: First, the transformation matrix is updated, then do the matrix-vector-multiplication.
         * @param p element which is transformed
         */
        private apply(p: GeometryElement): unknown[];
        /**
         * Applies a transformation once to a GeometryElement or an array of elements.
         * If it is a free point, then it can be dragged around later and will overwrite the transformed coordinates.
         * @param p
         */
        applyOnce(p: GeometryElement | GeometryElement[]): void;
        /**
         * Binds a transformation to a GeometryElement or an array of elements.
         * In every update of the GeometryElement(s), the transformation is executed.
         * That means, in order to immediately apply the transformation, a call of board.update() has to follow.
         * @param p JXG.Object or array of JXG.Object to which the transformation is bound to.
         */
        bindTo(p: GeometryElement | Point[]): void;
        /**
         * Combine two transformations to one transformation.
         * This only works if both of transformation matrices consist solely of numbers, and do not contain functions.
         * Multiplies the transformation with a transformation t from the left. i.e. (this) = (t) join (this)
         * @param t Transformation which is the left multiplicand
         * @returns the transformation object.
         */
        melt(t: Transformation): Transformation;
        /**
         * Empty method. Unused.
         * @param term Key-value pairs of the attributes.
         */
        setAttribute(term: TransformationAttributes): this;
        /**
         * Set the transformation matrix for different types of standard transforms.
         * @param board
         * @param type Transformation type, possible values are 'translate', 'scale', 'reflect', 'rotate', 'shear', 'generic'.
         * @param params Parameters for the various transformation types.
         * @param x Shift vector (number or function) in case of 'translate'.
         * @param y Shift vector (number or function) in case of 'translate'.
         * @param scale_x Scale vector (number or function) in case of 'scale'.
         * @param scale_y Scale vector (number or function) in case of 'scale'.
         */
        setMatrix(
            board: Board,
            type: TransformationType,
            params: unknown[],
            x: NumberOrFunction,
            y: NumberOrFunction,
            scale_x: NumberOrFunction,
            scale_y: NumberOrFunction
        ): void;
        /**
         * Updates the numerical data for the transformation, i.e. the entry of the subobject matrix.
         */
        update(): this;
    }
    /**
     *
     */
    export interface TransformationAttributes {
        type: TransformationType;
    }

    /**
     *
     */
    export class Turtle extends GeometryElement {
        /**
         * Constructs a new Turtle object.
         * @param board The board the new turtle is drawn on.
         * @param parents Start position and start direction of the turtle. Possible values are [x, y, angle] [[x, y], angle] [x, y] [[x, y]].
         * @param attributes Attributes to change the visual properties of the turtle object All angles are in degrees.
         */
        constructor(board: Board, parents: unknown[], attributes: TurtleAttributes);
        /**
         *
         */
        pos: number[];
        /**
         * Move the turtle backwards.
         */
        back(distance: number): Turtle;
        /**
         * Alias for back.
         */
        bk(distance: number): Turtle;
        /**
         * Removes the turtle curve from the board.
         * The turtle stays in its position.
         */
        clean(): Turtle;
        /**
         * Removes the turtle completely and resets it to its initial position and direction.
         */
        clearScreen(): Turtle;
        /**
         * Alias for clearScreen.
         */
        cs(): Turtle;
        /**
         * Alias for forward.
         */
        fd(distance: number): Turtle;
        /**
         * Move the turtle forward.
         */
        forward(distance: number): Turtle;
        /**
         * Checks whether (x,y) is near the curve.
         * x: Coordinate in x direction, screen coordinates.
         * y: Coordinate in y direction, screen coordinates.
         */
        hasPoint(x: number, y: number): boolean;
        /**
         * Sets the visibility of the turtle head to false.
         */
        hideTurtle(): Turtle;
        /**
         * Moves the turtle to position [0,0].
         */
        home(): Turtle;
        /**
         * Alias for hideTurtle.
         */
        ht(): Turtle;
        /**
         * Rotate the turtle direction to the left.
         * angle: angle of the rotation in degrees.
         */
        left(angle: number): Turtle;
        /**
         * Rotates the turtle into a new direction.
         * There are two possibilities:
         * If a number is given, it is interpreted as the new direction to look to.
         * If an array consisting of two numbers is given, target is used as a pair coordinates.
         */
        lookTo(target: number | [number, number]): Turtle;
        /**
         * Alias for left.
         */
        lt(angle: number): Turtle;
        /**
         * Gives the upper bound of the parameter if the turtle is treated as parametric curve.
         */
        maxX(): number;
        /**
         * Gives the lower bound of the parameter if the turtle is treated as parametric curve.
         */
        minX(): number;
        /**
         * Moves the turtle to a given coordinate pair.
         * The direction is not changed.
         */
        moveTo(target: [number, number]): Turtle;
        /**
         * Alias for penDown.
         */
        pd(): Turtle;
        /**
         * Pen down, continues visible drawing.
         */
        penDown(): Turtle;
        /**
         * Pen up, stops visible drawing.
         */
        penUp(): Turtle;
        /**
         * Alias for popTurtle.
         */
        pop(): Turtle;
        /**
         * Gets the last position of the turtle on the stack,
         * sets the turtle to this position and removes this position from the stack.
         */
        popTurtle(): Turtle;
        /**
         * Alias for penUp.
         */
        pu(): Turtle;
        /**
         * Alias for pushTurtle.
         */
        push(): Turtle;
        /**
         * Pushes the position of the turtle on the stack.
         */
        pushTurtle(): Turtle;
        /**
         * Alias for right.
         */
        rt(angle: number): Turtle;
        /**
         * Rotate the turtle direction to the right.
         * @param angle angle of the rotation in degrees.
         * @returns pointer to the turtle object.
         */
        right(angle: number): Turtle;
        /**
         * Sets properties of the turtle.
         * Sets the property for all curves of the turtle in the past and in the future.
         */
        setAttribute(attributes: TurtleAttributes): this;
        /**
         * Sets the highlight pen color.
         * Affects only the future turtle.
         */
        setHighlightPenColor(color: string): Turtle;
        /**
         * Sets the pen color.
         * Affects only the future turtle.
         */
        setPenColor(color: string): Turtle;
        /**
         * Sets the pen size.
         * Affects only the future turtle.
         */
        setPenSize(size: number): Turtle;
        /**
         * Moves the turtle without drawing to a new position.
         */
        setPos(x: number, y: number): Turtle;
        /**
         * Alias for setAttribute.
         */
        setProperty(attributes: TurtleAttributes): this;
        /**
         * Sets the visibility of the turtle head to true.
         */
        showTurtle(): Turtle;
        /**
         * Alias for showTurtle.
         */
        st(): Turtle;
        /**
         * If t is not supplied the x-coordinate of the turtle is returned.
         * Otherwise the x-coordinate of the turtle curve at position t is returned.
         */
        X(t?: number): number;
        /**
         * If t is not supplied the y-coordinate of the turtle is returned.
         * Otherwise the y-coordinate of the turtle curve at position t is returned.
         */
        Y(t?: number): number;
        /**
         * Returns the z-coordinate of the turtle position.
         */
        Z(t: number): number;
    }

    /**
     * Attributes to change the visual properties of the turtle object.
     * All angles are in degrees.
     */
    export interface TurtleAttributes extends GeometryElementAttributes {
        /**
         *
         */
        arrow?: ArrowAttributes;
    }
    export interface TurtleOptions extends GeometryElementOptions {
        arrow?: ArrowOptions;
    }

    export interface Circle3DAttributes extends GeometryElementAttributes {}

    export interface Curve3DAttributes extends CurveAttributes {}

    export interface Curve3D extends Curve {}

    export interface Line3DAttributes extends LineAttributes {}

    export interface Line3D extends Line {}

    export interface Plane3DAttributes extends GeometryElementAttributes {
        mesh3d?: {
            visible?: boolean;
        };
    }

    export interface Plane3D extends GeometryElement {}

    export interface Point3DAttributes extends GeometryElementAttributes {}

    export interface Point3D {
        X(): number;
        Y(): number;
        Z(): number;
    }

    export interface Sphere3DAttributes extends GeometryElementAttributes {}

    export interface View3DAttributes extends GeometryElementAttributes {
        axesPosition?: "center";

        xAxis?: Line3DAttributes;
        xPlaneFront?: Plane3DAttributes;
        xPlaneFrontYAxis?: Plane3DAttributes;
        xPlaneFrontZAxis?: Plane3DAttributes;
        xPlaneRear?: Plane3DAttributes;
        xPlaneRearYAxis?: Plane3DAttributes;
        xPlaneRearZAxis?: Plane3DAttributes;

        yAxis?: Line3DAttributes;
        yPlaneFront?: Plane3DAttributes;
        yPlaneFrontXAxis?: Plane3DAttributes;
        yPlaneFrontZAxis?: Plane3DAttributes;
        yPlaneRear?: Plane3DAttributes;
        yPlaneRearXAxis?: Plane3DAttributes;
        yPlaneRearZAxis?: Plane3DAttributes;

        zAxis?: Line3DAttributes;
        zPlaneFront?: Plane3DAttributes;
        zPlaneFrontXAxis?: Plane3DAttributes;
        zPlaneFrontYAxis?: Plane3DAttributes;
        zPlaneRear?: Plane3DAttributes;
        zPlaneRearXAxis?: Plane3DAttributes;
        zPlaneRearYAxis?: Plane3DAttributes;
    }

    export class View3D extends GeometryElement {
        /**
         * Constructs a new View3D object.
         * @param board
         * @param parents
         * @param attributes
         */
        constructor(board: Board, parents: unknown[], attributes: View3DAttributes);
        create(
            elementType: "circle3d",
            parents: unknown[],
            attributes?: Circle3DAttributes
        ): Circle3D;
        create(
            elementType: "curve3d",
            parents: unknown[],
            attributes?: Curve3DAttributes
        ): Curve3D;
        create(
            elementType: "functiongraph3d",
            parents: unknown[],
            attributes?: unknown
        ): unknown;
        create(
            elementType: "line3d",
            parents: unknown[],
            attributes?: Line3DAttributes
        ): Line3D;
        create(
            elementType: "parametricsurface3d",
            parents: unknown[],
            attributes?: unknown
        ): unknown;
        create(
            elementType: "plane3d",
            parents: unknown[],
            attributes?: Plane3DAttributes
        ): Plane3D;
        create(
            elementType: "point3d",
            parents: unknown[],
            attributes?: Point3DAttributes
        ): Point3D;
        create(
            elementType: "polygon3d",
            parents: unknown[],
            attributes?: Polygon3DAttributes
        ): Polygon3D;
        create(
            elementType: "sphere3d",
            parents: unknown[],
            attributes?: Sphere3DAttributes
        ): Sphere3D;
        add(el: unknown): void;
        update(): this;
        updateRenderer(): this;
        project3DTo2D(x: number, y: number, z: number): [number, number, number];
        project3DToCube(c3d: number[]): number[];
        intersectionLineCube(p: number[], d: number[], r: number): number;
        isInCube(q: number[]): boolean;
        intersectionPlanePlane(plane1: unknown, plane2: unknown, d?: number): unknown[];
        getMesh(
            X: unknown,
            Y: unknown,
            Z: unknown,
            interval_u: unknown,
            interval_v: unknown
        ): [unknown[], unknown[]];
        animateAzimuth(): void;
        stopAzimuth(): void;
    }

    /**
     *
     */
    type ElementType =
        | 'angle'
        | 'arc'
        | 'arrow'
        | 'arrowparallel'
        | 'axis'
        | 'bisector'
        | 'bisectorlines'
        | 'boxplot'
        | 'button'
        | 'cardinalspline'
        | 'chart'
        | 'checkbox'
        | 'circle'
        | 'circle3d'
        | 'circumcenter'
        | 'circumcircle'
        | 'circumcirclearc'
        | 'circumcirclesector'
        | 'comb'
        | 'conic'
        | 'curve'
        | 'curve3d'
        | 'curvedifference'
        | 'curveintersection'
        | 'curveunion'
        | 'derivative'
        | 'ellipse'
        | 'foreignobject'
        | 'functiongraph'
        | 'functiongraph3d'
        | 'glider'
        | 'grid'
        | 'group'
        | 'hatch'
        | 'hyperbola'
        | 'image'
        | 'incenter'
        | 'incircle'
        | 'inequality'
        | 'input'
        | 'integral'
        | 'intersection'
        | 'intersectioncircle3d'
        | 'intersectionline3d'
        | 'label'
        | 'legend'
        | 'line'
        | 'line3d'
        | 'locus'
        | 'majorarc'
        | 'majorsector'
        | 'metapostspline'
        | 'midpoint'
        | 'minorarc'
        | 'minorsector'
        | 'mirrorelement'
        | 'mirrorpoint'
        | 'nonreflexangle'
        | 'normal'
        | 'orthogonalprojection'
        | 'otherintersection'
        | 'parabola'
        | 'parallel'
        | 'parallelpoint'
        | 'parametricsurface3d'
        | 'perpendicular'
        | 'perpendicularpoint'
        | 'perpendicularsegment'
        | 'plot'
        | 'point'
        | 'point3d'
        | 'polygon3d'
        | 'polarline'
        | 'polepoint'
        | 'polygon'
        | 'polygonalchain'
        | 'radicalaxis'
        | 'reflection'
        | 'reflexangle'
        | 'regularpolygon'
        | 'riemannsum'
        | 'sector'
        | 'segment'
        | 'semicircle'
        | 'slider'
        | 'slopetriangle'
        | 'sphere3d'
        | 'spline'
        | 'stepfunction'
        | 'tangent'
        | 'tapemeasure'
        | 'text'
        | 'ticks'
        | 'tracecurve'
        | 'transform'
        | 'turtle'
        | 'view3d';

    /**
     * GEONExT syntax for coordinates.
     */
    type GEONExT = string;

    /**
     *
     */
    type HandlerFunction = () => any;

    /**
     *
     */
    type ImageURL = string;

    /**
     *
     */
    type BooleanFunction = () => boolean;

    /**
     *
     */
    type NumberFunction = () => number;

    /**
     *
     */
    type NumberOrFunction = number | NumberFunction;
    /**
     *
     */
    type BorderSpecification = NumberOrFunction;

    /**
     *
     */
    type CurveFunction = (x: number) => number;

    /**
     *
     */
    type CoordSpecification = NumberOrFunction | GEONExT;

    /**
     *
     */
    type PointSpecification = CoordSpecification[] | Point | (() => Point) | GEONExT;

    /**
     *
     */
    type StringFunction = () => string;

    /**
     *
     */
    type StringOrFunction = string | StringFunction;

    type RiemannSumType =
        | "left"
        | "right"
        | "middle"
        | "lower"
        | "upper"
        | "random"
        | "simpson"
        | "trapezoidal";
    type RiemannSumTypeFunction = () => RiemannSumType;
    type RiemannSumTypeOrFunction = RiemannSumType | RiemannSumTypeFunction;

    type AnchorX = "auto" | "left" | "middle" | "right";
    type AnchorY = "auto" | "top" | "middle" | "bottom";

    export interface Axis {
        name: string;
        ticks: {
            anchorX?: AnchorX;
            anchorY?: AnchorY;
            label?: LabelOptions;
            drawZero?: boolean;
            visible?: "inherit";
        };
    }

    export interface DefaultAxes {
        x: AxisAttributes;
        y: AxisAttributes;
    }

    /**
     *
     */
    export class Board {
        /**
         *
         * @param event
         * @param handler
         * @param context
         */
        addEvent(event: string, handler: (evt: PointerEvent) => void, context?: {}): {};
        /**
         *
         */
        animationObjects: unknown;
        /**
         *
         */
        attr: BoardAttributes;
        /**
         *
         */
        BOARD_MODE_DRAG: number;
        /**
         *
         */
        BOARD_MODE_MOVE_ORIGIN: number;
        /**
         *
         */
        BOARD_MODE_NONE: number;
        /**
         *
         */
        BOARD_MODE_ZOOM: number;
        /**
         *
         */
        BOARD_QUALITY_HIGH: number;
        /**
         *
         */
        BOARD_QUALITY_LOW: number;
        /**
         *
         */
        canvasHeight: number;
        /**
         *
         */
        canvasWidth: number;
        /**
         * The HTML id of the HTML element containing the board.
         */
        container: string;
        /**
         * The HTML element containing the board.
         */
        containerObj: HTMLDivElement;
        /**
         * Cached result of getCoordsTopLeftCorner for touch/mouseMove-Events to save some DOM operations.
         */
        cPos: unknown[];
        /**
         * The current color blindness deficiency.
         * If color blindness is not emulated at the moment, it's value is 'none'.
         */
        currentCBDef: "none" | string;
        /**
         *
         */
        defaultAxes: Partial<DefaultAxes>;
        /**
         * An array containing all other boards that are updated after this board has been updated.
         */
        dependentBoards: Board[];
        /**
         * Dimension of the board. Default value is 2.
         */
        dimension: number;
        /**
         * Collects all elements that triggered a mouse down event.
         */
        downObjects: unknown;
        /**
         * The distance from the mouse to the dragged object in x direction when the user clicked the mouse button.
         */
        drag_dx: number;
        /**
         * The distance from the mouse to the dragged object in y direction when the user clicked the mouse button.
         */
        drag_dy: number;
        /**
         * The last position where a drag event has been fired.
         */
        drag_position: [number, number];
        /**
         * An associative array to store the objects of the board by name.
         * The name of the object is the key and value is a reference to the object.
         */
        elementsByName: { [name: string]: GeometryElement };
        /**
         * If GEONExT constructions are displayed, then this property should be set to true.
         * At the moment there should be no difference. But this may change.
         */
        geonextCompatibilityMode: boolean;
        /**
         * Grids keeps track of all grids attached to this board.
         */
        grids: unknown[];
        /**
         * An associative array containing all groups belonging to the board.
         * Key is the id of the group and value is a reference to the object.
         */
        groups: { [id: string]: Group };
        hasGrid?: boolean;
        /**
         * A flag which tells if the board registers mouse events.
         *
         * Default is false.
         */
        hasMouseHandlers: boolean;
        /**
         * A flag which tells if the board the mouseUp event registered.
         *
         * Default is false.
         */
        hasMouseUp: boolean;
        /**
         * A flag which stores if the board registered pointer events.
         *
         * Default is false.
         */
        hasPointerHandlers: boolean;
        /**
         * A flag which tells if the board has a pointerUp event registered.
         */
        hasPointerUp: boolean;
        /**
         * A flag which indicates whether the touchEnd event is registered.
         */
        hasTouchEnd: boolean;
        /**
         * A flag which tells if the board registers touch events.
         */
        hasTouchHandlers: boolean;
        /**
         * An associative array containing all highlighted elements belonging to the board.
         */
        highlightedObjects: { [name: string]: unknown };
        /**
         * Information box close to points in which the coordinates of the point are displayed.
         * Uses CSS class .JXGinfobox.
         */
        infobox: Text;
        /**
         * During the update process this is set to false to prevent an endless loop.
         */
        inUpdate: boolean;
        /**
         * A flag which tells us if the user is selecting.
         */
        isSelecting: boolean;
        /**
         * If true updates are skipped.
         */
        isSuspendedRedraw: boolean;
        /**
         * Keep aspect ratio if bounding box is set and the width/height ratio differs from the width/height ratio of the canvas.
         */
        keepaspectratio: boolean;
        /**
         * The mode the board is currently in.
         */
        mode: number;
        /**
         * Reference to the object that is dragged with the mouse on the board.
         */
        mouse: unknown;
        /**
         * Full updates are needed after zoom and axis translates.
         * This saves some time during an update.
         */
        needsFullUpdate: boolean;
        /**
         * Number of objects ever created on this board.
         * This includes every object, even invisible and deleted ones.
         */
        numObjects: number;
        /**
         * An associative array containing all geometric objects belonging to the board.
         * Key is the id of the object and value is a reference to the object.
         */
        objects: { [id: string]: unknown };
        /**
         * An array containing all geometric objects on the board in the order of construction.
         */
        objectsList: unknown[];
        /**
         *
         */
        off: Function;
        /**
         * Coordinates of the boards origin.
         * This a object with the two properties usrCoords and scrCoords.
         * usrCoords always equals [1, 0, 0].
         * scrCoords stores the boards origin in homogeneous screen coordinates.
         */
        origin: {
            usrCoords: [number, number, number];
            scrCoords: [number, number, number];
        };
        /**
         * Contains the last time (epoch, msec) since the last getCoordsTopLeftCorner call which was not thrown away.
         */
        positionAccessLast: number;
        /**
         * If reducedUpdate is set to true then only the dragged element and few (e.g. 2) following elements are updated during mouse move.
         * On mouse up the whole construction is updated.
         * This enables us to be fast even on very slow devices.
         *
         * Default is false.
         */
        reducedUpdate: boolean;
        /**
         *
         */
        removeEvent: Function;
        /**
         * JessieCode
         */
        jc: JessieCode;
        /**
         *
         */
        options: JXGSettings;
        /**
         *
         */
        renderer: {
            dumpToCanvas(elementId: string): void;
            /**
             * Convert SVG construction to base64 encoded SVG data URL.
             * Only available on SVGRenderer.
             */
            dumpToDataURI(): string;
        };
        /**
         * A bounding box for the selection.
         */
        selectingBox: [[number, number], [number, number]];
        /**
         * A flag which tells us if the board is in the selecting mode.
         */
        selectingMode: boolean;
        /**
         * Keeps track on touched elements, like JXG.Board#mouse does for mouse events.
         */
        touches: unknown[];
        /**
         * Contains the last time (epoch, msec) since the last touchMove event which was not thrown away or since touchStart because Android's Webkit browser fires too much of them.
         */
        touchMoveLast: number;
        /**
         *
         */
        takeSizeFromFile: boolean;
        /**
         * The number of pixels which represent one unit in user-coordinates in x direction.
         */
        unitX: number;
        /**
         * The number of pixels which represent one unit in user-coordinates in y direction.
         */
        unitY: number;
        /**
         * The update quality of the board.
         */
        updateQuality: number;
        /**
         * Zoom factor in the X direction.
         */
        zoomX: number;
        /**
         * Zoom factor in the Y direction.
         */
        zoomY: number;
        /**
         * Adds an animation.
         * Animations are controlled by the boards, so the boards need to be aware of the animated elements.
         * This function tells the board about new elements to animate.
         * @param element The element which is to be animated.
         * @returns Reference to the board.
         */
        addAnimation(element: GeometryElement): Board;
        /**
         * Adds a dependent board to this board.
         * @param board A reference to board which will be updated after an update of this board occurred.
         * @returns Reference to the board.
         */
        addChild(board: Board): Board;
        addConditions(str: string): unknown;
        addEventHandlers(): unknown;
        addFullscreenEventHandlers(): unknown;
        addGrid(): unknown;
        /**
         * Please use Board.on instead.
         * @param hook A function to be called by the board after an update occurred.
         * @param m When the hook is to be called. Possible values are 'mouseup', 'mousedown', and 'update'. Default 'update'.
         * @param context Determines the execution context the hook is called. This parameter is optional, default is the board object the hook is attached to.
         * @returns Id of the hook, required to remove the hook from the board.
         */
        addHook(
            hook: () => void,
            m?: "mouseup" | "mousedown" | "update",
            context?: unknown
        ): number;
        addMouseEventHandlers(): unknown;
        addPointerEventHandlers(): unknown;
        addTouchEventHandlers(appleGestures: boolean): unknown;
        /**
         * General purpose animation function.
         * This currently only supports moving points from one place to another.
         * This is faster than managing the animation per point, especially if there is more than one animated point at the same time.
         */
        animate(): this;
        /**
         * Apply update on all objects with the new zoom-factors.
         * Clears all traces.
         */
        applyZoom(): this;
        /**
         * Calculates adequate snap sizes.
         */
        calculateSnapSizes(): this;
        /**
         * Delete the elements drawn as part of a trace of an element.
         */
        clearTraces(): this;
        /**
         * Handler for click on down arrow in the navigation bar.
         */
        clickDownArrow(): this;
        clickLeftArrow(): this;
        clickRightArrow(): this;
        clickUpArrow(): this;
        /**
         * Creates a new geometric element of type elementType.
         * @param elementType Type of the element to be constructed given as a string e.g. 'point' or 'circle'.
         * @param parents
         * @param attributes
         */
        create<T extends GeometryElement | Composition | Array<GeometryElement>>(
            elementType: string,
            parents: unknown[],
            attributes?: Record<string, unknown>
        ): T;
        /**
         *
         * @param elementType 'angle'
         * @param parents [centerPoint, radiusPoint, anglePoint] or [line1, line2, coords1 or direction1, coords2 or direction2]
         * @param attributes
         */
        create(elementType: "angle", parents: unknown[], attributes?: AngleAttributes): Angle;
        /**
         *
         * @param elementType 'arc'
         * @param parents
         * @param attributes
         */
        create(elementType: "arc", parents: unknown[], attributes?: ArcAttributes): Arc;
        /**
         *
         * @param elementType 'arrow'
         * @param parents
         * @param attributes
         */
        create(elementType: "arrow", parents: unknown[], attributes?: ArrowAttributes): Arrow;
        /**
         *
         * @param elementType 'axis'
         * @param parents
         * @param attributes
         */
        create(elementType: "axis", parents: unknown[], attributes?: AxisAttributes): Axis;
        /**
         *
         * @param elementType 'bisector'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "bisector",
            parents: unknown[],
            attributes?: BisectorAttributes
        ): Bisector;
        /**
         *
         * @param elementType 'boxplot'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "boxplot",
            parents: unknown[],
            attributes?: BoxplotAttributes
        ): Boxplot;
        /**
         *
         * @param elementType 'button'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "button",
            parents: unknown[],
            attributes?: ButtonAttributes
        ): Button;
        /**
         *
         * @param elementType 'cardinalspline'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "cardinalspline",
            parents: unknown[],
            attributes?: CardinalsplineAttributes
        ): Cardinalspline;
        /**
         *
         * @param elementType 'chart'
         * @param parents
         * @param attributes
         */
        create(elementType: "chart", parents: unknown[], attributes?: ChartAttributes): Chart;
        /**
         *
         * @param elementType 'checkbox'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "checkbox",
            parents: unknown[],
            attributes?: CheckboxAttributes
        ): Checkbox;
        /**
         *
         * @param elementType 'circle'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "circle",
            parents: unknown[],
            attributes?: CircleAttributes
        ): Circle;
        /**
         * @param elementType 'circumcircle'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "circumcircle",
            parents: unknown[],
            attributes?: CircumcircleAttributes
        ): Circumcircle;
        /**
         * @param elementType 'circumcirclearc'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "circumcirclearc",
            parents: unknown[],
            attributes?: CircumcircleArcAttributes
        ): CircumcircleArc;
        /**
         * @param elementType 'circumcirclesector'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "circumcirclesector",
            parents: unknown[],
            attributes?: CircumcircleSectorAttributes
        ): CircumcircleSector;
        /**
         *
         * @param elementType 'comb'
         * @param parents
         * @param attributes
         */
        create(elementType: "comb", parents: unknown[], attributes?: CombAttributes): Comb;
        /**
         *
         * @param elementType 'conic'
         * @param parents
         * @param attributes
         */
        create(elementType: "conic", parents: unknown[], attributes?: ConicAttributes): Conic;
        /**
         *
         * @param elementType 'curve'
         * @param parents
         * @param attributes
         */
        create(elementType: "curve", parents: unknown[], attributes?: CurveAttributes): Curve;
        /**
         *
         * @param elementType 'curvedifference'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "curvedifference",
            parents: unknown[],
            attributes?: CurveAttributes
        ): Curve;
        /**
         *
         * @param elementType 'curveintersection'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "curveintersection",
            parents: unknown[],
            attributes?: CurveAttributes
        ): Curve;
        /**
         *
         * @param elementType 'curveunion'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "curveunion",
            parents: unknown[],
            attributes?: CurveAttributes
        ): Curve;
        /**
         *
         * @param elementType 'ellipse'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "ellipse",
            parents: unknown[],
            attributes?: EllipseAttributes
        ): Ellipse;
        /**
         *
         * @param elementType 'functiongraph'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "functiongraph",
            parents: unknown[] | ((x: number) => number),
            attributes?: FunctiongraphAttributes
        ): Functiongraph;
        /**
         *
         * @param elementType 'glider'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "glider",
            parents: unknown[],
            attributes?: GliderAttributes
        ): Glider;
        /**
         *
         * @param elementType 'grid'
         * @param parents
         * @param attributes
         */
        create(elementType: "grid", parents: unknown[], attributes?: GridAttributes): Grid;
        /**
         *
         * @param elementType 'group'
         * @param parents
         * @param attributes
         */
        create(elementType: "group", parents: unknown[], attributes?: GroupAttributes): Group;
        /**
         *
         * @param elementType 'hatch'
         * @param parents
         * @param attributes
         */
        create(elementType: "hatch", parents: unknown[], attributes?: HatchAttributes): Hatch;
        /**
         *
         * @param elementType 'hyperbola'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "hyperbola",
            parents: unknown[],
            attributes?: HyperbolaAttributes
        ): Hyperbola;
        /**
         *
         * @param elementType 'image'
         * @param parents
         * @param attributes
         */
        create(elementType: "image", parents: unknown[], attributes?: ImageAttributes): Image;
        /**
         *
         * @param elementType 'inequality'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "inequality",
            parents: unknown[],
            attributes?: InequalityAttributes
        ): Inequality;
        /**
         *
         * @param elementType 'input'
         * @param parents
         * @param attributes
         */
        create(elementType: "input", parents: unknown[], attributes?: InputAttributes): Input;
        /**
         *
         * @param elementType 'integral'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "integral",
            parents: unknown[],
            attributes?: IntegralAttributes
        ): Integral;
        /**
         *
         * @param elementType 'intersection'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "intersection",
            parents: unknown[],
            attributes?: IntersectionAttributes
        ): Intersection;
        /**
         *
         * @param elementType 'line'
         * @param parents
         * @param attributes
         */
        create(elementType: "line", parents: unknown[], attributes?: LineAttributes): Line;
        /**
         *
         * @param elementType 'metapostspline'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "metapostspline",
            parents: unknown[],
            attributes?: MetapostsplineAttributes
        ): Metapostspline;
        /**
         *
         * @param elementType 'midpoint'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "midpoint",
            parents: unknown[],
            attributes?: MidpointAttributes
        ): Midpoint;
        /**
         *
         * @param elementType 'minorArc'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "minorArc",
            parents: unknown[],
            attributes?: MinorArcAttributes
        ): MinorArc;
        /**
         *
         * @param elementType 'mirrorelement'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "mirrorelement",
            parents: unknown[],
            attributes?: MirrorelementAttributes
        ): Mirrorelement;
        /**
         *
         * @param elementType 'normal'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "normal",
            parents: unknown[],
            attributes?: NormalAttributes
        ): Normal;
        /**
         *
         * @param elementType 'parabola'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "parabola",
            parents: unknown[],
            attributes?: ParabolaAttributes
        ): Parabola;
        /**
         *
         * @param elementType 'perpendicular'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "perpendicular",
            parents: unknown[],
            attributes?: PerpendicularAttributes
        ): Perpendicular;
        /**
         *
         * @param elementType 'plot'
         * @param parents
         * @param attributes
         */
        create(elementType: "plot", parents: unknown[], attributes?: CurveAttributes): Curve;
        /**
         *
         * @param elementType 'point'
         * @param parents [x, y], [z, x, y], and [element, transformation].
         * @param attributes
         */
        create(elementType: "point", parents: unknown[], attributes?: PointAttributes): Point;
        /**
         *
         * @param elementType 'polygon'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "polygon",
            parents: unknown[],
            attributes?: PolygonAttributes
        ): Polygon;
        /**
         *
         * @param elementType 'polygonalchain'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "polygonalchain",
            parents: unknown[],
            attributes?: PolygonAttributes
        ): Polygon;
        /**
         *
         * @param elementType 'regularpolygon'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "regularpolygon",
            parents: unknown[],
            attributes?: PolygonAttributes
        ): Polygon;
        /**
         *
         * @param elementType 'reflection'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "reflection",
            parents: unknown[],
            attributes?: ReflectionAttributes
        ): Reflection;
        /**
         *
         * @param elementType 'riemannsum'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "riemannsum",
            parents: unknown[],
            attributes?: CurveAttributes
        ): Riemannsum;
        /**
         *
         * @param elementType 'sector'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "sector",
            parents: unknown[],
            attributes?: SectorAttributes
        ): Sector;
        /**
         *
         * @param elementType 'semicircle'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "semicircle",
            parents: unknown[],
            attributes?: SemicircleAttributes
        ): Semicircle;
        /**
         *
         * @param elementType 'segment'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "segment",
            parents: unknown[],
            attributes?: SegmentAttributes
        ): Segment;
        /**
         *
         * @param elementType 'slider'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "slider",
            parents: unknown[],
            attributes?: SliderAttributes
        ): Slider;
        /**
         *
         * @param elementType 'slopetriangle'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "slopetriangle",
            parents: unknown[],
            attributes?: SlopetriangleAttributes
        ): Slopetriangle;
        /**
         *
         * @param elementType 'stepfunction'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "stepfunction",
            parents: unknown[],
            attributes?: StepfunctionAttributes
        ): Stepfunction;
        /**
         *
         * @param elementType 'tangent'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "tangent",
            parents: unknown[],
            attributes?: TangentAttributes
        ): Tangent;
        /**
         *
         * @param elementType 'tapemeasure'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "tapemeasure",
            parents?: unknown[],
            attributes?: TapemeasureAttributes
        ): Tapemeasure;
        /**
         *
         * @param elementType 'text'
         * @param parents
         * @param attributes
         */
        create(elementType: "text", parents: unknown[], attributes?: TextAttributes): Text;
        /**
         *
         * @param elementType 'ticks'
         * @param parents
         * @param attributes
         */
        create(elementType: "ticks", parents: unknown[], attributes?: TicksAttributes): Ticks;
        /**
         *
         * @param elementType 'tracecurve'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "tracecurve",
            parents: unknown[],
            attributes?: TracecurveAttributes
        ): Tracecurve;
        /**
         *
         * @param elementType 'transform'
         * @param parents
         * @param attributes
         */
        create(
            elementType: "transform",
            parents: unknown[],
            attributes?: TransformationAttributes
        ): Transformation;
        /**
         * Constructs a new Turtle object.
         * @param elementType 'turtle'
         * @param parents Start position and start direction of the turtle. Possible values are [x, y, angle] [[x, y], angle] [x, y] [[x, y]].
         * @param attributes Attributes to change the visual properties of the turtle object All angles are in degrees.
         */
        create(
            elementType: "turtle",
            parents?: unknown[],
            attributes?: TurtleAttributes
        ): Turtle;
        /**
         *
         * @param elementType
         * @param parents
         * @param attributes
         */
        create(
            elementType: "view3d",
            parents?: unknown[],
            attributes?: View3DAttributes
        ): View3D;
        /**
         * @param c1
         * @param c2
         * @param start_c1
         * @param stepsize
         * @param direction
         * @param time
         * @param pointlist
         */
        createRoulette(
            c1: Curve,
            c2: Curve,
            start_c1: number,
            stepsize: number,
            direction: number,
            time: number,
            pointlist: Point[]
        ): unknown;
        /**
         * Remove highlighting of all elements.
         */
        dehighlightAll(): this;
        /**
         * Set infobox visible / invisible. It uses its property hiddenByParent to memorize its status.
         * In this way, many DOM access can be avoided.
         * @param value true for visible, false for invisible.
         */
        displayInfobox(value: boolean): this;
        /**
         *
         */
        emulateColorblindness(deficiency: "protanopia" | "deuteranopia" | "tritanopia"): this;
        /**
         * After construction of the object the visibility is set and the label is constructed if necessary.
         * @param obj The object to add.
         */
        finalizeAdding(obj: unknown): unknown;
        fullscreenListener(evt: unknown): unknown;
        fullUpdate(): this;
        generateId(): string;
        generateName(object: unknown): string;
        gestureChangeListener(evt: unknown): boolean;
        gestureStartListener(evt: unknown): boolean;
        getAllObjectsUnderMouse(evt: unknown): unknown[];
        getAllUnderMouse(evt: unknown): unknown[];
        getBoundingBox(): [x1: number, y1: number, x2: number, y2: number];
        getCoordsTopLeftCorner(): [number, number];
        getMousePosition(e: unknown, i?: number): [number, number];
        getScrCoordsOfMouse(x: number, y: number): [number, number];
        getUsrCoordsOfMouse(evt: unknown): [number, number];
        hasPoint(x: number, y: number): boolean;
        highlightCustomInfobox(text: string, element?: GeometryElement): this;
        highlightInfobox(x: number, y: number, element?: GeometryElement): this;
        initInfobox(): this;
        initMoveObject(
            x: number,
            y: number,
            event: unknown,
            type: "mouse" | "pen" | "touch"
        ): GeometryElement[];
        initMoveOrigin(x: number, y: number): unknown;
        migratePoint(src: Point, dest: Point, copyName: boolean): this;
        mouseDownListener(event: unknown): boolean;
        mouseMoveListener(event: unknown): boolean;
        mouseUpListener(event: unknown): boolean;
        mouseWheelListener(event: unknown): boolean;
        moveObject(
            x: number,
            y: number,
            o: unknown,
            event: unknown,
            type: "mouse" | "touch"
        ): unknown;
        moveOrigin(x: number, y: number, diff?: boolean): this;
        /**
         * Register a new event handler.
         * For a list of possible events see documentation of the elements and objects
         * implementing the EventEmitter interface.
         * @method on
         * @param event {string}
         * @param handler {()=>void}
         * @param context [{}] The context the handler will be called in, default is the element itself.
         * @returns Reference to the object.
         */
        on(event: string, handler: (evt: PointerEvent) => void, context?: {}): {};
        pointerDownListener(event: unknown, object: unknown): boolean;
        pointerMoveListener(event: unknown): boolean;
        pointerOutListener(event: unknown): boolean;
        pointerUpListener(event: unknown): boolean;
        prepareUpdate(): this;
        removeAncestors(element: GeometryElement): this;
        removeChild(board: Board): Board;
        removeEventHandlers(): unknown;
        removeFullscreenEventHandlers(): unknown;
        removeGrids(): this;
        removeHook(id: number | Function): this;
        removeMouseEventHandlers(): unknown;
        /**
         * Removes object from board and renderer.
         *
         * Performance hints: It is recommended to use the object's id.
         * If many elements are removed, it is best to call board.suspendUpdate() before looping through the elements to be removed and call board.unsuspendUpdate() after the loop.
         * Further, it is advisable to loop in reverse order, i.e. remove the object in reverse order of their creation time.
         *
         * @param object The object to remove or array of objects to be removed. The element(s) is/are given by name, id or a reference.
         * @param saveMethod If true, the algorithm runs through all elements and tests if the element to be deleted is a child element. If yes, it will be removed from the list of child elements. If false (default), the element is removed from the lists of child elements of all its ancestors. This should be much faster.
         * @returns Reference to the board.
         */
        removeObject(
            object: (string | GeometryElement) | (string | GeometryElement)[],
            saveMethod?: boolean
        ): this;
        removePointerEventHandlers(): unknown;
        removeTouchEventHandlers(): unknown;

        /**
         * @param width
         * @param height
         */
        resizeContainer(
            width: number,
            height: number,
            dontSetCssWidthAndHeight?: boolean,
            dontSetBoundingBox?: boolean
        ): this;
        select(
            id: string | unknown | Function,
            onlyByIdOrName: boolean
        ): GeometryElement | Composition;
        /**
         *
         */
        setBoundingBox(
            bbox: [number, number, number, number],
            keepaspectratio?: boolean,
            setZoom?: string
        ): this;
        setId(object: unknown, type: number): string;
        /**
         *
         */
        setZoom(fX: number, fY: number): Board;
        showDependencies(): this;
        showXML(): this;
        startResizeObserver(): unknown;
        startSelectionMode(): unknown;
        /**
         * Cancels all running animations.
         */
        stopAllAnimation(): Board;
        stopResizeObserver(): unknown;
        stopSelectionMode(): [Coords, Coords];
        /**
         * Stop updates of the board.
         * return Reference to the board
         */
        suspendUpdate(): Board;
        toFullscreen(): this;
        touchEndListener(event: unknown): boolean;
        touchMoveListener(event: unknown): boolean;
        touchStartListener(event: unknown): boolean;
        twoFingerMove(
            p1: [number, number],
            p2: [number, number],
            o: unknown,
            event: unknown
        ): unknown;
        twoFingerTouchObject(
            np1c: Coords,
            np2c: Coords,
            o: unknown,
            drag: unknown,
            event: unknown
        ): unknown;
        /**
         * Enables updates of the board.
         * return Reference to the board
         */
        unsuspendUpdate(): this;
        /**
         * Runs through most elements and calls their update() method and update the conditions.
         * @param drag Element that caused the update.
         * return Reference to the board
         */
        update(drag?: GeometryElement): this;
        updateConditions(): this;
        updateCoords(): this;
        updateCSSTransforms(): this;
        updateElements(drag: GeometryElement): this;
        updateHooks(m: unknown): this;
        updateInfobox(element: GeometryElement): this;
        updateRenderer(): this;
        updateRendererCanvas(): this;
        /**
         * Resets zoom factor to 100%.
         */
        zoom100(): this;
        /**
         * Zooms the board so every visible point is shown. Keeps aspect ratio.
         */
        zoomAllPoints(): this;
        /**
         * Reset the bounding box and the zoom level to 100% such that a given set of elements is within the board's viewport.
         * @param elements
         */
        zoomElements(elements: unknown[]): this;
        /**
         * Zooms into the board by the factors board.attr.zoom.factorX and board.attr.zoom.factorY and applies the zoom.
         * The zoom operation is centered at x, y.
         * @param x
         * @param y
         */
        zoomIn(x?: number, y?: number): this;
        /**
         * Zooms out of the board by the factors board.attr.zoom.factorX and board.attr.zoom.factorY and applies the zoom.
         * The zoom operation is centered at x, y.
         * @param x
         * @param y
         */
        zoomOut(x?: number, y?: number): this;
    }

    export interface ZoomOptions {
        /**
         * Horizontal zoom factor (multiplied to Board.zoomX).
         */
        factorX?: number;
        /**
         * Vertical zoom factor (multiplied to Board.zoomY).
         */
        factorY?: number;
        /**
         * Allow zooming by mouse wheel or by pinch-to-zoom gesture on touch devices.
         */
        wheel?: boolean;
        /**
         * Mouse wheel zooming needs pressing of the Shift key.
         */
        needShift?: boolean;
        /**
         * Minimal values of Board.zoomX and Board.zoomY. Limits zoomOut.
         */
        min?: number;
        /**
         * Maximal values of Board.zoomX and Board.zoomY. Limits zoomIn.
         */
        max?: number;
        /**
         * Allow pinch-to-zoom to zoom only horizontal axis.
         */
        pinchHorizontal?: boolean;
        /**
         * Allow pinch-to-zoom to zoom only vertical axis.
         */
        pinchVertical?: boolean;
        /**
         * Sensitivity (in degrees) for recognizing horizontal or vertical pinch-to-zoom gestures.
         */
        pinchSensitivity?: number;
    }

    /**
     * Attributes used in board initialization.
     */
    export interface BoardAttributes {
        /**
         * Show default axis.
         * If shown, the horizontal axis can be accessed via JXG.Board.defaultAxes.x, the
         * vertical axis can be accessed via JXG.Board.defaultAxes.y. Both axes have a sub-element "defaultTicks".
         * default false
         */
        axis: boolean;

        beautifulScientificTickLabels: boolean;

        /**
         *
         */
        defaultAxes: Partial<DefaultAxes>;

        /**
         * Bounding box of the visible area in user coordinates.
         * It is an array consisting of four values: [x1, y1, x2, y2].
         *
         * The canvas will be spanned from the upper left corner (x1, y1) to the lower right corner (x2, y2).
         *
         * default is [-5, 5, 5, -5].
         */
        boundingbox: [x1: number, y1: number, x2: number, y2: number];
        /**
         * Bounding box of the visible area in user coordinates.
         * It is an array consisting of four values: [x1, y1, x2, y2].
         *
         * The canvas will be spanned from the upper left corner (x1, y1) to the lower right corner (x2, y2).
         *
         * default is [-5, 5, 5, -5].
         */
        boundingBox: [x1: number, y1: number, x2: number, y2: number];

        description: string;

        maxBoundingBox: [
            x1: number | null,
            y1: number | null,
            x2: number | null,
            y2: number | null
        ];

        /**
         * Supply the document object. Defaults to window.document
         *
         * default false (meaning window.document)
         */
        document: boolean | Document;

        drag: {
            enabled?: boolean;
        };

        /**
         * If true the first element of the set JXG.board.objects having hasPoint==true is taken as drag element.
         *
         * default false
         */
        takeFirst: boolean;

        /**
         * If true, when read from a file or string - the size of the div can be changed by the construction text.
         *
         * default false
         */
        takeSizeFromFile: boolean;

        /**
         * Time (in msec) between two animation steps.
         *
         * default 35
         */
        animationDelay: number;

        /**
         * Allow user interaction by registering mouse and touch events.
         *
         * default true
         */
        registerEvents: boolean;

        maxFrameRate: number;

        /**
         * Change redraw strategy in SVG rendering engine.
         *
         * If set to 'svg', before every redrawing of the JSXGraph construction
         * the SVG sub-tree of the DOM tree is taken out of the DOM.
         *
         * If set to 'all', before every redrawing of the JSXGraph construction the
         * complete DOM tree is taken out of the DOM.
         * If set to 'none' the redrawing is done in-place.
         *
         * Using 'svg' or 'all' speeds up the update process considerably. The risk
         * is that if there is an exception, only a white div or window is left.
         */
        minimizeReflow: "svg" | "all" | "none";

        /**
         * A number that will be added to the absolute position of the board used in mouse coordinate
         * calculations in {@link JXG.Board#getCoordsTopLeftCorner}.
         *
         * default 0
         */
        offsetX: number;

        /**
         * A number that will be added to the absolute position of the board used in mouse coordinate
         * calculations in {@link JXG.Board#getCoordsTopLeftCorner}.
         *
         * default 0
         */
        offsetY: number;

        /**
         * Control the possibilities for panning interaction (i.e. moving the origin).
         */
        pan: {
            needShift?: boolean;
            needTwoFingers?: boolean;
            enabled?: boolean;
        };

        /**
         *
         */
        grid: boolean;

        /**
         * If set true and
         * hasPoint() is true for both an element and it's label,
         * the element (and not the label) is taken as drag element.
         *
         * If set false and hasPoint() is true for both an element and it's label,
         * the label is taken (if it is on a higher layer than the element)
         *
         * default true
         */
        ignoreLabels: boolean;

        /**
         * If set to true the bounding box might be changed such that
         * the ratio of width and height of the hosting HTML div is equal
         * to the ratio of wifth and height of the bounding box.
         *
         * This is necessary if circles should look like circles and not
         * like ellipses. It is recommended to set keepAspectRatio = true
         * for geometric applets. For function plotting keepAspectRatio = false
         * might be the better choice.
         *
         * default false
         */
        keepAspectRatio: boolean;
        /**
         * Alias for keepAspectRatio.
         */
        keepaspectratio: boolean;

        /**
         * Maximum number of digits in automatic label generation.
         * For example, if set to 1 automatic point labels end at "Z".
         * If set to 2, point labels end at "ZZ".
         *
         * default 1
         */
        maxNameLength: number;

        /**
         * Default rendering engine. Possible values are 'svg', 'canvas', 'vml', 'no', or 'auto'.
         * If the rendering engine is not available JSXGraph tries to detect a different engine.
         *
         * In case of 'canvas' it is advisable to call 'board.update()' after all elements have been
         * constructed. This ensures that all elements are drawn with their intended visual appearance.
         *
         * default 'auto'
         */
        renderer: "svg" | "canvas" | "vml" | "no" | "auto";

        /**
         * Control if JSXGraph reacts to resizing of the JSXGraph container element
         * by the user / browser.
         * The attribute "throttle" determines the minimal time in msec between to
         * resize calls.
         */
        resize: {
            enabled?: boolean;
            throttle: number;
        };

        selection: {
            enabled?: boolean;
            fillColor?: string;
            name?: string;
            needShift?: boolean;
            needCtrl?: boolean;
            vertices?: PointAttributes;
            visible?: boolean;
            withLines?: boolean;
        };

        /**
         * Show a button which allows to clear all traces of a board.
         *
         * default false
         */
        showClearTraces: boolean;

        /**
         * Show copyright string in canvas.
         *
         * default true
         */
        showCopyright: boolean;

        /**
         * Show a button in the navigation bar to start fullscreen mode.
         *
         * default false
         */
        showFullscreen: boolean;

        fullscreen: {
            symbol: string;
        };

        /**
         * Determines whether the information box is displayed when hovering the mouse over geometry elements.
         */
        showInfobox: boolean;

        /**
         * Show a button in the navigation bar to enable screenshots.
         *
         * default false
         */
        showScreenshot: boolean;

        /**
         * Attributes used to control the screenshot function.
         */
        screenshot: {
            /**
             * scaling factor (default 1)
             */
            scale?: number;
            /**
             * format of the sceenshot image.
             */
            type?: "png";
            /**
             * Unicode symbol which is shown in the navigation bar. Default: '\u2318'
             */
            symbol?: string;
            /**
             * CSS rules to format the div element containing the screen shot image
             */
            css?: string;
            /**
             * CSS rules to format the close button of the div element containing the screen shot image
             */
            cssButton?: string;
        };

        /**
         * Display of navigation arrows and zoom buttons
         *
         * default true
         */
        showNavigation: boolean;

        /**
         * Show a button to force reload of a construction.
         * Works only with the JessieCode tag
         *
         * default false
         */
        showReload: boolean;

        /**
         * Display of zoom buttons. To show zoom buttons, additionally
         * showNavigation has to be set to true.
         *
         * default true
         */
        showZoom: boolean;

        /**
         * Title string for the board.
         * Primarily used in an invisible text element which is adressed by
         * the attribute 'aria-labelledby' from the JSXGraph container.
         * JSXGraph creates a new div-element with id "{containerid}_ARIAlabel"
         * containing this string.
         */
        title: string;

        /**
         * Control the possibilities for zoom interaction.
         */
        zoom: boolean | ZoomOptions;

        // /**
        //  * Additional zoom factor multiplied to zoomX and zoomY.
        //  * default 1.0
        //  */
        // zoomFactor: number;

        /**
         * Zoom factor in horizontal direction.
         * default 1.0
         */
        zoomX: number;

        /**
         * Zoom factor in vertical direction.
         * default 1.0
         */
        zoomY: number;
    }

    /**
     *
     */
    export interface Graph {
        /**
         * Stores the renderer that is used to draw the boards.
         */
        rendererType: string;

        /**
         * Initialize a new board.
         * @param elementId HTML identifier (id) of the HTML element in which the board is painted.
         * @param attributes An object that sets some of the board properties.
         */
        initBoard(elementId: string | object, attributes?: Partial<BoardAttributes>): Board;

        /**
         * Delete a board and all its contents.
         */
        freeBoard(board: Board | string): void;
    }

    export interface LayerOptions {
        numlayers?: number;
        text?: number;
        point?: number;
        glider?: number;
        arc?: number;
        line?: number;
        circle?: number;
        curve?: number;
        turtle?: number;
        polygon?: number;
        sector?: number;
        angle?: number;
        integral?: number;
        axis?: number;
        ticks?: number;
        grid?: number;
        image?: number;
        trace?: number;
        unused0?: number;
        unused1?: number;
        unused2?: number;
        unused3?: number;
        unused4?: number;
        unused5?: number;
        unused6?: number;
        unused7?: number;
        unused8?: number;
        unused9?: number;
    }

    export interface NavbarOptions {
        /**
         * Default is '#333333'.
         */
        strokeColor?: string;
        /**
         * Default is 'transparent'.
         */
        fillColor?: string;
        /**
         * Default is '#aaaaaa'.
         */
        highlightFillColor?: string;
        /**
         * Default is '2px'.
         */
        padding?: string;
        /**
         * Default is 'absolute'.
         */
        position?: string;
        /**
         * Default is '14px'.
         */
        fontSize?: string;
        /**
         * Default is 'pointer'.
         */
        cursor?: string;
        /**
         * Default is '100'.
         */
        zIndex?: string;
        /**
         * Default is '5px'.
         */
        right?: string;
        /**
         * Default is '5px'.
         */
        bottom?: string;
    }

    export interface PrecisionOptions {
        enabled?: boolean;
        epsilon?: number;
        hasPoint?: number;
        mouse?: number;
        pen?: number;
        touch?: number;
        touchMax?: number;
    }

    export interface TextOptions {
        anchor?: Point | Text | Image | null;
        anchorX?: AnchorX;
        anchorY?: AnchorY;
        attractors?: GeometryElement[];
        cssClass?: string;
        cssDefaultStyle?: string;
        cssStyle?: string;
        digits?: number;
        display?: "html" | "internal";
        dragArea?: "all" | "small";
        fontSize?: number;
        fontUnit?: "px" | "vw" | "vh" | "vmax" | "vmin" | "rem";
        highlight?: boolean;
        highlightCssClass?: string;
        highlightCssDefaultStyle?: string;
        highlightCssStyle?: string;
        highlightStrokeColor?: string;
        highlightStrokeOpacity?: number;
        isLabel?: boolean;
        parse?: boolean;
        rotate?: number;
        snapSizeX?: number;
        snapSizeY?: number;
        strokeColor?: string;
        useASCIIMathML?: boolean;
        useCaja?: boolean;
        useMathJax?: boolean;
        useKatex?: boolean;
        katexMacros: Object;
        visible?: boolean;
        withLabel?: boolean;
    }

    export interface JXGSettings {
        grid: GridOptions;
        /**
         * Default ordering of the layers.
         */
        layer: LayerOptions;
        /**
         * Options that are used by the navigation bar.
         */
        navbar: NavbarOptions;
        point: PointAttributes;
        /**
         * Precision options.
         */
        precision: PrecisionOptions;
        /**
         * Abbreviations of properties.
         */
        shortcuts: {};
        text: TextOptions;
    }

    export interface JXGOptions {
        // TODO: These should all be XyzOptions, even if XyzOptions extends XyzAttributes (or converse).
        angle: AngleOptions;
        arc: ArcAttributes;
        arrow: ArrowAttributes;
        axis: AxisAttributes;
        bisector: BisectorAttributes;
        bisectorlines: {
            line1?: BisectorAttributes;
            line2?: BisectorAttributes;
        };
        board: Partial<BoardAttributes>;
        button: ButtonAttributes;
        cardinalspline: CardinalsplineAttributes;
        chart: ChartAttributes;
        checkbox: CheckboxAttributes;
        circle: CircleOptions;
        circumcircle: CircumcircleOptions;
        circumcirclearc: CircumcircleArcOptions;
        circumcirclesector: CircumcircleSectorOptions;
        comb: CombOptions;
        conic: ConicOptions;
        curve: CurveOptions;
        elements: GeometryElementAttributes;
        glider: GliderOptions;
        grid: GridOptions;
        group: GroupOptions;
        jc: {
            enabled?: boolean;
            compile?: boolean;
        };
        hatch: HatchAttributes;
        htmlslider: SliderOptions;
        image: ImageOptions;
        incircle: IncircleOptions;
        inequality: InequalityOptions;
        infobox: InfoboxOptions;
        integral: IntegralOptions;
        input: InputOptions;
        intersection: IntersectionOptions;
        label: LabelOptions;
        /**
         * Default ordering of the layers.
         */
        layer: LayerOptions;
        legend: LegendOptions;
        line: LineOptions;
        locus: LocusOptions;
        metapostspline: CardinalsplineOptions;
        mirrorelement: MirrorelementOptions;
        /**
         * Options that are used by the navigation bar.
         */
        navbar: NavbarOptions;
        normal: NormalOptions;
        orthogonalprojection: OrthogonalprojectionOptions;
        parallel: ParallelOptions;
        perpendicular: PerpendicularOptions;
        perpendicularsegment: PerpendicularSegmentOptions;
        /**
         *
         */
        point: PointOptions;
        polygon: PolygonOptions;
        polygonalchain: PolygonalChainOptions;
        /**
         * Precision options.
         */
        precision: PrecisionOptions;
        prescribedangle: PrescribedAngleOptions;
        reflection: ReflectionOptions;
        regularpolygon: RegularPolygonOptions;
        riemannsum: RiemannsumOptions;
        sector: SectorOptions;
        segment: SegmentOptions;
        semicircle: SemicircleOptions;
        slider: SliderOptions;
        /**
         * Abbreviations of properties.
         */
        shortcuts: {};
        slopetriangle: SlopetriangleOptions;
        stepfunction: StepfunctionOptions;
        takeSizeFromFile?: boolean;
        tapemeasure: TapemeasureOptions;
        ticks: TicksOptions;
        text: TextOptions;
        tracecurve: TracecurveOptions;
        turtle: TurtleOptions;
    }

    /**
     *
     */
    const JSXGraph: Graph;
    let Options: JXGOptions;

    /**
     *
     */
    export interface Dump {
        toJavaScript(board: Board): string;
        toJessie(board: Board): string;
    }

    /**
     * Dump Namespace.
     */
    const Dump: Dump;

    /**
     *
     */
    export interface Math {
        /**
         * Functional version of binary operator &&
         * @param a.
         * @param b.
         * @returns Boolean value of a && b.
         */
        and(a: boolean, b: boolean): boolean;
        /**
         * eps defines the closeness to zero.
         * If the absolute value of a given number is smaller than eps, it is considered to be equal to zero.
         */
        eps: number;
        /**
         * Hyperbolic arc-cosine of a number.
         *
         * @param x
         */
        acosh(x: number): number;
        /**
         * Hyperbolic arcsine of a number.
         *
         * @param x
         */
        asinh(x: number): number;
        /**
         * Computes the binomial coefficient n over k.
         * @param n
         * @param k
         */
        binomial(n: number, k: number): number;
        /**
         * Computes the hyperbolic cosine of x.
         * @param x
         */
        cosh(x: number): number;
        /**
         * Functional version of binary operator ===
         * @param a.
         * @param b.
         * @returns Boolean value of a === b.
         */
        eq(a: number, b: number): boolean;
        /**
         * Error function
         *
         * @param x
         */
        erf(x: number): number;
        /**
         * Complementary error function
         *
         * @param x
         */
        erfc(x: number): number;
        /**
         * Inverse error function
         *
         * @param x
         */
        erfi(x: number): number;
        /**
         * Compute the factorial of a positive integer. If a non-integer value is given, the fraction will be ignored.
         * @param n
         * @returns n! = n * (n-1) * ... * 2 * 1
         */
        factorial(n: number): number;
        /**
         * Greatest common divisor (gcd) of two numbers.
         *
         * @param a.
         * @param b.
         * @returns gcd(a, b) if a and b are numbers, NaN else.
         */
        gcd(a: number, b: number): number;
        /**
         * Functional version of binary operator >=
         * @param a.
         * @param b.
         * @returns Boolean value of a >= b.
         */
        geq(a: number, b: number): boolean;
        /**
         * Functional version of binary operator >
         * @param a.
         * @param b.
         * @returns Boolean value of a > b.
         */
        gt(a: number, b: number): boolean;
        /**
         * Compute the inverse of an nxn matrix with Gauss elimination.
         */
        inverse(Ain: number[][]): number[][];
        /**
         * Least common multiple (lcm) of two numbers.
         *
         * @param a.
         * @param b.
         * @returns lcm(a, b) if a and b are numbers, NaN else.
         */
        lcm(a: number, b: number): number;
        /**
         * Functional version of binary operator <=
         * @param a.
         * @param b.
         * @returns Boolean value of a <= b.
         */
        leq(a: number, b: number): boolean;
        /**
         * Logarithm to base 10.
         * @param a.
         * @returns logarithm of a to base 10.
         */
        log10(a: number): number;
        /**
         * Logarithm to base 2.
         * @param a.
         * @returns logarithm of a to base 2.
         */
        log2(a: number): number;
        /**
         * Functional version of binary operator <
         * @param a.
         * @param b.
         * @returns Boolean value of a < b.
         */
        lt(a: number, b: number): boolean;
        /**
         * Computes the product of the two matrices mat1*mat2.
         * @param mat1 Two dimensional array of numbers.
         * @param mat2 Two dimensional array of numbers.
         * @returns Two dimensional Array of numbers containing result.
         */
        matMatMult(mat1: number[][], mat2: number[][]): number[][];
        /**
         * Multiplies a vector vec to a matrix mat: mat * vec. The matrix is interpreted by this function as an array of rows.
         * Please note: This function does not check if the dimensions match.
         * @param mat Two dimensional array of numbers. The inner arrays describe the columns, the outer ones the matrix' rows.
         * @param vec Array of numbers.
         * @returns Array of numbers containing the result.
         */
        matVecMult(mat: number[][], vec: number[]): number[];
        /**
         * The Javascript implementation of the % operator returns the symmetric modulo.
         * mod and "%" are both identical if a >= 0 and m >= 0 but the results differ if a or m < 0.
         * @param a.
         * @param m.
         * @returns mathematical modulo a mod m.
         */
        mod(a: number, m: number): number;
        /**
         * Normal distribution function
         *
         * @param x
         */
        ndtr(x: number): number;
        /**
         * Inverse of normal distribution function
         *
         * @param x
         */
        ndtri(x: number): number;
        /**
         * Functional version of binary operator !==
         * @param a.
         * @param b.
         * @returns Boolean value of a !== b.
         */
        neq(a: number, b: number): boolean;
        /**
         * Functional version of unary operator !
         * @param a.
         * @param b.
         * @returns Boolean value of !a.
         */
        not(a: number): boolean;
        /**
         * Functional version of binary operator ||
         * @param a.
         * @param b.
         * @returns Boolean value of a || b.
         */
        or(a: boolean, b: boolean): boolean;
        /**
         * Computes base to the power of exponent.
         * @param base
         * @param exponent
         */
        pow(base: number, exponent: number): number;
        /**
         * Determine the relative difference between two numbers.
         * @param a.
         * @param b.
         * @returns Relative difference between a and b: |a-b| / max(|a|, |b|).
         */
        relDif(a: number, b: number): number;
        /**
         * Sine hyperbolicus of x.
         * @param x The number the sine hyperbolicus will be calculated of.
         * @returns Sine hyperbolicus of the given value.
         */
        sinh(x: number): number;
        /**
         * A square & multiply algorithm to compute base to the power of exponent.
         *
         * @param base.
         * @param exponent.
         * @returns base to the power of exponent.
         */
        squampow(base: number, exponent: number): number;
        /**
         * Transposes a matrix given as a two dimensional array.
         * @param M The matrix to be transposed.
         * @returns The transpose of M.
         */
        transpose(M: number[][]): number[][];
        /**
         * Functional version of a binary operator xor
         * @param a.
         * @param b.
         * @returns Boolean value of a xor b.
         */
        xor(a: boolean, b: boolean): boolean;

        /* -------------------------------------------------- */
        /**
         * Inner product of two vectors a and b. n is the length of the vectors.
         * @param a
         * @param b
         * @param n optional
         * @returns Inner product of a and b.
         */
        innerProduct(a: number[], b: number[], n: number): number;
        /**
         * Cross product of two vectors a and b, both of length three.
         * @param a
         * @param b
         * @returns Cross product of a and b.
         */
        crossProduct(a: number[], b: number[]): number;
        /**
         * Euclidean norm of vector a of length n.
         * @param a
         * @param n
         * @returns Euclidean norm of a.
         */
        norm(a: number[], n: number): number;
        /**
         * Computes the cotangent of x.
         * @param x
         */
        cot(x: number): number;
        /**
         * Computes the inverse of cotangent of x.
         * @param x
         */
        acot(x: number): number;
        /**
         * Compute n-th real root of a real number. n must be strictly positive integer.
         * If n is odd, the real n-th root exists and is negative.
         * For n even, for negative valuees of x NaN is returned.
         * @param a
         * @param n
         */
        nthroot(a: number, n: number): number;
        /**
         * Computes cube root of real number.
         * @param a
         */
        cbrt(a: number): number;
        /**
         * Compute base to the power of the rational exponent m / n.
         * This function first reduces the fraction m/n and then computes JXG.Math.pow(base, m/n).
         * @param a
         */
        ratpow(base: number, m: number, n: number): number;

        /* -------------------------------------------------- */

        Clip: Clip;
        Geometry: Geometry;
        /**
         * Numerical algorithms, constants, and variables.
         */
        Numerics: Numerics;
        /**
         * Functions for mathematical statistics.
         */
        Statistics: Statistics;
    }
    /**
     * Math Namespace
     */
    const Math: Math;

    /**
     * This namespace contains algorithms for Boolean operations on paths, i.e. intersection, union and difference of paths.
     * Base is the Greiner-Hormann algorithm.
     */
    export interface Clip {
        /**
         * Difference of two closed paths, i.e. path1 minus path2.
         * The paths could be JSXGraph elements circle, curve, or polygon.
         * Computed by the Greiner-Hormann algorithm.
         * @param subject First closed path.
         * @param clip Second closed path.
         * @param board JSXGraph board object. It is needed to convert between user coordinates and screen coordinates.
         * @returns Array consisting of two arrays containing the x-coordinates and the y-coordinates of the resulting path.
         */
        difference(
            subject: Circle | Curve | Polygon,
            clip: Circle | Curve | Polygon,
            board: Board
        ): [number[], number[]];
        /**
         * Determine the intersection, union or difference of two closed paths.
         *
         * This is an implementation of the Greiner-Hormann algorithm, see Günther Greiner and Kai Hormann (1998).
         * "Efficient clipping of arbitrary polygons".
         * ACM Transactions on Graphics. 17 (2): 71–83. and Erich, L. Foster, and Kai Hormann, Kai, and Romeo Traaian Popa (2019), "Clipping simple polygons with degenerate intersections", Computers & Graphics:X, 2.
         *
         * It is assumed that the pathes are closed, whereby it does not matter if the last point indeed equals the first point.
         * In contrast to the original Greiner-Hormann algorithm, this algorithm can cope with many degenerate cases.
         * A degenerate case is a vertext of one path which is contained in the other path.
         *
         * Problematic are:
         * degenerate cases where one path additionally has self-intersections
         * differences with one path having self-intersections.
         * @param subject First closed path, usually called 'subject'.
         * @param clip Second closed path, usually called 'clip'.
         * @param clipType Determines the type of boolean operation on the two paths. Possible values are 'intersection', 'union', or 'difference'.
         * @param board JSXGraph board object. It is needed to convert between user coordinates and screen coordinates.
         * @returns Array consisting of two arrays containing the x-coordinates and the y-coordinates of the resulting path.
         */
        greinerHormann(
            subject: Circle | Curve | Polygon,
            clip: Circle | Curve | Polygon,
            clipType: "difference" | "intersection" | "union",
            board: Board
        ): [number[], number[]];
        /**
         * Intersection of two closed paths.
         * The paths could be JSXGraph elements circle, curve, or polygon.
         * Computed by the Greiner-Hormann algorithm.
         * @param subject First closed path.
         * @param clip Second closed path.
         * @param board JSXGraph board object. It is needed to convert between user coordinates and screen coordinates.
         * @returns Array consisting of two arrays containing the x-coordinates and the y-coordinates of the resulting path.
         */
        intersection(
            subject: Circle | Curve | Polygon,
            clip: Circle | Curve | Polygon,
            board: Board
        ): [number[], number[]];
        /**
         * Union of two closed paths.
         * The paths could be JSXGraph elements circle, curve, or polygon.
         * Computed by the Greiner-Hormann algorithm.
         * @param subject First closed path.
         * @param clip Second closed path.
         * @param board JSXGraph board object. It is needed to convert between user coordinates and screen coordinates.
         * @returns Array consisting of two arrays containing the x-coordinates and the y-coordinates of the resulting path.
         */
        union(
            subject: Circle | Curve | Polygon,
            clip: Circle | Curve | Polygon,
            board: Board
        ): [number[], number[]];
        /**
         * Winding number of a point in respect to a polygon path.
         * The point is regarded outside if the winding number is zero, inside otherwise.
         * The algorithm tries to find degenerate cases, i.e. if the point is on the path.
         * This is regarded as "outside". If the point is a vertex of the path, it is regarded as "inside".
         * Implementation of algorithm 7 from "The point in polygon problem for arbitrary polygons" by Kai Hormann and Alexander Agathos, Computational Geometry, Volume 20, Issue 3, November 2001, Pages 131-144.
         * @param usrCoords Homogenous coordinates of the point.
         * @param path Array of JXG.Coords determining a path, i.e. the vertices of the polygon.
         * @returns Winding number of the point. The point is regarded outside if the winding number is zero, inside otherwise.
         */
        windingNumber(usrCoords: number[], path: Point[]): number;
    }

    export interface Geometry {
        /**
         * Calculates the angle defined by the points A, B, C.
         * @deprecated
         */
        angle(A: Point | number[], B: Point | number[], C: Point | number[]): number;
        /**
         * Calculates the distance of a point to a line.
         * The point and line are given by homogeneous coordinates.
         * For lines this can be line.stdform.
         * @param point Homogeneous coordinates of a point.
         * @param line Homogeneous coordinates of a point.
         */
        distPointLine(
            point: [C: number, A: number, B: number],
            line: [C: number, A: number, B: number]
        ): number;
        /**
         * Calculates the internal angle defined by the three points A, B, C if you're going from A to C around B counterclockwise.
         */
        rad(A: Point | number[], B: Point | number[], C: Point | number[]): number;
        /**
         * Calculates the angle defined by the three points A, B, C if you're going from A to C around B counterclockwise.
         * @param A
         * @param B
         * @param C
         * @returns The angle in degrees.
         */
        trueAngle(
            A: Point | [x: number, y: number],
            B: Point | [x: number, y: number],
            C: Point | [x: number, y: number]
        ): number;
    }

    /**
     * The JXG.Math.Numerics namespace holds numerical algorithms, constants, and variables.
     */
    export interface Numerics {
        maxIterationsMinimize: number;
        maxIterationsRoot: number;
        /**
         * Integral of function f over interval.
         * @param interval The integration interval, e.g. [0, 3].
         * @param f A function which takes one argument and returns a number.
         * @returns The value of the integral of f over integral.
         */
        I(interval: [number, number], f: (t: number) => number): number;
        backwardSolve(R: number[][], b: number[], canModify?: boolean): number[];
        bezier(points: Point[]): [x: (t: number) => number[], y: (t: number) => number[]];
        bspline(
            points: Point[],
            order: number
        ): [
            x: (t: number) => number,
            y: (t: number) => number,
            zeroValue: number,
            N: () => number
        ];
        /**
         * Numerical (symmetric) approximation of derivative.
         */
        D(f: (x: number) => number, obj?: any): (x: number) => number;

        /**
         * Solves a system of linear equations given by A and b using the Gauss-Jordan-elimination.
         * The algorithm runs in-place. I.e. the entries of A and b are changed.
         * @param A Square matrix represented by an array of rows, containing the coefficients of the linear equation system.
         * @param b A vector containing the linear equation system's right hand side.
         * @returns A vector that solves the linear equation system.
         */
        Gauss(A: number[][], b: number[]): number[];

        /**
         * Computes the polynomial through a given set of coordinates in Lagrange form.
         * Returns the Lagrange polynomials, see Jean-Paul Berrut, Lloyd N. Trefethen: Barycentric Lagrange Interpolation,
         * SIAM Review, Vol 46, No 3, (2004) 501-517.
         * @returns A function of one parameter which returns the value of the polynomial, whose graph runs through the given points.
         */
        lagrangePolynomial(p: Point[]): (t: number) => number;

        /**
         * Helper function to create a curve which displays Riemann sums.
         * @param f Function or array of two functions. If f is a function the integral of this function is approximated by the Riemann sum. If f is an array consisting of two functions the area between the two functions is filled by the Riemann sum bars.
         * @param n number of rectangles.
         * @param type Type of approximation. Possible values are: 'left', 'right', 'middle', 'lower', 'upper', 'random', 'simpson', or 'trapezoidal'.
         * @param start Left border of the approximation interval.
         * @param end Right border of the approximation interval.
         * @returns An array with three elements. The first two are number arrays containing the x and y coordinates for the rectangles showing the Riemann sum. This array may be used as parent array of a JXG.Curve. The third element is a number, the riemann sum, i.e. the sum of the volumes of all rectangles.
         */
        riemann(
            f: (x: number) => number,
            n: number,
            type: RiemannSumType,
            start: number,
            end: number
        ): [xCoords: number[], yCoords: number[], sum: number];

        /**
         * Approximate the integral by Riemann sums.
         * @param f Function or array of two functions. If f is a function the integral of this function is approximated by the Riemann sum. If f is an array consisting of two functions the area between the two functions is filled by the Riemann sum bars.
         * @param n number of rectangles.
         * @param type Type of approximation. Possible values are: 'left', 'right', 'middle', 'lower', 'upper', 'random', 'simpson', or 'trapezoidal'.
         * @param start Left border of the approximation interval.
         * @param end Right border of the approximation interval.
         * @returns The sum of the areas of the rectangles.
         * @deprecated
         */
        riemannsum(
            f: (x: number) => number,
            n: number,
            type: RiemannSumType,
            start: number,
            end: number
        ): number;
        /**
         * Solve initial value problems numerically using Runge-Kutta-methods.
         * See https://en.wikipedia.org/wiki/Runge-Kutta_methods for more information on the algorithm.
         * @param butcher
         * @param x0
         * @param I
         * @param N
         * @param f
         * return An array of vectors describing the solution of the o.d.e. on the given interval I.
         */
        rungeKutta(
            butcher: unknown,
            x0: number[],
            I: number[],
            N: number,
            f: unknown
        ): number[][];
    }

    /**
     * Functions for mathematical statistics.
     */
    export interface Statistics {
        /**
         * Extracts the maximum value from the array.
         * @param arr
         * @returns The highest number from the array. It returns NaN if not every element could be interpreted as a number and -Infinity if an empty array is given or no element could be interpreted as a number.
         */
        max(arr: number[]): number;
        /**
         * Extracts the minimum value from the array.
         * @param arr
         * @returns The lowest number from the array. It returns NaN if not every element could be interpreted as a number and Infinity if an empty array is given or no element could be interpreted as a number.
         */
        min(arr: number[]): number;
        /**
         * The P-th percentile ( 0 < P ≤ 100 ) of a list of N ordered values (sorted from least to greatest) is the smallest value in the list such that no more than P percent of the data is strictly less than the value and at least P percent of the data is less than or equal to that value.
         * See https://en.wikipedia.org/wiki/Percentile. Here, the linear interpolation between closest ranks method is used.
         * @param arr The set of values, need not be ordered.
         * @param percentile One or several percentiles.
         * @returns Depending if a number or an array is the input for percentile, a number or an array containing the percentils is returned.
         */
        percentile(arr: number[], percentile: number | number[]): number | number[];
    }
}

/**
 * JSXGraph in the module "jsxgraph".
 */
declare module "jsxgraph" {
    export = JXG;
}

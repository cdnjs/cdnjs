export class StateDB {
    static relationType: {
        AGGREGATION: number;
        EXTENSION: number;
        COMPOSITION: number;
        DEPENDENCY: number;
    };
    /**
     * @param {1 | 2} version - v1 renderer or v2 renderer.
     */
    constructor(version: 1 | 2);
    /**
     * @private
     * @type {1 | 2}
     */
    private version;
    setRootDoc(o: any): void;
    getDividerId(): string;
    setDirection(dir: any): void;
    trimColon(str: any): any;
    /**
     * @private
     * @type {Array}
     */
    private nodes;
    /**
     * @private
     * @type {Array}
     */
    private edges;
    /**
     * @private
     * @type {Array}
     */
    private rootDoc;
    /**
     * @private
     * @type {Map<string, any>}
     */
    private classes;
    /**
     * @private
     * @type {Object}
     */
    private documents;
    /**
     * @private
     * @type {Object}
     */
    private currentDocument;
    /**
     * @private
     * @type {number}
     */
    private startEndCount;
    /**
     * @private
     * @type {number}
     */
    private dividerCnt;
    getRootDoc(): any[];
    /**
     * @private
     * @param {Object} parent
     * @param {Object} node
     * @param {boolean} first
     */
    private docTranslator;
    /**
     * @private
     */
    private getRootDocV2;
    /**
     * Convert all of the statements (stmts) that were parsed into states and relationships.
     * This is done because a state diagram may have nested sections,
     * where each section is a 'document' and has its own set of statements.
     * Ex: the section within a fork has its own statements, and incoming and outgoing statements
     * refer to the fork as a whole (document).
     * See the parser grammar:  the definition of a document is a document then a 'line', where a line can be a statement.
     * This will push the statement into the list of statements for the current document.
     * @private
     * @param _doc
     */
    private extract;
    /**
     * Function called by parser when a node definition has been found.
     *
     * @param {null | string} id
     * @param {null | string} type
     * @param {null | string} doc
     * @param {null | string | string[]} descr - description for the state. Can be a string or a list or strings
     * @param {null | string} note
     * @param {null | string | string[]} classes - class styles to apply to this state. Can be a string (1 style) or an array of styles. If it's just 1 class, convert it to an array of that 1 class.
     * @param {null | string | string[]} styles - styles to apply to this state. Can be a string (1 style) or an array of styles. If it's just 1 style, convert it to an array of that 1 style.
     * @param {null | string | string[]} textStyles - text styles to apply to this state. Can be a string (1 text test) or an array of text styles. If it's just 1 text style, convert it to an array of that 1 text style.
     */
    addState(id: null | string, type?: null | string, doc?: null | string, descr?: null | string | string[], note?: null | string, classes?: null | string | string[], styles?: null | string | string[], textStyles?: null | string | string[]): void;
    clear(saveCommon: any): void;
    getState(id: any): any;
    getStates(): any;
    logDocuments(): void;
    getRelations(): any;
    /**
     * If the id is a start node ( [*] ), then return a new id constructed from
     * the start node name and the current start node count.
     * else return the given id
     *
     * @param {string} id
     * @returns {string} - the id (original or constructed)
     * @private
     */
    private startIdIfNeeded;
    /**
     * If the id is a start node ( [*] ), then return the start type ('start')
     * else return the given type
     *
     * @param {string} id
     * @param {string} type
     * @returns {string} - the type that should be used
     * @private
     */
    private startTypeIfNeeded;
    /**
     * If the id is an end node ( [*] ), then return a new id constructed from
     * the end node name and the current start_end node count.
     * else return the given id
     *
     * @param {string} id
     * @returns {string} - the id (original or constructed)
     * @private
     */
    private endIdIfNeeded;
    /**
     * If the id is an end node ( [*] ), then return the end type
     * else return the given type
     *
     * @param {string} id
     * @param {string} type
     * @returns {string} - the type that should be used
     * @private
     */
    private endTypeIfNeeded;
    /**
     *
     * @param item1
     * @param item2
     * @param relationTitle
     */
    addRelationObjs(item1: any, item2: any, relationTitle: any): void;
    /**
     * Add a relation between two items.  The items may be full objects or just the string id of a state.
     *
     * @param {string | object} item1
     * @param {string | object} item2
     * @param {string} title
     */
    addRelation(item1: string | object, item2: string | object, title: string): void;
    addDescription(id: any, descr: any): void;
    cleanupLabel(label: any): any;
    /**
     * Called when the parser comes across a (style) class definition
     * @example classDef my-style fill:#f96;
     *
     * @param {string} id - the id of this (style) class
     * @param  {string | null} styleAttributes - the string with 1 or more style attributes (each separated by a comma)
     */
    addStyleClass(id: string, styleAttributes?: string | null): void;
    /**
     * Return all of the style classes
     * @returns {{} | any | classes}
     */
    getClasses(): {} | any | classes;
    /**
     * Add a (style) class or css class to a state with the given id.
     * If the state isn't already in the list of known states, add it.
     * Might be called by parser when a style class or CSS class should be applied to a state
     *
     * @param {string | string[]} itemIds The id or a list of ids of the item(s) to apply the css class to
     * @param {string} cssClassName CSS class name
     */
    setCssClass(itemIds: string | string[], cssClassName: string): void;
    /**
     * Add a style to a state with the given id.
     * @example style stateId fill:#f9f,stroke:#333,stroke-width:4px
     *   where 'style' is the keyword
     *   stateId is the id of a state
     *   the rest of the string is the styleText (all of the attributes to be applied to the state)
     *
     * @param itemId The id of item to apply the style to
     * @param styleText - the text of the attributes for the style
     */
    setStyle(itemId: any, styleText: any): void;
    /**
     * Add a text style to a state with the given id
     *
     * @param itemId The id of item to apply the css class to
     * @param cssClassName CSS class name
     */
    setTextStyle(itemId: any, cssClassName: any): void;
    /**
     * Finds the direction statement in the root document.
     * @private
     * @returns {{ value: string } | undefined} - the direction statement if present
     */
    private getDirectionStatement;
    getDirection(): string;
    getData(): {
        nodes: any[];
        edges: any[];
        other: {};
        config: import("../../config.type.js").MermaidConfig;
        direction: string;
    };
    getConfig(): import("../../config.type.js").StateDiagramConfig | undefined;
    getAccTitle: () => string;
    setAccTitle: (txt: string) => void;
    getAccDescription: () => string;
    setAccDescription: (txt: string) => void;
    setDiagramTitle: (txt: string) => void;
    getDiagramTitle: () => string;
}

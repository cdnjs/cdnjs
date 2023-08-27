import type { ClassRelation, ClassNode, ClassNote, ClassMap, NamespaceMap, NamespaceNode } from './classTypes.js';
export declare const parseDirective: (statement: string, context: string, type: string) => void;
export declare const setClassLabel: (id: string, label: string) => void;
/**
 * Function called by parser when a node definition has been found.
 *
 * @param id - Id of the class to add
 * @public
 */
export declare const addClass: (id: string) => void;
/**
 * Function to lookup domId from id in the graph definition.
 *
 * @param id - class ID to lookup
 * @public
 */
export declare const lookUpDomId: (id: string) => string;
export declare const clear: () => void;
export declare const getClass: (id: string) => ClassNode;
export declare const getClasses: () => ClassMap;
export declare const getRelations: () => ClassRelation[];
export declare const getNotes: () => ClassNote[];
export declare const addRelation: (relation: ClassRelation) => void;
/**
 * Adds an annotation to the specified class Annotations mark special properties of the given type
 * (like 'interface' or 'service')
 *
 * @param className - The class name
 * @param annotation - The name of the annotation without any brackets
 * @public
 */
export declare const addAnnotation: (className: string, annotation: string) => void;
/**
 * Adds a member to the specified class
 *
 * @param className - The class name
 * @param member - The full name of the member. If the member is enclosed in `<<brackets>>` it is
 *   treated as an annotation If the member is ending with a closing bracket ) it is treated as a
 *   method Otherwise the member will be treated as a normal property
 * @public
 */
export declare const addMember: (className: string, member: string) => void;
export declare const addMembers: (className: string, members: string[]) => void;
export declare const addNote: (text: string, className: string) => void;
export declare const cleanupLabel: (label: string) => string;
/**
 * Called by parser when a special node is found, e.g. a clickable element.
 *
 * @param ids - Comma separated list of ids
 * @param className - Class to add
 */
export declare const setCssClass: (ids: string, className: string) => void;
export declare const getTooltip: (id: string, namespace?: string) => string | undefined;
/**
 * Called by parser when a link is found. Adds the URL to the vertex data.
 *
 * @param ids - Comma separated list of ids
 * @param linkStr - URL to create a link for
 * @param target - Target of the link, _blank by default as originally defined in the svgDraw.js file
 */
export declare const setLink: (ids: string, linkStr: string, target: string) => void;
/**
 * Called by parser when a click definition is found. Registers an event handler.
 *
 * @param ids - Comma separated list of ids
 * @param functionName - Function to be called on click
 * @param functionArgs - Function args the function should be called with
 */
export declare const setClickEvent: (ids: string, functionName: string, functionArgs: string) => void;
export declare const bindFunctions: (element: Element) => void;
export declare const lineType: {
    LINE: number;
    DOTTED_LINE: number;
};
export declare const relationType: {
    AGGREGATION: number;
    EXTENSION: number;
    COMPOSITION: number;
    DEPENDENCY: number;
    LOLLIPOP: number;
};
/**
 * Function called by parser when a namespace definition has been found.
 *
 * @param id - Id of the namespace to add
 * @public
 */
export declare const addNamespace: (id: string) => void;
/**
 * Function called by parser when a namespace definition has been found.
 *
 * @param id - Id of the namespace to add
 * @param classNames - Ids of the class to add
 * @public
 */
export declare const addClassesToNamespace: (id: string, classNames: string[]) => void;
declare const _default: {
    parseDirective: (statement: string, context: string, type: string) => void;
    setAccTitle: (txt: string) => void;
    getAccTitle: () => string;
    getAccDescription: () => string;
    setAccDescription: (txt: string) => void;
    getConfig: () => import("../../config.type.js").ClassDiagramConfig | undefined;
    addClass: (id: string) => void;
    bindFunctions: (element: Element) => void;
    clear: () => void;
    getClass: (id: string) => ClassNode;
    getClasses: () => ClassMap;
    getNotes: () => ClassNote[];
    addAnnotation: (className: string, annotation: string) => void;
    addNote: (text: string, className: string) => void;
    getRelations: () => ClassRelation[];
    addRelation: (relation: ClassRelation) => void;
    getDirection: () => string;
    setDirection: (dir: string) => void;
    addMember: (className: string, member: string) => void;
    addMembers: (className: string, members: string[]) => void;
    cleanupLabel: (label: string) => string;
    lineType: {
        LINE: number;
        DOTTED_LINE: number;
    };
    relationType: {
        AGGREGATION: number;
        EXTENSION: number;
        COMPOSITION: number;
        DEPENDENCY: number;
        LOLLIPOP: number;
    };
    setClickEvent: (ids: string, functionName: string, functionArgs: string) => void;
    setCssClass: (ids: string, className: string) => void;
    setLink: (ids: string, linkStr: string, target: string) => void;
    getTooltip: (id: string, namespace?: string | undefined) => string | undefined;
    setTooltip: (ids: string, tooltip?: string | undefined) => void;
    lookUpDomId: (id: string) => string;
    setDiagramTitle: (txt: string) => void;
    getDiagramTitle: () => string;
    setClassLabel: (id: string, label: string) => void;
    addNamespace: (id: string) => void;
    addClassesToNamespace: (id: string, classNames: string[]) => void;
    getNamespace: (name: string) => NamespaceNode;
    getNamespaces: () => NamespaceMap;
};
export default _default;

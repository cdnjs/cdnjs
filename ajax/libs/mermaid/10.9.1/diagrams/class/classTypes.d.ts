export interface ClassNode {
    id: string;
    type: string;
    label: string;
    cssClasses: string[];
    methods: ClassMember[];
    members: ClassMember[];
    annotations: string[];
    domId: string;
    styles: string[];
    parent?: string;
    link?: string;
    linkTarget?: string;
    haveCallback?: boolean;
    tooltip?: string;
}
export type Visibility = '#' | '+' | '~' | '-' | '';
export declare const visibilityValues: string[];
/**
 * Parses and stores class diagram member variables/methods.
 *
 */
export declare class ClassMember {
    id: string;
    cssStyle: string;
    memberType: 'method' | 'attribute';
    visibility: Visibility;
    /**
     * denote if static or to determine which css class to apply to the node
     * @defaultValue ''
     */
    classifier: string;
    /**
     * parameters for method
     * @defaultValue ''
     */
    parameters: string;
    /**
     * return type for method
     * @defaultValue ''
     */
    returnType: string;
    constructor(input: string, memberType: 'method' | 'attribute');
    getDisplayDetails(): {
        displayText: string;
        cssStyle: string;
    };
    parseMember(input: string): void;
    parseClassifier(): "" | "font-style:italic;" | "text-decoration:underline;";
}
export interface ClassNote {
    id: string;
    class: string;
    text: string;
}
export type ClassRelation = {
    id1: string;
    id2: string;
    relationTitle1: string;
    relationTitle2: string;
    type: string;
    title: string;
    text: string;
    style: string[];
    relation: {
        type1: number;
        type2: number;
        lineType: number;
    };
};
export interface NamespaceNode {
    id: string;
    domId: string;
    classes: ClassMap;
    children: NamespaceMap;
}
export type ClassMap = Record<string, ClassNode>;
export type NamespaceMap = Record<string, NamespaceNode>;

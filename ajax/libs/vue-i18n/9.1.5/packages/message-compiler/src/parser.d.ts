import { SourceLocation } from './location';
import { ParserOptions } from './options';
export declare const enum NodeTypes {
    Resource = 0,
    Plural = 1,
    Message = 2,
    Text = 3,
    Named = 4,
    List = 5,
    Linked = 6,
    LinkedKey = 7,
    LinkedModifier = 8,
    Literal = 9
}
export declare type Identifier = string;
export interface Node {
    type: NodeTypes;
    start: number;
    end: number;
    loc?: SourceLocation;
}
export interface ResourceNode extends Node {
    type: NodeTypes.Resource;
    body: MessageNode | PluralNode;
    helpers?: string[];
}
export interface PluralNode extends Node {
    type: NodeTypes.Plural;
    cases: MessageNode[];
}
export interface MessageNode extends Node {
    type: NodeTypes.Message;
    items: MessageElementNode[];
}
declare type MessageElementNode = TextNode | NamedNode | ListNode | LiteralNode | LinkedNode;
export interface TextNode extends Node {
    type: NodeTypes.Text;
    value: string;
}
export interface NamedNode extends Node {
    type: NodeTypes.Named;
    key: Identifier;
}
export interface ListNode extends Node {
    type: NodeTypes.List;
    index: number;
}
export interface LiteralNode extends Node {
    type: NodeTypes.Literal;
    value: string;
}
export interface LinkedNode extends Node {
    type: NodeTypes.Linked;
    modifier?: LinkedModifierNode;
    key: LinkedKeyNode | NamedNode | ListNode | LiteralNode;
}
export interface LinkedKeyNode extends Node {
    type: NodeTypes.LinkedKey;
    value: string;
}
export interface LinkedModifierNode extends Node {
    type: NodeTypes.LinkedModifier;
    value: Identifier;
}
export interface Parser {
    parse(source: string): ResourceNode;
}
export declare const ERROR_DOMAIN = "parser";
export declare function createParser(options?: ParserOptions): Parser;
export {};
//# sourceMappingURL=parser.d.ts.map
/**
 * Defines a custom element.
 * @param name - The name of the custom element.
 * @param ctor - The constructor function for the custom element.
 */
export declare function define(name: string, ctor: CustomElementConstructor): void;
export declare function tag(name: string): (target: CustomElementConstructor) => void;

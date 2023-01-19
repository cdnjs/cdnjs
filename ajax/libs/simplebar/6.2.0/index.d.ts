import SimpleBarCore from 'simplebar-core';
export default class SimpleBar extends SimpleBarCore {
    static globalObserver: MutationObserver;
    static instances: WeakMap<object, any>;
    constructor(...args: ConstructorParameters<typeof SimpleBarCore>);
    static initDOMLoadedElements(): void;
    static removeObserver(): void;
    initDOM(): void;
    unMount(): void;
    static initHtmlApi(): void;
    static handleMutations(mutations: MutationRecord[]): void;
}

type Link = {
    [key: string]: string | number | boolean;
};
type Opts = {
    character?: string;
    classname?: string;
    spaces?: boolean;
    charclassname?: string;
    link?: Link;
    delimiter?: string;
};
declare function shave(target: string | NodeList | Node, maxHeight: number, opts?: Opts): void;
declare function updateTextProp(delimiter: string, spaces: boolean, wordItems: string | string[]): string;

export { type Link, type Opts, shave as default, updateTextProp };

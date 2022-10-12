import TomSelect from '../tom-select';
import { escape_html } from '../utils';
export interface TomInput extends HTMLElement {
    tomselect?: TomSelect;
    disabled: boolean;
    required: boolean;
    value: string;
    type: string;
    validity: ValidityState;
}
export declare type TomArgObject = {
    silent?: boolean;
};
export declare type TomOption = {
    [key: string]: any;
};
export declare type TomOptions = {
    [key: string]: TomOption;
};
export declare type TomCreateFilter = (input: string) => boolean;
export declare type TomCreateCallback = (data?: TomOption) => void;
export declare type TomCreate = (input: string, create: TomCreateCallback) => boolean;
export interface TomItem extends HTMLElement {
    dataset: {
        value: string;
    };
}
export declare type TomLoadCallback = TomSelect['loadCallback'];
export declare type TomTemplate = (data: TomOption, escape: typeof escape_html) => string | HTMLElement;
export declare type TomTemplateNull = (data: TomOption, escape: typeof escape_html) => null | string | HTMLElement;
export declare type TomTemplates = {
    'dropdown': TomTemplate;
    'optgroup': TomTemplate;
    'optgroup_header': TomTemplate;
    'option': TomTemplate;
    'item': TomTemplate;
    'option_create': TomTemplate;
    'no_results': TomTemplate;
    'loading': TomTemplate;
    'not_loading': TomTemplateNull;
    'loading_more': TomTemplateNull;
    'no_more_results': TomTemplateNull;
};
export declare type TomTemplateNames = keyof TomTemplates;
export declare type TomClearFilter = (option: TomOption, value: string) => boolean;
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

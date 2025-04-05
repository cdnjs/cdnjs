import type TomSelect from '../tom-select.ts';
import { escape_html } from '../utils.ts';
export interface TomInput extends HTMLElement {
    tomselect?: TomSelect;
    disabled: boolean;
    readOnly?: boolean;
    required: boolean;
    value: string;
    type: string;
    validity: ValidityState;
}
export type TomArgObject = {
    silent?: boolean;
};
export type TomOption = {
    [key: string]: any;
};
export type TomOptions = {
    [key: string]: TomOption;
};
export type TomCreateFilter = (input: string) => boolean;
export type TomCreateCallback = (data?: TomOption) => void;
export type TomCreate = (input: string, create: TomCreateCallback) => boolean;
export interface TomItem extends HTMLElement {
    dataset: {
        value: string;
    };
}
export type TomLoadCallback = TomSelect['loadCallback'];
export type TomTemplate = (data: TomOption, escape: typeof escape_html) => string | HTMLElement;
export type TomTemplateNull = (data: TomOption, escape: typeof escape_html) => null | string | HTMLElement;
export type TomTemplates = {
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
export type TomTemplateNames = keyof TomTemplates;
export type TomClearFilter = (option: TomOption, value: string) => boolean;
export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object | undefined ? RecursivePartial<T[P]> : T[P];
};

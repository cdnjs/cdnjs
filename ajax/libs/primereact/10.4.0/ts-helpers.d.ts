import * as React from 'react';

export declare type Booleanish = boolean | 'true' | 'false';
export declare type Numberish = number | string;
export declare type Nullable<T = void> = T | null | undefined;

export interface FormTarget<T = any> {
    name: string;
    id: string;
    value: Nullable<T>;
    checked?: boolean;
    [key: string]: any;
}

export interface FormBooleanTarget {
    name: string;
    id: string;
    value: boolean;
    checked: boolean;
    [key: string]: any;
}

export interface FormEvent<T = any, E = React.SyntheticEvent> {
    originalEvent?: E;
    value: Nullable<T>;
    checked?: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: FormTarget<T>;
}

export interface FormBooleanEvent<E = React.SyntheticEvent> {
    originalEvent?: E;
    value: boolean;
    checked: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: FormBooleanTarget;
}

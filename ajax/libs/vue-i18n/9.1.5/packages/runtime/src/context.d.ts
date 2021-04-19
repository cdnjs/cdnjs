import { Path } from '@intlify/message-resolver';
declare type ExtractToStringKey<T> = Extract<keyof T, 'toString'>;
declare type ExtractToStringFunction<T> = T[ExtractToStringKey<T>];
declare type StringConvertable<T> = ExtractToStringKey<T> extends never ? unknown : ExtractToStringFunction<T> extends (...args: any) => string ? T : unknown;
export declare type MessageType<T = string> = T extends string ? string : StringConvertable<T>;
export declare type MessageFunctionCallable = <T = string>(ctx: MessageContext<T>) => MessageType<T>;
export declare type MessageFunctionInternal<T = string> = {
    (ctx: MessageContext<T>): MessageType<T>;
    key?: string;
    locale?: string;
    source?: string;
};
export declare type MessageFunction<T = string> = MessageFunctionCallable | MessageFunctionInternal<T>;
export declare type MessageFunctions<T = string> = Record<string, MessageFunction<T>>;
export declare type MessageResolveFunction<T = string> = (key: string) => MessageFunction<T>;
export declare type MessageNormalize<T = string> = (values: MessageType<string | T>[]) => MessageType<T | T[]>;
export declare type MessageInterpolate<T = string> = (val: unknown) => MessageType<T>;
export interface MessageProcessor<T = string> {
    type?: string;
    interpolate?: MessageInterpolate<T>;
    normalize?: MessageNormalize<T>;
}
export declare type PluralizationRule = (choice: number, choicesLength: number, orgRule?: PluralizationRule) => number;
/** @VueI18nGeneral */
export declare type PluralizationRules = {
    [locale: string]: PluralizationRule;
};
export declare type PluralizationProps = {
    n?: number;
    count?: number;
};
export declare type LinkedModify<T = string> = (value: T) => MessageType<T>;
/** @VueI18nGeneral */
export declare type LinkedModifiers<T = string> = {
    [key: string]: LinkedModify<T>;
};
/** @VueI18nGeneral */
export declare type NamedValue<T = {}> = T & Record<string, unknown>;
export interface MessageContextOptions<T = string, N = {}> {
    parent?: MessageContext<T>;
    locale?: string;
    list?: unknown[];
    named?: NamedValue<N>;
    modifiers?: LinkedModifiers<T>;
    pluralIndex?: number;
    pluralRules?: PluralizationRules;
    messages?: MessageFunctions<T> | MessageResolveFunction<T>;
    processor?: MessageProcessor<T>;
}
export interface MessageContext<T = string> {
    list(index: number): unknown;
    named(key: string): unknown;
    plural(messages: T[]): T;
    linked(key: Path, modifier?: string): MessageType<T>;
    message(key: Path): MessageFunction<T>;
    type: string;
    interpolate: MessageInterpolate<T>;
    normalize: MessageNormalize<T>;
}
export declare const DEFAULT_MESSAGE_DATA_TYPE = "text";
export declare function createMessageContext<T = string, N = {}>(options?: MessageContextOptions<T, N>): MessageContext<T>;
export {};
//# sourceMappingURL=context.d.ts.map
import { Stringifier } from '../types';
declare type StylisInstanceConstructorArgs = {
    options?: {
        prefix?: boolean;
    };
    plugins?: stylis.Middleware[];
};
export default function createStylisInstance({ options, plugins, }?: StylisInstanceConstructorArgs): Stringifier;
export {};

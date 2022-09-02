import { Middleware } from 'stylis';
import { Stringifier } from '../types';
declare type StylisInstanceConstructorArgs = {
    options?: {
        prefix?: boolean;
    };
    plugins?: Middleware[];
};
export default function createStylisInstance({ options, plugins, }?: StylisInstanceConstructorArgs): Stringifier;
export {};

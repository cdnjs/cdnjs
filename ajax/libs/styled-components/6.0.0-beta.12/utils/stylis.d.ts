import { Middleware } from 'stylis';
import { Stringifier } from '../types';
export type ICreateStylisInstance = {
    options?: {
        namespace?: string;
        prefix?: boolean;
    };
    plugins?: Middleware[];
};
export default function createStylisInstance({ options, plugins, }?: ICreateStylisInstance): Stringifier;

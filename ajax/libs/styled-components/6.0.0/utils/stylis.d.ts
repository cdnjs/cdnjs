import * as stylis from 'stylis';
import { Stringifier } from '../types';
export type ICreateStylisInstance = {
    options?: {
        namespace?: string;
        prefix?: boolean;
    };
    plugins?: stylis.Middleware[];
};
export default function createStylisInstance({ options, plugins, }?: ICreateStylisInstance): Stringifier;

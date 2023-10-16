import PropTypes from 'prop-types';
import type { Requireable, Validator } from 'prop-types';
import type { Range } from './types.js';
export declare const isValueType: PropTypes.Requireable<string>;
export declare const isMinDate: Validator<Date | null | undefined>;
export declare const isMaxDate: Validator<Date | null | undefined>;
export declare const isRef: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | Required<PropTypes.InferProps<{
    current: PropTypes.Requireable<any>;
}>> | null | undefined>>;
export declare const rangeOf: <T>(type: PropTypes.Requireable<T>) => PropTypes.Requireable<Range<T>>;

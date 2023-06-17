import PropTypes from 'prop-types';
export declare const isValueType: PropTypes.Requireable<string>;
export declare function isMinDate(props: Record<string, unknown>, propName: string, componentName: string): Error | null;
export declare function isMaxDate(props: Record<string, unknown>, propName: string, componentName: string): Error | null;
export declare const isRef: PropTypes.Requireable<NonNullable<((...args: any[]) => any) | PropTypes.InferProps<{
    current: PropTypes.Requireable<any>;
}> | null | undefined>>;

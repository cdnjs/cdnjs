/// <reference types="react" />
import { Attrs, Interpolation, IStyledComponent, IStyledComponentFactory, KnownTarget, Runtime, StyledOptions, StyledTarget, Styles } from '../types';
/**
 * for types a and b, if b shares a field with a, mark a's field as optional
 */
declare type UnionWithOptionalIntersectedFields<A, B> = {
    [K in keyof (A | B)]: K extends keyof B ? A[K] | undefined : A[K];
};
/**
 * attrs can be an object or function that returns an object; attrs are always
 * optional and should hole-punch required base types if we're providing the
 * value via attrs
 */
declare type InferAttrResultType<T extends Attrs<object>> = Partial<T extends (...args: any) => infer P ? P : T>;
/**
 * If attrs type is a function (no type provided, inferring from usage), extract the return value
 * and merge it with the existing type to hole-punch any required fields that are satisfied as
 * a result of running attrs. Otherwise if we have a definite type then union the base props
 * with the passed attr type to capture any intended overrides.
 */
declare type ApplyAttrResultToProps<T extends Attrs<object>, Props extends object> = T extends (...args: any) => object ? UnionWithOptionalIntersectedFields<Props, InferAttrResultType<T>> : Props & InferAttrResultType<T>;
export interface Styled<R extends Runtime, Target extends StyledTarget<R>, OuterProps extends object = Target extends KnownTarget ? React.ComponentPropsWithRef<Target> : object, OuterStatics extends object = object> {
    <Props extends object = object, Statics extends object = object>(initialStyles: Styles<OuterProps & Props>, ...interpolations: Interpolation<OuterProps & Props>[]): IStyledComponent<R, Target, OuterProps & Props> & OuterStatics & Statics;
    attrs: <T extends Attrs<object>>(attrs: Attrs<T extends object ? OuterProps & T : OuterProps>) => Styled<R, Target, ApplyAttrResultToProps<T, OuterProps>, OuterStatics>;
    withConfig: (config: StyledOptions<R, OuterProps>) => Styled<R, Target, OuterProps, OuterStatics>;
}
export default function constructWithOptions<R extends Runtime, Target extends StyledTarget<R>, OuterProps extends object = Target extends KnownTarget ? React.ComponentPropsWithRef<Target> : object, OuterStatics extends object = object>(componentConstructor: IStyledComponentFactory<R, Target, OuterProps, OuterStatics>, tag: Target, options?: StyledOptions<R, OuterProps>): Styled<R, Target, OuterProps, OuterStatics>;
export {};

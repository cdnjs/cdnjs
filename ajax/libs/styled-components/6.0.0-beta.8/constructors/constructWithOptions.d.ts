import React from 'react';
import { Attrs, AttrsArg, Interpolation, IStyledComponent, IStyledComponentFactory, KnownTarget, Runtime, StyledOptions, StyledTarget, Styles } from '../types';
/**
 * for types a and b, if b shares a field with a, mark a's field as optional
 */
declare type OptionalIntersection<A, B> = {
    [K in Extract<keyof A, keyof B>]?: A[K];
};
/**
 * If attrs type is a function (no type provided, inferring from usage), extract the return value
 * and merge it with the existing type to hole-punch any required fields that are satisfied as
 * a result of running attrs. Otherwise if we have a definite type then union the base props
 * with the passed attr type to capture any intended overrides.
 */
declare type MarkPropsSatisfiedByAttrs<T extends Attrs, Props extends object> = T extends (...args: any) => infer P ? Omit<Props, keyof P> & OptionalIntersection<Props, P> : Omit<Props, keyof T> & Partial<T>;
export interface Styled<R extends Runtime, Target extends StyledTarget<R>, OuterProps extends object = Target extends KnownTarget ? React.ComponentPropsWithRef<Target> : R extends 'web' ? JSX.IntrinsicElements['div'] : object, OuterStatics extends object = object> {
    <Props extends object = object, Statics extends object = object>(initialStyles: Styles<OuterProps & Props>, ...interpolations: Interpolation<OuterProps & Props>[]): IStyledComponent<R, Target, OuterProps & Props> & OuterStatics & Statics;
    attrs: <T extends Attrs>(attrs: AttrsArg<T extends (...args: any) => infer P ? OuterProps & P : OuterProps & T>) => Styled<R, Target, MarkPropsSatisfiedByAttrs<T, OuterProps>, OuterStatics>;
    withConfig: (config: StyledOptions<R, OuterProps>) => Styled<R, Target, OuterProps, OuterStatics>;
}
export default function constructWithOptions<R extends Runtime, Target extends StyledTarget<R>, OuterProps extends object = Target extends KnownTarget ? React.ComponentPropsWithRef<Target> : R extends 'web' ? JSX.IntrinsicElements['div'] : object, OuterStatics extends object = object>(componentConstructor: IStyledComponentFactory<R, Target, OuterProps, OuterStatics>, tag: Target, options?: StyledOptions<R, OuterProps>): Styled<R, Target, OuterProps, OuterStatics>;
export {};

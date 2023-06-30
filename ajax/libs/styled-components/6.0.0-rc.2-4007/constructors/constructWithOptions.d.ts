import React from 'react';
import { Attrs, DataAttributes, ExecutionContext, ExecutionProps, Interpolation, IStyledComponent, IStyledComponentFactory, KnownTarget, NoInfer, Runtime, StyledOptions, StyledTarget, Styles, SubsetOnly } from '../types';
/**
 * for types a and b, if b shares a field with a, mark a's field as optional
 */
type OptionalIntersection<A, B> = {
    [K in Extract<keyof A, keyof B>]?: A[K];
};
type AttrsResult<T extends Attrs> = T extends (...args: any) => infer P ? P : T;
type ExtractAttrsTarget<R extends Runtime, P extends ExecutionProps, DefaultTarget extends StyledTarget<R>> = P['as'] extends KnownTarget ? P['as'] : DefaultTarget;
/**
 * If attrs type is a function (no type provided, inferring from usage), extract the return value
 * and merge it with the existing type to hole-punch any required fields that are satisfied as
 * a result of running attrs. Otherwise if we have a definite type then union the base props
 * with the passed attr type to capture any intended overrides.
 */
type PropsSatisfiedByAttrs<T extends Attrs, Props extends object, Result extends ExecutionProps = AttrsResult<T>> = Omit<Props, keyof Result> & OptionalIntersection<Props, Result> & Partial<Omit<Result, keyof Props | 'as'>>;
/**
 * Rejects an attr factory function argument (T) if it returns any properties not defined in Props.
 */
type StrictAttrFactory<T, Props> = T extends ((props: ExecutionContext & Props) => infer TResult) ? TResult extends SubsetOnly<TResult, (Partial<Props> & ExecutionProps & DataAttributes & React.AriaAttributes)> ? (props: ExecutionContext & Props) => TResult : never : never;
export interface Styled<R extends Runtime, Target extends StyledTarget<R>, OuterProps extends object = object, OuterStatics extends object = object, RuntimeInjectedProps extends ExecutionProps = object> {
    <Props extends object = object, Statics extends object = object>(initialStyles: Styles<OuterProps & RuntimeInjectedProps & NoInfer<Props>>, ...interpolations: Interpolation<OuterProps & RuntimeInjectedProps & NoInfer<Props>>[]): // @ts-expect-error KnownTarget is a subset of StyledTarget<R>
    IStyledComponent<R, ExtractAttrsTarget<R, RuntimeInjectedProps, Target>, OuterProps & Props> & OuterStatics & Statics;
    /**
     * This is a chainable method that attaches some props to a styled component.
     * @param props An object containing prop values that will be merged into the rest of the component's props
     * @argument Props Additional props being injected in `props`
     */
    attrs<Props extends object = object, PropValues extends Partial<OuterProps> & ExecutionProps & DataAttributes & React.AriaAttributes & NoInfer<Props> = Partial<OuterProps> & ExecutionProps & DataAttributes & React.AriaAttributes & NoInfer<Props>>(props: PropValues & SubsetOnly<PropValues, Partial<OuterProps> & ExecutionProps & DataAttributes & React.AriaAttributes & NoInfer<Props>>): Styled<R, Target, PropsSatisfiedByAttrs<PropValues, OuterProps>, OuterStatics, Omit<RuntimeInjectedProps, keyof PropValues> & PropValues>;
    /**
     * This is a chainable method that attaches some props to a styled component.
     * @param propFactory A function that receives the props that are passed into the component and computes a value, that is then going to be merged into the existing component props.
     * @argument Props Additional props being returned by `propFactory`
     */
    attrs<Props extends object = object, Factory extends ((...args: any[]) => any) = (...args: any[]) => any, TTarget extends StyledTarget<R> = ExtractAttrsTarget<R, AttrsResult<Factory>, Target>>(propFactory: Factory & StrictAttrFactory<Factory, OuterProps & NoInfer<Props>>): Styled<R, TTarget, PropsSatisfiedByAttrs<Factory, OuterProps>, OuterStatics, Omit<RuntimeInjectedProps, keyof AttrsResult<Factory>> & AttrsResult<Factory>>;
    withConfig: (config: StyledOptions<R, OuterProps>) => Styled<R, Target, OuterProps, OuterStatics>;
}
export default function constructWithOptions<R extends Runtime, Target extends StyledTarget<R>, OuterProps extends object = Target extends KnownTarget ? React.ComponentPropsWithRef<Target> : object, OuterStatics extends object = object>(componentConstructor: IStyledComponentFactory<R, Target, OuterProps, OuterStatics>, tag: Target, options?: StyledOptions<R, OuterProps>): Styled<R, Target, OuterProps, OuterStatics>;
export {};

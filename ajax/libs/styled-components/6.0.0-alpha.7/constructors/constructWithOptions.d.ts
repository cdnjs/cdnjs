/// <reference types="react" />
import { Attrs, ExecutionContext, Interpolation, IStyledComponent, IStyledComponentFactory, IStyledNativeComponent, IStyledNativeComponentFactory, KnownTarget, NativeTarget, StyledNativeOptions, StyledOptions, StyledTarget, Styles, WebTarget } from '../types';
export interface NativeStyled<Target extends NativeTarget, DerivedProps = Target extends KnownTarget ? React.ComponentProps<Target> : unknown, OuterProps = unknown, OuterStatics = unknown> {
    <Props = unknown, Statics = unknown>(initialStyles: Styles<DerivedProps & OuterProps & Props>, ...interpolations: Exclude<Interpolation<ExecutionContext & DerivedProps & OuterProps & Props>, IStyledComponent<any>>[]): IStyledNativeComponent<Target, DerivedProps & OuterProps & Props> & OuterStatics & Statics;
    attrs(attrs: Attrs<ExecutionContext & DerivedProps & OuterProps>): NativeStyled<Target, DerivedProps, OuterProps, OuterStatics>;
    withConfig(config: StyledNativeOptions<DerivedProps & OuterProps>): NativeStyled<Target, DerivedProps, OuterProps, OuterStatics>;
}
export interface WebStyled<Target extends WebTarget, DerivedProps = Target extends KnownTarget ? React.ComponentProps<Target> : unknown, OuterProps = unknown, OuterStatics = unknown> {
    <Props = unknown, Statics = unknown>(initialStyles: Styles<DerivedProps & OuterProps & Props>, ...interpolations: Interpolation<ExecutionContext & DerivedProps & OuterProps & Props>[]): IStyledComponent<Target, DerivedProps & OuterProps & Props> & OuterStatics & Statics;
    attrs(attrs: Attrs<ExecutionContext & DerivedProps & OuterProps>): WebStyled<Target, DerivedProps, OuterProps, OuterStatics>;
    withConfig(config: StyledOptions<DerivedProps & OuterProps>): WebStyled<Target, DerivedProps, OuterProps, OuterStatics>;
}
export default function constructWithOptions<Environment extends 'web' | 'native', Target extends StyledTarget, DerivedProps = Target extends KnownTarget ? React.ComponentProps<Target> : unknown, OuterProps = unknown, // used for styled<{}>().attrs() so attrs() gets the generic prop context
OuterStatics = unknown>(componentConstructor: Environment extends 'web' ? IStyledComponentFactory<any, any, any> : IStyledNativeComponentFactory<any, any, any>, tag: Target, options?: Environment extends 'web' ? StyledOptions<DerivedProps & OuterProps> : StyledNativeOptions<DerivedProps & OuterProps>): {
    <Props = unknown, Statics = unknown>(initialStyles: Styles<DerivedProps & OuterProps & Props>, ...interpolations: Interpolation<ExecutionContext & DerivedProps & OuterProps & Props>[]): ReturnType<Environment extends "web" ? IStyledComponentFactory<Target, DerivedProps & OuterProps & Props, OuterStatics & Statics> : IStyledNativeComponentFactory<Target, DerivedProps & OuterProps & Props, OuterStatics & Statics>>;
    attrs(attrs: Attrs<ExecutionContext & DerivedProps & OuterProps>): {
        <Props_1 = unknown, Statics_1 = unknown>(initialStyles: Styles<DerivedProps & OuterProps & OuterStatics & Props_1>, ...interpolations: Interpolation<ExecutionContext & DerivedProps & OuterProps & OuterStatics & Props_1>[]): ReturnType<Environment extends "web" ? IStyledComponentFactory<Target, DerivedProps & OuterProps & OuterStatics & Props_1, Statics_1> : IStyledNativeComponentFactory<Target, DerivedProps & OuterProps & OuterStatics & Props_1, Statics_1>>;
        attrs(attrs: Attrs<ExecutionContext & DerivedProps & OuterProps & OuterStatics>): {
            <Props_2 = unknown, Statics_2 = unknown>(initialStyles: Styles<DerivedProps & OuterProps & OuterStatics & Props_2>, ...interpolations: Interpolation<ExecutionContext & DerivedProps & OuterProps & OuterStatics & Props_2>[]): ReturnType<Environment extends "web" ? IStyledComponentFactory<Target, DerivedProps & OuterProps & OuterStatics & Props_2, Statics_2> : IStyledNativeComponentFactory<Target, DerivedProps & OuterProps & OuterStatics & Props_2, Statics_2>>;
            attrs(attrs: Attrs<ExecutionContext & DerivedProps & OuterProps & OuterStatics>): any;
            /**
             * If config methods are called, wrap up a new template function and merge options */
            withConfig(config: Environment extends "web" ? StyledOptions<DerivedProps & OuterProps & OuterStatics> : StyledNativeOptions<DerivedProps & OuterProps & OuterStatics>): any;
        };
        /**
         * If config methods are called, wrap up a new template function and merge options */
        withConfig(config: Environment extends "web" ? StyledOptions<DerivedProps & OuterProps & OuterStatics> : StyledNativeOptions<DerivedProps & OuterProps & OuterStatics>): any;
    };
    /**
     * If config methods are called, wrap up a new template function and merge options */
    withConfig(config: Environment extends 'web' ? StyledOptions<DerivedProps & OuterProps> : StyledNativeOptions<DerivedProps & OuterProps>): any;
};

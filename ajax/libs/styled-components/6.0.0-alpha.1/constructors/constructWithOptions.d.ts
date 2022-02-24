import { Attrs, Interpolation, IStyledComponent, IStyledComponentFactory, IStyledNativeComponent, IStyledNativeComponentFactory, NativeTarget, StyledNativeOptions, StyledOptions, StyledTarget, Styles, WebTarget } from '../types';
export interface NativeStyled<Target extends NativeTarget, OuterProps = unknown, OuterStatics = unknown> {
    <Props = unknown, Statics = unknown>(initialStyles: Styles<OuterProps & Props>, ...interpolations: Exclude<Interpolation<OuterProps & Props>, IStyledComponent<any>>[]): IStyledNativeComponent<Target, OuterProps & Props> & OuterStatics & Statics;
    attrs(attrs: Attrs<OuterProps>): NativeStyled<Target, OuterProps, OuterStatics>;
    withConfig(config: StyledNativeOptions<OuterProps>): NativeStyled<Target, OuterProps, OuterStatics>;
}
export interface WebStyled<Target extends WebTarget, OuterProps = unknown, OuterStatics = unknown> {
    <Props = unknown, Statics = unknown>(initialStyles: Styles<OuterProps & Props>, ...interpolations: Interpolation<OuterProps & Props>[]): IStyledComponent<Target, OuterProps & Props> & OuterStatics & Statics;
    attrs(attrs: Attrs<OuterProps>): WebStyled<Target, OuterProps, OuterStatics>;
    withConfig(config: StyledOptions<OuterProps>): WebStyled<Target, OuterProps, OuterStatics>;
}
export default function constructWithOptions<Environment extends 'web' | 'native', Target extends StyledTarget, OuterProps = unknown, // used for styled<{}>().attrs() so attrs() gets the generic prop context
OuterStatics = unknown>(componentConstructor: Environment extends 'web' ? IStyledComponentFactory<any, any, any> : IStyledNativeComponentFactory<any, any, any>, tag: Target, options?: Environment extends 'web' ? StyledOptions<OuterProps> : StyledNativeOptions<OuterProps>): {
    <Props = unknown, Statics = unknown>(initialStyles: Styles<OuterProps & Props>, ...interpolations: Interpolation<OuterProps & Props>[]): ReturnType<Environment extends "web" ? IStyledComponentFactory<Target, OuterProps & Props, OuterStatics & Statics> : IStyledNativeComponentFactory<Target, OuterProps & Props, OuterStatics & Statics>>;
    attrs(attrs: Attrs<OuterProps>): any;
    /**
     * If config methods are called, wrap up a new template function and merge options */
    withConfig(config: Environment extends 'web' ? StyledOptions<OuterProps> : StyledNativeOptions<OuterProps>): any;
};

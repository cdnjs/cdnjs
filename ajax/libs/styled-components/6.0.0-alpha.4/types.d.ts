import React from 'react';
import ComponentStyle from './models/ComponentStyle';
import { DefaultTheme } from './models/ThemeProvider';
import createWarnTooManyClasses from './utils/createWarnTooManyClasses';
interface ExoticComponentWithDisplayName<P = unknown> extends React.ExoticComponent<P> {
    defaultProps?: Partial<P>;
    displayName?: string;
}
export { DefaultTheme };
export declare type AnyComponent<P = any> = ExoticComponentWithDisplayName<P> | React.ComponentType<P>;
export interface StyledOptions<Props> {
    attrs?: Attrs<Props>[];
    componentId?: string;
    displayName?: string;
    parentComponentId?: string;
    shouldForwardProp?: ShouldForwardProp;
}
export interface StyledNativeOptions<Props> {
    attrs?: Attrs<Props>[];
    displayName?: string;
    shouldForwardProp?: ShouldForwardProp;
}
export declare type KnownWebTarget = keyof JSX.IntrinsicElements | AnyComponent;
export declare type WebTarget = string | KnownWebTarget;
export declare type NativeTarget = AnyComponent;
export interface BaseExtensibleObject {
    [key: string]: any;
}
export interface ExtensibleObject extends BaseExtensibleObject {
    $as?: KnownWebTarget;
    $forwardedAs?: KnownWebTarget;
    as?: KnownWebTarget;
    forwardedAs?: KnownWebTarget;
    theme?: DefaultTheme;
}
export interface ExecutionContext extends ExtensibleObject {
    theme: DefaultTheme;
}
export interface StyleFunction<Props> {
    (executionContext: ExecutionContext & Props): string | number | StyledObject | CSSConstructor<Props> | StyleFunction<Props>;
}
export declare type Interpolation<Props> = StyleFunction<Props> | StyledObject | string | number | Keyframes | IStyledComponent<any, any> | Interpolation<Props>[];
export declare type Attrs<Props> = (ExtensibleObject & Props) | ((props: ExecutionContext & Props) => ExecutionContext & Props);
export declare type RuleSet<Props> = Interpolation<Props>[];
export declare type Styles<Props> = TemplateStringsArray | StyledObject | StyleFunction<Props>;
export declare type NameGenerator = (hash: number) => string;
export interface CSSConstructor<Props> {
    (strings: string[], ...interpolations: Interpolation<Props>[]): RuleSet<Props>;
}
export interface StyleSheet {
    create: Function;
}
export interface Keyframes {
    id: string;
    name: string;
    rules: string;
}
export interface Flattener<Props> {
    (chunks: Interpolation<Props>[], executionContext: Object | null | undefined, styleSheet: Object | null | undefined): Interpolation<Props>[];
}
export declare type FlattenerResult<Props> = RuleSet<Props> | number | string | string[] | IStyledComponent<any, any> | Keyframes;
export interface Stringifier {
    (css: string, selector?: string, prefix?: string, componentId?: string): string;
    hash: string;
}
export interface ShouldForwardProp {
    (prop: string, isValidAttr: (prop: string) => boolean, elementToBeCreated?: WebTarget | NativeTarget): boolean;
}
export interface CommonStatics<Props> {
    attrs: Attrs<Props>[];
    target: StyledTarget;
    shouldForwardProp?: ShouldForwardProp;
    withComponent: any;
}
export interface IStyledStatics<OuterProps = unknown> extends CommonStatics<OuterProps> {
    componentStyle: ComponentStyle;
    foldedComponentIds: Array<string>;
    target: WebTarget;
    styledComponentId: string;
    warnTooManyClasses?: ReturnType<typeof createWarnTooManyClasses>;
    withComponent: <Target extends WebTarget, Props = unknown>(tag: Target) => IStyledComponent<Target, OuterProps & Props>;
}
declare type PolymorphicComponentProps<ActualComponent extends StyledTarget, PropsToBeInjectedIntoActualComponent extends {}, ActualComponentProps = ActualComponent extends KnownWebTarget ? React.ComponentPropsWithRef<ActualComponent> : {}> = React.HTMLAttributes<ActualComponent> & Omit<PropsToBeInjectedIntoActualComponent, keyof ActualComponentProps | 'as' | '$as'> & ActualComponentProps & ({
    $as: ActualComponent;
    as?: AnyComponent;
} | {
    as?: ActualComponent;
});
interface PolymorphicComponent<FallbackComponent extends StyledTarget, ExpectedProps = unknown, PropsToBeInjectedIntoActualComponent = unknown> extends React.ForwardRefExoticComponent<ExpectedProps> {
    <ActualComponent extends StyledTarget = FallbackComponent>(props: PolymorphicComponentProps<ActualComponent, ExpectedProps & PropsToBeInjectedIntoActualComponent>): React.ReactElement<PolymorphicComponentProps<ActualComponent, ExecutionContext & ExpectedProps & PropsToBeInjectedIntoActualComponent>, ActualComponent>;
}
export interface IStyledComponent<Target extends WebTarget, Props = unknown> extends PolymorphicComponent<Target, Props, ExecutionContext>, IStyledStatics<Props> {
    defaultProps?: Partial<ExtensibleObject & (Target extends KnownWebTarget ? React.ComponentProps<Target> : {}) & Props>;
    toString: () => string;
}
export interface IStyledComponentFactory<Target extends WebTarget, Props = unknown, Statics = unknown> {
    (target: Target, options: StyledOptions<Props>, rules: RuleSet<Props>): IStyledComponent<Target, Props> & Statics;
}
export interface IStyledNativeStatics<OuterProps = unknown> extends CommonStatics<OuterProps> {
    inlineStyle: InstanceType<IInlineStyleConstructor<OuterProps>>;
    target: NativeTarget;
    withComponent: <Target extends NativeTarget, Props = unknown>(tag: Target) => IStyledNativeComponent<Target, OuterProps & Props>;
}
export interface IStyledNativeComponent<Target extends NativeTarget, Props = unknown> extends PolymorphicComponent<Target, Props, ExecutionContext>, IStyledNativeStatics<Props> {
    defaultProps?: Partial<ExtensibleObject & (Target extends KnownWebTarget ? React.ComponentProps<Target> : {}) & Props>;
}
export interface IStyledNativeComponentFactory<Target extends NativeTarget, Props = unknown, Statics = unknown> {
    (target: Target, options: StyledNativeOptions<Props>, rules: RuleSet<Props>): IStyledNativeComponent<Target, Props> & Statics;
}
export interface IInlineStyleConstructor<Props = unknown> {
    new (rules: RuleSet<Props>): IInlineStyle<Props>;
}
export interface IInlineStyle<Props = unknown> {
    rules: RuleSet<Props>;
    generateStyleObject(executionContext: Object): Object;
}
export declare type StyledTarget = WebTarget | NativeTarget;
export interface StyledObject {
    [key: string]: Record<string, any> | string | number | StyleFunction<ExecutionContext>;
}
export declare type CSSProp = string | StyledObject | StyleFunction<ExecutionContext>;

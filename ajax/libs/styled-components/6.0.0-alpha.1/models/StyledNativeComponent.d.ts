import type { ExtensibleObject, IInlineStyleConstructor, IStyledNativeComponent, IStyledNativeComponentFactory, NativeTarget, RuleSet, StyledNativeOptions } from '../types';
declare const _default: (InlineStyle: IInlineStyleConstructor<any>) => <Target extends NativeTarget, OuterProps extends ExtensibleObject, Statics = unknown>(target: Target, options: StyledNativeOptions<OuterProps>, rules: RuleSet<OuterProps>) => IStyledNativeComponent<Target, OuterProps> & Statics;
export default _default;

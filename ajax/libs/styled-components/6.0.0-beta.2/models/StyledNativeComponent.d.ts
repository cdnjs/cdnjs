import type { ExtensibleObject, IInlineStyleConstructor, IStyledComponent, IStyledComponentFactory, NativeTarget, RuleSet, StyledOptions } from '../types';
declare const _default: (InlineStyle: IInlineStyleConstructor<any>) => <Target extends NativeTarget, OuterProps extends ExtensibleObject, Statics = unknown>(target: Target, options: StyledOptions<"native", OuterProps>, rules: RuleSet<OuterProps>) => IStyledComponent<"native", Target, OuterProps> & Statics;
export default _default;

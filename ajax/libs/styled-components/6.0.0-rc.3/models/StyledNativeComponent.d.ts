import type { ExecutionProps, IInlineStyleConstructor, IStyledComponent, IStyledComponentFactory, NativeTarget, RuleSet, StyledComponentProps, StyledOptions } from '../types';
declare const _default: (InlineStyle: IInlineStyleConstructor<any>) => <Target extends NativeTarget, OtherProps extends ExecutionProps, Statics extends object = object>(target: Target, options: StyledOptions<"native", OtherProps>, rules: RuleSet<StyledComponentProps<"native", Target, OtherProps, never>>) => IStyledComponent<"native", Target, OtherProps, never> & Statics & object;
export default _default;

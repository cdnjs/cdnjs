import type { IStyledComponentFactory, RuleSet, StyledOptions, WebTarget } from '../types';
declare function createStyledComponent<Target extends WebTarget, OtherProps extends object, Statics extends object = object>(target: Target, options: StyledOptions<'web', OtherProps>, rules: RuleSet<OtherProps>): ReturnType<IStyledComponentFactory<'web', Target, OtherProps, never, Statics>>;
export default createStyledComponent;

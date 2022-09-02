import type { IStyledComponentFactory, RuleSet, StyledOptions, WebTarget } from '../types';
declare function createStyledComponent<Target extends WebTarget, OuterProps = unknown, Statics = unknown>(target: Target, options: StyledOptions<'web', OuterProps>, rules: RuleSet<OuterProps>): ReturnType<IStyledComponentFactory<'web', Target, OuterProps, Statics>>;
export default createStyledComponent;

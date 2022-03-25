import type { IStyledComponentFactory, RuleSet, StyledOptions, WebTarget } from '../types';
declare function createStyledComponent<Target extends WebTarget, OuterProps = unknown, Statics = unknown>(target: Target, options: StyledOptions<OuterProps>, rules: RuleSet<OuterProps>): ReturnType<IStyledComponentFactory<Target, OuterProps, Statics>>;
export default createStyledComponent;

import { Interpolation, StyledObject, StyleFunction, Styles } from '../types';
export default function css<Props extends object>(styles: Styles<Props>, ...interpolations: Interpolation<Props>[]): string | number | false | import("../types").Keyframes | import("../types").IStyledComponent<"web", any, any> | TemplateStringsArray | StyledObject<Props> | StyleFunction<Props> | (import("../types").RuleSet<Props> & {
    isCss?: boolean | undefined;
}) | null | undefined;

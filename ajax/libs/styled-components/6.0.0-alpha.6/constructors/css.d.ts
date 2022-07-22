import { Interpolation, StyledObject, StyleFunction, Styles } from '../types';
export default function css<Props>(styles: Styles<Props>, ...interpolations: Interpolation<Props>[]): string | number | import("../types").Keyframes | TemplateStringsArray | import("../types").IStyledComponent<any, any> | StyledObject<Props> | StyleFunction<Props> | (Interpolation<Props>[] & {
    isCss?: boolean | undefined;
});

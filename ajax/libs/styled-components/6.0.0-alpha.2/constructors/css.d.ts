import { Interpolation, Styles } from '../types';
export default function css<Props>(styles: Styles<Props>, ...interpolations: Interpolation<Props>[]): TemplateStringsArray | (Interpolation<Props> & {
    isCss?: boolean | undefined;
});

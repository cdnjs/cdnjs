import { AnyStyledComponent, StyledComponentInnerAttrs, StyledComponentInnerComponent, StyledComponentInnerOtherProps, WebTarget } from '../types';
import { Styled } from './constructWithOptions';
declare function createStyle<Target extends AnyStyledComponent<'web'>>(tag: Target): Styled<'web', StyledComponentInnerComponent<'web', Target>, StyledComponentInnerOtherProps<'web', Target>, StyledComponentInnerAttrs<'web', Target>>;
declare function createStyle<Target extends WebTarget>(tag: Target): Styled<'web', Target, {}>;
type WebStyledStatic = typeof createStyle & {
    [E in keyof JSX.IntrinsicElements]: Styled<'web', E, {}>;
};
declare const styled: WebStyledStatic;
export default styled;

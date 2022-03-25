import reactPrimitives from 'react-primitives';
import { NativeStyled } from '../constructors/constructWithOptions';
import css from '../constructors/css';
import withTheme from '../hoc/withTheme';
import useTheme from '../hooks/useTheme';
import ThemeProvider, { ThemeConsumer, ThemeContext } from '../models/ThemeProvider';
import { NativeTarget } from '../types';
import isStyledComponent from '../utils/isStyledComponent';
declare const styled: (<Target extends NativeTarget>(tag: Target) => {
    <Props = unknown, Statics = unknown>(initialStyles: import("../types").Styles<Props>, ...interpolations: import("../types").Interpolation<Props>[]): import("../types").IStyledNativeComponent<Target, Props> & Statics;
    attrs(attrs: import("../types").Attrs<unknown>): any;
    withConfig(config: import("../types").StyledNativeOptions<unknown>): any;
}) & {
    Image: NativeStyled<typeof reactPrimitives.Image, import("react-native").ImageProps, unknown>;
    Text: NativeStyled<typeof reactPrimitives.Text, import("react-native").TextProps, unknown>;
    Touchable: NativeStyled<import("react").ComponentType<import("react-native").TouchableOpacityProps>, import("react-native").TouchableOpacityProps | (import("react-native").TouchableOpacityProps & {
        children?: import("react").ReactNode;
    }), unknown>;
    View: NativeStyled<typeof reactPrimitives.View, import("react-native").ViewProps, unknown>;
};
export { IStyledNativeComponent, IStyledNativeComponentFactory, IStyledNativeStatics, NativeTarget, StyledNativeOptions } from '../types';
export { css, isStyledComponent, ThemeProvider, ThemeConsumer, ThemeContext, withTheme, useTheme };
export default styled;

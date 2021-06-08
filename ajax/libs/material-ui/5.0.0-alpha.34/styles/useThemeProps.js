import _extends from "@babel/runtime/helpers/esm/extends";
import getThemeProps from './getThemeProps';
import useTheme from './useTheme';
import defaultTheme from './defaultTheme';
export default function useThemeProps({
  props,
  name
}) {
  const contextTheme = useTheme() || defaultTheme;
  const more = getThemeProps({
    theme: contextTheme,
    name,
    props
  });
  const theme = more.theme || contextTheme;
  return _extends({
    theme,
    isRtl: theme.direction === 'rtl'
  }, more);
}
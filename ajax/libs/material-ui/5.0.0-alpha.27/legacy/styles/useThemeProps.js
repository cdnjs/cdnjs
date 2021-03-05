import _extends from "@babel/runtime/helpers/esm/extends";
import { getThemeProps } from '@material-ui/styles';
import useTheme from './useTheme';
import defaultTheme from './defaultTheme';
export default function useThemeProps(_ref) {
  var props = _ref.props,
      name = _ref.name;
  var contextTheme = useTheme() || defaultTheme;
  var more = getThemeProps({
    theme: contextTheme,
    name: name,
    props: props
  });
  var theme = more.theme || contextTheme;
  return _extends({
    theme: theme,
    isRtl: theme.direction === 'rtl'
  }, more);
}
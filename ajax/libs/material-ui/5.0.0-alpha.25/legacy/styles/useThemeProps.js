import _extends from "@babel/runtime/helpers/esm/extends";
import { getThemeProps } from '@material-ui/styles';
import useTheme from './useTheme';
import defaultTheme from './defaultTheme';
export default function useThemeProps(_ref) {
  var inputProps = _ref.props,
      name = _ref.name;

  var props = _extends({}, inputProps);

  var contextTheme = useTheme() || defaultTheme;
  var more = getThemeProps({
    theme: contextTheme,
    name: name,
    props: props
  });
  var theme = more.theme || contextTheme;
  var isRtl = theme.direction === 'rtl';
  return _extends({
    theme: theme,
    isRtl: isRtl
  }, more);
}
import _extends from "@babel/runtime/helpers/esm/extends";
import { withStyles as withStylesWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

function withStyles(stylesOrCreator, options) {
  return withStylesWithoutDefault(stylesOrCreator, _extends({
    defaultTheme: defaultTheme
  }, options));
}

export default withStyles;
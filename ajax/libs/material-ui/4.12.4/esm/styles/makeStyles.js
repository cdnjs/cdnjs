import _extends from "@babel/runtime/helpers/esm/extends";
import { makeStyles as makeStylesWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

function makeStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return makeStylesWithoutDefault(stylesOrCreator, _extends({
    defaultTheme: defaultTheme
  }, options));
}

export default makeStyles;
import _extends from "@babel/runtime/helpers/esm/extends";
import { styled as styledWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

var styled = function styled(Component) {
  var componentCreator = styledWithoutDefault(Component);
  return function (style, options) {
    return componentCreator(style, _extends({
      defaultTheme: defaultTheme
    }, options));
  };
};

export default styled;
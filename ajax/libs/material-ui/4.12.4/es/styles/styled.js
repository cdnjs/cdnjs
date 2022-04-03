import _extends from "@babel/runtime/helpers/esm/extends";
import { styled as styledWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

const styled = Component => {
  const componentCreator = styledWithoutDefault(Component);
  return (style, options) => componentCreator(style, _extends({
    defaultTheme
  }, options));
};

export default styled;
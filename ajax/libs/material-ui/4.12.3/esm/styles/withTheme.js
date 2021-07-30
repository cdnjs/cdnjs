import { withThemeCreator } from '@material-ui/styles';
import defaultTheme from './defaultTheme';
var withTheme = withThemeCreator({
  defaultTheme: defaultTheme
});
export default withTheme;
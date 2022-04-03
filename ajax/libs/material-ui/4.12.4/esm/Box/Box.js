import { borders, compose, display, flexbox, grid, palette, positions, shadows, sizing, spacing, typography, styleFunctionSx } from '@material-ui/system';
import styled from '../styles/styled';
export var styleFunction = styleFunctionSx(compose(borders, display, flexbox, grid, positions, palette, shadows, sizing, spacing, typography));
/**
 * @ignore - do not document.
 */

var Box = styled('div')(styleFunction, {
  name: 'MuiBox'
});
export default Box;
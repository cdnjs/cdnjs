import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getInputAdornmentUtilityClass(slot) {
  return generateUtilityClass('MuiInputAdornment', slot);
}
var inputAdornmentClasses = generateUtilityClasses('MuiInputAdornment', ['root', 'filled', 'positionStart', 'positionEnd', 'disablePointerEvents', 'hiddenLabel', 'sizeSmall']);
export default inputAdornmentClasses;
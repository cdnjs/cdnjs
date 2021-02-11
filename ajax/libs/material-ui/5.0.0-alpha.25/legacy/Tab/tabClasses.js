import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTabUtilityClass(slot) {
  return generateUtilityClass('MuiTab', slot);
}
var tabClasses = generateUtilityClasses('MuiTab', ['root', 'labelIcon', 'textColorInherit', 'textColorPrimary', 'textColorSecondary', 'selected', 'disabled', 'fullWidth', 'wrapped', 'wrapper']);
export default tabClasses;
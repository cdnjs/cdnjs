import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';
export function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass('MuiOutlinedInput', slot);
}
var outlinedInputClasses = generateUtilityClasses('MuiOutlinedInput', ['root', 'focused', 'error', 'disabled', 'notchedOutline', 'input']);
export default outlinedInputClasses;
import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';
export function getInputUtilityClass(slot) {
  return generateUtilityClass('MuiInput', slot);
}
var inputClasses = generateUtilityClasses('MuiInput', ['root', 'focused', 'error', 'disabled', 'underline', 'input']);
export default inputClasses;
import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';
export function getFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}
var filledInputClasses = generateUtilityClasses('MuiFilledInput', ['root', 'underline', 'input']);
export default filledInputClasses;
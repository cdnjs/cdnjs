import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass('MuiToggleButtonGroup', slot);
}
var toggleButtonGroupClasses = generateUtilityClasses('MuiToggleButtonGroup', ['root', 'vertical', 'grouped', 'groupedHorizontal', 'groupedVertical']);
export default toggleButtonGroupClasses;
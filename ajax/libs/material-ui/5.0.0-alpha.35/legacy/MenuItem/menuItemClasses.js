import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getMenuItemUtilityClass(slot) {
  return generateUtilityClass('MuiMenuItem', slot);
}
var menuItemClasses = generateUtilityClasses('MuiMenuItem', ['root', 'gutters', 'selected', 'dense']);
export default menuItemClasses;
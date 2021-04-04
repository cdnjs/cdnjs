import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getAlertUtilityClass(slot) {
  return generateUtilityClass('MuiAlert', slot);
}
var alertClasses = generateUtilityClasses('MuiAlert', ['root', 'action', 'icon', 'message', 'filledSuccess', 'filledInfo', 'filledWarning', 'filledError', 'outlinedSuccess', 'outlinedInfo', 'outlinedWarning', 'outlinedError', 'standardSuccess', 'standardInfo', 'standardWarning', 'standardError']);
export default alertClasses;
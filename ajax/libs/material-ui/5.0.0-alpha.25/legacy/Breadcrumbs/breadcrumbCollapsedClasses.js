import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getBreadcrumbCollapsedUtilityClass(slot) {
  return generateUtilityClass('PrivateBreadcrumbCollapsed', slot);
}
var breadcrumbCollapsedClasses = generateUtilityClasses('PrivateBreadcrumbCollapsed', ['button', 'icon']);
export default breadcrumbCollapsedClasses;
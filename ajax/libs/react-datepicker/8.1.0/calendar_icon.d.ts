import React from "react";
interface CalendarIconProps {
    icon?: string | React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}
/**
 * `CalendarIcon` is a React component that renders an icon for a calendar.
 * The icon can be a string representing a CSS class, a React node, or a default SVG icon.
 *
 * @component
 * @prop  icon - The icon to be displayed. This can be a string representing a CSS class or a React node.
 * @prop  className - An optional string representing additional CSS classes to be applied to the icon.
 * @prop  onClick - An optional function to be called when the icon is clicked.
 *
 * @example
 * // To use a CSS class as the icon
 * <CalendarIcon icon="my-icon-class" onClick={myClickHandler} />
 *
 * @example
 * // To use a React node as the icon
 * <CalendarIcon icon={<MyIconComponent />} onClick={myClickHandler} />
 *
 * @returns  The `CalendarIcon` component.
 */
declare const CalendarIcon: React.FC<CalendarIconProps>;
export default CalendarIcon;

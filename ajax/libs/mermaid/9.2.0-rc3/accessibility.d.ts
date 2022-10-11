/**
 * This method will add a basic title and description element to a chart. The yy parser will need to
 * respond to getAccTitle and getAccDescription, where the title is the title element on the chart,
 * which is generally not displayed and the accDescription is the description element on the chart,
 * which is never displayed.
 *
 * The following charts display their title as a visual and accessibility element: gantt
 *
 * @param yy_parser
 * @param svg
 * @param id
 */
export default function addSVGAccessibilityFields(yy_parser: any, svg: any, id: any): void;

import { Element } from "../types";
/**
 * Calculates the number of steps between the END of an element and a selector.
 */
declare let calculateStepsToSelector: (selector: string, element: Element, to?: string) => number;
export default calculateStepsToSelector;

/**
 * Retrieve all text/BR nodes that exist inside within an element. These
 * will be the nodes we're capable of typing onto the screen.
 */
declare const getAllTypeableNodes: (element: Element, parentToExclude?: HTMLElement | null, shouldReverse?: boolean) => Node[];
export default getAllTypeableNodes;

type TreeNode = {
    [key: string]: string | number | boolean | CSSStyleDeclaration | TreeNode | Node;
} & {
    xmlns?: string;
    style?: Partial<CSSStyleDeclaration>;
    textContent?: string | Node;
    children?: TreeNode;
};
declare function render(tagName: string, content: TreeNode & {
    xmlns: string;
}, container?: Node): SVGElement;
declare function render(tagName: string, content?: TreeNode, container?: Node): HTMLElement;
export default render;

export declare const transformToBlockQuote: (content: string, type: string, customTitle?: string | null) => string;
/**
 * Transform code blocks in a Markdown file.
 * Use remark.parse() to turn the given content (a String) into an AST.
 * For any AST node that is a code block: transform it as needed:
 * - blocks marked as MERMAID_DIAGRAM_ONLY will be set to a 'mermaid' code block so it will be rendered as (only) a diagram
 * - blocks marked as MERMAID_EXAMPLE_KEYWORDS will be copied and the original node will be a code only block and the copy with be rendered as the diagram
 * - blocks marked as BLOCK_QUOTE_KEYWORDS will be transformed into block quotes
 *
 * Convert the AST back to a string and return it.
 *
 * @param content - the contents of a Markdown file
 * @returns the contents with transformed code blocks
 */
export declare const transformBlocks: (content: string) => string;

export type TemplateToken = string | TemplatePlaceholder;
export interface TemplatePlaceholder {
    before: string;
    after: string;
    name: string;
}
/**
 * Splits given string into template tokens.
 * Template is a string which contains placeholders which are uppercase names
 * between `[` and `]`, for example: `[PLACEHOLDER]`.
 * Unlike other templates, a placeholder may contain extra characters before and
 * after name: `[%PLACEHOLDER.]`. If data for `PLACEHOLDER` is defined, it will
 * be outputted with with these extra character, otherwise will be completely omitted.
 */
export default function template(text: string): TemplateToken[];

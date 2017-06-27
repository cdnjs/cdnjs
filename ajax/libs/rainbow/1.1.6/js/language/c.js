/**
 * C patterns
 *
 * @author Daniel Holden
 * @version 1.0.1
 */
Rainbow.extend('c', [
    {
        'name': 'meta.preprocessor',
        'pattern': /\#[\S\s]*?$/gm
    },
    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\/|\/\/[\s\S]*?$/gm
    },
    {
        'name': 'keyword',
        'pattern': /\b(do|goto|continue|break|switch|case|typedef)\b/g
    },
    {
        'name': 'entity.label',
        'pattern': /\w+:/g
    },
    {
        'name': 'storage.type',
        'pattern': /\b(((un)?signed|const)\s)?(void|char|short|int|long|float|double)\b/g
    },
    {
        'name': 'storage.modifier',
        'pattern': /\b(static|extern|auto|register|volatile|inline)\b/g
    },
    {
        'name': 'support.type',
        'pattern': /\b(struct|union|enum)\b/g
    }
]);

/**
 * Smalltalk patterns
 *
 * @author Frank Shearar <frank@angband.za.org>
 * @version 1.0
 */
Rainbow.extend('smalltalk', [
    {
        'name': 'keyword.pseudovariable',
        'pattern': /self|thisContext/g
    },
    {
        'name': 'keyword.constant',
        'pattern': /false|nil|true/g
    },
    {
        'name': 'string',
        'pattern': /'([^']|'')*'/g
    },
    {
        'name': 'string.symbol',
        'pattern': /#\w+|#'([^']|'')*'/g
    },
    {
        'name': 'string.character',
        'pattern': /\$\w+/g
    },
    {
        'name': 'comment',
        'pattern': /"([^"]|"")*"/g
    },
    {
        'name': 'constant.numeric',
        'pattern': /-?\d+(\.\d+)?((r-?|s)[A-Za-z0-9]+|e-?[0-9]+)?/g
    },
    {
        'name': 'entity.name.class',
        'pattern': /\b[A-Z]\w*/g
    },
    {
        'name': 'entity.name.function',
        'pattern': /\b[a-z]\w*:?/g
    },
    {
        'name': 'entity.name.binary',
        'pattern': /(&lt;|&gt;|&amp;|[=~\|\\\/!@*\-_+])+/g
    },
    {
        'name': 'operator.delimiter',
        'pattern': /;[\(\)\[\]\{\}]|#\[|#\(^\./g
    }
], true);

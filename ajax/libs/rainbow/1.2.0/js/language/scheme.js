/**
 * Scheme patterns
 *
 * @author Alex Queiroz <alex@artisancoder.com>
 * @version 1.0
 */
Rainbow.extend('scheme', [
    {
        /* making peace with HTML */
        'name': 'plain',
        'pattern': /&gt;|&lt;/g
    },
    {
        'name': 'comment',
        'pattern': /;.*$/gm
    },
    {
        'name': 'constant.language',
        'pattern': /#t|#f|'\(\)/g
    },
    {
        'name': 'constant.symbol',
        'pattern': /'[^()\s#]+/g
    },
    {
        'name': 'constant.number',
        'pattern': /\b\d+(?:\.\d*)?\b/g
    },
    {
        'name': 'string',
        'pattern': /".+?"/g
    },
    {
        'matches': {
            1: 'storage.function',
            2: 'variable'
        },
        'pattern': /\(\s*(define)\s+\(?(\S+)/g
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\(\s*(begin|define\-syntax|if|lambda|quasiquote|quote|set!|syntax\-rules|and|and\-let\*|case|cond|delay|do|else|or|let|let\*|let\-syntax|letrec|letrec\-syntax)(?=[\]()\s#])/g
    },
    {
        'matches': {
            1: 'entity.function'
        },
        'pattern': /\(\s*(eqv\?|eq\?|equal\?|number\?|complex\?|real\?|rational\?|integer\?|exact\?|inexact\?|=|<|>|<=|>=|zero\?|positive\?|negative\?|odd\?|even\?|max|min|\+|\-|\*|\/|abs|quotient|remainder|modulo|gcd|lcm|numerator|denominator|floor|ceiling|truncate|round|rationalize|exp|log|sin|cos|tan|asin|acos|atan|sqrt|expt|make\-rectangular|make\-polar|real\-part|imag\-part|magnitude|angle|exact\->inexact|inexact\->exact|number\->string|string\->number|not|boolean\?|pair\?|cons|car|cdr|set\-car!|set\-cdr!|caar|cadr|cdar|cddr|caaar|caadr|cadar|caddr|cdaar|cdadr|cddar|cdddr|caaaar|caaadr|caadar|caaddr|cadaar|cadadr|caddar|cadddr|cdaaar|cdaadr|cdadar|cdaddr|cddaar|cddadr|cdddar|cddddr|null\?|list\?|list|length|append|reverse|list\-tail|list\-ref|memq|memv|member|assq|assv|assoc|symbol\?|symbol\->string|string\->symbol|char\?|char=\?|char<\?|char>\?|char<=\?|char>=\?|char\-ci=\?|char\-ci<\?|char\-ci>\?|char\-ci<=\?|char\-ci>=\?|char\-alphabetic\?|char\-numeric\?|char\-whitespace\?|char\-upper\-case\?|char\-lower\-case\?|char\->integer|integer\->char|char\-upcase|char\-downcase|string\?|make\-string|string|string\-length|string\-ref|string\-set!|string=\?|string\-ci=\?|string<\?|string>\?|string<=\?|string>=\?|string\-ci<\?|string\-ci>\?|string\-ci<=\?|string\-ci>=\?|substring|string\-append|string\->list|list\->string|string\-copy|string\-fill!|vector\?|make\-vector|vector|vector\-length|vector\-ref|vector\-set!|vector\->list|list\->vector|vector\-fill!|procedure\?|apply|map|for\-each|force|call\-with\-current\-continuation|call\/cc|values|call\-with\-values|dynamic\-wind|eval|scheme\-report\-environment|null\-environment|interaction\-environment|call\-with\-input\-file|call\-with\-output\-file|input\-port\?|output\-port\?|current\-input\-port|current\-output\-port|with\-input\-from\-file|with\-output\-to\-file|open\-input\-file|open\-output\-file|close\-input\-port|close\-output\-port|read|read\-char|peek\-char|eof\-object\?|char\-ready\?|write|display|newline|write\-char|load|transcript\-on|transcript\-off)(?=[\]()\s#])/g
    }
], true);

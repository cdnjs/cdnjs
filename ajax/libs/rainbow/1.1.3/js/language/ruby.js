/**
 * Ruby patterns
 *
 * @author Matthew King
 * @version 1.0.2
 */
Rainbow.extend('ruby', [
    /**
     * Strings
     * Escaped quote (`"\""`) is unsupported.
     * String interpolation is unsupported.
     */
    {
        'name': 'string',
        'pattern': /(?=['"](.*?)['"])(?:"\1"|'\1')/g
    },
    {
        'name': 'string',
        'pattern': /%[qQ](?=(\(|\[|\{|&lt;|.)(.*?)(?:'|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)/g
    },
    /**
     * Heredocs
     * Heredocs of the form `<<'HTML' ... HTML` are unsupported.
     */
    {
        'matches': {
            1: 'string',
            2: 'string',
            3: 'string'
        },
        'pattern': /(&lt;&lt;)(\w+).*?$([\s\S]*?^\2)/gm
    },
    {
        'matches': {
            1: 'string',
            2: 'string',
            3: 'string'
        },
        'pattern': /(&lt;&lt;\-)(\w+).*?$([\s\S]*?\2)/gm
    },
    /**
     * Regular expressions
     * Escaped delimiter (`/\//`) is unsupported.
     */
    {
        'name': 'regex',
        'matches': {
            1: 'regex.open',
            2: {
                'name': 'constant.regex.escape',
                'pattern': /\\(.){1}/g
            },
            3: 'regex.close',
            4: 'regex.modifier'
        },
        'pattern': /(\/)(.*?)(\/)([a-z]*)/g
    },
    {
        'name': 'constant.regex',
        'matches': {
            1: 'support.regex.open',
            2: {
                'name': 'constant.regex.escape',
                'pattern': /\\(.){1}/g
            },
            3: 'support.regex.close',
            4: 'support.regex.modifier'
        },
        'pattern': /%r(?=(\(|\[|\{|&lt;|.)(.*?)('|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)([a-z]*)/g
    },
    {
        'name': 'comment',
        'pattern': /^=begin[\s\S]*?^=end|\#.*?$/gm
    },
    /**
     * Symbols
     */
    {
        'matches': {
            1: 'constant'
        },
        'pattern': /(\w+:)[^:]/g
    },
    {
        'matches': {
            1: 'constant'
        },
        'pattern': /[^:](:(?:\w+|(?=['"](.*?)['"])(?:"\2"|'\2')))/g
    },
    {
        'name': 'integer',
        'pattern': /\b(0x[\da-f]+|\d+)\b/g
    },
    {
        'name': 'constant',
        'pattern': /\b[A-Z0-9_]{2,}\b/g
    },
    {
        'matches': {
            1: 'keyword.class',
            2: 'meta.class-name',
            4: 'meta.parent.class-name'
        },
        'pattern': /(class|module)\s+(\w+)(<\s+(\w+))?/g
    },
    /**
     * Class names begin with an upper-case letter
     */
    {
        'name': 'meta.class-name',
        'pattern': /\b[A-Z]\w*[a-z]\w*\b/g
    },
    {
        'name': 'variable.global',
        'pattern': /\$(\w+)\b/g
    },
    {
        'name': 'variable.class',
        'pattern': /@@(\w+)\b/g
    },
    {
        'name': 'variable.instance',
        'pattern': /@(\w+)\b/g
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(alias|and|begin|break|case|class|continue|def|defined|do|else|elsif|end|ensure|extend|false|for|if|in|include|module|next|nil|not|private|or|raise|redo|require|rescue|retry|return|self|super|then|true|undef|unless|until|when|while|yield)(?=\(|\b)/g
    }
], true);

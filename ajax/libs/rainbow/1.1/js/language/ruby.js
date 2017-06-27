/**
 * Ruby patterns
 *
 * @author Matthew King
 * @version 1.0
 */
window.Rainbow = window.Rainbow || {};

Rainbow.extend('ruby', [
    /**
     * Strings include heredocs
     * Heredocs of the form `<<'HTML' ... HTML` are not supported.
     * Strings of the form `%Q{...}` are not supported.
     * String interpolation is not supported.
     */
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=/g
            },
            2: 'string'
        },
        'pattern': /(\(|\s|\[|\=|\=&gt;)(&lt;&lt;\-(\S+)[\s\S]*?(\3)|&lt;&lt;(\S+)[\s\S]*?(\5)|('|")[\s\S]*?(\7))/gm
    },
    {
        'name': 'comment',
        'pattern': /^=begin[\s\S]*?^=end|\#[\s\S]*?$/gm
    },
    {
        'name': 'integer',
        'pattern': /\b(0x[\da-f]+|\d+)\b/g
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
        'name': 'constant',
        'pattern': /\b[A-Z0-9_]{2,}\b/g
    },
    /**
     * Symbols
     */
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=/g
            },
            2: 'constant'
        },
        'pattern': /(\(|\s|\[|\=)(:('|")[\s\S]*?(\3)|:\w+)/gm
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(alias|and|begin|break|case|class|continue|def|defined|do|else|elsif|end|ensure|extend|false|for|if|in|include|module|next|nil|not|or|redo|require|rescue|retry|return|self|super|then|true|undef|unless|until|when|while|yield)(?=\(|\b)/g
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
        'matches': {
            1: 'keyword',
            2: 'meta.function'
        },
        'pattern': /(def)\s(.*?)(?=\()/g
    }
], true);

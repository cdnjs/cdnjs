/**
 * Coffeescript patterns
 *
 * @author Craig Campbell
 * @version 1.0
 */
Rainbow.extend('coffeescript', [
    {
        'name': 'comment.block',
        'pattern': /(\#{3})[\s\S]*\1/gm
    },
    {
        'name': 'string.block',
        'pattern': /('{3}|"{3})[\s\S]*\1/gm
    },

    /**
     * multiline regex with comments
     */
    {
        'name': 'string.regex',
        'matches': {
            2: {
                'name': 'comment',
                'pattern': /\#(.*?)\n/g
            }
        },
        'pattern': /(\/{3})([\s\S]*)\1/gm
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(in|when|is|isnt|of|not|unless|until|super)(?=\b)/gi
    },
    {
        'name': 'keyword.operator',
        'pattern': /\?/g
    },
    {
        'name': 'constant.language',
        'pattern': /\b(undefined|yes|on|no|off)\b/g
    },
    {
        'name': 'keyword.variable.coffee',
        'pattern': /@(\w+)/gi
    },

    /**
     * reset global keywards from generic
     */
    {
        'name': 'reset',
        'pattern': /object|class|print/gi
    },

    /**
     * named function
     */
    {
        'matches' : {
            1: 'entity.name.function',
            2: 'keyword.operator',
            3: {
                    'name': 'function.argument.coffee',
                    'pattern': /([\@\w]+)/g
            },
            4: 'keyword.function'
        },
        'pattern': /(\w+)\s{0,}(=|:)\s{0,}\((.*?)((-|=)&gt;)/gi
    },

    /**
     * anonymous function
     */
    {
        'matches': {
            1: {
                    'name': 'function.argument.coffee',
                    'pattern': /([\@\w]+)/g
            },
            2: 'keyword.function'
        },
        'pattern': /\s\((.*?)\)\s{0,}((-|=)&gt;)/gi
    },

    /**
     * direct function no arguments
     */
    {
        'matches' : {
            1: 'entity.name.function',
            2: 'keyword.operator',
            3: 'keyword.function'
        },
        'pattern': /(\w+)\s{0,}(=|:)\s{0,}((-|=)&gt;)/gi
    },

    /**
     * class definitions
     */
    {
        'matches': {
            1: 'storage.class',
            2: 'entity.name.class',
            3: 'storage.modifier.extends',
            4: 'entity.other.inherited-class'
        },
        'pattern': /\b(class)\s(\w+)(\sextends\s)?([\w\\]*)?\b/g
    },

    /**
     * object instantiation
     */
    {
        'matches': {
            1: 'keyword.new',
            2: {
                'name': 'support.class',
                'pattern': /\w+/g
            }
        },
        'pattern': /\b(new)\s(.*?)(?=\s)/g
    }
]);

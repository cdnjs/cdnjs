/**
 * CSS patterns
 *
 * @author Craig Campbell
 * @version 1.0.5
 */
Rainbow.extend('css', [
    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\//gm
    },
    {
        'name': 'constant.hex-color',
        'pattern': /#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})(?=;|\s)/g
    },
    {
        'matches': {
            1: 'integer',
            2: 'keyword.unit'
        },
        'pattern': /(\d+)(px|cm|s|%)?/g
    },
    {
        'name': 'string',
        'pattern': /('|")(.*?)\1/g
    },
    {
        'name': 'support.css-property',
        'matches': {
            1: 'support.vendor-prefix'
        },
        'pattern': /(-o-|-moz-|-webkit-|-ms-)?[\w-]+(?=\s?:)(?!.*\{)/g
    },
    {
        'matches': {
            1: [
                {
                    'name': 'meta.sass',
                    'pattern': /&amp;/g
                },
                {
                    'name': 'direct-descendant',
                    'pattern': /&gt;/g
                },
                {
                    'name': 'meta.class',
                    'pattern': /\.[\w\-_]+/g
                },
                {
                    'name': 'meta.id',
                    'pattern': /\#[\w\-_]+/g
                },
                {
                    'name': 'meta.pseudo',
                    'pattern': /:[\w\-_]+/g
                },
                {
                    'name': 'meta.tag',
                    'pattern': /\w+/g
                }
            ]
        },
        'pattern': /([\w\ ,:\.\#\&\;\-_]+)(?=.*\{)/g
    },
    {
        'matches': {
            2: 'support.vendor-prefix',
            3: 'support.css-value'
        },
        'pattern': /(:|,)\s?(-o-|-moz-|-webkit-|-ms-)?([a-zA-Z-]*)(?=\b)(?!.*\{)/g
    },
    {
        'matches': {
            1: {
                'name': 'meta.style-tag',
                'pattern': /\w+/g
            }
        },
        'pattern': /&lt;\/?(.*?)(?=\=|&gt;)/g
    }
], true);

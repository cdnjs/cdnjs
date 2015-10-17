/**
 * Python patterns
 *
 * @author Craig Campbell
 * @version 1.0
 */
window.Rainbow = window.Rainbow || {};

Rainbow.extend('python', [
    /**
     * Python doesn't have constants so we should reset this pattern
     */
    {
        'name': 'variable',
        'pattern': /\b[A-Z0-9_]{2,}\b/g
    },

    /**
     * don't highlight self as a keyword
     */
    {
        'name': 'variable.self',
        'pattern': /self/g
    },
    {
        'name': 'constant.language',
        'pattern': /None|True|False/g
    },
    {
        'name': 'support.object',
        'pattern': /object/g
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(not|self|in|from)(?=\(|\b)/g
    },
    {
        'matches': {
            1: 'keyword.class',
            2: 'meta.class-name',
            3: 'meta.parent.class-name'
        },
        'pattern': /(class)\s+(\w+?)\((\w+?)\)/g
    },
    {
        'matches': {
            1: 'keyword',
            2: 'support.magic'
        },
        'pattern': /(def)\s(__.*?)(?=\()/g
    },
    {
        'matches': {
            1: 'keyword',
            2: 'meta.function'
        },
        'pattern': /(def)\s(.*?)(?=\()/g
    }
]);

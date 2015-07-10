/**
 * Python patterns
 *
 * @author Craig Campbell
 * @version 1.0.4
 */
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
        'pattern': /\b(pass|lambda|with|is|not|in|from|elif)(?=\(|\b)/g
    },
    {
        'matches': {
            1: 'storage.class',
            2: 'entity.name.class',
            3: 'entity.other.inherited-class'
        },
        'pattern': /(class)\s+(\w+)\((\w+?)\)/g
    },
    {
        'matches': {
            1: 'storage.function',
            2: 'support.magic'
        },
        'pattern': /(def)\s+(__\w+)(?=\()/g
    },
    {
        'matches': {
            1: 'storage.function',
            2: 'entity.name.function'
        },
        'pattern': /(def)\s+(\w+)(?=\()/g
    },
    {
        'name': 'entity.name.function.decorator',
        'pattern': /@(\w+)/g
    },
    {
        'name': 'comment.docstring',
        'pattern': /('{3}|"{3})[\s\S]*\1/gm
    }
]);

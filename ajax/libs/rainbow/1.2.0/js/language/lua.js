/**
 * Lua patterns
 *
 * @author Javier Aguirre
 * @version 1.0.1
 */
Rainbow.extend('lua', [
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=/g
            },
            2: {
                'name': 'string',
                'matches': {
                    'name': 'constant.character.escape',
                    'pattern': /\\('|"){1}/g
                }
            }
        },
        'pattern': /(\(|\s|\[|\=)(('|")([^\\\1]|\\.)*?(\3))/gm
    },
    {
        'name': 'comment',
        'pattern': /\-{2}\[{2}\-{2}[\s\S]*?\-{2}\]{2}\-{2}|(\-{2})[\s\S]*?$/gm
    },
    {
        'name': 'constant.numeric',
        'pattern': /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b((a|e)nd|in|repeat|break|local|return|do|for|then|else(if)?|function|not|if|or|until|while)(?=\(|\b)/gi
    },
    {
        'name': 'constant.language',
        'pattern': /true|false|nil/g
    },
    {
        'name': 'keyword.operator',
        'pattern': /\+|\!|\-|&(gt|lt|amp);|\||\*|\=|#|\.{2}/g
    },
    {
        'matches': {
            1: 'storage.function',
            2: 'entity.name.function'
        },
        'pattern': /(function)\s+(\w+[\:|\.]?\w+?)(?=\()/g
    },
    {
        'matches': {
            1: 'support.function'
        },
        'pattern': /\b(print|require|module|\w+\.\w+)(?=\()/g
    }
], true);

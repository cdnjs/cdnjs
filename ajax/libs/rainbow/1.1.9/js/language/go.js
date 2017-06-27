/**
 * GO Language
 *
 * @author Javier Aguirre
 * @version 1.0
 */
Rainbow.extend('go', [
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
                    'pattern': /\\(`|"){1}/g
                }
            }
        },
        'pattern': /(\(|\s|\[|\=|:)((`|")([^\\\1]|\\.)*?(\3))/gm
    },
    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\/|(\/\/)[\s\S]*?$/gm
    },
    {
        'name': 'constant.numeric',
        'pattern': /\b(\d+(\.\d+)?(e(\+|\-)?\d+)?(f|d)?|0x[\da-f]+)\b/gi
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(break|c(ase|onst|ontinue)|d(efault|efer)|else|fallthrough|for|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)(?=\(|\b)/gi
    },
    {
        'name': 'constant.language',
        'pattern': /true|false|null|string|byte|rune|u?int(8|16|32|64)?|float(32|64)|complex(64|128)/g
    },
    {
        'name': 'keyword.operator',
        'pattern': /\+|\!|\-|&(gt|lt|amp);|\||\*|\:?=/g
    },
    {
        'matches': {
            1: 'function.call'
        },
        'pattern': /(\w+?)(?=\()/g
    },
    {
        'matches': {
            1: 'storage.function',
            2: 'entity.name.function'
        },
        'pattern': /(func)\s(.*?)(?=\()/g
    }
]);

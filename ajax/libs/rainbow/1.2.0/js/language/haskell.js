/**
 * Haskell patterns
 *
 * @author Bruno Dias
 * @version 1.0.1
 */
//TODO: {-# ... #-} stuff...
Rainbow.extend('haskell', [
	///- Comments
	{
		'name': 'comment',
		'pattern': /\{\-\-[\s\S(\w+)]+[\-\-][\}$]/gm
		// /\{\-{2}[\s\S(.*)]+[\-\-][\}$]/gm [multiple lines]
	}, 
	{
		'name': 'comment',
		'pattern': /\-\-(.*)/g
		// /\-\-\s(.+)$/gm [single]
	},
	///- End Comments
	
	///- Namespace (module)
	{
		'matches': {
			1: 'keyword',
			2: 'support.namespace'
		},
		'pattern': /\b(module)\s(\w+)\s[\(]?(\w+)?[\)?]\swhere/g
	},
	///- End Namespace (module)
	
	///- Keywords and Operators
	{
		'name': 'keyword.operator',
		'pattern': /\+|\!|\-|&(gt|lt|amp);|\/\=|\||\@|\:|\.|\+{2}|\:|\*|\=|#|\.{2}|(\\)[a-zA-Z_]/g
	},
	{
		'name': 'keyword',
		'pattern': /\b(case|class|foreign|hiding|qualified|data|family|default|deriving|do|else|if|import|in|infix|infixl|infixr|instance|let|in|otherwise|module|newtype|of|then|type|where)\b/g
	},
	{
		'name': 'keyword',
		'pattern': /[\`][a-zA-Z_']*?[\`]/g
	},
	///- End Keywords and Operators


	///- Infix|Infixr|Infixl
	{
		'matches': {
			1: 'keyword',
			2: 'keyword.operator'
		},
		'pattern': /\b(infix|infixr|infixl)+\s\d+\s(\w+)*/g
	},
	///- End Infix|Infixr|Infixl
	
	{
		'name': 'entity.class',
		'pattern': /\b([A-Z][A-Za-z0-9_']*)/g
	},

	// From c.js
	{
		'name': 'meta.preprocessor',
		'matches': {
			1: [
				{
					'matches': {
						1: 'keyword.define',
						2: 'entity.name'
					},
					'pattern': /(\w+)\s(\w+)\b/g
				},
				{
					'name': 'keyword.define',
					'pattern': /endif/g
				},
				{
					'name': 'constant.numeric',
					'pattern': /\d+/g
				},
				{
					'matches': {
						1: 'keyword.include',
						2: 'string'
					},
				 'pattern': /(include)\s(.*?)$/g
				}
			]
		},
		'pattern': /^\#([\S\s]*?)$/gm
	}
]); 

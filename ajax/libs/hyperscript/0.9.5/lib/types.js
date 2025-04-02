/*********************************************************
 * This file defines many of the types used in hyperscript.
 * There should be NO CODE in this file, only comments
 * that are removed during the uglify/minify step.
 *********************************************************/

/**
 * THIS IS A WORK IN PROGRESS.  THESE DEFINITIONS ARE NOT ACCURATE OR FINAL.
 *
 * PUBLIC API
 * @typedef HyperscriptObject
 * @property {HyperscriptInternalsObject} internals
 * @property {(keyword:string, definition:GrammarDefinition) => void | GrammarElement } addFeature
 * @property {(keyword:string, definition:GrammarDefinition) => void | GrammarElement } addCommand
 * @property {(keyword:string, definition:GrammarDefinition) => void | GrammarElement } addLeafExpression
 * @property {(keyword:string, definition:GrammarDefinition) => void | GrammarElement } addIndirectExpression
 * @property {(str:string, ctx?:Object, args?:Object) => *} evaluate
 * @property {(str:string) => *} parse
 * @property {(elt:HTMLElement) => void} processNode
 * @property {HyperscriptConfigObject} config
 *
 * @typedef HyperscriptInternalsObject
 * @property {LexerObject} lexer
 * @property {ParserObject} parser
 * @property {RuntimeObject} runtime
 *
 * @typedef HyperscriptConfigObject
 * @property {string} attributes
 * @property {string} defaultTransition
 * @property {HyperscriptConversionsObject} conversions
 * @property {string} [disableSelector]
 * @property {string} defaultHideShowStrategy
 * @property {Object<string, (Element) => void>} hideShowStrategies
 *
 * @typedef {Object<string,(val:any) => any>} HyperscriptConversionsObject
 * @property {any[(name:string, value:any) => any]} dynamicResolvers
 *
 *
 * TOKENS *************************
 *
 * @typedef LexerObject
 * @property {(string:string, noDollarStart?:boolean) => TokensObject} tokenize
 * @property {(tokens:Token[], consumed:Token[], source:string) => TokensObject} makeTokensObject
 *
 * @typedef TokensObject
 * @property {(str: string) => void} pushFollow
 * @property {() => void} popFollow
 * @property {() => string[]} clearFollow
 * @property {(f: string[]) => void} restoreFollow
 * @property {(type1:string, type2?:string, type3?:string, type4?:string) => Token | void} matchTokenType
 * @property {(token:string) => Token | void} matchToken
 * @property {(...token:string[]) => Token | void} matchAnyToken
 * @property {(...token:string[]) => Token | void} matchAnyOpToken
 * @property {(token:string) => Token | void} matchOpToken
 * @property {(type1:string, type2?:string, type3?:string, type4?:string) => Token} requireTokenType
 * @property {(token:string) => Token} requireOpToken
 * @property {(token:string) => Token} requireToken
 * @property {() => Token} consumeToken
 * @property {Token[]} list
 * @property {Token[]} consumed
 * @property {string} source
 * @property {() => boolean} hasMore
 * @property {() => Token} currentToken
 * @property {() => Token | null} lastMatch
 * @property {(n:number, dontIgnoreWhitespace?:boolean) => Token} token
 * @property {(value:string, type?:string) => Token[]} consumeUntil
 * @property {() => Token[]} consumeUntilWhitespace
 * @property {() => string} lastWhitespace
 * @property {() => string} sourceFor
 * @property {() => string} lineFor
 *
 * @typedef {object} Token
 * @property {string} [type]
 * @property {string} [value]
 * @property {number} [start]
 * @property {number} [end]
 * @property {number} [column]
 * @property {number} [line]
 * @property {boolean} [op] `true` if this token represents an operator
 * @property {boolean} [template] `true` if this token is a template, for class refs, id refs, strings
 *
 *
 * PARSER *************************
 *
 * @typedef ParserObject
 * @property {(elt:GrammarElement | void, parent:GrammarElement) => void} setParent
 * @property {(type:string, tokens:TokensObject, message?:string, root?:any) => GrammarElement} requireElement
 * @property {(type:string, tokens:TokensObject, root?:any) => GrammarElement | void} parseElement
 * @property {(token:Token) => GrammarDefinition} featureStart
 * @property {(token:Token) => GrammarDefinition} commandStart
 * @property {(token:Token) => boolean} commandBoundary
 * @property {(types:string[], tokens:TokensObject) => GrammarElement} parseAnyOf
 * @property {(tokens:TokensObject) => GrammarElement | void} parseHyperScript
 * @property {(tokens:TokensObject, message?:string) => void} raiseParseError
 * @property {(name:string, definition:GrammarDefinition) => void} addGrammarElement
 * @property {(name:string, definition:GrammarDefinition) => void} addCommand
 * @property {(name:string, definition:GrammarDefinition) => void} addFeature
 * @property {(name:string, definition:GrammarDefinition) => void} addLeafExpression
 * @property {(name:string, definition:GrammarDefinition) => void} addIndirectExpression
 * @property {(tokens:TokensObject) => (string | GrammarElement)[] } parseStringTemplate
 * @property {(commandList: GrammarElement) => void} ensureTerminated
 * @property {boolean} [possessivesDisabled]
 *
 *
 * @typedef {_GrammarElement} GrammarElement
 * 
 * @callback GrammarDefinition
 * @param {ParserObject} parser
 * @param {RuntimeObject} runtime
 * @param {TokensObject} tokens
 * @param {*} root
 * @returns {GrammarElement | void}
 *
 * RUNTIME **********************
 *
 * @typedef RuntimeObject
 * @property {(value:any, typeString:string, nullOk?:boolean) => boolean } typeCheck
 * @property {(value:any, func:(item:any) => void) => void } forEach
 * @property {(value:any, func:(item:any) => void) => void } implicitLoop
 * @property {(elt:Element, eventName:string, detail?:{}, sender?:Element) => boolean } triggerEvent
 * @property {(elt:HTMLElement, selector:string) => boolean } matchesSelector
 * @property {(elt:HTMLElement) => string | null } getScript
 * @property {(elt:HTMLElement) => void } processNode
 * @property {(src:string, ctx?:Context) => any } evaluate
 * @property {(src:string) => GrammarElement } parse
 * @property {() => string } getScriptSelector
 * @property {(str:string, ctx:Context, type?: SymbolScope) => any } resolveSymbol
 * @property {(str:string, ctx:Context, type: SymbolScope, value: any) => void} setSymbol
 * @property {(owner:*, feature:*, hyperscriptTarget:*, event:*) => Context } makeContext
 * @property {(command:GrammarElement, ctx:Context) => GrammarElement | undefined } findNext
 * @property {(parseElement:*, ctx:Context) => * } unifiedEval
 * @property {(elt:GrammarElement, ctx?:Context) => any} evaluateNoPromise
 * @property {(value:any, type:string) => any } convertValue
 * @property {(command: GrammarElement, ctx:Context) => void } unifiedExec
 * @property {(root:Object<string,any>, property:string) => string } resolveAttribute
 * @property {(root:Object<string,any>, property:string) => any } resolveProperty
 * @property {(elt:Element, namespace:string[], name:string, value:any) => void } assignToNamespace
 * @property {(ctx: Context, thrown: any) => void } registerHyperTrace
 * @property {(ctx: Context, thrown: any) => any } getHyperTrace
 * @property {(elt:HTMLElement) => Object } getInternalData
 * @property {(elt: Element, onFeature: GrammarElement) => EventQueue} getEventQueueFor
 * @property {(str:string) => string } escapeSelector
 * @property {(value:any, elt:*) => void } nullCheck
 * @property {(value:any) => boolean} isEmpty
 * @property {(node: Node) => Document | ShadowRoot} getRootNode
 * @property {string | null} hyperscriptUrl
 * @property {(root: Object, property: string) => string} resolveComputedStyle
 * @property {(root: Object, property: string) => string} resolveStyle
 * @property {(any) => boolean} doesExist
 * @property {Object} HALT
 *
 * @typedef {_Context} Context
 * 
 * @typedef {_ContextMetaData} ContextMetaData
 *
 * @typedef {'local'|'element'|'global'|'default'} SymbolScope
 *
 * @typedef {_ConversionMap} ConversionMap
 *
 * @typedef {(value:any) => any} ConversionFunction
 * @typedef {(conversionName:string, value:any) => any} DynamicConversionFunction
 * 
 * @typedef {{queue:Array, executing:boolean}} EventQueue
 *
 */

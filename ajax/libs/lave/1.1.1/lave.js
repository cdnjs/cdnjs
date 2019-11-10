'use strict'

export default function(object, options) {
  if (!options) options = {}

  var functions = new Set
  var placeholder = Math.random().toString(36).replace(/../, '_')
  var functionPattern = RegExp(`${placeholder}(\\d+)`, 'g')

  let cache = new Globals
  let statements = []

  let expression = getExpression(object)
  statements.push({type: 'ExpressionStatement', expression})

  let declarations = getDeclarations(statements)
  if (declarations.length) statements.unshift({
    type: 'VariableDeclaration',
    declarations,
    kind: 'var'
  })

  switch (options.format || 'expression') {
    case 'expression':
      break

    case 'module':
      statements.push({
        type: 'ExportDefaultDeclaration',
        declaration: statements.pop().expression
      })
      break

    case 'function':
      statements.push({
        type: 'ReturnStatement',
        argument: statements.pop().expression
      })

      statements = [{
        type: 'ExpressionStatement',
        expression: {
          type: 'FunctionExpression',
          params: [],
          body: {
            type: 'BlockStatement',
            body: statements
          }
        }
      }]

      break

    default:
      throw new Error(`Unsupported format: ${options.format}`)
  }

  let program = {
    type: 'Program',
    body: statements
  }

  if (!options.generate) return program

  let code = generate(program)
  return code.replace(functionPattern, (_, i) => {
    return Array.from(functions)[i].toString().replace(/^function |^/, 'function ')
  })

  function getExpression(value) {
    if (cache.has(value)) return cache.get(value)

    let node = new Object
    cache.set(value, node)

    if (Object(value) !== value) {
      if (value < 0) {
        node.type = 'UnaryExpression'
        node.operator = '-'
        node.argument = getExpression(Math.abs(value))
        return node
      }

      node.value = value
      node.type = 'Literal'
      return node
    }

    let prototype = Object.getPrototypeOf(value)
    let propertyNames = Object.getOwnPropertyNames(value)
    let properties = new Map(propertyNames.map(name =>
      [name, Object.getOwnPropertyDescriptor(value, name)]
    ))

    switch (prototype) {
      case String.prototype:
        for (let pair of properties) {
          properties.delete(pair[0])
          if (pair[0] == 'length') break
        } // fallthrough

      case Number.prototype:
      case Boolean.prototype:
        node.type = 'CallExpression'
        node.callee = getExpression(Object)
        node.arguments = [getExpression(value.valueOf())]
        break

      case RegExp.prototype:
        properties.delete('source')
        properties.delete('global')
        properties.delete('ignoreCase')
        properties.delete('multiline')
        properties.delete('lastIndex')

        node.type = 'Literal'
        node.value = value
        break

      case Date.prototype:
        node.type = 'NewExpression'
        node.callee = getExpression(Date)
        node.arguments = [getExpression(value.valueOf())]
        break

      case Buffer.prototype:
        for (let pair of properties) {
          properties.delete(pair[0])
          if (pair[0] == 'length') break
        }

        node.type = 'CallExpression'
        node.callee = getExpression(Buffer)
        node.arguments = [
          getExpression(value.toString('base64')),
          getExpression('base64')
        ]
        break

      case Error.prototype:
      case EvalError.prototype:
      case RangeError.prototype:
      case ReferenceError.prototype:
      case SyntaxError.prototype:
      case TypeError.prototype:
      case URIError.prototype:
        properties.delete('message')
        properties.delete('stack')
        node.type = 'NewExpression'
        node.callee = getExpression(value.constructor)
        node.arguments = [getExpression(value.message)]
        break

      case Function.prototype:
        if (isNativeFunction(value)) {
          throw new Error('Native code cannot be serialized.')
        }

        properties.delete('length')
        properties.delete('name')
        properties.delete('arguments')
        properties.delete('caller')
        if (value.prototype && Object.getOwnPropertyNames(value.prototype).length < 2) {
          properties.delete('prototype')
        }

        if (options.generate) {
          functions.add(value)
          let index = Array.from(functions).indexOf(value)
          node.type = 'Identifier'
          node.name = placeholder + index
          break
        }

        node.type = 'CallExpression'
        node.callee = getExpression(eval)
        node.arguments = [getExpression(`(${value.toString()})`)]
        break

      case Array.prototype:
        node.elements = []

        let length = properties.get('length').value
        let lastIndex = String(length - 1)
        if (!length || properties.has(lastIndex)) properties.delete('length')

        for (let property of properties) {
          if (property[0] != node.elements.length) break

          let element = getExpression(property[1].value)
          if (element.type) {
            node.elements.push(element)
            properties.delete(property[0])
          }

          else node.elements.push(null)
        }

        node.type = 'ArrayExpression'
        break

      case Set.prototype:
      case WeakSet.prototype:
      case Map.prototype:
      case WeakMap.prototype:
        node.type = 'NewExpression'
        node.callee = getExpression(value.constructor)
        node.arguments = [getExpression(Array.from(value))]
        break

      case Object.prototype:
        node.type = 'ObjectExpression'
        node.properties = Array.from(properties).map(pair => {
          properties.delete(pair[0])

          return {
            type: 'Property',
            key: getExpression(pair[0]),
            value: getExpression(pair[1].value)
          }
        })
        break

      default:
        node.type = 'CallExpression'
        node.callee = getExpression(Object.create)
        node.arguments = [getExpression(prototype)]
        break

    }

    for (let property of properties) {
      statements.push({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: node,
            computed: !isNaN(property[0]),
            property: {type:
              'Identifier',
              name: property[0]
            }
          },
          right: getExpression(property[1].value)
        }
      })
    }

    return node
  }

  function getDeclarations(statements) {
    let sites = function crawl(sites, object, key, value) {
      if (Object(value) !== value) return
      if (value.type == 'Identifier') return
      if (value.type == 'Literal') return

      let valueSites = sites.get(value)
      if (valueSites) return valueSites.push({object, key})

      sites.set(value, [{object, key}])

      for (let property in value) {
        crawl(sites, value, property, value[property])
      }

      return sites
    }(new Map, {'': statements}, '', statements)

    let declarations = []
    for (let entry of sites) {
      if (entry[1].length < 2) continue

      let id = {type: 'Identifier'}
      for (let site of entry[1]) site.object[site.key] = id

      declarations.push({
        type: 'VariableDeclarator',
        id,
        init: entry[0]
      })
    }

    declarations.sort((a, b) => has(a.init, b.id) - has(b.init, a.id))

    let ids = new Identifiers
    for (let declaration of declarations) declaration.id.name = ids.next()

    return declarations
  }
}

class Identifiers {
  constructor() { this.id = 0 }
  next() {
    let id = (this.id++).toString(36)
    try { Function(`var ${id}`); return id }
    catch (e) { return this.next() }
  }
}

function has(parent, child) {
  if (parent === child) return true

  if (Object(parent) !== parent) return false

  for (let key in parent) {
    if (has(parent[key], child)) return true
  }

  return false
}

let nativeCode = String(Object).match(/{.*/)[0]
function isNativeFunction(fn) {
  let source = String(fn)
  let index = source.indexOf(nativeCode)
  if (index < 0) return false

  let length = index + nativeCode.length
  return length === source.length
}

function Globals() {
  let globals = new Map([
    [NaN, {type: 'Identifier', name: 'NaN'}],
    [null, {type: 'Literal', value: null}],
    [undefined, {type: 'Identifier', name: 'undefined'}],
    [Infinity, {type: 'Identifier', name: 'Infinity'}],
    [(0,eval)('this'), {
      type: 'CallExpression',
      callee: {
        type: 'SequenceExpression',
        expressions: [
          {type: 'Literal', value: 0},
          {type: 'Identifier', name: 'eval'}
        ]
      },
      "arguments": [{type: 'Literal', value: 'this'}]
    }]
  ])

  return crawl(globals, (0, eval)('this'))
}

function crawl(map, value, object) {
  let names = Object.getOwnPropertyNames(value)
  let properties = []

  for (let name of names) {
    let descriptor = Object.getOwnPropertyDescriptor(value, name)

    if (Object(descriptor.value) !== descriptor.value) continue
    if (map.has(descriptor.value)) continue

    let property = {type: 'Identifier', name}
    if (object) property = {type: 'MemberExpression', object, property}

    map.set(descriptor.value, property)

    properties.push({value: descriptor.value, object: property})
  }

  for (let property of properties) {
    crawl(map, property.value, property.object)
  }

  return map
}

var cssobj = (function () {
  'use strict';

  // helper functions for cssobj

  // set default option (not deeply)
  function defaults(options, defaultOption) {
    options = options || {}
    for (var i in defaultOption) {
      if (!(i in options)) options[i] = defaultOption[i]
    }
    return options
  }

  // convert js prop into css prop (dashified)
  function dashify(str) {
    return str.replace(/[A-Z]/g, function(m) {
      return '-' + m.toLowerCase()
    })
  }

  // capitalize str
  function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
  }

  // random string, should used across all cssobj plugins
  var random = (function () {
    var count = 0
    return function () {
      count++
      return '_' + Math.floor(Math.random() * Math.pow(2, 32)).toString(36) + count + '_'
    }
  })()

  // extend obj from source, if it's no key in obj, create one
  function extendObj (obj, key, source) {
    obj[key] = obj[key] || {}
    for (var k in source) obj[key][k] = source[k]
    return obj[key]
  }

  // ensure obj[k] as array, then push v into it
  function arrayKV (obj, k, v, reverse, unique) {
    obj[k] = k in obj ? [].concat(obj[k]) : []
    if(unique && obj[k].indexOf(v)>-1) return
    reverse ? obj[k].unshift(v) : obj[k].push(v)
  }

  // replace find in str, with rep function result
  function strSugar (str, find, rep) {
    return str.replace(
      new RegExp('\\\\?(' + find + ')', 'g'),
      function (m, z) {
        return m == z ? rep(z) : z
      }
    )
  }

  // get parents array from node (when it's passed the test)
  function getParents (node, test, key, childrenKey, parentKey) {
    var p = node, path = []
    while(p) {
      if (test(p)) {
        if(childrenKey) path.forEach(function(v) {
          arrayKV(p, childrenKey, v, false, true)
        })
        if(path[0] && parentKey){
          path[0][parentKey] = p
        }
        path.unshift(p)
      }
      p = p.parent
    }
    return path.map(function(p){return key?p[key]:p })
  }


  // split selector etc. aware of css attributes
  function splitComma (str) {
    for (var c, i = 0, n = 0, prev = 0, d = []; c = str.charAt(i); i++) {
      if (c == '(' || c == '[') n++
      if (c == ')' || c == ']') n--
      if (!n && c == ',') d.push(str.substring(prev, i)), prev = i + 1
    }
    return d.concat(str.substring(prev))
  }

  // checking for valid css value
  function isValidCSSValue (val) {
    return val || val === 0
  }

  // using var as iteral to help optimize
  var KEY_ID = '$id'
  var KEY_ORDER = '$order'

  var TYPE_GROUP = 'group'

  // helper function
  var keys = Object.keys

  // type check helpers
  var type = {}.toString
  var ARRAY = type.call([])
  var OBJECT = type.call({})

  // only array, object now treated as iterable
  function isIterable (v) {
    return type.call(v) == OBJECT || type.call(v) == ARRAY
  }

  // regexp constants
  var reGroupRule = /^@(media|document|supports|page|keyframes)/i
  var reAtRule = /^\s*@/g
  /**
   * convert simple Object into node data
   *
   input data format:
   {"a":{"b":{"c":{"":[{color:1}]}}}, "abc":123, '@import':[2,3,4], '@media (min-width:320px)':{ d:{ok:1} }}
   *        1. every key is folder node
   *        2. "":[{rule1}, {rule2}] will split into several rules
   *        3. & will replaced by parent, \\& will escape
   *        4. all prop should be in dom.style camelCase
   *
   * @param {object|array} d - simple object data, or array
   * @param {object} result - the reulst object to store options and root node
   * @param {object} [previousNode] - also act as parent for next node
   * @param {boolean} init whether it's the root call
   * @returns {object} node data object
   */
  function parseObj (d, result, node, init) {
    if (init) {
      result.nodes = []
      result.ref = {}
      if (node) result.diff = {}
    }

    node = node || {}

    if (type.call(d) == ARRAY) {
      return d.map(function (v, i) {
        return parseObj(v, result, node[i] || {parent: node, src: d, index: i, obj: d[i]})
      })
    }
    if (type.call(d) == OBJECT) {
      var children = node.children = node.children || {}
      var prevVal = node.prevVal = node.lastVal
      node.lastVal = {}
      node.prop = {}
      node.diff = {}
      if (d[KEY_ID]) result.ref[d[KEY_ID]] = node
      var order = d[KEY_ORDER] | 0
      var funcArr = []

      // only there's no selText, getSel
      if(!('selText' in node)) getSel(node, result)

      for (var k in d) {
        if (!d.hasOwnProperty(k)) continue
        if (!isIterable(d[k]) || type.call(d[k]) == ARRAY && !isIterable(d[k][0])) {
          if (k.charAt(0) == '$') continue
          var r = function (_k) {
            parseProp(node, d, _k, result)
          }
          order
            ? funcArr.push([r, k])
            : r(k)
        } else {
          var haveOldChild = k in children
          var newNode = extendObj(children, k, {parent: node, src: d, key: k, obj: d[k]})
          // don't overwrite selPart for previous node
          newNode.selPart = newNode.selPart || splitComma(k)
          var n = children[k] = parseObj(d[k], result, newNode)
          // it's new added node
          if (prevVal && !haveOldChild) arrayKV(result.diff, 'added', n)
        }
      }

      // when it's second time visit node
      if (prevVal) {
        // children removed
        for (k in children) {
          if (!(k in d)) {
            arrayKV(result.diff, 'removed', children[k])
            delete children[k]
          }
        }

        // prop changed
        var diffProp = function () {
          var newKeys = keys(node.lastVal)
          var removed = keys(prevVal).filter(function (x) { return newKeys.indexOf(x) < 0 })
          if (removed.length) node.diff.removed = removed
          if (keys(node.diff).length) arrayKV(result.diff, 'changed', node)
        }
        order
          ? funcArr.push([diffProp, null])
          : diffProp()
      }

      if (order) arrayKV(result, '_order', {order: order, func: funcArr})
      result.nodes.push(node)
      return node
    }

    return node
  }

  function getSel(node, result) {

    var opt = result.options

    // array index don't have key,
    // fetch parent key as ruleNode
    var ruleNode = getParents(node, function (v) {
      return v.key
    }).pop()

    node.parentRule = getParents(node.parent, function (n) {
      return n.type == TYPE_GROUP
    }).pop() || null

    if (ruleNode) {
      var isMedia, sel = ruleNode.key
      var groupRule = sel.match(reGroupRule)
      if (groupRule) {
        node.type = TYPE_GROUP
        node.at = groupRule.pop()
        isMedia = node.at == 'media'

        // only media allow nested and join, and have node.selPart
        if (isMedia) node.selPart = splitComma(sel.replace(reGroupRule, ''))

        // combinePath is array, '' + array instead of array.join(',')
        node.groupText = isMedia
          ? '@' + node.at + combinePath(getParents(ruleNode, function (v) {
            return v.type == TYPE_GROUP
          }, 'selPart', 'selChild', 'selParent'), '', ' and')
        : sel

        node.selText = getParents(node, function (v) {
          return v.selText && !v.at
        }, 'selText').pop() || ''
      } else if (reAtRule.test(sel)) {
        node.type = 'at'
        node.selText = sel
      } else {
        node.selText = '' + combinePath(getParents(ruleNode, function (v) {
          return v.selPart && !v.at
        }, 'selPart', 'selChild', 'selParent'), '', ' ', true), opt
      }

      node.selText = applyPlugins(opt, 'selector', node.selText, node, result)
      if (node.selText) node.selTextPart = splitComma(node.selText)

      if (node !== ruleNode) node.ruleNode = ruleNode
    }

  }

  function parseProp (node, d, key, result) {
    var prevVal = node.prevVal
    var lastVal = node.lastVal

    var prev = prevVal && prevVal[key]

    ![].concat(d[key]).forEach(function (v) {
      // pass lastVal if it's function
      var val = typeof v == 'function'
          ? v.call(node.lastVal, prev, node, result)
          : v

      // only valid val can be lastVal
      if (isValidCSSValue(val)) {
        // push every val to prop
        arrayKV(
          node.prop,
          key,
          applyPlugins(result.options, 'value', val, key, node, result),
          true
        )
        prev = lastVal[key] = val
      }
    })
    if (prevVal) {
      if (!(key in prevVal)) {
        arrayKV(node.diff, 'added', key)
      } else if (prevVal[key] != lastVal[key]) {
        arrayKV(node.diff, 'changed', key)
      }
    }
  }

  function combinePath (array, prev, sep, rep) {
    return !array.length ? prev : array[0].reduce(function (result, value) {
      var str = prev ? prev + sep : prev
      if (rep) {
        var isReplace = false
        var sugar = strSugar(value, '&', function (z) {
          isReplace = true
          return prev
        })
        str = isReplace ? sugar : str + sugar
      } else {
        str += value
      }
      return result.concat(combinePath(array.slice(1), str, sep, rep))
    }, [])
  }

  function applyPlugins (opt, type) {
    var args = [].slice.call(arguments, 2)
    var plugin = opt.plugins[type]
    return !plugin ? args[0] : [].concat(plugin).reduce(
      function (pre, f) { return f.apply(null, [pre].concat(args)) },
      args.shift()
    )
  }

  function applyOrder (opt) {
    if (!opt._order) return
    opt._order
      .sort(function (a, b) {
        return a.order - b.order
      })
      .forEach(function (v) {
        v.func.forEach(function (f) {
          f[0](f[1])
        })
      })
    delete opt._order
  }

  function cssobj$1 (options) {

    options = defaults(options, {
      plugins: {}
    })

    return function (obj, initData) {
      var updater = function (data) {
        if (arguments.length) result.data = data || {}

        result.root = parseObj(result.obj || {}, result, result.root, true)
        applyOrder(result)
        result = applyPlugins(options, 'post', result)
        typeof options.onUpdate=='function' && options.onUpdate(result)
        return result
      }

      var result = {
        obj: obj,
        update: updater,
        options: options
      }

      updater(initData)

      return result
    }
  }

  function createDOM (id, option) {
    var el = document.createElement('style')
    document.getElementsByTagName('head')[0].appendChild(el)
    el.setAttribute('id', id)
    if (option && typeof option == 'object' && option.attrs)
      for (var i in option.attrs) {
        el.setAttribute(i, option.attrs[i])
      }
    return el
  }

  var addCSSRule = function (parent, selector, body, selPart) {
    var rules = parent.cssRules || parent.rules
    var pos = rules.length
    var omArr = []
    if ('insertRule' in parent) {
      try {
        parent.insertRule(selector + '{' + body + '}', pos)
      } catch(e) {
        // modern browser with prefix check, now only -webkit-
        // http://shouldiprefix.com/#animations
        if(selector.indexOf('@keyframes')==0) for(var ret, i = 0, len = cssPrefixes.length; i < len; i++) {
          ret = addCSSRule(parent, selector.replace('@keyframes', '@-'+cssPrefixes[i].toLowerCase()+'-keyframes'), body)
          if(ret.length) return ret
        }
        // the rule is not supported, fail silently
        // console.log(e, selector, body, pos)
      }
    } else if ('addRule' in parent) {
      // old IE addRule don't support 'dd,dl' form, add one by one
      ![].concat(selPart || selector).forEach(function (v) {
        try {
          parent.addRule(v, body, pos)
        } catch(e) {
          // console.log(e, selector, body)
        }
      })
    }

    for (var i = pos, len = rules.length; i < len; i++) {
      omArr.push(rules[i])
    }
    return omArr
  }

  function getBodyCss (prop) {
    // get cssText from prop
    return Object.keys(prop).map(function (k) {
      for (var v, ret = '', i = prop[k].length; i--;) {
        v = prop[k][i]

        // display:flex expand for vendor prefix
        var vArr = k=='display' && v=='flex'
            ? ['-webkit-box', '-ms-flexbox', '-webkit-flex', 'flex']
            : [v]

        ret += k.charAt(0) == '@'
          ? dashify(k) + ' ' + v + ';'
          : vArr.map(function(v2) {
            return dashify(prefixProp(k, true)) + ':' + v2 + ';'
          }).join('')
      }
      return ret
    }).join('')
  }

  // vendor prefix support
  // borrowed from jQuery 1.12
  var	cssPrefixes = [ "Webkit", "Moz", "ms", "O" ]
  var cssPrefixesReg = new RegExp('^(?:' + cssPrefixes.join('|') + ')[A-Z]')
  var	emptyStyle = document.createElement( "div" ).style
  var testProp  = function (list) {
    for(var i = list.length; i--;) {
      if(list[i] in emptyStyle) return list[i]
    }
  }

  // cache cssProps
  var	cssProps = {
      // normalize float css property
    'float': testProp(['styleFloat', 'cssFloat', 'float']),
    'flex': testProp(['WebkitBoxFlex', 'msFlex', 'WebkitFlex', 'flex'])
  }


  // return a css property mapped to a potentially vendor prefixed property
  function vendorPropName( name ) {

    // shortcut for names that are not vendor prefixed
    if ( name in emptyStyle ) return

    // check for vendor prefixed names
    var preName, capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 )
    var i = cssPrefixes.length

    while ( i-- ) {
      preName = cssPrefixes[ i ] + capName
      if ( preName in emptyStyle ) return preName
    }
  }

  // apply prop to get right vendor prefix
  // cap=0 for no cap; cap=1 for capitalize prefix
  function prefixProp (name, inCSS) {
    // find name and cache the name for next time use
    var retName = cssProps[ name ] ||
        ( cssProps[ name ] = vendorPropName( name ) || name)
    return inCSS   // if hasPrefix in prop
      ? cssPrefixesReg.test(retName) ? capitalize(retName) : name=='float' && name || retName  // fix float in CSS, avoid return cssFloat
      : retName
  }


  function cssobj_plugin_post_cssom (option) {
    option = option || {}

    var id = option.name
        ? (option.name+'').replace(/[^a-zA-Z0-9$_-]/g, '')
        : 'style_cssobj' + random()

    var dom = document.getElementById(id) || createDOM(id, option)
    var sheet = dom.sheet || dom.styleSheet

    // IE has a bug, first comma rule not work! insert a dummy here
    addCSSRule(sheet, 'html,body', '')

    // helper regexp & function
    var reWholeRule = /keyframes|page/i
    var atomGroupRule = function (node) {
      return !node ? false : reWholeRule.test(node.at) || node.parentRule && reWholeRule.test(node.parentRule.at)
    }

    var getParent = function (node) {
      var p = 'omGroup' in node ? node : node.parentRule
      return p && p.omGroup || sheet
    }

    var sugar = function (str) {
      return option.noSugar ? str : str
        .replace(/w\s*>=/ig, 'min-width:')
        .replace(/w\s*<=/ig, 'max-width:')
    }

    var validParent = function (node) {
      return !node.parentRule || node.parentRule.omGroup !== null
    }

    var removeOneRule = function (rule) {
      if (!rule) return
      var parent = rule.parentRule || sheet
      var rules = parent.cssRules || parent.rules
      var index = -1
      for (var i = 0, len = rules.length; i < len; i++) {
        if (rules[i] === rule) {
          index = i
          break
        }
      }
      if (index < 0) return
      parent.removeRule
        ? parent.removeRule(index)
        : parent.deleteRule(index)
    }

    function removeNode (node) {
      // remove mediaStore for old IE
      var groupIdx = mediaStore.indexOf(node)
      if (groupIdx > -1) {
        // before remove from mediaStore
        // don't forget to remove all children, by a walk
        node.mediaEnabled = false
        walk(node)
        mediaStore.splice(groupIdx, 1)
      }
      // remove Group rule and Nomal rule
      ![node.omGroup].concat(node.omRule).forEach(removeOneRule)
    }

    // helper function for addNormalrule
    var addNormalRule = function (node, selText, cssText, selPart) {
      if(!cssText) return
      // get parent to add
      var parent = getParent(node)
      if (validParent(node))
        return node.omRule = addCSSRule(parent, selText, cssText, selPart)
      else if (node.parentRule) {
        // for old IE not support @media, check mediaEnabled, add child nodes
        if (node.parentRule.mediaEnabled) {
          if (!node.omRule) return node.omRule = addCSSRule(parent, selText, cssText, selPart)
        }else if (node.omRule) {
          node.omRule.forEach(removeOneRule)
          delete node.omRule
        }
      }
    }

    var mediaStore = []

    var checkMediaList = function () {
      mediaStore.forEach(function (v) {
        v.mediaEnabled = v.mediaTest()
        walk(v)
      })
    }

    if (window.attachEvent) {
      window.attachEvent('onresize', checkMediaList)
    } else if (window.addEventListener) {
      window.addEventListener('resize', checkMediaList, true)
    }

    var walk = function (node, store) {
      if (!node) return

      // cssobj generate vanilla Array, it's safe to use constructor, fast
      if (node.constructor === Array) return node.map(function (v) {walk(v, store)})


      // nested media rule will pending proceed
      if(node.at=='media' && node.selParent && node.selParent.postArr) {
        return node.selParent.postArr.push(node)
      }

      node.postArr = []
      var children = node.children
      var isGroup = node.type == 'group'

      if (atomGroupRule(node)) store = store || []

      if (isGroup) {
        // if it's not @page, @keyframes (which is not groupRule in fact)
        if (!atomGroupRule(node)) {
          var reAdd = 'omGroup' in node
          node.omGroup = addCSSRule(sheet, sugar(node.groupText).replace(/([0-9.]+)\s*\)/g, '$1px)'), '').pop() || null

          // when add media rule failed, build test function then check on window.resize
          if (node.at == 'media' && !reAdd && !node.omGroup) {
            // build test function from @media rule
            var mediaTest = new Function(
              'return ' + sugar(node.groupText)
                .replace(/@media\s*/i, '')
                .replace(/min-width:/ig, '>=')
                .replace(/max-width:/ig, '<=')
                .replace(/(px)?\s*\)/ig, ')')
                .replace(/\s+and\s+/ig, '&&')
                .replace(/,/g, '||')
                .replace(/\(/g, '(document.documentElement.offsetWidth')
            )

            try {
              // first test if it's valid function
              mediaTest()
              node.mediaTest = mediaTest
              node.mediaEnabled = mediaTest()
              mediaStore.push(node)
            } catch(e) {}
          }
        }
      }

      var selText = node.selText
      var cssText = getBodyCss(node.prop)

      // it's normal css rule
      if (cssText) {
        if (!atomGroupRule(node)) {
          addNormalRule(node, selText, cssText, node.selTextPart)
        }
        store && store.push(selText ? selText + ' {' + cssText + '}' : cssText)
      }

      for (var c in children) {
        // empty key will pending proceed
        if (c === '') node.postArr.push(children[c])
        else walk(children[c], store)
      }

      if (isGroup) {
        // if it's @page, @keyframes
        if (atomGroupRule(node) && validParent(node)) {
          addNormalRule(node, node.groupText, store.join(''))
          store = null
        }
      }

      // media rules need a stand alone block
      var postArr = node.postArr
      delete node.postArr
      postArr.map(function (v) {
        walk(v, store)
      })
    }

    return function (result) {
      result.cssdom = dom
      if (!result.diff) {
        // it's first time render
        walk(result.root)
      } else {
        // it's not first time, patch the diff result to CSSOM
        var diff = result.diff

        // node added
        if (diff.added) diff.added.forEach(function (node) {
          walk(node)
        })

        // node removed
        if (diff.removed) diff.removed.forEach(function (node) {
          // also remove all child group & sel
          node.selChild && node.selChild.forEach(removeNode)
          removeNode(node)
        })

        // node changed, find which part should be patched
        if (diff.changed) diff.changed.forEach(function (node) {
          var om = node.omRule
          var diff = node.diff

          if (!om) om = addNormalRule(node, node.selText, getBodyCss(node.prop), node.selTextPart)

          // added have same action as changed, can be merged... just for clarity
          diff.added && diff.added.forEach(function (v) {
            var prefixV = prefixProp(v)
            om && om.forEach(function (rule) {
              try{
                rule.style[prefixV] = node.prop[v][0]
              }catch(e){}
            })
          })

          diff.changed && diff.changed.forEach(function (v) {
            var prefixV = prefixProp(v)
            om && om.forEach(function (rule) {
              try{
                rule.style[prefixV] = node.prop[v][0]
              }catch(e){}
            })
          })

          diff.removed && diff.removed.forEach(function (v) {
            var prefixV = prefixProp(v)
            om && om.forEach(function (rule) {
              rule.style.removeProperty
                ? rule.style.removeProperty(prefixV)
                : rule.style.removeAttribute(prefixV)
            })
          })
        })
      }

      return result
    }
  }

  var reClass$1 = /:global\s*\(((?:\s*\.[A-Za-z0-9_-]+\s*)+)\)|(\.)([!A-Za-z0-9_-]+)/g

  function cssobj_plugin_selector_localize(prefix, localNames) {

    prefix = prefix!=='' ? prefix || random() : ''

    localNames = localNames || {}

    var replacer = function (match, global, dot, name) {
      if (global) {
        return global
      }
      if (name[0] === '!') {
        return dot + name.substr(1)
      }

      return dot + (name in localNames
                    ? localNames[name]
                    : prefix + name)
    }

    var mapSel = function(str, isClassList) {
      return str.replace(reClass$1, replacer)
    }

    var mapClass = function(str) {
      return mapSel((' '+str).replace(/\s+\.?/g, '.')).replace(/\./g, ' ')
    }

    return function localizeName (sel, node, result) {
      // don't touch at rule's selText
      // it's copied from parent, which already localized
      if(node.at) return sel
      if(!result.mapSel) result.mapSel = mapSel, result.mapClass = mapClass
      return mapSel(sel)
    }
  }

  function cssobj(obj, option, initData) {
    option = option||{}
    option.plugins = option.plugins||{}

    var local = option.local
    option.local = !local
      ? {prefix:''}
    : local && typeof local==='object' ? local : {}

    arrayKV(option.plugins, 'post', cssobj_plugin_post_cssom(option.cssom))
    arrayKV(option.plugins, 'selector', cssobj_plugin_selector_localize(option.local.prefix, option.local.localNames))

    return cssobj$1(option)(obj, initData)
  }

  return cssobj;

}());
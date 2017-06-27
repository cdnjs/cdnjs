(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"), require("../lib/signal"), require)
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern", "../lib/signal"], mod)
  mod(tern, tern, tern.signal)
})(function(infer, tern, signal, require) {
  "use strict"

  function Modules(server, options) {
    this.server = server
    this.options = options || {}
    this.modules = Object.create(null)
    this.nonRelative = Object.create(null)
    this.knownModules = Object.create(null)
    this.resolvers = []
    this.modNameTests = []
    this.importTests = []
    this.completableTypes = Object.create(null)
  }

  Modules.prototype = signal.mixin({
    buildWrappingScope: function(parent, origin, node) {
      var scope = new infer.Scope(parent, node)
      scope.origin = origin
      this.signal("wrapScope", scope)
      return scope
    },

    maybeOverride: function(name) {
      if (!this.options.modules || !this.options.modules.hasOwnProperty(name))
        return false
      if (this.modules[name]) return this.modules[name]

      var override = this.options.modules[name]
      if (typeof(override) == "string" && override.charAt(0) == "=")
        return infer.def.parsePath(override.slice(1))

      var scope = this.buildWrappingScope(infer.cx().topScope, name)
      infer.def.load(override, scope)
      return this.modules[name] = scope.exports
    },

    resolveModule: function(name, parentFile) {
      var over = this.maybeOverride(name)
      if (over) return over
      var known = this.knownModules[name]
      if (known) return known
      if (this.options.dontLoad == true ||
          this.options.dontLoad && new RegExp(this.options.dontLoad).test(name) ||
          this.options.load && !new RegExp(this.options.load).test(name))
        return infer.ANull

      var resolved, relative = isRelative(name)
      for (var i = 0; !resolved && i < this.resolvers.length; i++)
        resolved = this.resolvers[i](name, parentFile)
      if (!resolved) resolved = defaultResolver(name, parentFile)
      if (!resolved) return infer.ANull
      if (typeof resolved != "string") {
        if (!relative) this.nonRelative[name] = true
        return resolved
      }

      var known = this.modules[resolved]
      if (known) return known

      if (/\.js$|(?:^\/)[^\.]+$/.test(resolved))
        this.server.addFile(resolved, null, parentFile)
      if (!relative) this.nonRelative[name] = resolved
      return this.modules[resolved] = new infer.AVal
    },

    findIn: function(array, node, pos) {
      for (var i = 0; i < array.length; i++) {
        var name = array[i](node, pos)
        if (name != null) return name
      }
    },

    isModName: function(node, pos) { return this.findIn(this.modNameTests, node, pos) },
    isImport: function(node, pos) { return this.findIn(this.importTests, node, pos) },

    get: function(name) {
      return this.modules[name] || (this.modules[name] = new infer.AVal)
    },

    completeModuleName: function(completions, query, word) {
      function fromObj(obj, useVal) {
        for (var name in obj)
          if (filter(word, name, query))
            tern.addCompletion(query, completions, name, useVal && obj[name])
      }

      fromObj(this.knownModules, true)
      if (this.options.modules) fromObj(this.options.modules, false)

      var pathsSeen = Object.create(null)
      for (var prop in this.nonRelative) {
        var val = this.nonRelative[prop]
        if (val == true || prop.indexOf("/") == -1) {
          if (filter(word, prop, query)) tern.addCompletion(query, completions, prop)
        } else if (prop.indexOf(word) == 0 && word.indexOf("/") > -1) {
          var afterSlash = /.*?\/(.*)/.exec(prop)[1]
          var found = val.indexOf(afterSlash)
          if (found > -1) {
            var dir = val.slice(0, found) + (/.*?\/(.*\/)?/.exec(word)[1] || "")
            if (dir in pathsSeen) continue
            pathsSeen[dir] = true
            this.completeFileName(completions, query, null, word, dir)
          }
        }
      }
    },

    completeFileName: function(completions, query, parentFile, word, _dir) {
      var path = parentFile ? resolvePath(dirName(parentFile), word) : baseName(word)
      for (var prop in this.modules) {
        if (prop != parentFile && filter(path, prop, query)) {
          if (/\.js$/.test(prop)) prop = prop.slice(0, prop.length - 3)
          var added = prop.slice(path.length)
          tern.addCompletion(query, completions, word + added, this.modules[prop])
        }
      }
    },

    getModType: function(node) {
      var modName = this.isModName(node), imp, prop
      if (modName == null && (imp = this.isImport(node))) {
        modName = imp.name
        prop = imp.prop
      }
      if (modName == null) return

      var type = this.resolveModule(modName, node.sourceFile.name)
      if (prop) {
        var obj = type.getObjType()
        type = obj && obj.hasProp(prop) || type.getProp(prop)
      }
      return type
    }
  })

  function resolvePath(parent, sub) {
    if (/^https?:|^\//.test(sub)) return sub
    if (parent && !/\/$/.test(parent)) parent = parent + "/"
    var m
    while (m = /^\.(\.)?\//.exec(sub)) {
      if (m[1] && parent.length > 1) {
        var lastSlash = parent.lastIndexOf("/", parent.length - 2)
        parent = lastSlash == -1 ? "" : parent.slice(0, lastSlash + 1)
      }
      sub = sub.slice(m[0].length)
    }
    return parent + sub
  }

  function dirName(path) {
    var lastSlash = path.lastIndexOf("/")
    if (lastSlash == -1) return ""
    return path.slice(0, lastSlash + 1)
  }
  function baseName(path) {
    var lastSlash = path.lastIndexOf("/")
    if (lastSlash == -1) return path
    else return path.slice(lastSlash + 1)
  }

  function defaultResolver(name, parentFile) {
    if (!/^\.\.?\//.test(name)) return
    var path = resolvePath(dirName(parentFile), name)
    var server = infer.cx().parent
    if (server.findFile(path)) return path
    if (server.findFile(path + ".js")) return path + ".js"
  }

  // Under node, replace completeFileName with a version that actually
  // queries the file system
  if (require) (function() {
    var fs = require("fs"), path = require("path")

    Modules.prototype.completeFileName = function(completions, query, parentFile, word, dir) {
      var pDir = this.server.projectDir
      var endSlash = /\/$/.test(word)
      if (parentFile) {
        var pt = path.resolve(pDir, path.dirname(parentFile), word)
        dir = endSlash ? pt : path.dirname(pt)
      }
      var base = endSlash ? word : path.dirname(word) + "/"
      var filePart = endSlash ? "" : path.basename(word)

      var me = this
      fs.readdirSync(dir).forEach(function(file) {
        if (/^\./.test(file)) return
        if (filter(filePart, file, query)) {
          var projectPath = me.server.normalizeFilename(path.relative(pDir, path.resolve(dir, file)))
          if (projectPath == parentFile) return
          var value = me.modules[projectPath]
          if (/\.js$/.test(file)) file = file.slice(0, file.length - 3)
          tern.addCompletion(query, completions, base + file, value)
        }
      })
    }
  }())

  function isRelative(path) {
    return /^\.\.?\//.test(path)
  }

  function filter(word, string, query) {
    return query.filter === false || !word ||
      (query.caseInsensitive ? string.toLowerCase() : string).indexOf(word) == 0
  }

  function preCondenseReach(state) {
    var mods = infer.cx().parent.mod.modules.modules
    var node = state.roots["!modules"] = new infer.Obj(null)
    for (var name in mods) {
      var mod = mods[name]
      var id = mod.origin || name
      var prop = node.defProp(id.replace(/\./g, "`"))
      prop.origin = mod.origin
      mod.propagate(prop)
    }
  }

  function postLoadDef(data) {
    var cx = infer.cx(), me = cx.parent.mod.modules
    var mods = cx.definitions[data["!name"]]["!modules"]
    if (mods) for (var name in mods.props) {
      var origin = name.replace(/`/g, ".")
      var mod = me.get(origin)
      mod.origin = origin
      mods.props[name].propagate(mod)
    }
    var known = cx.definitions[data["!name"]]["!known_modules"]
    if (known) for (var name in known.props)
      me.knownModules[name.replace(/`/g, ".")] = known.props[name]
  }

  function findTypeAt(_file, _pos, expr, type) {
    if (!expr) return type
    var me = infer.cx().parent.mod.modules
    var modType = me.getModType(expr.node)
    if (!modType) return type

    // The `type` is a value shared for all string literals.
    // We must create a copy before modifying `origin` and `originNode`.
    // Otherwise all string literals would point to the last jump location
    var inner = modType.getType(false) || {}
    type = Object.create(type)
    type.origin = modType.origin || inner.origin
    type.originNode = modType.originNode || inner.originNode
    if (modType.doc) type.doc = modType.doc
    else if (inner.doc) type.doc = inner.doc
    if (modType.url) type.url = modType.url
    else if (inner.url) type.url = inner.url
    return type
  }

  // Complete previously seen module names when completing in strings passed to require
  function findCompletions(file, query) {
    var me = infer.cx().parent.mod.modules
    var wordEnd = tern.resolvePos(file, query.end), types = me.completableTypes
    var expr = infer.findExpressionAround(file.ast, null, wordEnd, file.scope,
                                          function(type) { return type in types })
    if (!expr) return null

    if (me.isModName(expr.node, wordEnd) != null)
      return findModuleCompletions(me, file, query, expr.node, wordEnd)

    var imp = me.isImport(expr.node, wordEnd)
    if (imp && imp.name && imp.prop != null)
      return findImportCompletions(me, file, query, expr.node, imp, wordEnd)
  }

  function findImportCompletions(me, file, query, node, imp, wordEnd) {
    var completions = []
    var word = node.name ? node.name.slice(0, wordEnd - node.start) : ""
    if (query.caseInsensitive) word = word.toLowerCase()

    var modType = me.resolveModule(imp.name, node.sourceFile.name).getType()
    if (!modType) return null
    infer.forAllPropertiesOf(modType, function(prop, obj, depth) {
      if (obj == infer.cx().protos.Object) return
      if (query.filter !== false && word &&
          (query.caseInsensitive ? prop.toLowerCase() : prop).indexOf(word) !== 0) return
      tern.addCompletion(query, completions, prop, obj && obj.props[prop], depth)
    })
    return {
      start: tern.outputPos(query, file, node.name ? node.start : wordEnd),
      end: tern.outputPos(query, file, wordEnd),
      completions: completions,
      isSpecifier: true
    }
  }

  function findModuleCompletions(me, file, query, argNode, wordEnd) {
    if (argNode.type != "Literal" || typeof argNode.value != "string" ||
        argNode.start > wordEnd || argNode.end < wordEnd) return

    var word = argNode.raw.slice(1, wordEnd - argNode.start), quote = argNode.raw.charAt(0)
    if (word && word.charAt(word.length - 1) == quote)
      word = word.slice(0, word.length - 1)
    if (query.caseInsensitive) word = word.toLowerCase()

    var completions = []
    if (isRelative(word)) me.completeFileName(completions, query, file.name, word)
    else me.completeModuleName(completions, query, word)

    if (argNode.end == wordEnd + 1 && file.text.charAt(wordEnd) == quote)
      ++wordEnd
    return {
      start: tern.outputPos(query, file, argNode.start),
      end: tern.outputPos(query, file, wordEnd),
      isProperty: false,
      completions: completions.map(function(rec) {
        var name = typeof rec == "string" ? rec : rec.name
        var string = JSON.stringify(name)
        if (quote == "'") string = quote + string.slice(1, string.length -1).replace(/'/g, "\\'") + quote
        if (typeof rec == "string") return string
        rec.displayName = name
        rec.name = string
        return rec
      })
    }
  }

  tern.registerPlugin("modules", function(server, options) {
    server.mod.modules = new Modules(server, options)

    server.on("beforeLoad", function(file) {
      file.scope = this.mod.modules.buildWrappingScope(file.scope, file.name, file.ast)
    })

    server.on("afterLoad", function(file) {
      var mod = this.mod.modules.get(file.name)
      mod.origin = file.name
      this.mod.modules.signal("getExports", file, mod)
    })

    server.on("reset", function() {
      this.mod.modules.modules = Object.create(null)
    })

    server.on("preCondenseReach", preCondenseReach)
    server.on("postLoadDef", postLoadDef)
    server.on("typeAt", findTypeAt)
    server.on("completion", findCompletions)
  })

  tern.defineQueryType("exports", {
    takesFile: true,
    run: function(server, query, file) {
      function describe(aval) {
        var target = {}, type = aval.getType(false)
        target.type = infer.toString(type, 3)
        var doc = aval.doc || (type && type.doc), url = aval.url || (type && type.url)
        if (doc) target.doc = doc
        if (url) target.url = url
        var span = tern.getSpan(aval) || (type && tern.getSpan(type))
        if (span) tern.storeSpan(server, query, span, target)
        return target
      }

      var mod = server.mod.modules, known = mod && mod.modules[file.name]
      if (!known) return {}
      var resp = describe(known);
      var type = known.getType(false)
      if (type instanceof infer.Obj) {
        var props = resp.props = {}
        for (var prop in type.props)
          props[prop] = describe(type.props[prop])
      }
      return resp
    }
  })
})

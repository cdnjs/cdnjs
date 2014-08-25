
/**
 * Module dependencies.
 */

var fs = require('fs')
var dox = require('dox')
var jade = require('jade')
var marked = require('marked')
var hljs = require('highlight.js')
var assert = require('assert')

fs.readFile(__dirname + '/../lib/ref.js', 'utf8', function (err, data) {
  if (err) throw err

  // don't depend on dox for parsing the Markdown (raw: true)
  var docs = dox.parseComments(data, { raw: true })
  var base = 0
  var sections = []
  docs.forEach(function (doc, i) {
    doc.tags.forEach(function (t) {
      if (t.type === 'section') {
        sections.push(docs.slice(base, i))
        base = i
      }
      if (t.type === 'name') {
        doc.name = t.string
      }
      if (t.type === 'type') {
        doc.type = t.types[0]
      }
    })
    if (!doc.name) {
      doc.name = doc.ctx && doc.ctx.name
    }
    if (!doc.type) {
      doc.type = doc.ctx && doc.ctx.type || 'property'
    }
  })
  sections.push(docs.slice(base))
  assert.equal(sections.length, 3)

  // get the 3 sections
  var exports = sections[0]
  var types = sections[1]
  var extensions = sections[2]

  // move NULL_POINTER from "types" to "exports"
  var null_pointer = types.pop()
  assert.equal(null_pointer.name, 'NULL_POINTER')
  exports.push(null_pointer)

  // extract the "return" and "param" types
  exports.forEach(function (doc) {
    doc.tags.forEach(function (t) {
      if (t.description) {
        // parse the Markdown descriptions
        t.description = markdown(t.description).trim()
        // remove the surrounding <p> tags
        t.description = t.description.substring(3, t.description.length - 4)
      }
    })
    doc.returnType = doc.tags.filter(function (t) {
      return t.type == 'return'
    })[0]
    doc.paramTypes = doc.tags.filter(function (t) {
      return t.type == 'param'
    })
  })

  // sort
  exports = exports.sort(sort)
  extensions = extensions.sort(sort)

  // parse and highlight the Markdown descriptions
  ;[exports, types, extensions].forEach(function (docs) {
    docs.forEach(function (doc) {
      var desc = doc.description
      desc.full = markdown(desc.full)
      desc.summary = markdown(desc.summary)
      desc.body = markdown(desc.body)
    })
  })

  // get a reference to the ref export doc object for every Buffer extension doc
  extensions.forEach(function (doc) {
    doc.ref = exports.filter(function (ref) {
      return ref.name === doc.name
    })[0]
  })

  fs.readFile(__dirname + '/index.jade', 'utf8', function (err, template) {
    if (err) throw err

    template = jade.compile(template)
    var html = template({
        exports: sections[0]
      , types: sections[1]
      , extensions: sections[2]
      , package: require('../package.json')
      , markdown: markdown
      , highlight: highlight
    })

    fs.writeFile(__dirname + '/index.html', html, function (err) {
      if (err) throw err
    })
  })
})


/**
 * Sorts an array of dox objects by doc.name. If the first letter is an '_' then
 * it is considered "private" and gets sorted at the bottom.
 */

function sort (a, b) {
  var aname = a.name
  var bname = b.name
  var aprivate = a.isPrivate
  var bprivate = b.isPrivate
  if (aprivate && !bprivate) {
    return 1
  }
  if (bprivate && !aprivate) {
    return -1
  }
  return aname > bname ? 1 : -1
}

/**
 * Parses Markdown into highlighted HTML.
 */

function markdown (code) {
  if (!code) return code
  return marked(code, {
      gfm: true
    , highlight: highlight
  })
}

/**
 * Add syntax highlighting HTML to the given `code` block.
 * `lang` defaults to "javascript" if no valid name is given.
 */

function highlight (code, lang) {
  if (!hljs.LANGUAGES.hasOwnProperty(lang)) {
    lang = 'javascript'
  }
  return hljs.highlight(lang, code).value
}

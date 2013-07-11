HTMLInspector.rules.add("duplicate-ids", function(listener, reporter) {

  var elements = []

  listener.on("id", function(name) {
    elements.push({id: name, context: this})
  })

  listener.on("afterInspect", function() {

    var duplicates = []
      , element
      , offenders

    while (element = elements.shift()) {
      // find other elements with the same ID
      duplicates = elements.filter(function(el) {
        return element.id === el.id
      })
      // remove elements with the same ID from the elements array
      elements = elements.filter(function(el) {
        return element.id !== el.id
      })
      // report duplicates
      if (duplicates.length) {
        offenders = [element.context].concat(duplicates.map(function(dup) {
          return dup.context
        }))
        reporter.warn(
          "duplicate-ids",
          "The id '" + element.id + "' appears more than once in the document.",
          offenders
        )
      }
    }


  })

})

HTMLInspector.rules.add(
  "unique-elements",
  {
    elements: ["title", "main"]
  },
  function(listener, reporter, config) {

    var map = {}
      , elements = config.elements

    // create the map where the keys are elements that must be unique
    elements.forEach(function(item) {
      map[item] = []
    })

    listener.on("element", function(name) {
      if (elements.indexOf(name) >= 0) {
        map[name].push(this)
      }
    })

    listener.on("afterInspect", function() {
      var offenders
      elements.forEach(function(item) {
        if (map[item].length > 1) {
          reporter.warn(
            "unique-elements",
            "The <" + item + "> element may only appear once in the document.",
            map[item]
          )
        }
      })
    }
  )
})

HTMLInspector.rules.add("validate-attributes", function(listener, reporter) {

  var validation = HTMLInspector.modules.validation

  listener.on("element", function(name) {
    var required = validation.getRequiredAttributesForElement(name)
    required.forEach(function(attr) {
      if (!this.hasAttribute(attr)) {
        reporter.warn(
          "validate-attributes",
          "The '" + attr + "' attribute is required for <"
          + name + "> elements.",
          this
        )
      }
    }, this)
  })

  listener.on("attribute", function(name) {
    var element = this.nodeName.toLowerCase()

    // don't validate the attributes of invalid elements
    if (!validation.isElementValid(element)) return

    if (validation.isAttributeObsoleteForElement(name, element)) {
      reporter.warn(
        "validate-attributes",
        "The '" + name + "' attribute is no longer valid on the <"
        + element + "> element and should not be used.",
        this
      )
    }
    else if (!validation.isAttributeValidForElement(name, element)) {
      reporter.warn(
        "validate-attributes",
        "'" + name + "' is not a valid attribute of the <"
        + element + "> element.",
        this
      )
    }
  })

})

HTMLInspector.rules.add("validate-element-location", function(listener, reporter) {

  var validation = this.modules.validation
    , matches = this.utils.matches
    , parents = this.utils.parents
    , warned = [] // store already-warned elements to prevent double warning


  // ===========================================================================
  // Elements with clear-cut location rules are tested here.
  // More complicated cases are tested below
  // ===========================================================================

  listener.on("element", function(name) {
    // skip elements without a DOM element for a parent
    if (!(this.parentNode && this.parentNode.nodeType == 1)) return

    var child = name
      , parent = this.parentNode.nodeName.toLowerCase()

    if (!validation.isChildAllowedInParent(child, parent)) {
      warned.push(this)
      reporter.warn(
        "validate-element-location",
        "The <" + child + "> element cannot be a child of the <" + parent + "> element.",
        this
      )
    }
  })

  // ===========================================================================
  // Make sure <style> elements inside <body> have the 'scoped' attribute.
  // They must also be the first element child of their parent.
  // ===========================================================================

  listener.on("element", function(name) {
    // don't double warn if the style elements already has a location warning
    if (warned.indexOf(this) > -1) return

    if (matches(this, "body style:not([scoped])")) {
      reporter.warn(
        "validate-element-location",
        "<style> elements inside <body> must contain the 'scoped' attribute.",
        this
      )
    }
    else if (matches(this, "body style[scoped]:not(:first-child)")) {
      reporter.warn(
        "validate-element-location",
        "Scoped <style> elements must be the first child of their parent element.",
        this
      )
    }

  })

  // ===========================================================================
  // Make sure <meta> and <link> elements inside <body> have the 'itemprop'
  // attribute
  // ===========================================================================

  listener.on("element", function(name) {
    // don't double warn if the style elements already has a location warning
    if (warned.indexOf(this) > -1) return

    if (matches(this, "body meta:not([itemprop]), body link:not([itemprop])")) {
      reporter.warn(
        "validate-element-location",
        "<" + name + "> elements inside <body> must contain the"
        + " 'itemprop' attribute.",
        this
      )
    }
  })

})


HTMLInspector.rules.add("validate-elements", function(listener, reporter) {

  var validation = HTMLInspector.modules.validation

  listener.on("element", function(name) {
    if (validation.isElementObsolete(name)) {
      reporter.warn(
        "validate-elements",
        "The <" + name + "> element is obsolete and should not be used.",
        this
      )
    }
    else if (!validation.isElementValid(name)) {
      reporter.warn(
        "validate-elements",
        "The <" + name + "> element is not a valid HTML element.",
        this
      )
    }
  })

})
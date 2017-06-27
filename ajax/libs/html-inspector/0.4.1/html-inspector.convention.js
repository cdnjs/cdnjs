;(function() {

  // ============================================================
  // There are several different BEM  naming conventions that
  // I'm aware of. To make things easier, I refer to the
  // methodologies by the name of projects that utilize them.
  //
  // suit: https://github.com/necolas/suit
  // -------------------------------------
  // BlockName
  // BlockName--modifierName
  // BlockName-elementName
  // BlockName-elementName--modifierName
  //
  // inuit: http://inuitcss.com/
  // ---------------------------
  // block-name
  // block-name--modifier-name
  // block-name__element-name
  // block-name__element-name--modifier-name
  //
  // yandex: http://bem.info/
  // ------------------------
  // block-name
  // block-name__elemement-name
  // block-name_modifier_name
  // block-name__element-name_modifier_name
  //
  // ============================================================

  var methodologies = {
    "suit": {
      modifier: /^([A-Z][a-zA-Z]*(?:\-[a-zA-Z]+)?)\-\-[a-zA-Z]+$/,
      element: /^([A-Z][a-zA-Z]*)\-[a-zA-Z]+$/
    },
    "inuit": {
      modifier: /^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)\-\-(?:[a-z]+\-)*[a-z]+$/,
      element: /^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/
    },
    "yandex": {
      modifier: /^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)_(?:[a-z]+_)*[a-z]+$/,
      element: /^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/
    }
  }

  function getMethodology() {
    if (typeof config.methodology == "string") {
      return methodologies[config.methodology]
    }
    return config.methodology
  }

  var config = {

    methodology: "suit",

    getBlockName: function(elementOrModifier) {
      var block
        , methodology = getMethodology()
      if (methodology.modifier.test(elementOrModifier))
        return block = RegExp.$1
      if (methodology.element.test(elementOrModifier))
        return block = RegExp.$1
      return block || false
    },

    isElement: function(cls) {
      return getMethodology().element.test(cls)
    },

    isModifier: function(cls) {
      return getMethodology().modifier.test(cls)
    }
  }

  HTMLInspector.rules.add(
    "bem-conventions",
    config,
    function(listener, reporter, config) {

      var parents = this.utils.parents
        , matches = this.utils.matches

      listener.on('class', function(name) {
        if (config.isElement(name)) {
          // check the ancestors for the block class
          var ancestorIsBlock = parents(this).some(function(el) {
            return matches(el, "." + config.getBlockName(name))
          })
          if (!ancestorIsBlock) {
            reporter.warn(
              "bem-conventions",
              "The BEM element '" + name
              + "' must be a descendent of '" + config.getBlockName(name)
              + "'.",
              this
            )
          }
        }
        if (config.isModifier(name)) {
          if (!matches(this, "." + config.getBlockName(name))) {
            reporter.warn(
              "bem-conventions",
              "The BEM modifier class '" + name
              + "' was found without the unmodified class '" + config.getBlockName(name)
              +  "'.",
              this
            )
          }
        }
      }
    )
  })
}())
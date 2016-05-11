(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'
module.exports = {
  load: load
}

function load(location,callback){
  var xhr = getXHR()
  xhr.open('GET', location, true)
  xhr.onreadystatechange = createStateChangeListener(xhr, callback)
  xhr.send()
}

function createStateChangeListener(xhr, callback){
  return function(){
    if ( xhr.readyState===4 && xhr.status===200 ){
      try{
        callback(null, JSON.parse(xhr.responseText) )
      }catch(err){
        callback(err, null)
      }
    }
  }
}

function getXHR(){
  return (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
}

},{}],2:[function(require,module,exports){
'use strict'
module.exports = function OptionsValidator(params){
  if( !validateParams(params) ){
    throw new Error('-- OptionsValidator: required options missing')
  }
  if( !(this instanceof OptionsValidator) ){
    return new OptionsValidator(params)
  }

  var requiredOptions = params.required

  this.getRequiredOptions = function(){
    return requiredOptions
  }

  this.validate = function(parameters){
    var errors = []
    requiredOptions.forEach(function(requiredOptionName){
      if( parameters[requiredOptionName] === undefined ){
        errors.push(requiredOptionName)
      }
    })
    return errors
  }

  function validateParams(params){
    if( !params ) {
      return false
    }
    return params.required !== undefined && params.required instanceof Array
  }
}
},{}],3:[function(require,module,exports){
'use strict'
module.exports = {
  put:put,
  clear: clear,
  get: get,
  search: search,
  setOptions: setOptions
}

var FuzzySearchStrategy = require('./SearchStrategies/FuzzySearchStrategy')
var LiteralSearchStrategy = require('./SearchStrategies/LiteralSearchStrategy')

var data = []
var opt = {}
opt.fuzzy = false
opt.limit = 10
opt.searchStrategy = opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy


function put(data){
  if( isObject(data) ){
    return addObject(data)
  }
  if( isArray(data) ){
    return addArray(data)
  }
  return undefined
}
function clear(){
  data.length = 0
  return data
}

function get(){
  return data
}


function isObject(obj){ return !!obj && Object.prototype.toString.call(obj) === '[object Object]' }
function isArray(obj){ return !!obj && Object.prototype.toString.call(obj) === '[object Array]' }

function addObject(_data){
  data.push(_data)
  return data
}

function addArray(_data){
  var added = []
  for (var i = 0; i < _data.length; i++){
    if( isObject(_data[i]) ){
      added.push(addObject(_data[i]))
    }
  }
  return added
}



function search(crit){
  if( !crit ){
    return []
  }
  return findMatches(data,crit,opt.searchStrategy,opt)
}

function setOptions(_opt){
  opt = _opt || {}

  opt.fuzzy = _opt.fuzzy || false
  opt.limit = _opt.limit || 10
  opt.searchStrategy = _opt.fuzzy ? FuzzySearchStrategy : LiteralSearchStrategy
}

function findMatches(data,crit,strategy,opt){
  var matches = []
  for(var i = 0; i < data.length && matches.length < opt.limit; i++) {
    var match = findMatchesInObject(data[i],crit,strategy,opt)
    if( match ){
      matches.push(match)
    }
  }
  return matches
}

function findMatchesInObject(obj,crit,strategy,opt){
  for(var key in obj) {
    if( !isExcluded(obj[key], opt.exclude) && strategy.matches(obj[key], crit) ){
      return obj
    }
  }
}

function isExcluded(term, excludedTerms){
  var excluded = false
  excludedTerms = excludedTerms || []
  for (var i = 0; i<excludedTerms.length; i++) {
    var excludedTerm = excludedTerms[i]
    if( !excluded && new RegExp(term).test(excludedTerm) ){
      excluded = true
    }
  }
  return excluded
}

},{"./SearchStrategies/FuzzySearchStrategy":4,"./SearchStrategies/LiteralSearchStrategy":5}],4:[function(require,module,exports){
'use strict'
module.exports = new FuzzySearchStrategy()

function FuzzySearchStrategy(){
  this.matches = function(string, crit){
    if( typeof string !== 'string' || typeof crit !== 'string' ){
      return false
    }
    var fuzzy = fuzzyFrom(crit)
    return !!fuzzy.test(string)
  }

  function fuzzyFrom(string){
    var fuzzy = string
              .trim()
              .split('')
              .join('.*?')
              .replace('??','?')
    return new RegExp( fuzzy, 'gi')
  }
}

},{}],5:[function(require,module,exports){
'use strict'
module.exports = new LiteralSearchStrategy()

function LiteralSearchStrategy(){
  this.matches = function(string,crit){
    if( typeof string !== 'string' ){
      return false
    }
    string = string.trim()
    return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0
  }
}

},{}],6:[function(require,module,exports){
'use strict'
module.exports = {
  compile: compile,
  setOptions: setOptions
}

var options = {}
options.pattern = /\{(.*?)\}/g
options.template = ''
options.middleware = function(){}

function setOptions(_options){
  options.pattern = _options.pattern || options.pattern
  options.template = _options.template || options.template
  if( typeof _options.middleware === 'function' ){
    options.middleware = _options.middleware
  }
}

function compile(data){
  return options.template.replace(options.pattern, function(match, prop) {
    var value = options.middleware(prop, data[prop], options.template)
    if( value !== undefined ){
      return value
    }
    return data[prop] || match
  })
}

},{}],7:[function(require,module,exports){
;(function(window, document, undefined){
  'use strict'

  var options = {
    searchInput: null,
    resultsContainer: null,
    json: [],
    searchResultTemplate: '<li><a href="{url}" title="{desc}">{title}</a></li>',
    templateMiddleware: function(){},
    noResultsText: 'No results found',
    limit: 10,
    fuzzy: false,
    exclude: []
  }

  var requiredOptions = ['searchInput','resultsContainer','json']

  var templater = require('./Templater')
  var repository = require('./Repository')
  var jsonLoader = require('./JSONLoader')
  var optionsValidator = require('./OptionsValidator')({
    required: requiredOptions
  })
  var utils = require('./utils')

  /*
    Public API
  */
  window.SimpleJekyllSearch = function SimpleJekyllSearch(_options){
    var errors = optionsValidator.validate(_options)
    if( errors.length > 0 ){
      throwError('You must specify the following required options: ' + requiredOptions)
    }

    options = utils.merge(options, _options)

    templater.setOptions({
      template: options.searchResultTemplate,
      middleware: options.templateMiddleware,
    })

    repository.setOptions({
      fuzzy: options.fuzzy,
      limit: options.limit,
    })

    if( utils.isJSON(options.json) ){
      initWithJSON(options.json)
    }else{
      initWithURL(options.json)
    }
  }

  // for backwards compatibility
  window.SimpleJekyllSearch.init = window.SimpleJekyllSearch


  function initWithJSON(json){
    repository.put(json)
    registerInput()
  }

  function initWithURL(url){
    jsonLoader.load(url, function(err,json){
      if( err ){
        throwError('failed to get JSON (' + url + ')')
      }
      initWithJSON(json)
    })
  }

  function emptyResultsContainer(){
    options.resultsContainer.innerHTML = ''
  }

  function appendToResultsContainer(text){
    options.resultsContainer.innerHTML += text
  }

  function registerInput(){
    options.searchInput.addEventListener('keyup', function(e){
      var key = e.which
      var query = e.target.value
      if( isWhitelistedKey(key) && isValidQuery(query) ) {
        emptyResultsContainer();
        render( repository.search(query) );
      }
    })
  }

  function render(results) {
    if( results.length === 0 ){
      return appendToResultsContainer(options.noResultsText)
    }
    for (var i = 0; i < results.length; i++) {
      appendToResultsContainer( templater.compile(results[i]) )
    }
  }

  function isValidQuery(query) {
    return query && query.length > 0
  }

  function isWhitelistedKey(key) {
    return [13,16,20,37,38,39,40,91].indexOf(key) === -1
  }

  function throwError(message){ throw new Error('SimpleJekyllSearch --- '+ message) }
})(window, document);

},{"./JSONLoader":1,"./OptionsValidator":2,"./Repository":3,"./Templater":6,"./utils":8}],8:[function(require,module,exports){
'use strict'
module.exports = {
  merge: merge,
  isJSON: isJSON,
}

function merge(defaultParams, mergeParams){
  var mergedOptions = {}
  for(var option in defaultParams){
    mergedOptions[option] = defaultParams[option]
    if( mergeParams[option] !== undefined ){
      mergedOptions[option] = mergeParams[option]
    }
  }
  return mergedOptions
}

function isJSON(json){
  try{
    if( json instanceof Object && JSON.parse(JSON.stringify(json)) ){
      return true
    }
    return false
  }catch(e){
    return false
  }
}

},{}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcGxheWdyb3VuZC9TaW1wbGUtSmVreWxsLVNlYXJjaC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9KU09OTG9hZGVyLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9PcHRpb25zVmFsaWRhdG9yLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9SZXBvc2l0b3J5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9TZWFyY2hTdHJhdGVnaWVzL0Z1enp5U2VhcmNoU3RyYXRlZ3kuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL1NlYXJjaFN0cmF0ZWdpZXMvTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9UZW1wbGF0ZXIuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL2Zha2VfODNiZWU0MjguanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2FkOiBsb2FkXG59XG5cbmZ1bmN0aW9uIGxvYWQobG9jYXRpb24sY2FsbGJhY2spe1xuICB2YXIgeGhyID0gZ2V0WEhSKClcbiAgeGhyLm9wZW4oJ0dFVCcsIGxvY2F0aW9uLCB0cnVlKVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gY3JlYXRlU3RhdGVDaGFuZ2VMaXN0ZW5lcih4aHIsIGNhbGxiYWNrKVxuICB4aHIuc2VuZCgpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0YXRlQ2hhbmdlTGlzdGVuZXIoeGhyLCBjYWxsYmFjayl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIGlmICggeGhyLnJlYWR5U3RhdGU9PT00ICYmIHhoci5zdGF0dXM9PT0yMDAgKXtcbiAgICAgIHRyeXtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSApXG4gICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICAgY2FsbGJhY2soZXJyLCBudWxsKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRYSFIoKXtcbiAgcmV0dXJuICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpID8gbmV3IFhNTEh0dHBSZXF1ZXN0KCkgOiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE9wdGlvbnNWYWxpZGF0b3IocGFyYW1zKXtcbiAgaWYoICF2YWxpZGF0ZVBhcmFtcyhwYXJhbXMpICl7XG4gICAgdGhyb3cgbmV3IEVycm9yKCctLSBPcHRpb25zVmFsaWRhdG9yOiByZXF1aXJlZCBvcHRpb25zIG1pc3NpbmcnKVxuICB9XG4gIGlmKCAhKHRoaXMgaW5zdGFuY2VvZiBPcHRpb25zVmFsaWRhdG9yKSApe1xuICAgIHJldHVybiBuZXcgT3B0aW9uc1ZhbGlkYXRvcihwYXJhbXMpXG4gIH1cblxuICB2YXIgcmVxdWlyZWRPcHRpb25zID0gcGFyYW1zLnJlcXVpcmVkXG5cbiAgdGhpcy5nZXRSZXF1aXJlZE9wdGlvbnMgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiByZXF1aXJlZE9wdGlvbnNcbiAgfVxuXG4gIHRoaXMudmFsaWRhdGUgPSBmdW5jdGlvbihwYXJhbWV0ZXJzKXtcbiAgICB2YXIgZXJyb3JzID0gW11cbiAgICByZXF1aXJlZE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihyZXF1aXJlZE9wdGlvbk5hbWUpe1xuICAgICAgaWYoIHBhcmFtZXRlcnNbcmVxdWlyZWRPcHRpb25OYW1lXSA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgIGVycm9ycy5wdXNoKHJlcXVpcmVkT3B0aW9uTmFtZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBlcnJvcnNcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlUGFyYW1zKHBhcmFtcyl7XG4gICAgaWYoICFwYXJhbXMgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcy5yZXF1aXJlZCAhPT0gdW5kZWZpbmVkICYmIHBhcmFtcy5yZXF1aXJlZCBpbnN0YW5jZW9mIEFycmF5XG4gIH1cbn0iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdXQ6cHV0LFxuICBjbGVhcjogY2xlYXIsXG4gIGdldDogZ2V0LFxuICBzZWFyY2g6IHNlYXJjaCxcbiAgc2V0T3B0aW9uczogc2V0T3B0aW9uc1xufVxuXG52YXIgRnV6enlTZWFyY2hTdHJhdGVneSA9IHJlcXVpcmUoJy4vU2VhcmNoU3RyYXRlZ2llcy9GdXp6eVNlYXJjaFN0cmF0ZWd5JylcbnZhciBMaXRlcmFsU2VhcmNoU3RyYXRlZ3kgPSByZXF1aXJlKCcuL1NlYXJjaFN0cmF0ZWdpZXMvTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5JylcblxudmFyIGRhdGEgPSBbXVxudmFyIG9wdCA9IHt9XG5vcHQuZnV6enkgPSBmYWxzZVxub3B0LmxpbWl0ID0gMTBcbm9wdC5zZWFyY2hTdHJhdGVneSA9IG9wdC5mdXp6eSA/IEZ1enp5U2VhcmNoU3RyYXRlZ3kgOiBMaXRlcmFsU2VhcmNoU3RyYXRlZ3lcblxuXG5mdW5jdGlvbiBwdXQoZGF0YSl7XG4gIGlmKCBpc09iamVjdChkYXRhKSApe1xuICAgIHJldHVybiBhZGRPYmplY3QoZGF0YSlcbiAgfVxuICBpZiggaXNBcnJheShkYXRhKSApe1xuICAgIHJldHVybiBhZGRBcnJheShkYXRhKVxuICB9XG4gIHJldHVybiB1bmRlZmluZWRcbn1cbmZ1bmN0aW9uIGNsZWFyKCl7XG4gIGRhdGEubGVuZ3RoID0gMFxuICByZXR1cm4gZGF0YVxufVxuXG5mdW5jdGlvbiBnZXQoKXtcbiAgcmV0dXJuIGRhdGFcbn1cblxuXG5mdW5jdGlvbiBpc09iamVjdChvYmopeyByZXR1cm4gISFvYmogJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nIH1cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKXsgcmV0dXJuICEhb2JqICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nIH1cblxuZnVuY3Rpb24gYWRkT2JqZWN0KF9kYXRhKXtcbiAgZGF0YS5wdXNoKF9kYXRhKVxuICByZXR1cm4gZGF0YVxufVxuXG5mdW5jdGlvbiBhZGRBcnJheShfZGF0YSl7XG4gIHZhciBhZGRlZCA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2RhdGEubGVuZ3RoOyBpKyspe1xuICAgIGlmKCBpc09iamVjdChfZGF0YVtpXSkgKXtcbiAgICAgIGFkZGVkLnB1c2goYWRkT2JqZWN0KF9kYXRhW2ldKSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFkZGVkXG59XG5cblxuXG5mdW5jdGlvbiBzZWFyY2goY3JpdCl7XG4gIGlmKCAhY3JpdCApe1xuICAgIHJldHVybiBbXVxuICB9XG4gIHJldHVybiBmaW5kTWF0Y2hlcyhkYXRhLGNyaXQsb3B0LnNlYXJjaFN0cmF0ZWd5LG9wdClcbn1cblxuZnVuY3Rpb24gc2V0T3B0aW9ucyhfb3B0KXtcbiAgb3B0ID0gX29wdCB8fCB7fVxuXG4gIG9wdC5mdXp6eSA9IF9vcHQuZnV6enkgfHwgZmFsc2VcbiAgb3B0LmxpbWl0ID0gX29wdC5saW1pdCB8fCAxMFxuICBvcHQuc2VhcmNoU3RyYXRlZ3kgPSBfb3B0LmZ1enp5ID8gRnV6enlTZWFyY2hTdHJhdGVneSA6IExpdGVyYWxTZWFyY2hTdHJhdGVneVxufVxuXG5mdW5jdGlvbiBmaW5kTWF0Y2hlcyhkYXRhLGNyaXQsc3RyYXRlZ3ksb3B0KXtcbiAgdmFyIG1hdGNoZXMgPSBbXVxuICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGggJiYgbWF0Y2hlcy5sZW5ndGggPCBvcHQubGltaXQ7IGkrKykge1xuICAgIHZhciBtYXRjaCA9IGZpbmRNYXRjaGVzSW5PYmplY3QoZGF0YVtpXSxjcml0LHN0cmF0ZWd5LG9wdClcbiAgICBpZiggbWF0Y2ggKXtcbiAgICAgIG1hdGNoZXMucHVzaChtYXRjaClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hdGNoZXNcbn1cblxuZnVuY3Rpb24gZmluZE1hdGNoZXNJbk9iamVjdChvYmosY3JpdCxzdHJhdGVneSxvcHQpe1xuICBmb3IodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiggIWlzRXhjbHVkZWQob2JqW2tleV0sIG9wdC5leGNsdWRlKSAmJiBzdHJhdGVneS5tYXRjaGVzKG9ialtrZXldLCBjcml0KSApe1xuICAgICAgcmV0dXJuIG9ialxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0V4Y2x1ZGVkKHRlcm0sIGV4Y2x1ZGVkVGVybXMpe1xuICB2YXIgZXhjbHVkZWQgPSBmYWxzZVxuICBleGNsdWRlZFRlcm1zID0gZXhjbHVkZWRUZXJtcyB8fCBbXVxuICBmb3IgKHZhciBpID0gMDsgaTxleGNsdWRlZFRlcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGV4Y2x1ZGVkVGVybSA9IGV4Y2x1ZGVkVGVybXNbaV1cbiAgICBpZiggIWV4Y2x1ZGVkICYmIG5ldyBSZWdFeHAodGVybSkudGVzdChleGNsdWRlZFRlcm0pICl7XG4gICAgICBleGNsdWRlZCA9IHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGV4Y2x1ZGVkXG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gbmV3IEZ1enp5U2VhcmNoU3RyYXRlZ3koKVxuXG5mdW5jdGlvbiBGdXp6eVNlYXJjaFN0cmF0ZWd5KCl7XG4gIHRoaXMubWF0Y2hlcyA9IGZ1bmN0aW9uKHN0cmluZywgY3JpdCl7XG4gICAgaWYoIHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjcml0ICE9PSAnc3RyaW5nJyApe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHZhciBmdXp6eSA9IGZ1enp5RnJvbShjcml0KVxuICAgIHJldHVybiAhIWZ1enp5LnRlc3Qoc3RyaW5nKVxuICB9XG5cbiAgZnVuY3Rpb24gZnV6enlGcm9tKHN0cmluZyl7XG4gICAgdmFyIGZ1enp5ID0gc3RyaW5nXG4gICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgICAuam9pbignLio/JylcbiAgICAgICAgICAgICAgLnJlcGxhY2UoJz8/JywnPycpXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoIGZ1enp5LCAnZ2knKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gbmV3IExpdGVyYWxTZWFyY2hTdHJhdGVneSgpXG5cbmZ1bmN0aW9uIExpdGVyYWxTZWFyY2hTdHJhdGVneSgpe1xuICB0aGlzLm1hdGNoZXMgPSBmdW5jdGlvbihzdHJpbmcsY3JpdCl7XG4gICAgaWYoIHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnICl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgc3RyaW5nID0gc3RyaW5nLnRyaW0oKVxuICAgIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKS5pbmRleE9mKGNyaXQudG9Mb3dlckNhc2UoKSkgPj0gMFxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21waWxlOiBjb21waWxlLFxuICBzZXRPcHRpb25zOiBzZXRPcHRpb25zXG59XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMucGF0dGVybiA9IC9cXHsoLio/KVxcfS9nXG5vcHRpb25zLnRlbXBsYXRlID0gJydcbm9wdGlvbnMubWlkZGxld2FyZSA9IGZ1bmN0aW9uKCl7fVxuXG5mdW5jdGlvbiBzZXRPcHRpb25zKF9vcHRpb25zKXtcbiAgb3B0aW9ucy5wYXR0ZXJuID0gX29wdGlvbnMucGF0dGVybiB8fCBvcHRpb25zLnBhdHRlcm5cbiAgb3B0aW9ucy50ZW1wbGF0ZSA9IF9vcHRpb25zLnRlbXBsYXRlIHx8IG9wdGlvbnMudGVtcGxhdGVcbiAgaWYoIHR5cGVvZiBfb3B0aW9ucy5taWRkbGV3YXJlID09PSAnZnVuY3Rpb24nICl7XG4gICAgb3B0aW9ucy5taWRkbGV3YXJlID0gX29wdGlvbnMubWlkZGxld2FyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGUoZGF0YSl7XG4gIHJldHVybiBvcHRpb25zLnRlbXBsYXRlLnJlcGxhY2Uob3B0aW9ucy5wYXR0ZXJuLCBmdW5jdGlvbihtYXRjaCwgcHJvcCkge1xuICAgIHZhciB2YWx1ZSA9IG9wdGlvbnMubWlkZGxld2FyZShwcm9wLCBkYXRhW3Byb3BdLCBvcHRpb25zLnRlbXBsYXRlKVxuICAgIGlmKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIGRhdGFbcHJvcF0gfHwgbWF0Y2hcbiAgfSlcbn1cbiIsIjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKXtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgc2VhcmNoSW5wdXQ6IG51bGwsXG4gICAgcmVzdWx0c0NvbnRhaW5lcjogbnVsbCxcbiAgICBqc29uOiBbXSxcbiAgICBzZWFyY2hSZXN1bHRUZW1wbGF0ZTogJzxsaT48YSBocmVmPVwie3VybH1cIiB0aXRsZT1cIntkZXNjfVwiPnt0aXRsZX08L2E+PC9saT4nLFxuICAgIHRlbXBsYXRlTWlkZGxld2FyZTogZnVuY3Rpb24oKXt9LFxuICAgIG5vUmVzdWx0c1RleHQ6ICdObyByZXN1bHRzIGZvdW5kJyxcbiAgICBsaW1pdDogMTAsXG4gICAgZnV6enk6IGZhbHNlLFxuICAgIGV4Y2x1ZGU6IFtdXG4gIH1cblxuICB2YXIgcmVxdWlyZWRPcHRpb25zID0gWydzZWFyY2hJbnB1dCcsJ3Jlc3VsdHNDb250YWluZXInLCdqc29uJ11cblxuICB2YXIgdGVtcGxhdGVyID0gcmVxdWlyZSgnLi9UZW1wbGF0ZXInKVxuICB2YXIgcmVwb3NpdG9yeSA9IHJlcXVpcmUoJy4vUmVwb3NpdG9yeScpXG4gIHZhciBqc29uTG9hZGVyID0gcmVxdWlyZSgnLi9KU09OTG9hZGVyJylcbiAgdmFyIG9wdGlvbnNWYWxpZGF0b3IgPSByZXF1aXJlKCcuL09wdGlvbnNWYWxpZGF0b3InKSh7XG4gICAgcmVxdWlyZWQ6IHJlcXVpcmVkT3B0aW9uc1xuICB9KVxuICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcblxuICAvKlxuICAgIFB1YmxpYyBBUElcbiAgKi9cbiAgd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaCA9IGZ1bmN0aW9uIFNpbXBsZUpla3lsbFNlYXJjaChfb3B0aW9ucyl7XG4gICAgdmFyIGVycm9ycyA9IG9wdGlvbnNWYWxpZGF0b3IudmFsaWRhdGUoX29wdGlvbnMpXG4gICAgaWYoIGVycm9ycy5sZW5ndGggPiAwICl7XG4gICAgICB0aHJvd0Vycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgb3B0aW9uczogJyArIHJlcXVpcmVkT3B0aW9ucylcbiAgICB9XG5cbiAgICBvcHRpb25zID0gdXRpbHMubWVyZ2Uob3B0aW9ucywgX29wdGlvbnMpXG5cbiAgICB0ZW1wbGF0ZXIuc2V0T3B0aW9ucyh7XG4gICAgICB0ZW1wbGF0ZTogb3B0aW9ucy5zZWFyY2hSZXN1bHRUZW1wbGF0ZSxcbiAgICAgIG1pZGRsZXdhcmU6IG9wdGlvbnMudGVtcGxhdGVNaWRkbGV3YXJlLFxuICAgIH0pXG5cbiAgICByZXBvc2l0b3J5LnNldE9wdGlvbnMoe1xuICAgICAgZnV6enk6IG9wdGlvbnMuZnV6enksXG4gICAgICBsaW1pdDogb3B0aW9ucy5saW1pdCxcbiAgICB9KVxuXG4gICAgaWYoIHV0aWxzLmlzSlNPTihvcHRpb25zLmpzb24pICl7XG4gICAgICBpbml0V2l0aEpTT04ob3B0aW9ucy5qc29uKVxuICAgIH1lbHNle1xuICAgICAgaW5pdFdpdGhVUkwob3B0aW9ucy5qc29uKVxuICAgIH1cbiAgfVxuXG4gIC8vIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICB3aW5kb3cuU2ltcGxlSmVreWxsU2VhcmNoLmluaXQgPSB3aW5kb3cuU2ltcGxlSmVreWxsU2VhcmNoXG5cblxuICBmdW5jdGlvbiBpbml0V2l0aEpTT04oanNvbil7XG4gICAgcmVwb3NpdG9yeS5wdXQoanNvbilcbiAgICByZWdpc3RlcklucHV0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRXaXRoVVJMKHVybCl7XG4gICAganNvbkxvYWRlci5sb2FkKHVybCwgZnVuY3Rpb24oZXJyLGpzb24pe1xuICAgICAgaWYoIGVyciApe1xuICAgICAgICB0aHJvd0Vycm9yKCdmYWlsZWQgdG8gZ2V0IEpTT04gKCcgKyB1cmwgKyAnKScpXG4gICAgICB9XG4gICAgICBpbml0V2l0aEpTT04oanNvbilcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZW1wdHlSZXN1bHRzQ29udGFpbmVyKCl7XG4gICAgb3B0aW9ucy5yZXN1bHRzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRUb1Jlc3VsdHNDb250YWluZXIodGV4dCl7XG4gICAgb3B0aW9ucy5yZXN1bHRzQ29udGFpbmVyLmlubmVySFRNTCArPSB0ZXh0XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcklucHV0KCl7XG4gICAgb3B0aW9ucy5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgdmFyIGtleSA9IGUud2hpY2hcbiAgICAgIHZhciBxdWVyeSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgICBpZiggaXNXaGl0ZWxpc3RlZEtleShrZXkpICYmIGlzVmFsaWRRdWVyeShxdWVyeSkgKSB7XG4gICAgICAgIGVtcHR5UmVzdWx0c0NvbnRhaW5lcigpO1xuICAgICAgICByZW5kZXIoIHJlcG9zaXRvcnkuc2VhcmNoKHF1ZXJ5KSApO1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXIocmVzdWx0cykge1xuICAgIGlmKCByZXN1bHRzLmxlbmd0aCA9PT0gMCApe1xuICAgICAgcmV0dXJuIGFwcGVuZFRvUmVzdWx0c0NvbnRhaW5lcihvcHRpb25zLm5vUmVzdWx0c1RleHQpXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXBwZW5kVG9SZXN1bHRzQ29udGFpbmVyKCB0ZW1wbGF0ZXIuY29tcGlsZShyZXN1bHRzW2ldKSApXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZFF1ZXJ5KHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ICYmIHF1ZXJ5Lmxlbmd0aCA+IDBcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzV2hpdGVsaXN0ZWRLZXkoa2V5KSB7XG4gICAgcmV0dXJuIFsxMywxNiwyMCwzNywzOCwzOSw0MCw5MV0uaW5kZXhPZihrZXkpID09PSAtMVxuICB9XG5cbiAgZnVuY3Rpb24gdGhyb3dFcnJvcihtZXNzYWdlKXsgdGhyb3cgbmV3IEVycm9yKCdTaW1wbGVKZWt5bGxTZWFyY2ggLS0tICcrIG1lc3NhZ2UpIH1cbn0pKHdpbmRvdywgZG9jdW1lbnQpO1xuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWVyZ2U6IG1lcmdlLFxuICBpc0pTT046IGlzSlNPTixcbn1cblxuZnVuY3Rpb24gbWVyZ2UoZGVmYXVsdFBhcmFtcywgbWVyZ2VQYXJhbXMpe1xuICB2YXIgbWVyZ2VkT3B0aW9ucyA9IHt9XG4gIGZvcih2YXIgb3B0aW9uIGluIGRlZmF1bHRQYXJhbXMpe1xuICAgIG1lcmdlZE9wdGlvbnNbb3B0aW9uXSA9IGRlZmF1bHRQYXJhbXNbb3B0aW9uXVxuICAgIGlmKCBtZXJnZVBhcmFtc1tvcHRpb25dICE9PSB1bmRlZmluZWQgKXtcbiAgICAgIG1lcmdlZE9wdGlvbnNbb3B0aW9uXSA9IG1lcmdlUGFyYW1zW29wdGlvbl1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1lcmdlZE9wdGlvbnNcbn1cblxuZnVuY3Rpb24gaXNKU09OKGpzb24pe1xuICB0cnl7XG4gICAgaWYoIGpzb24gaW5zdGFuY2VvZiBPYmplY3QgJiYgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShqc29uKSkgKXtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9Y2F0Y2goZSl7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cbiJdfQ==

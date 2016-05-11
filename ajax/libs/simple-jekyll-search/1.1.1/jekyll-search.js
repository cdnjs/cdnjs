(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'
module.exports = {
  load: load
}

function load(location,callback){
  var xhr
  if( window.XMLHttpRequest ){
    xhr = new XMLHttpRequest()
  }else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }

  xhr.open('GET', location, true)

  xhr.onreadystatechange = function(){
    if ( xhr.readyState===4 && xhr.status===200 ){
      try{
        callback(null, JSON.parse(xhr.responseText) )
      }catch(err){
        callback(err, null)
      }
    }
  }

  xhr.send()
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
  function makeFuzzy(string){
    string = string.split('').join('.*?')
    string = string.replace('??','?')
    return new RegExp( string, 'gi')
  }

  this.matches = function(string, crit){
    if( typeof string !== 'string' || typeof crit !== 'string' ){
      return false
    }
    string = string.trim()
    return !!makeFuzzy(crit).test(string)
  }
}

},{}],5:[function(require,module,exports){
'use strict'
module.exports = new LiteralSearchStrategy()

function LiteralSearchStrategy(){
  function matchesString(string,crit){
    return string.toLowerCase().indexOf(crit.toLowerCase()) >= 0
  }

  this.matches = function(string,crit){
    if( typeof string !== 'string' ){
      return false
    }
    string = string.trim()
    return matchesString(string, crit)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcGxheWdyb3VuZC9TaW1wbGUtSmVreWxsLVNlYXJjaC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9KU09OTG9hZGVyLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9PcHRpb25zVmFsaWRhdG9yLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9SZXBvc2l0b3J5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9TZWFyY2hTdHJhdGVnaWVzL0Z1enp5U2VhcmNoU3RyYXRlZ3kuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL1NlYXJjaFN0cmF0ZWdpZXMvTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9UZW1wbGF0ZXIuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL2Zha2VfMTA1NTUzN2YuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBsb2FkOiBsb2FkXG59XG5cbmZ1bmN0aW9uIGxvYWQobG9jYXRpb24sY2FsbGJhY2spe1xuICB2YXIgeGhyXG4gIGlmKCB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgKXtcbiAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICB9ZWxzZXtcbiAgICB4aHIgPSBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKVxuICB9XG5cbiAgeGhyLm9wZW4oJ0dFVCcsIGxvY2F0aW9uLCB0cnVlKVxuXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xuICAgIGlmICggeGhyLnJlYWR5U3RhdGU9PT00ICYmIHhoci5zdGF0dXM9PT0yMDAgKXtcbiAgICAgIHRyeXtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSApXG4gICAgICB9Y2F0Y2goZXJyKXtcbiAgICAgICAgY2FsbGJhY2soZXJyLCBudWxsKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHhoci5zZW5kKClcbn1cbiIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBPcHRpb25zVmFsaWRhdG9yKHBhcmFtcyl7XG4gIGlmKCAhdmFsaWRhdGVQYXJhbXMocGFyYW1zKSApe1xuICAgIHRocm93IG5ldyBFcnJvcignLS0gT3B0aW9uc1ZhbGlkYXRvcjogcmVxdWlyZWQgb3B0aW9ucyBtaXNzaW5nJylcbiAgfVxuICBpZiggISh0aGlzIGluc3RhbmNlb2YgT3B0aW9uc1ZhbGlkYXRvcikgKXtcbiAgICByZXR1cm4gbmV3IE9wdGlvbnNWYWxpZGF0b3IocGFyYW1zKVxuICB9XG5cbiAgdmFyIHJlcXVpcmVkT3B0aW9ucyA9IHBhcmFtcy5yZXF1aXJlZFxuXG4gIHRoaXMuZ2V0UmVxdWlyZWRPcHRpb25zID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gcmVxdWlyZWRPcHRpb25zXG4gIH1cblxuICB0aGlzLnZhbGlkYXRlID0gZnVuY3Rpb24ocGFyYW1ldGVycyl7XG4gICAgdmFyIGVycm9ycyA9IFtdXG4gICAgcmVxdWlyZWRPcHRpb25zLmZvckVhY2goZnVuY3Rpb24ocmVxdWlyZWRPcHRpb25OYW1lKXtcbiAgICAgIGlmKCBwYXJhbWV0ZXJzW3JlcXVpcmVkT3B0aW9uTmFtZV0gPT09IHVuZGVmaW5lZCApe1xuICAgICAgICBlcnJvcnMucHVzaChyZXF1aXJlZE9wdGlvbk5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZXJyb3JzXG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVBhcmFtcyhwYXJhbXMpe1xuICAgIGlmKCAhcGFyYW1zICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiBwYXJhbXMucmVxdWlyZWQgIT09IHVuZGVmaW5lZCAmJiBwYXJhbXMucmVxdWlyZWQgaW5zdGFuY2VvZiBBcnJheVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHV0OnB1dCxcbiAgY2xlYXI6IGNsZWFyLFxuICBnZXQ6IGdldCxcbiAgc2VhcmNoOiBzZWFyY2gsXG4gIHNldE9wdGlvbnM6IHNldE9wdGlvbnNcbn1cblxudmFyIEZ1enp5U2VhcmNoU3RyYXRlZ3kgPSByZXF1aXJlKCcuL1NlYXJjaFN0cmF0ZWdpZXMvRnV6enlTZWFyY2hTdHJhdGVneScpXG52YXIgTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9TZWFyY2hTdHJhdGVnaWVzL0xpdGVyYWxTZWFyY2hTdHJhdGVneScpXG5cbnZhciBkYXRhID0gW11cbnZhciBvcHQgPSB7fVxub3B0LmZ1enp5ID0gZmFsc2Vcbm9wdC5saW1pdCA9IDEwXG5vcHQuc2VhcmNoU3RyYXRlZ3kgPSBvcHQuZnV6enkgPyBGdXp6eVNlYXJjaFN0cmF0ZWd5IDogTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5XG5cblxuZnVuY3Rpb24gcHV0KGRhdGEpe1xuICBpZiggaXNPYmplY3QoZGF0YSkgKXtcbiAgICByZXR1cm4gYWRkT2JqZWN0KGRhdGEpXG4gIH1cbiAgaWYoIGlzQXJyYXkoZGF0YSkgKXtcbiAgICByZXR1cm4gYWRkQXJyYXkoZGF0YSlcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5mdW5jdGlvbiBjbGVhcigpe1xuICBkYXRhLmxlbmd0aCA9IDBcbiAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gZ2V0KCl7XG4gIHJldHVybiBkYXRhXG59XG5cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKXsgcmV0dXJuICEhb2JqICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJyB9XG5mdW5jdGlvbiBpc0FycmF5KG9iail7IHJldHVybiAhIW9iaiAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJyB9XG5cbmZ1bmN0aW9uIGFkZE9iamVjdChfZGF0YSl7XG4gIGRhdGEucHVzaChfZGF0YSlcbiAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gYWRkQXJyYXkoX2RhdGEpe1xuICB2YXIgYWRkZWQgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IF9kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICBpZiggaXNPYmplY3QoX2RhdGFbaV0pICl7XG4gICAgICBhZGRlZC5wdXNoKGFkZE9iamVjdChfZGF0YVtpXSkpXG4gICAgfVxuICB9XG4gIHJldHVybiBhZGRlZFxufVxuXG5cblxuZnVuY3Rpb24gc2VhcmNoKGNyaXQpe1xuICBpZiggIWNyaXQgKXtcbiAgICByZXR1cm4gW11cbiAgfVxuICByZXR1cm4gZmluZE1hdGNoZXMoZGF0YSxjcml0LG9wdC5zZWFyY2hTdHJhdGVneSxvcHQpXG59XG5cbmZ1bmN0aW9uIHNldE9wdGlvbnMoX29wdCl7XG4gIG9wdCA9IF9vcHQgfHwge31cblxuICBvcHQuZnV6enkgPSBfb3B0LmZ1enp5IHx8IGZhbHNlXG4gIG9wdC5saW1pdCA9IF9vcHQubGltaXQgfHwgMTBcbiAgb3B0LnNlYXJjaFN0cmF0ZWd5ID0gX29wdC5mdXp6eSA/IEZ1enp5U2VhcmNoU3RyYXRlZ3kgOiBMaXRlcmFsU2VhcmNoU3RyYXRlZ3lcbn1cblxuZnVuY3Rpb24gZmluZE1hdGNoZXMoZGF0YSxjcml0LHN0cmF0ZWd5LG9wdCl7XG4gIHZhciBtYXRjaGVzID0gW11cbiAgZm9yKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoICYmIG1hdGNoZXMubGVuZ3RoIDwgb3B0LmxpbWl0OyBpKyspIHtcbiAgICB2YXIgbWF0Y2ggPSBmaW5kTWF0Y2hlc0luT2JqZWN0KGRhdGFbaV0sY3JpdCxzdHJhdGVneSxvcHQpXG4gICAgaWYoIG1hdGNoICl7XG4gICAgICBtYXRjaGVzLnB1c2gobWF0Y2gpXG4gICAgfVxuICB9XG4gIHJldHVybiBtYXRjaGVzXG59XG5cbmZ1bmN0aW9uIGZpbmRNYXRjaGVzSW5PYmplY3Qob2JqLGNyaXQsc3RyYXRlZ3ksb3B0KXtcbiAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYoICFpc0V4Y2x1ZGVkKG9ialtrZXldLCBvcHQuZXhjbHVkZSkgJiYgc3RyYXRlZ3kubWF0Y2hlcyhvYmpba2V5XSwgY3JpdCkgKXtcbiAgICAgIHJldHVybiBvYmpcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFeGNsdWRlZCh0ZXJtLCBleGNsdWRlZFRlcm1zKXtcbiAgdmFyIGV4Y2x1ZGVkID0gZmFsc2VcbiAgZXhjbHVkZWRUZXJtcyA9IGV4Y2x1ZGVkVGVybXMgfHwgW11cbiAgZm9yICh2YXIgaSA9IDA7IGk8ZXhjbHVkZWRUZXJtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBleGNsdWRlZFRlcm0gPSBleGNsdWRlZFRlcm1zW2ldXG4gICAgaWYoICFleGNsdWRlZCAmJiBuZXcgUmVnRXhwKHRlcm0pLnRlc3QoZXhjbHVkZWRUZXJtKSApe1xuICAgICAgZXhjbHVkZWQgPSB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBleGNsdWRlZFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBGdXp6eVNlYXJjaFN0cmF0ZWd5KClcblxuZnVuY3Rpb24gRnV6enlTZWFyY2hTdHJhdGVneSgpe1xuICBmdW5jdGlvbiBtYWtlRnV6enkoc3RyaW5nKXtcbiAgICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJycpLmpvaW4oJy4qPycpXG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoJz8/JywnPycpXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoIHN0cmluZywgJ2dpJylcbiAgfVxuXG4gIHRoaXMubWF0Y2hlcyA9IGZ1bmN0aW9uKHN0cmluZywgY3JpdCl7XG4gICAgaWYoIHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjcml0ICE9PSAnc3RyaW5nJyApe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHN0cmluZyA9IHN0cmluZy50cmltKClcbiAgICByZXR1cm4gISFtYWtlRnV6enkoY3JpdCkudGVzdChzdHJpbmcpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5KClcblxuZnVuY3Rpb24gTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5KCl7XG4gIGZ1bmN0aW9uIG1hdGNoZXNTdHJpbmcoc3RyaW5nLGNyaXQpe1xuICAgIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKS5pbmRleE9mKGNyaXQudG9Mb3dlckNhc2UoKSkgPj0gMFxuICB9XG5cbiAgdGhpcy5tYXRjaGVzID0gZnVuY3Rpb24oc3RyaW5nLGNyaXQpe1xuICAgIGlmKCB0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJyApe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHN0cmluZyA9IHN0cmluZy50cmltKClcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmluZyhzdHJpbmcsIGNyaXQpXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbXBpbGU6IGNvbXBpbGUsXG4gIHNldE9wdGlvbnM6IHNldE9wdGlvbnNcbn1cblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy5wYXR0ZXJuID0gL1xceyguKj8pXFx9L2dcbm9wdGlvbnMudGVtcGxhdGUgPSAnJ1xub3B0aW9ucy5taWRkbGV3YXJlID0gZnVuY3Rpb24oKXt9XG5cbmZ1bmN0aW9uIHNldE9wdGlvbnMoX29wdGlvbnMpe1xuICBvcHRpb25zLnBhdHRlcm4gPSBfb3B0aW9ucy5wYXR0ZXJuIHx8IG9wdGlvbnMucGF0dGVyblxuICBvcHRpb25zLnRlbXBsYXRlID0gX29wdGlvbnMudGVtcGxhdGUgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuICBpZiggdHlwZW9mIF9vcHRpb25zLm1pZGRsZXdhcmUgPT09ICdmdW5jdGlvbicgKXtcbiAgICBvcHRpb25zLm1pZGRsZXdhcmUgPSBfb3B0aW9ucy5taWRkbGV3YXJlXG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcGlsZShkYXRhKXtcbiAgcmV0dXJuIG9wdGlvbnMudGVtcGxhdGUucmVwbGFjZShvcHRpb25zLnBhdHRlcm4sIGZ1bmN0aW9uKG1hdGNoLCBwcm9wKSB7XG4gICAgdmFyIHZhbHVlID0gb3B0aW9ucy5taWRkbGV3YXJlKHByb3AsIGRhdGFbcHJvcF0sIG9wdGlvbnMudGVtcGxhdGUpXG4gICAgaWYoIHZhbHVlICE9PSB1bmRlZmluZWQgKXtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICByZXR1cm4gZGF0YVtwcm9wXSB8fCBtYXRjaFxuICB9KVxufVxuIiwiOyhmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpe1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBzZWFyY2hJbnB1dDogbnVsbCxcbiAgICByZXN1bHRzQ29udGFpbmVyOiBudWxsLFxuICAgIGpzb246IFtdLFxuICAgIHNlYXJjaFJlc3VsdFRlbXBsYXRlOiAnPGxpPjxhIGhyZWY9XCJ7dXJsfVwiIHRpdGxlPVwie2Rlc2N9XCI+e3RpdGxlfTwvYT48L2xpPicsXG4gICAgdGVtcGxhdGVNaWRkbGV3YXJlOiBmdW5jdGlvbigpe30sXG4gICAgbm9SZXN1bHRzVGV4dDogJ05vIHJlc3VsdHMgZm91bmQnLFxuICAgIGxpbWl0OiAxMCxcbiAgICBmdXp6eTogZmFsc2UsXG4gICAgZXhjbHVkZTogW11cbiAgfVxuXG4gIHZhciByZXF1aXJlZE9wdGlvbnMgPSBbJ3NlYXJjaElucHV0JywncmVzdWx0c0NvbnRhaW5lcicsJ2pzb24nXVxuXG4gIHZhciB0ZW1wbGF0ZXIgPSByZXF1aXJlKCcuL1RlbXBsYXRlcicpXG4gIHZhciByZXBvc2l0b3J5ID0gcmVxdWlyZSgnLi9SZXBvc2l0b3J5JylcbiAgdmFyIGpzb25Mb2FkZXIgPSByZXF1aXJlKCcuL0pTT05Mb2FkZXInKVxuICB2YXIgb3B0aW9uc1ZhbGlkYXRvciA9IHJlcXVpcmUoJy4vT3B0aW9uc1ZhbGlkYXRvcicpKHtcbiAgICByZXF1aXJlZDogcmVxdWlyZWRPcHRpb25zXG4gIH0pXG4gIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuXG4gIC8qXG4gICAgUHVibGljIEFQSVxuICAqL1xuICB3aW5kb3cuU2ltcGxlSmVreWxsU2VhcmNoID0gZnVuY3Rpb24gU2ltcGxlSmVreWxsU2VhcmNoKF9vcHRpb25zKXtcbiAgICB2YXIgZXJyb3JzID0gb3B0aW9uc1ZhbGlkYXRvci52YWxpZGF0ZShfb3B0aW9ucylcbiAgICBpZiggZXJyb3JzLmxlbmd0aCA+IDAgKXtcbiAgICAgIHRocm93RXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgdGhlIGZvbGxvd2luZyByZXF1aXJlZCBvcHRpb25zOiAnICsgcmVxdWlyZWRPcHRpb25zKVxuICAgIH1cblxuICAgIG9wdGlvbnMgPSB1dGlscy5tZXJnZShvcHRpb25zLCBfb3B0aW9ucylcblxuICAgIHRlbXBsYXRlci5zZXRPcHRpb25zKHtcbiAgICAgIHRlbXBsYXRlOiBvcHRpb25zLnNlYXJjaFJlc3VsdFRlbXBsYXRlLFxuICAgICAgbWlkZGxld2FyZTogb3B0aW9ucy50ZW1wbGF0ZU1pZGRsZXdhcmUsXG4gICAgfSlcblxuICAgIHJlcG9zaXRvcnkuc2V0T3B0aW9ucyh7XG4gICAgICBmdXp6eTogb3B0aW9ucy5mdXp6eSxcbiAgICAgIGxpbWl0OiBvcHRpb25zLmxpbWl0LFxuICAgIH0pXG5cbiAgICBpZiggdXRpbHMuaXNKU09OKG9wdGlvbnMuanNvbikgKXtcbiAgICAgIGluaXRXaXRoSlNPTihvcHRpb25zLmpzb24pXG4gICAgfWVsc2V7XG4gICAgICBpbml0V2l0aFVSTChvcHRpb25zLmpzb24pXG4gICAgfVxuICB9XG5cbiAgLy8gZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gIHdpbmRvdy5TaW1wbGVKZWt5bGxTZWFyY2guaW5pdCA9IHdpbmRvdy5TaW1wbGVKZWt5bGxTZWFyY2hcblxuXG4gIGZ1bmN0aW9uIGluaXRXaXRoSlNPTihqc29uKXtcbiAgICByZXBvc2l0b3J5LnB1dChqc29uKVxuICAgIHJlZ2lzdGVySW5wdXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFdpdGhVUkwodXJsKXtcbiAgICBqc29uTG9hZGVyLmxvYWQodXJsLCBmdW5jdGlvbihlcnIsanNvbil7XG4gICAgICBpZiggZXJyICl7XG4gICAgICAgIHRocm93RXJyb3IoJ2ZhaWxlZCB0byBnZXQgSlNPTiAoJyArIHVybCArICcpJylcbiAgICAgIH1cbiAgICAgIGluaXRXaXRoSlNPTihqc29uKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBlbXB0eVJlc3VsdHNDb250YWluZXIoKXtcbiAgICBvcHRpb25zLnJlc3VsdHNDb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZFRvUmVzdWx0c0NvbnRhaW5lcih0ZXh0KXtcbiAgICBvcHRpb25zLnJlc3VsdHNDb250YWluZXIuaW5uZXJIVE1MICs9IHRleHRcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVySW5wdXQoKXtcbiAgICBvcHRpb25zLnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICB2YXIga2V5ID0gZS53aGljaFxuICAgICAgdmFyIHF1ZXJ5ID0gZS50YXJnZXQudmFsdWVcbiAgICAgIGlmKCBpc1doaXRlbGlzdGVkS2V5KGtleSkgJiYgaXNWYWxpZFF1ZXJ5KHF1ZXJ5KSApIHtcbiAgICAgICAgZW1wdHlSZXN1bHRzQ29udGFpbmVyKCk7XG4gICAgICAgIHJlbmRlciggcmVwb3NpdG9yeS5zZWFyY2gocXVlcnkpICk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcihyZXN1bHRzKSB7XG4gICAgaWYoIHJlc3VsdHMubGVuZ3RoID09PSAwICl7XG4gICAgICByZXR1cm4gYXBwZW5kVG9SZXN1bHRzQ29udGFpbmVyKG9wdGlvbnMubm9SZXN1bHRzVGV4dClcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcHBlbmRUb1Jlc3VsdHNDb250YWluZXIoIHRlbXBsYXRlci5jb21waWxlKHJlc3VsdHNbaV0pIClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1ZhbGlkUXVlcnkocXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgJiYgcXVlcnkubGVuZ3RoID4gMFxuICB9XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZWxpc3RlZEtleShrZXkpIHtcbiAgICByZXR1cm4gWzEzLDE2LDIwLDM3LDM4LDM5LDQwLDkxXS5pbmRleE9mKGtleSkgPT09IC0xXG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0Vycm9yKG1lc3NhZ2UpeyB0aHJvdyBuZXcgRXJyb3IoJ1NpbXBsZUpla3lsbFNlYXJjaCAtLS0gJysgbWVzc2FnZSkgfVxufSkod2luZG93LCBkb2N1bWVudCk7XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXJnZTogbWVyZ2UsXG4gIGlzSlNPTjogaXNKU09OLFxufVxuXG5mdW5jdGlvbiBtZXJnZShkZWZhdWx0UGFyYW1zLCBtZXJnZVBhcmFtcyl7XG4gIHZhciBtZXJnZWRPcHRpb25zID0ge31cbiAgZm9yKHZhciBvcHRpb24gaW4gZGVmYXVsdFBhcmFtcyl7XG4gICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gZGVmYXVsdFBhcmFtc1tvcHRpb25dXG4gICAgaWYoIG1lcmdlUGFyYW1zW29wdGlvbl0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gbWVyZ2VQYXJhbXNbb3B0aW9uXVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkT3B0aW9uc1xufVxuXG5mdW5jdGlvbiBpc0pTT04oanNvbil7XG4gIHRyeXtcbiAgICBpZigganNvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGpzb24pKSApe1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1jYXRjaChlKXtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIl19

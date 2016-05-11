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
      emptyResultsContainer()
      if( e.target.value.length > 0 ){
        render( repository.search(e.target.value) )
      }
    })
  }

  function render(results){
    if( results.length === 0 ){
      return appendToResultsContainer(options.noResultsText)
    }
    for (var i = 0; i < results.length; i++) {
      appendToResultsContainer( templater.compile(results[i]) )
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcGxheWdyb3VuZC9TaW1wbGUtSmVreWxsLVNlYXJjaC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9KU09OTG9hZGVyLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9PcHRpb25zVmFsaWRhdG9yLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9SZXBvc2l0b3J5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9TZWFyY2hTdHJhdGVnaWVzL0Z1enp5U2VhcmNoU3RyYXRlZ3kuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL1NlYXJjaFN0cmF0ZWdpZXMvTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9UZW1wbGF0ZXIuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL2Zha2VfYTgwOWFhOGEuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxvYWQ6IGxvYWRcbn1cblxuZnVuY3Rpb24gbG9hZChsb2NhdGlvbixjYWxsYmFjayl7XG4gIHZhciB4aHJcbiAgaWYoIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCApe1xuICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gIH1lbHNle1xuICAgIHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpXG4gIH1cblxuICB4aHIub3BlbignR0VUJywgbG9jYXRpb24sIHRydWUpXG5cbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgaWYgKCB4aHIucmVhZHlTdGF0ZT09PTQgJiYgeGhyLnN0YXR1cz09PTIwMCApe1xuICAgICAgdHJ5e1xuICAgICAgICBjYWxsYmFjayhudWxsLCBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpIClcbiAgICAgIH1jYXRjaChlcnIpe1xuICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgeGhyLnNlbmQoKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIE9wdGlvbnNWYWxpZGF0b3IocGFyYW1zKXtcbiAgaWYoICF2YWxpZGF0ZVBhcmFtcyhwYXJhbXMpICl7XG4gICAgdGhyb3cgbmV3IEVycm9yKCctLSBPcHRpb25zVmFsaWRhdG9yOiByZXF1aXJlZCBvcHRpb25zIG1pc3NpbmcnKVxuICB9XG4gIGlmKCAhKHRoaXMgaW5zdGFuY2VvZiBPcHRpb25zVmFsaWRhdG9yKSApe1xuICAgIHJldHVybiBuZXcgT3B0aW9uc1ZhbGlkYXRvcihwYXJhbXMpXG4gIH1cblxuICB2YXIgcmVxdWlyZWRPcHRpb25zID0gcGFyYW1zLnJlcXVpcmVkXG5cbiAgdGhpcy5nZXRSZXF1aXJlZE9wdGlvbnMgPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiByZXF1aXJlZE9wdGlvbnNcbiAgfVxuXG4gIHRoaXMudmFsaWRhdGUgPSBmdW5jdGlvbihwYXJhbWV0ZXJzKXtcbiAgICB2YXIgZXJyb3JzID0gW11cbiAgICByZXF1aXJlZE9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihyZXF1aXJlZE9wdGlvbk5hbWUpe1xuICAgICAgaWYoIHBhcmFtZXRlcnNbcmVxdWlyZWRPcHRpb25OYW1lXSA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgIGVycm9ycy5wdXNoKHJlcXVpcmVkT3B0aW9uTmFtZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBlcnJvcnNcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlUGFyYW1zKHBhcmFtcyl7XG4gICAgaWYoICFwYXJhbXMgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcy5yZXF1aXJlZCAhPT0gdW5kZWZpbmVkICYmIHBhcmFtcy5yZXF1aXJlZCBpbnN0YW5jZW9mIEFycmF5XG4gIH1cbn0iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBwdXQ6cHV0LFxuICBjbGVhcjogY2xlYXIsXG4gIGdldDogZ2V0LFxuICBzZWFyY2g6IHNlYXJjaCxcbiAgc2V0T3B0aW9uczogc2V0T3B0aW9uc1xufVxuXG52YXIgRnV6enlTZWFyY2hTdHJhdGVneSA9IHJlcXVpcmUoJy4vU2VhcmNoU3RyYXRlZ2llcy9GdXp6eVNlYXJjaFN0cmF0ZWd5JylcbnZhciBMaXRlcmFsU2VhcmNoU3RyYXRlZ3kgPSByZXF1aXJlKCcuL1NlYXJjaFN0cmF0ZWdpZXMvTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5JylcblxudmFyIGRhdGEgPSBbXVxudmFyIG9wdCA9IHt9XG5vcHQuZnV6enkgPSBmYWxzZVxub3B0LmxpbWl0ID0gMTBcbm9wdC5zZWFyY2hTdHJhdGVneSA9IG9wdC5mdXp6eSA/IEZ1enp5U2VhcmNoU3RyYXRlZ3kgOiBMaXRlcmFsU2VhcmNoU3RyYXRlZ3lcblxuXG5mdW5jdGlvbiBwdXQoZGF0YSl7XG4gIGlmKCBpc09iamVjdChkYXRhKSApe1xuICAgIHJldHVybiBhZGRPYmplY3QoZGF0YSlcbiAgfVxuICBpZiggaXNBcnJheShkYXRhKSApe1xuICAgIHJldHVybiBhZGRBcnJheShkYXRhKVxuICB9XG4gIHJldHVybiB1bmRlZmluZWRcbn1cbmZ1bmN0aW9uIGNsZWFyKCl7XG4gIGRhdGEubGVuZ3RoID0gMFxuICByZXR1cm4gZGF0YVxufVxuXG5mdW5jdGlvbiBnZXQoKXtcbiAgcmV0dXJuIGRhdGFcbn1cblxuXG5mdW5jdGlvbiBpc09iamVjdChvYmopeyByZXR1cm4gISFvYmogJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nIH1cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKXsgcmV0dXJuICEhb2JqICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nIH1cblxuZnVuY3Rpb24gYWRkT2JqZWN0KF9kYXRhKXtcbiAgZGF0YS5wdXNoKF9kYXRhKVxuICByZXR1cm4gZGF0YVxufVxuXG5mdW5jdGlvbiBhZGRBcnJheShfZGF0YSl7XG4gIHZhciBhZGRlZCA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgX2RhdGEubGVuZ3RoOyBpKyspe1xuICAgIGlmKCBpc09iamVjdChfZGF0YVtpXSkgKXtcbiAgICAgIGFkZGVkLnB1c2goYWRkT2JqZWN0KF9kYXRhW2ldKSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFkZGVkXG59XG5cblxuXG5mdW5jdGlvbiBzZWFyY2goY3JpdCl7XG4gIGlmKCAhY3JpdCApe1xuICAgIHJldHVybiBbXVxuICB9XG4gIHJldHVybiBmaW5kTWF0Y2hlcyhkYXRhLGNyaXQsb3B0LnNlYXJjaFN0cmF0ZWd5LG9wdClcbn1cblxuZnVuY3Rpb24gc2V0T3B0aW9ucyhfb3B0KXtcbiAgb3B0ID0gX29wdCB8fCB7fVxuXG4gIG9wdC5mdXp6eSA9IF9vcHQuZnV6enkgfHwgZmFsc2VcbiAgb3B0LmxpbWl0ID0gX29wdC5saW1pdCB8fCAxMFxuICBvcHQuc2VhcmNoU3RyYXRlZ3kgPSBfb3B0LmZ1enp5ID8gRnV6enlTZWFyY2hTdHJhdGVneSA6IExpdGVyYWxTZWFyY2hTdHJhdGVneVxufVxuXG5mdW5jdGlvbiBmaW5kTWF0Y2hlcyhkYXRhLGNyaXQsc3RyYXRlZ3ksb3B0KXtcbiAgdmFyIG1hdGNoZXMgPSBbXVxuICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGggJiYgbWF0Y2hlcy5sZW5ndGggPCBvcHQubGltaXQ7IGkrKykge1xuICAgIHZhciBtYXRjaCA9IGZpbmRNYXRjaGVzSW5PYmplY3QoZGF0YVtpXSxjcml0LHN0cmF0ZWd5LG9wdClcbiAgICBpZiggbWF0Y2ggKXtcbiAgICAgIG1hdGNoZXMucHVzaChtYXRjaClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hdGNoZXNcbn1cblxuZnVuY3Rpb24gZmluZE1hdGNoZXNJbk9iamVjdChvYmosY3JpdCxzdHJhdGVneSxvcHQpe1xuICBmb3IodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiggIWlzRXhjbHVkZWQob2JqW2tleV0sIG9wdC5leGNsdWRlKSAmJiBzdHJhdGVneS5tYXRjaGVzKG9ialtrZXldLCBjcml0KSApe1xuICAgICAgcmV0dXJuIG9ialxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0V4Y2x1ZGVkKHRlcm0sIGV4Y2x1ZGVkVGVybXMpe1xuICB2YXIgZXhjbHVkZWQgPSBmYWxzZVxuICBleGNsdWRlZFRlcm1zID0gZXhjbHVkZWRUZXJtcyB8fCBbXVxuICBmb3IgKHZhciBpID0gMDsgaTxleGNsdWRlZFRlcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGV4Y2x1ZGVkVGVybSA9IGV4Y2x1ZGVkVGVybXNbaV1cbiAgICBpZiggIWV4Y2x1ZGVkICYmIG5ldyBSZWdFeHAodGVybSkudGVzdChleGNsdWRlZFRlcm0pICl7XG4gICAgICBleGNsdWRlZCA9IHRydWVcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGV4Y2x1ZGVkXG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gbmV3IEZ1enp5U2VhcmNoU3RyYXRlZ3koKVxuXG5mdW5jdGlvbiBGdXp6eVNlYXJjaFN0cmF0ZWd5KCl7XG4gIGZ1bmN0aW9uIG1ha2VGdXp6eShzdHJpbmcpe1xuICAgIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnJykuam9pbignLio/JylcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgnPz8nLCc/JylcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCggc3RyaW5nLCAnZ2knKVxuICB9XG5cbiAgdGhpcy5tYXRjaGVzID0gZnVuY3Rpb24oc3RyaW5nLCBjcml0KXtcbiAgICBpZiggdHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNyaXQgIT09ICdzdHJpbmcnICl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgc3RyaW5nID0gc3RyaW5nLnRyaW0oKVxuICAgIHJldHVybiAhIW1ha2VGdXp6eShjcml0KS50ZXN0KHN0cmluZylcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMaXRlcmFsU2VhcmNoU3RyYXRlZ3koKVxuXG5mdW5jdGlvbiBMaXRlcmFsU2VhcmNoU3RyYXRlZ3koKXtcbiAgZnVuY3Rpb24gbWF0Y2hlc1N0cmluZyhzdHJpbmcsY3JpdCl7XG4gICAgcmV0dXJuIHN0cmluZy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoY3JpdC50b0xvd2VyQ2FzZSgpKSA+PSAwXG4gIH1cblxuICB0aGlzLm1hdGNoZXMgPSBmdW5jdGlvbihzdHJpbmcsY3JpdCl7XG4gICAgaWYoIHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnICl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgc3RyaW5nID0gc3RyaW5nLnRyaW0oKVxuICAgIHJldHVybiBtYXRjaGVzU3RyaW5nKHN0cmluZywgY3JpdClcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcGlsZTogY29tcGlsZSxcbiAgc2V0T3B0aW9uczogc2V0T3B0aW9uc1xufVxuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnBhdHRlcm4gPSAvXFx7KC4qPylcXH0vZ1xub3B0aW9ucy50ZW1wbGF0ZSA9ICcnXG5vcHRpb25zLm1pZGRsZXdhcmUgPSBmdW5jdGlvbigpe31cblxuZnVuY3Rpb24gc2V0T3B0aW9ucyhfb3B0aW9ucyl7XG4gIG9wdGlvbnMucGF0dGVybiA9IF9vcHRpb25zLnBhdHRlcm4gfHwgb3B0aW9ucy5wYXR0ZXJuXG4gIG9wdGlvbnMudGVtcGxhdGUgPSBfb3B0aW9ucy50ZW1wbGF0ZSB8fCBvcHRpb25zLnRlbXBsYXRlXG4gIGlmKCB0eXBlb2YgX29wdGlvbnMubWlkZGxld2FyZSA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgIG9wdGlvbnMubWlkZGxld2FyZSA9IF9vcHRpb25zLm1pZGRsZXdhcmVcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21waWxlKGRhdGEpe1xuICByZXR1cm4gb3B0aW9ucy50ZW1wbGF0ZS5yZXBsYWNlKG9wdGlvbnMucGF0dGVybiwgZnVuY3Rpb24obWF0Y2gsIHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBvcHRpb25zLm1pZGRsZXdhcmUocHJvcCwgZGF0YVtwcm9wXSwgb3B0aW9ucy50ZW1wbGF0ZSlcbiAgICBpZiggdmFsdWUgIT09IHVuZGVmaW5lZCApe1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHJldHVybiBkYXRhW3Byb3BdIHx8IG1hdGNoXG4gIH0pXG59XG4iLCI7KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCl7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIHNlYXJjaElucHV0OiBudWxsLFxuICAgIHJlc3VsdHNDb250YWluZXI6IG51bGwsXG4gICAganNvbjogW10sXG4gICAgc2VhcmNoUmVzdWx0VGVtcGxhdGU6ICc8bGk+PGEgaHJlZj1cInt1cmx9XCIgdGl0bGU9XCJ7ZGVzY31cIj57dGl0bGV9PC9hPjwvbGk+JyxcbiAgICB0ZW1wbGF0ZU1pZGRsZXdhcmU6IGZ1bmN0aW9uKCl7fSxcbiAgICBub1Jlc3VsdHNUZXh0OiAnTm8gcmVzdWx0cyBmb3VuZCcsXG4gICAgbGltaXQ6IDEwLFxuICAgIGZ1enp5OiBmYWxzZSxcbiAgICBleGNsdWRlOiBbXVxuICB9XG5cbiAgdmFyIHJlcXVpcmVkT3B0aW9ucyA9IFsnc2VhcmNoSW5wdXQnLCdyZXN1bHRzQ29udGFpbmVyJywnanNvbiddXG5cbiAgdmFyIHRlbXBsYXRlciA9IHJlcXVpcmUoJy4vVGVtcGxhdGVyJylcbiAgdmFyIHJlcG9zaXRvcnkgPSByZXF1aXJlKCcuL1JlcG9zaXRvcnknKVxuICB2YXIganNvbkxvYWRlciA9IHJlcXVpcmUoJy4vSlNPTkxvYWRlcicpXG4gIHZhciBvcHRpb25zVmFsaWRhdG9yID0gcmVxdWlyZSgnLi9PcHRpb25zVmFsaWRhdG9yJykoe1xuICAgIHJlcXVpcmVkOiByZXF1aXJlZE9wdGlvbnNcbiAgfSlcbiAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG5cbiAgLypcbiAgICBQdWJsaWMgQVBJXG4gICovXG4gIHdpbmRvdy5TaW1wbGVKZWt5bGxTZWFyY2ggPSBmdW5jdGlvbiBTaW1wbGVKZWt5bGxTZWFyY2goX29wdGlvbnMpe1xuICAgIHZhciBlcnJvcnMgPSBvcHRpb25zVmFsaWRhdG9yLnZhbGlkYXRlKF9vcHRpb25zKVxuICAgIGlmKCBlcnJvcnMubGVuZ3RoID4gMCApe1xuICAgICAgdGhyb3dFcnJvcignWW91IG11c3Qgc3BlY2lmeSB0aGUgZm9sbG93aW5nIHJlcXVpcmVkIG9wdGlvbnM6ICcgKyByZXF1aXJlZE9wdGlvbnMpXG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IHV0aWxzLm1lcmdlKG9wdGlvbnMsIF9vcHRpb25zKVxuXG4gICAgdGVtcGxhdGVyLnNldE9wdGlvbnMoe1xuICAgICAgdGVtcGxhdGU6IG9wdGlvbnMuc2VhcmNoUmVzdWx0VGVtcGxhdGUsXG4gICAgICBtaWRkbGV3YXJlOiBvcHRpb25zLnRlbXBsYXRlTWlkZGxld2FyZSxcbiAgICB9KVxuXG4gICAgcmVwb3NpdG9yeS5zZXRPcHRpb25zKHtcbiAgICAgIGZ1enp5OiBvcHRpb25zLmZ1enp5LFxuICAgICAgbGltaXQ6IG9wdGlvbnMubGltaXQsXG4gICAgfSlcblxuICAgIGlmKCB1dGlscy5pc0pTT04ob3B0aW9ucy5qc29uKSApe1xuICAgICAgaW5pdFdpdGhKU09OKG9wdGlvbnMuanNvbilcbiAgICB9ZWxzZXtcbiAgICAgIGluaXRXaXRoVVJMKG9wdGlvbnMuanNvbilcbiAgICB9XG4gIH1cblxuICAvLyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaC5pbml0ID0gd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaFxuXG5cbiAgZnVuY3Rpb24gaW5pdFdpdGhKU09OKGpzb24pe1xuICAgIHJlcG9zaXRvcnkucHV0KGpzb24pXG4gICAgcmVnaXN0ZXJJbnB1dCgpXG4gIH1cblxuICBmdW5jdGlvbiBpbml0V2l0aFVSTCh1cmwpe1xuICAgIGpzb25Mb2FkZXIubG9hZCh1cmwsIGZ1bmN0aW9uKGVycixqc29uKXtcbiAgICAgIGlmKCBlcnIgKXtcbiAgICAgICAgdGhyb3dFcnJvcignZmFpbGVkIHRvIGdldCBKU09OICgnICsgdXJsICsgJyknKVxuICAgICAgfVxuICAgICAgaW5pdFdpdGhKU09OKGpzb24pXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5UmVzdWx0c0NvbnRhaW5lcigpe1xuICAgIG9wdGlvbnMucmVzdWx0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwZW5kVG9SZXN1bHRzQ29udGFpbmVyKHRleHQpe1xuICAgIG9wdGlvbnMucmVzdWx0c0NvbnRhaW5lci5pbm5lckhUTUwgKz0gdGV4dFxuICB9XG5cbiAgZnVuY3Rpb24gcmVnaXN0ZXJJbnB1dCgpe1xuICAgIG9wdGlvbnMuc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgIGVtcHR5UmVzdWx0c0NvbnRhaW5lcigpXG4gICAgICBpZiggZS50YXJnZXQudmFsdWUubGVuZ3RoID4gMCApe1xuICAgICAgICByZW5kZXIoIHJlcG9zaXRvcnkuc2VhcmNoKGUudGFyZ2V0LnZhbHVlKSApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcihyZXN1bHRzKXtcbiAgICBpZiggcmVzdWx0cy5sZW5ndGggPT09IDAgKXtcbiAgICAgIHJldHVybiBhcHBlbmRUb1Jlc3VsdHNDb250YWluZXIob3B0aW9ucy5ub1Jlc3VsdHNUZXh0KVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFwcGVuZFRvUmVzdWx0c0NvbnRhaW5lciggdGVtcGxhdGVyLmNvbXBpbGUocmVzdWx0c1tpXSkgKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRocm93RXJyb3IobWVzc2FnZSl7IHRocm93IG5ldyBFcnJvcignU2ltcGxlSmVreWxsU2VhcmNoIC0tLSAnKyBtZXNzYWdlKSB9XG59KSh3aW5kb3csIGRvY3VtZW50KTsiLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXJnZTogbWVyZ2UsXG4gIGlzSlNPTjogaXNKU09OLFxufVxuXG5mdW5jdGlvbiBtZXJnZShkZWZhdWx0UGFyYW1zLCBtZXJnZVBhcmFtcyl7XG4gIHZhciBtZXJnZWRPcHRpb25zID0ge31cbiAgZm9yKHZhciBvcHRpb24gaW4gZGVmYXVsdFBhcmFtcyl7XG4gICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gZGVmYXVsdFBhcmFtc1tvcHRpb25dXG4gICAgaWYoIG1lcmdlUGFyYW1zW29wdGlvbl0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gbWVyZ2VQYXJhbXNbb3B0aW9uXVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkT3B0aW9uc1xufVxuXG5mdW5jdGlvbiBpc0pTT04oanNvbil7XG4gIHRyeXtcbiAgICBpZigganNvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGpzb24pKSApe1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1jYXRjaChlKXtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIl19

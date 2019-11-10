(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function fuzzysearch (needle, haystack) {
  var tlen = haystack.length;
  var qlen = needle.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < qlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < tlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

module.exports = fuzzysearch;

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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

},{"./SearchStrategies/FuzzySearchStrategy":5,"./SearchStrategies/LiteralSearchStrategy":6}],5:[function(require,module,exports){
'use strict'
var fuzzysearch = require('fuzzysearch')

module.exports = new FuzzySearchStrategy()

function FuzzySearchStrategy(){
  this.matches = function(string, crit){
    return fuzzysearch(crit, string)
  }
}

},{"fuzzysearch":1}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
  
  if (typeof window.SimpleJekyllSearchInit === 'function') {
    window.SimpleJekyllSearchInit.call(this, window.SimpleJekyllSearch);
  }

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
      if( isWhitelistedKey(key) ) {
        emptyResultsContainer();
        var query = e.target.value
        if( isValidQuery(query) ) {
          render( repository.search(query) );
        }
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

},{"./JSONLoader":2,"./OptionsValidator":3,"./Repository":4,"./Templater":7,"./utils":9}],9:[function(require,module,exports){
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

},{}]},{},[8])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcHJvamVjdHMvU2ltcGxlLUpla3lsbC1TZWFyY2gvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcHJvamVjdHMvU2ltcGxlLUpla3lsbC1TZWFyY2gvbm9kZV9tb2R1bGVzL2Z1enp5c2VhcmNoL2luZGV4LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wcm9qZWN0cy9TaW1wbGUtSmVreWxsLVNlYXJjaC9zcmMvSlNPTkxvYWRlci5qcyIsIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcHJvamVjdHMvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL09wdGlvbnNWYWxpZGF0b3IuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3Byb2plY3RzL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9SZXBvc2l0b3J5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wcm9qZWN0cy9TaW1wbGUtSmVreWxsLVNlYXJjaC9zcmMvU2VhcmNoU3RyYXRlZ2llcy9GdXp6eVNlYXJjaFN0cmF0ZWd5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wcm9qZWN0cy9TaW1wbGUtSmVreWxsLVNlYXJjaC9zcmMvU2VhcmNoU3RyYXRlZ2llcy9MaXRlcmFsU2VhcmNoU3RyYXRlZ3kuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3Byb2plY3RzL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9UZW1wbGF0ZXIuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3Byb2plY3RzL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9mYWtlXzlmNDQ2OWI0LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wcm9qZWN0cy9TaW1wbGUtSmVreWxsLVNlYXJjaC9zcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZnV6enlzZWFyY2ggKG5lZWRsZSwgaGF5c3RhY2spIHtcbiAgdmFyIHRsZW4gPSBoYXlzdGFjay5sZW5ndGg7XG4gIHZhciBxbGVuID0gbmVlZGxlLmxlbmd0aDtcbiAgaWYgKHFsZW4gPiB0bGVuKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChxbGVuID09PSB0bGVuKSB7XG4gICAgcmV0dXJuIG5lZWRsZSA9PT0gaGF5c3RhY2s7XG4gIH1cbiAgb3V0ZXI6IGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IHFsZW47IGkrKykge1xuICAgIHZhciBuY2ggPSBuZWVkbGUuY2hhckNvZGVBdChpKTtcbiAgICB3aGlsZSAoaiA8IHRsZW4pIHtcbiAgICAgIGlmIChoYXlzdGFjay5jaGFyQ29kZUF0KGorKykgPT09IG5jaCkge1xuICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1enp5c2VhcmNoO1xuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbG9hZDogbG9hZFxufVxuXG5mdW5jdGlvbiBsb2FkKGxvY2F0aW9uLGNhbGxiYWNrKXtcbiAgdmFyIHhociA9IGdldFhIUigpXG4gIHhoci5vcGVuKCdHRVQnLCBsb2NhdGlvbiwgdHJ1ZSlcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGNyZWF0ZVN0YXRlQ2hhbmdlTGlzdGVuZXIoeGhyLCBjYWxsYmFjaylcbiAgeGhyLnNlbmQoKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdGF0ZUNoYW5nZUxpc3RlbmVyKHhociwgY2FsbGJhY2spe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBpZiAoIHhoci5yZWFkeVN0YXRlPT09NCAmJiB4aHIuc3RhdHVzPT09MjAwICl7XG4gICAgICB0cnl7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkgKVxuICAgICAgfWNhdGNoKGVycil7XG4gICAgICAgIGNhbGxiYWNrKGVyciwgbnVsbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0WEhSKCl7XG4gIHJldHVybiAod2luZG93LlhNTEh0dHBSZXF1ZXN0KSA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJylcbn1cbiIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBPcHRpb25zVmFsaWRhdG9yKHBhcmFtcyl7XG4gIGlmKCAhdmFsaWRhdGVQYXJhbXMocGFyYW1zKSApe1xuICAgIHRocm93IG5ldyBFcnJvcignLS0gT3B0aW9uc1ZhbGlkYXRvcjogcmVxdWlyZWQgb3B0aW9ucyBtaXNzaW5nJylcbiAgfVxuICBpZiggISh0aGlzIGluc3RhbmNlb2YgT3B0aW9uc1ZhbGlkYXRvcikgKXtcbiAgICByZXR1cm4gbmV3IE9wdGlvbnNWYWxpZGF0b3IocGFyYW1zKVxuICB9XG5cbiAgdmFyIHJlcXVpcmVkT3B0aW9ucyA9IHBhcmFtcy5yZXF1aXJlZFxuXG4gIHRoaXMuZ2V0UmVxdWlyZWRPcHRpb25zID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gcmVxdWlyZWRPcHRpb25zXG4gIH1cblxuICB0aGlzLnZhbGlkYXRlID0gZnVuY3Rpb24ocGFyYW1ldGVycyl7XG4gICAgdmFyIGVycm9ycyA9IFtdXG4gICAgcmVxdWlyZWRPcHRpb25zLmZvckVhY2goZnVuY3Rpb24ocmVxdWlyZWRPcHRpb25OYW1lKXtcbiAgICAgIGlmKCBwYXJhbWV0ZXJzW3JlcXVpcmVkT3B0aW9uTmFtZV0gPT09IHVuZGVmaW5lZCApe1xuICAgICAgICBlcnJvcnMucHVzaChyZXF1aXJlZE9wdGlvbk5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZXJyb3JzXG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVBhcmFtcyhwYXJhbXMpe1xuICAgIGlmKCAhcGFyYW1zICkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiBwYXJhbXMucmVxdWlyZWQgIT09IHVuZGVmaW5lZCAmJiBwYXJhbXMucmVxdWlyZWQgaW5zdGFuY2VvZiBBcnJheVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcHV0OnB1dCxcbiAgY2xlYXI6IGNsZWFyLFxuICBnZXQ6IGdldCxcbiAgc2VhcmNoOiBzZWFyY2gsXG4gIHNldE9wdGlvbnM6IHNldE9wdGlvbnNcbn1cblxudmFyIEZ1enp5U2VhcmNoU3RyYXRlZ3kgPSByZXF1aXJlKCcuL1NlYXJjaFN0cmF0ZWdpZXMvRnV6enlTZWFyY2hTdHJhdGVneScpXG52YXIgTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9TZWFyY2hTdHJhdGVnaWVzL0xpdGVyYWxTZWFyY2hTdHJhdGVneScpXG5cbnZhciBkYXRhID0gW11cbnZhciBvcHQgPSB7fVxub3B0LmZ1enp5ID0gZmFsc2Vcbm9wdC5saW1pdCA9IDEwXG5vcHQuc2VhcmNoU3RyYXRlZ3kgPSBvcHQuZnV6enkgPyBGdXp6eVNlYXJjaFN0cmF0ZWd5IDogTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5XG5cblxuZnVuY3Rpb24gcHV0KGRhdGEpe1xuICBpZiggaXNPYmplY3QoZGF0YSkgKXtcbiAgICByZXR1cm4gYWRkT2JqZWN0KGRhdGEpXG4gIH1cbiAgaWYoIGlzQXJyYXkoZGF0YSkgKXtcbiAgICByZXR1cm4gYWRkQXJyYXkoZGF0YSlcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkXG59XG5mdW5jdGlvbiBjbGVhcigpe1xuICBkYXRhLmxlbmd0aCA9IDBcbiAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gZ2V0KCl7XG4gIHJldHVybiBkYXRhXG59XG5cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKXsgcmV0dXJuICEhb2JqICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJyB9XG5mdW5jdGlvbiBpc0FycmF5KG9iail7IHJldHVybiAhIW9iaiAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJyB9XG5cbmZ1bmN0aW9uIGFkZE9iamVjdChfZGF0YSl7XG4gIGRhdGEucHVzaChfZGF0YSlcbiAgcmV0dXJuIGRhdGFcbn1cblxuZnVuY3Rpb24gYWRkQXJyYXkoX2RhdGEpe1xuICB2YXIgYWRkZWQgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IF9kYXRhLmxlbmd0aDsgaSsrKXtcbiAgICBpZiggaXNPYmplY3QoX2RhdGFbaV0pICl7XG4gICAgICBhZGRlZC5wdXNoKGFkZE9iamVjdChfZGF0YVtpXSkpXG4gICAgfVxuICB9XG4gIHJldHVybiBhZGRlZFxufVxuXG5cblxuZnVuY3Rpb24gc2VhcmNoKGNyaXQpe1xuICBpZiggIWNyaXQgKXtcbiAgICByZXR1cm4gW11cbiAgfVxuICByZXR1cm4gZmluZE1hdGNoZXMoZGF0YSxjcml0LG9wdC5zZWFyY2hTdHJhdGVneSxvcHQpXG59XG5cbmZ1bmN0aW9uIHNldE9wdGlvbnMoX29wdCl7XG4gIG9wdCA9IF9vcHQgfHwge31cblxuICBvcHQuZnV6enkgPSBfb3B0LmZ1enp5IHx8IGZhbHNlXG4gIG9wdC5saW1pdCA9IF9vcHQubGltaXQgfHwgMTBcbiAgb3B0LnNlYXJjaFN0cmF0ZWd5ID0gX29wdC5mdXp6eSA/IEZ1enp5U2VhcmNoU3RyYXRlZ3kgOiBMaXRlcmFsU2VhcmNoU3RyYXRlZ3lcbn1cblxuZnVuY3Rpb24gZmluZE1hdGNoZXMoZGF0YSxjcml0LHN0cmF0ZWd5LG9wdCl7XG4gIHZhciBtYXRjaGVzID0gW11cbiAgZm9yKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoICYmIG1hdGNoZXMubGVuZ3RoIDwgb3B0LmxpbWl0OyBpKyspIHtcbiAgICB2YXIgbWF0Y2ggPSBmaW5kTWF0Y2hlc0luT2JqZWN0KGRhdGFbaV0sY3JpdCxzdHJhdGVneSxvcHQpXG4gICAgaWYoIG1hdGNoICl7XG4gICAgICBtYXRjaGVzLnB1c2gobWF0Y2gpXG4gICAgfVxuICB9XG4gIHJldHVybiBtYXRjaGVzXG59XG5cbmZ1bmN0aW9uIGZpbmRNYXRjaGVzSW5PYmplY3Qob2JqLGNyaXQsc3RyYXRlZ3ksb3B0KXtcbiAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYoICFpc0V4Y2x1ZGVkKG9ialtrZXldLCBvcHQuZXhjbHVkZSkgJiYgc3RyYXRlZ3kubWF0Y2hlcyhvYmpba2V5XSwgY3JpdCkgKXtcbiAgICAgIHJldHVybiBvYmpcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNFeGNsdWRlZCh0ZXJtLCBleGNsdWRlZFRlcm1zKXtcbiAgdmFyIGV4Y2x1ZGVkID0gZmFsc2VcbiAgZXhjbHVkZWRUZXJtcyA9IGV4Y2x1ZGVkVGVybXMgfHwgW11cbiAgZm9yICh2YXIgaSA9IDA7IGk8ZXhjbHVkZWRUZXJtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBleGNsdWRlZFRlcm0gPSBleGNsdWRlZFRlcm1zW2ldXG4gICAgaWYoICFleGNsdWRlZCAmJiBuZXcgUmVnRXhwKHRlcm0pLnRlc3QoZXhjbHVkZWRUZXJtKSApe1xuICAgICAgZXhjbHVkZWQgPSB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBleGNsdWRlZFxufVxuIiwiJ3VzZSBzdHJpY3QnXG52YXIgZnV6enlzZWFyY2ggPSByZXF1aXJlKCdmdXp6eXNlYXJjaCcpXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEZ1enp5U2VhcmNoU3RyYXRlZ3koKVxuXG5mdW5jdGlvbiBGdXp6eVNlYXJjaFN0cmF0ZWd5KCl7XG4gIHRoaXMubWF0Y2hlcyA9IGZ1bmN0aW9uKHN0cmluZywgY3JpdCl7XG4gICAgcmV0dXJuIGZ1enp5c2VhcmNoKGNyaXQsIHN0cmluZylcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBMaXRlcmFsU2VhcmNoU3RyYXRlZ3koKVxuXG5mdW5jdGlvbiBMaXRlcmFsU2VhcmNoU3RyYXRlZ3koKXtcbiAgdGhpcy5tYXRjaGVzID0gZnVuY3Rpb24oc3RyaW5nLGNyaXQpe1xuICAgIGlmKCB0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJyApe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHN0cmluZyA9IHN0cmluZy50cmltKClcbiAgICByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihjcml0LnRvTG93ZXJDYXNlKCkpID49IDBcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcGlsZTogY29tcGlsZSxcbiAgc2V0T3B0aW9uczogc2V0T3B0aW9uc1xufVxuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnBhdHRlcm4gPSAvXFx7KC4qPylcXH0vZ1xub3B0aW9ucy50ZW1wbGF0ZSA9ICcnXG5vcHRpb25zLm1pZGRsZXdhcmUgPSBmdW5jdGlvbigpe31cblxuZnVuY3Rpb24gc2V0T3B0aW9ucyhfb3B0aW9ucyl7XG4gIG9wdGlvbnMucGF0dGVybiA9IF9vcHRpb25zLnBhdHRlcm4gfHwgb3B0aW9ucy5wYXR0ZXJuXG4gIG9wdGlvbnMudGVtcGxhdGUgPSBfb3B0aW9ucy50ZW1wbGF0ZSB8fCBvcHRpb25zLnRlbXBsYXRlXG4gIGlmKCB0eXBlb2YgX29wdGlvbnMubWlkZGxld2FyZSA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgIG9wdGlvbnMubWlkZGxld2FyZSA9IF9vcHRpb25zLm1pZGRsZXdhcmVcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21waWxlKGRhdGEpe1xuICByZXR1cm4gb3B0aW9ucy50ZW1wbGF0ZS5yZXBsYWNlKG9wdGlvbnMucGF0dGVybiwgZnVuY3Rpb24obWF0Y2gsIHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBvcHRpb25zLm1pZGRsZXdhcmUocHJvcCwgZGF0YVtwcm9wXSwgb3B0aW9ucy50ZW1wbGF0ZSlcbiAgICBpZiggdmFsdWUgIT09IHVuZGVmaW5lZCApe1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICAgIHJldHVybiBkYXRhW3Byb3BdIHx8IG1hdGNoXG4gIH0pXG59XG4iLCI7KGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCl7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIHNlYXJjaElucHV0OiBudWxsLFxuICAgIHJlc3VsdHNDb250YWluZXI6IG51bGwsXG4gICAganNvbjogW10sXG4gICAgc2VhcmNoUmVzdWx0VGVtcGxhdGU6ICc8bGk+PGEgaHJlZj1cInt1cmx9XCIgdGl0bGU9XCJ7ZGVzY31cIj57dGl0bGV9PC9hPjwvbGk+JyxcbiAgICB0ZW1wbGF0ZU1pZGRsZXdhcmU6IGZ1bmN0aW9uKCl7fSxcbiAgICBub1Jlc3VsdHNUZXh0OiAnTm8gcmVzdWx0cyBmb3VuZCcsXG4gICAgbGltaXQ6IDEwLFxuICAgIGZ1enp5OiBmYWxzZSxcbiAgICBleGNsdWRlOiBbXVxuICB9XG5cbiAgdmFyIHJlcXVpcmVkT3B0aW9ucyA9IFsnc2VhcmNoSW5wdXQnLCdyZXN1bHRzQ29udGFpbmVyJywnanNvbiddXG5cbiAgdmFyIHRlbXBsYXRlciA9IHJlcXVpcmUoJy4vVGVtcGxhdGVyJylcbiAgdmFyIHJlcG9zaXRvcnkgPSByZXF1aXJlKCcuL1JlcG9zaXRvcnknKVxuICB2YXIganNvbkxvYWRlciA9IHJlcXVpcmUoJy4vSlNPTkxvYWRlcicpXG4gIHZhciBvcHRpb25zVmFsaWRhdG9yID0gcmVxdWlyZSgnLi9PcHRpb25zVmFsaWRhdG9yJykoe1xuICAgIHJlcXVpcmVkOiByZXF1aXJlZE9wdGlvbnNcbiAgfSlcbiAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG5cbiAgLypcbiAgICBQdWJsaWMgQVBJXG4gICovXG4gIHdpbmRvdy5TaW1wbGVKZWt5bGxTZWFyY2ggPSBmdW5jdGlvbiBTaW1wbGVKZWt5bGxTZWFyY2goX29wdGlvbnMpe1xuICAgIHZhciBlcnJvcnMgPSBvcHRpb25zVmFsaWRhdG9yLnZhbGlkYXRlKF9vcHRpb25zKVxuICAgIGlmKCBlcnJvcnMubGVuZ3RoID4gMCApe1xuICAgICAgdGhyb3dFcnJvcignWW91IG11c3Qgc3BlY2lmeSB0aGUgZm9sbG93aW5nIHJlcXVpcmVkIG9wdGlvbnM6ICcgKyByZXF1aXJlZE9wdGlvbnMpXG4gICAgfVxuXG4gICAgb3B0aW9ucyA9IHV0aWxzLm1lcmdlKG9wdGlvbnMsIF9vcHRpb25zKVxuXG4gICAgdGVtcGxhdGVyLnNldE9wdGlvbnMoe1xuICAgICAgdGVtcGxhdGU6IG9wdGlvbnMuc2VhcmNoUmVzdWx0VGVtcGxhdGUsXG4gICAgICBtaWRkbGV3YXJlOiBvcHRpb25zLnRlbXBsYXRlTWlkZGxld2FyZSxcbiAgICB9KVxuXG4gICAgcmVwb3NpdG9yeS5zZXRPcHRpb25zKHtcbiAgICAgIGZ1enp5OiBvcHRpb25zLmZ1enp5LFxuICAgICAgbGltaXQ6IG9wdGlvbnMubGltaXQsXG4gICAgfSlcblxuICAgIGlmKCB1dGlscy5pc0pTT04ob3B0aW9ucy5qc29uKSApe1xuICAgICAgaW5pdFdpdGhKU09OKG9wdGlvbnMuanNvbilcbiAgICB9ZWxzZXtcbiAgICAgIGluaXRXaXRoVVJMKG9wdGlvbnMuanNvbilcbiAgICB9XG4gIH1cblxuICAvLyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaC5pbml0ID0gd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaFxuICBcbiAgaWYgKHR5cGVvZiB3aW5kb3cuU2ltcGxlSmVreWxsU2VhcmNoSW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHdpbmRvdy5TaW1wbGVKZWt5bGxTZWFyY2hJbml0LmNhbGwodGhpcywgd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0V2l0aEpTT04oanNvbil7XG4gICAgcmVwb3NpdG9yeS5wdXQoanNvbilcbiAgICByZWdpc3RlcklucHV0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRXaXRoVVJMKHVybCl7XG4gICAganNvbkxvYWRlci5sb2FkKHVybCwgZnVuY3Rpb24oZXJyLGpzb24pe1xuICAgICAgaWYoIGVyciApe1xuICAgICAgICB0aHJvd0Vycm9yKCdmYWlsZWQgdG8gZ2V0IEpTT04gKCcgKyB1cmwgKyAnKScpXG4gICAgICB9XG4gICAgICBpbml0V2l0aEpTT04oanNvbilcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZW1wdHlSZXN1bHRzQ29udGFpbmVyKCl7XG4gICAgb3B0aW9ucy5yZXN1bHRzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBhcHBlbmRUb1Jlc3VsdHNDb250YWluZXIodGV4dCl7XG4gICAgb3B0aW9ucy5yZXN1bHRzQ29udGFpbmVyLmlubmVySFRNTCArPSB0ZXh0XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcklucHV0KCl7XG4gICAgb3B0aW9ucy5zZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgdmFyIGtleSA9IGUud2hpY2hcbiAgICAgIGlmKCBpc1doaXRlbGlzdGVkS2V5KGtleSkgKSB7XG4gICAgICAgIGVtcHR5UmVzdWx0c0NvbnRhaW5lcigpO1xuICAgICAgICB2YXIgcXVlcnkgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICBpZiggaXNWYWxpZFF1ZXJ5KHF1ZXJ5KSApIHtcbiAgICAgICAgICByZW5kZXIoIHJlcG9zaXRvcnkuc2VhcmNoKHF1ZXJ5KSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcihyZXN1bHRzKSB7XG4gICAgaWYoIHJlc3VsdHMubGVuZ3RoID09PSAwICl7XG4gICAgICByZXR1cm4gYXBwZW5kVG9SZXN1bHRzQ29udGFpbmVyKG9wdGlvbnMubm9SZXN1bHRzVGV4dClcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcHBlbmRUb1Jlc3VsdHNDb250YWluZXIoIHRlbXBsYXRlci5jb21waWxlKHJlc3VsdHNbaV0pIClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1ZhbGlkUXVlcnkocXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgJiYgcXVlcnkubGVuZ3RoID4gMFxuICB9XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZWxpc3RlZEtleShrZXkpIHtcbiAgICByZXR1cm4gWzEzLDE2LDIwLDM3LDM4LDM5LDQwLDkxXS5pbmRleE9mKGtleSkgPT09IC0xXG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0Vycm9yKG1lc3NhZ2UpeyB0aHJvdyBuZXcgRXJyb3IoJ1NpbXBsZUpla3lsbFNlYXJjaCAtLS0gJysgbWVzc2FnZSkgfVxufSkod2luZG93LCBkb2N1bWVudCk7XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXJnZTogbWVyZ2UsXG4gIGlzSlNPTjogaXNKU09OLFxufVxuXG5mdW5jdGlvbiBtZXJnZShkZWZhdWx0UGFyYW1zLCBtZXJnZVBhcmFtcyl7XG4gIHZhciBtZXJnZWRPcHRpb25zID0ge31cbiAgZm9yKHZhciBvcHRpb24gaW4gZGVmYXVsdFBhcmFtcyl7XG4gICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gZGVmYXVsdFBhcmFtc1tvcHRpb25dXG4gICAgaWYoIG1lcmdlUGFyYW1zW29wdGlvbl0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gbWVyZ2VQYXJhbXNbb3B0aW9uXVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkT3B0aW9uc1xufVxuXG5mdW5jdGlvbiBpc0pTT04oanNvbil7XG4gIHRyeXtcbiAgICBpZigganNvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGpzb24pKSApe1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1jYXRjaChlKXtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIl19

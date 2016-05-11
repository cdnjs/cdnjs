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
    var fuzzy = crit.split("")
                .reduce(function(a,b){ return a+'[^'+b+']*'+b; })
    fuzzy = new RegExp( fuzzy, 'gi')
    return !!fuzzy.test(string)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcGxheWdyb3VuZC9TaW1wbGUtSmVreWxsLVNlYXJjaC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9KU09OTG9hZGVyLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9PcHRpb25zVmFsaWRhdG9yLmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9SZXBvc2l0b3J5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9TZWFyY2hTdHJhdGVnaWVzL0Z1enp5U2VhcmNoU3RyYXRlZ3kuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL1NlYXJjaFN0cmF0ZWdpZXMvTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5LmpzIiwiL1VzZXJzL3NhaXBoL0RvY3VtZW50cy9wbGF5Z3JvdW5kL1NpbXBsZS1KZWt5bGwtU2VhcmNoL3NyYy9UZW1wbGF0ZXIuanMiLCIvVXNlcnMvc2FpcGgvRG9jdW1lbnRzL3BsYXlncm91bmQvU2ltcGxlLUpla3lsbC1TZWFyY2gvc3JjL2Zha2VfYTA1YmViMC5qcyIsIi9Vc2Vycy9zYWlwaC9Eb2N1bWVudHMvcGxheWdyb3VuZC9TaW1wbGUtSmVreWxsLVNlYXJjaC9zcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxvYWQ6IGxvYWRcbn1cblxuZnVuY3Rpb24gbG9hZChsb2NhdGlvbixjYWxsYmFjayl7XG4gIHZhciB4aHIgPSBnZXRYSFIoKVxuICB4aHIub3BlbignR0VUJywgbG9jYXRpb24sIHRydWUpXG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBjcmVhdGVTdGF0ZUNoYW5nZUxpc3RlbmVyKHhociwgY2FsbGJhY2spXG4gIHhoci5zZW5kKClcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3RhdGVDaGFuZ2VMaXN0ZW5lcih4aHIsIGNhbGxiYWNrKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgaWYgKCB4aHIucmVhZHlTdGF0ZT09PTQgJiYgeGhyLnN0YXR1cz09PTIwMCApe1xuICAgICAgdHJ5e1xuICAgICAgICBjYWxsYmFjayhudWxsLCBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpIClcbiAgICAgIH1jYXRjaChlcnIpe1xuICAgICAgICBjYWxsYmFjayhlcnIsIG51bGwpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFhIUigpe1xuICByZXR1cm4gKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCkgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpXG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gT3B0aW9uc1ZhbGlkYXRvcihwYXJhbXMpe1xuICBpZiggIXZhbGlkYXRlUGFyYW1zKHBhcmFtcykgKXtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy0tIE9wdGlvbnNWYWxpZGF0b3I6IHJlcXVpcmVkIG9wdGlvbnMgbWlzc2luZycpXG4gIH1cbiAgaWYoICEodGhpcyBpbnN0YW5jZW9mIE9wdGlvbnNWYWxpZGF0b3IpICl7XG4gICAgcmV0dXJuIG5ldyBPcHRpb25zVmFsaWRhdG9yKHBhcmFtcylcbiAgfVxuXG4gIHZhciByZXF1aXJlZE9wdGlvbnMgPSBwYXJhbXMucmVxdWlyZWRcblxuICB0aGlzLmdldFJlcXVpcmVkT3B0aW9ucyA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHJlcXVpcmVkT3B0aW9uc1xuICB9XG5cbiAgdGhpcy52YWxpZGF0ZSA9IGZ1bmN0aW9uKHBhcmFtZXRlcnMpe1xuICAgIHZhciBlcnJvcnMgPSBbXVxuICAgIHJlcXVpcmVkT3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJlcXVpcmVkT3B0aW9uTmFtZSl7XG4gICAgICBpZiggcGFyYW1ldGVyc1tyZXF1aXJlZE9wdGlvbk5hbWVdID09PSB1bmRlZmluZWQgKXtcbiAgICAgICAgZXJyb3JzLnB1c2gocmVxdWlyZWRPcHRpb25OYW1lKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGVycm9yc1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVQYXJhbXMocGFyYW1zKXtcbiAgICBpZiggIXBhcmFtcyApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gcGFyYW1zLnJlcXVpcmVkICE9PSB1bmRlZmluZWQgJiYgcGFyYW1zLnJlcXVpcmVkIGluc3RhbmNlb2YgQXJyYXlcbiAgfVxufSIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1dDpwdXQsXG4gIGNsZWFyOiBjbGVhcixcbiAgZ2V0OiBnZXQsXG4gIHNlYXJjaDogc2VhcmNoLFxuICBzZXRPcHRpb25zOiBzZXRPcHRpb25zXG59XG5cbnZhciBGdXp6eVNlYXJjaFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9TZWFyY2hTdHJhdGVnaWVzL0Z1enp5U2VhcmNoU3RyYXRlZ3knKVxudmFyIExpdGVyYWxTZWFyY2hTdHJhdGVneSA9IHJlcXVpcmUoJy4vU2VhcmNoU3RyYXRlZ2llcy9MaXRlcmFsU2VhcmNoU3RyYXRlZ3knKVxuXG52YXIgZGF0YSA9IFtdXG52YXIgb3B0ID0ge31cbm9wdC5mdXp6eSA9IGZhbHNlXG5vcHQubGltaXQgPSAxMFxub3B0LnNlYXJjaFN0cmF0ZWd5ID0gb3B0LmZ1enp5ID8gRnV6enlTZWFyY2hTdHJhdGVneSA6IExpdGVyYWxTZWFyY2hTdHJhdGVneVxuXG5cbmZ1bmN0aW9uIHB1dChkYXRhKXtcbiAgaWYoIGlzT2JqZWN0KGRhdGEpICl7XG4gICAgcmV0dXJuIGFkZE9iamVjdChkYXRhKVxuICB9XG4gIGlmKCBpc0FycmF5KGRhdGEpICl7XG4gICAgcmV0dXJuIGFkZEFycmF5KGRhdGEpXG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZFxufVxuZnVuY3Rpb24gY2xlYXIoKXtcbiAgZGF0YS5sZW5ndGggPSAwXG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIGdldCgpe1xuICByZXR1cm4gZGF0YVxufVxuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iail7IHJldHVybiAhIW9iaiAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfVxuZnVuY3Rpb24gaXNBcnJheShvYmopeyByZXR1cm4gISFvYmogJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScgfVxuXG5mdW5jdGlvbiBhZGRPYmplY3QoX2RhdGEpe1xuICBkYXRhLnB1c2goX2RhdGEpXG4gIHJldHVybiBkYXRhXG59XG5cbmZ1bmN0aW9uIGFkZEFycmF5KF9kYXRhKXtcbiAgdmFyIGFkZGVkID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgaWYoIGlzT2JqZWN0KF9kYXRhW2ldKSApe1xuICAgICAgYWRkZWQucHVzaChhZGRPYmplY3QoX2RhdGFbaV0pKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYWRkZWRcbn1cblxuXG5cbmZ1bmN0aW9uIHNlYXJjaChjcml0KXtcbiAgaWYoICFjcml0ICl7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgcmV0dXJuIGZpbmRNYXRjaGVzKGRhdGEsY3JpdCxvcHQuc2VhcmNoU3RyYXRlZ3ksb3B0KVxufVxuXG5mdW5jdGlvbiBzZXRPcHRpb25zKF9vcHQpe1xuICBvcHQgPSBfb3B0IHx8IHt9XG5cbiAgb3B0LmZ1enp5ID0gX29wdC5mdXp6eSB8fCBmYWxzZVxuICBvcHQubGltaXQgPSBfb3B0LmxpbWl0IHx8IDEwXG4gIG9wdC5zZWFyY2hTdHJhdGVneSA9IF9vcHQuZnV6enkgPyBGdXp6eVNlYXJjaFN0cmF0ZWd5IDogTGl0ZXJhbFNlYXJjaFN0cmF0ZWd5XG59XG5cbmZ1bmN0aW9uIGZpbmRNYXRjaGVzKGRhdGEsY3JpdCxzdHJhdGVneSxvcHQpe1xuICB2YXIgbWF0Y2hlcyA9IFtdXG4gIGZvcih2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aCAmJiBtYXRjaGVzLmxlbmd0aCA8IG9wdC5saW1pdDsgaSsrKSB7XG4gICAgdmFyIG1hdGNoID0gZmluZE1hdGNoZXNJbk9iamVjdChkYXRhW2ldLGNyaXQsc3RyYXRlZ3ksb3B0KVxuICAgIGlmKCBtYXRjaCApe1xuICAgICAgbWF0Y2hlcy5wdXNoKG1hdGNoKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWF0Y2hlc1xufVxuXG5mdW5jdGlvbiBmaW5kTWF0Y2hlc0luT2JqZWN0KG9iaixjcml0LHN0cmF0ZWd5LG9wdCl7XG4gIGZvcih2YXIga2V5IGluIG9iaikge1xuICAgIGlmKCAhaXNFeGNsdWRlZChvYmpba2V5XSwgb3B0LmV4Y2x1ZGUpICYmIHN0cmF0ZWd5Lm1hdGNoZXMob2JqW2tleV0sIGNyaXQpICl7XG4gICAgICByZXR1cm4gb2JqXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzRXhjbHVkZWQodGVybSwgZXhjbHVkZWRUZXJtcyl7XG4gIHZhciBleGNsdWRlZCA9IGZhbHNlXG4gIGV4Y2x1ZGVkVGVybXMgPSBleGNsdWRlZFRlcm1zIHx8IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpPGV4Y2x1ZGVkVGVybXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZXhjbHVkZWRUZXJtID0gZXhjbHVkZWRUZXJtc1tpXVxuICAgIGlmKCAhZXhjbHVkZWQgJiYgbmV3IFJlZ0V4cCh0ZXJtKS50ZXN0KGV4Y2x1ZGVkVGVybSkgKXtcbiAgICAgIGV4Y2x1ZGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZXhjbHVkZWRcbn1cbiIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSBuZXcgRnV6enlTZWFyY2hTdHJhdGVneSgpXG5cbmZ1bmN0aW9uIEZ1enp5U2VhcmNoU3RyYXRlZ3koKXtcbiAgdGhpcy5tYXRjaGVzID0gZnVuY3Rpb24oc3RyaW5nLCBjcml0KXtcbiAgICBpZiggdHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNyaXQgIT09ICdzdHJpbmcnICl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgdmFyIGZ1enp5ID0gY3JpdC5zcGxpdChcIlwiKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24oYSxiKXsgcmV0dXJuIGErJ1teJytiKyddKicrYjsgfSlcbiAgICBmdXp6eSA9IG5ldyBSZWdFeHAoIGZ1enp5LCAnZ2knKVxuICAgIHJldHVybiAhIWZ1enp5LnRlc3Qoc3RyaW5nKVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gbmV3IExpdGVyYWxTZWFyY2hTdHJhdGVneSgpXG5cbmZ1bmN0aW9uIExpdGVyYWxTZWFyY2hTdHJhdGVneSgpe1xuICB0aGlzLm1hdGNoZXMgPSBmdW5jdGlvbihzdHJpbmcsY3JpdCl7XG4gICAgaWYoIHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnICl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgc3RyaW5nID0gc3RyaW5nLnRyaW0oKVxuICAgIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKS5pbmRleE9mKGNyaXQudG9Mb3dlckNhc2UoKSkgPj0gMFxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21waWxlOiBjb21waWxlLFxuICBzZXRPcHRpb25zOiBzZXRPcHRpb25zXG59XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMucGF0dGVybiA9IC9cXHsoLio/KVxcfS9nXG5vcHRpb25zLnRlbXBsYXRlID0gJydcbm9wdGlvbnMubWlkZGxld2FyZSA9IGZ1bmN0aW9uKCl7fVxuXG5mdW5jdGlvbiBzZXRPcHRpb25zKF9vcHRpb25zKXtcbiAgb3B0aW9ucy5wYXR0ZXJuID0gX29wdGlvbnMucGF0dGVybiB8fCBvcHRpb25zLnBhdHRlcm5cbiAgb3B0aW9ucy50ZW1wbGF0ZSA9IF9vcHRpb25zLnRlbXBsYXRlIHx8IG9wdGlvbnMudGVtcGxhdGVcbiAgaWYoIHR5cGVvZiBfb3B0aW9ucy5taWRkbGV3YXJlID09PSAnZnVuY3Rpb24nICl7XG4gICAgb3B0aW9ucy5taWRkbGV3YXJlID0gX29wdGlvbnMubWlkZGxld2FyZVxuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGUoZGF0YSl7XG4gIHJldHVybiBvcHRpb25zLnRlbXBsYXRlLnJlcGxhY2Uob3B0aW9ucy5wYXR0ZXJuLCBmdW5jdGlvbihtYXRjaCwgcHJvcCkge1xuICAgIHZhciB2YWx1ZSA9IG9wdGlvbnMubWlkZGxld2FyZShwcm9wLCBkYXRhW3Byb3BdLCBvcHRpb25zLnRlbXBsYXRlKVxuICAgIGlmKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gICAgcmV0dXJuIGRhdGFbcHJvcF0gfHwgbWF0Y2hcbiAgfSlcbn1cbiIsIjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKXtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgc2VhcmNoSW5wdXQ6IG51bGwsXG4gICAgcmVzdWx0c0NvbnRhaW5lcjogbnVsbCxcbiAgICBqc29uOiBbXSxcbiAgICBzZWFyY2hSZXN1bHRUZW1wbGF0ZTogJzxsaT48YSBocmVmPVwie3VybH1cIiB0aXRsZT1cIntkZXNjfVwiPnt0aXRsZX08L2E+PC9saT4nLFxuICAgIHRlbXBsYXRlTWlkZGxld2FyZTogZnVuY3Rpb24oKXt9LFxuICAgIG5vUmVzdWx0c1RleHQ6ICdObyByZXN1bHRzIGZvdW5kJyxcbiAgICBsaW1pdDogMTAsXG4gICAgZnV6enk6IGZhbHNlLFxuICAgIGV4Y2x1ZGU6IFtdXG4gIH1cblxuICB2YXIgcmVxdWlyZWRPcHRpb25zID0gWydzZWFyY2hJbnB1dCcsJ3Jlc3VsdHNDb250YWluZXInLCdqc29uJ11cblxuICB2YXIgdGVtcGxhdGVyID0gcmVxdWlyZSgnLi9UZW1wbGF0ZXInKVxuICB2YXIgcmVwb3NpdG9yeSA9IHJlcXVpcmUoJy4vUmVwb3NpdG9yeScpXG4gIHZhciBqc29uTG9hZGVyID0gcmVxdWlyZSgnLi9KU09OTG9hZGVyJylcbiAgdmFyIG9wdGlvbnNWYWxpZGF0b3IgPSByZXF1aXJlKCcuL09wdGlvbnNWYWxpZGF0b3InKSh7XG4gICAgcmVxdWlyZWQ6IHJlcXVpcmVkT3B0aW9uc1xuICB9KVxuICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcblxuICAvKlxuICAgIFB1YmxpYyBBUElcbiAgKi9cbiAgd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaCA9IGZ1bmN0aW9uIFNpbXBsZUpla3lsbFNlYXJjaChfb3B0aW9ucyl7XG4gICAgdmFyIGVycm9ycyA9IG9wdGlvbnNWYWxpZGF0b3IudmFsaWRhdGUoX29wdGlvbnMpXG4gICAgaWYoIGVycm9ycy5sZW5ndGggPiAwICl7XG4gICAgICB0aHJvd0Vycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IHRoZSBmb2xsb3dpbmcgcmVxdWlyZWQgb3B0aW9uczogJyArIHJlcXVpcmVkT3B0aW9ucylcbiAgICB9XG5cbiAgICBvcHRpb25zID0gdXRpbHMubWVyZ2Uob3B0aW9ucywgX29wdGlvbnMpXG5cbiAgICB0ZW1wbGF0ZXIuc2V0T3B0aW9ucyh7XG4gICAgICB0ZW1wbGF0ZTogb3B0aW9ucy5zZWFyY2hSZXN1bHRUZW1wbGF0ZSxcbiAgICAgIG1pZGRsZXdhcmU6IG9wdGlvbnMudGVtcGxhdGVNaWRkbGV3YXJlLFxuICAgIH0pXG5cbiAgICByZXBvc2l0b3J5LnNldE9wdGlvbnMoe1xuICAgICAgZnV6enk6IG9wdGlvbnMuZnV6enksXG4gICAgICBsaW1pdDogb3B0aW9ucy5saW1pdCxcbiAgICB9KVxuXG4gICAgaWYoIHV0aWxzLmlzSlNPTihvcHRpb25zLmpzb24pICl7XG4gICAgICBpbml0V2l0aEpTT04ob3B0aW9ucy5qc29uKVxuICAgIH1lbHNle1xuICAgICAgaW5pdFdpdGhVUkwob3B0aW9ucy5qc29uKVxuICAgIH1cbiAgfVxuXG4gIC8vIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICB3aW5kb3cuU2ltcGxlSmVreWxsU2VhcmNoLmluaXQgPSB3aW5kb3cuU2ltcGxlSmVreWxsU2VhcmNoXG4gIFxuICBpZiAodHlwZW9mIHdpbmRvdy5TaW1wbGVKZWt5bGxTZWFyY2hJbml0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgd2luZG93LlNpbXBsZUpla3lsbFNlYXJjaEluaXQuY2FsbCh0aGlzLCB3aW5kb3cuU2ltcGxlSmVreWxsU2VhcmNoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRXaXRoSlNPTihqc29uKXtcbiAgICByZXBvc2l0b3J5LnB1dChqc29uKVxuICAgIHJlZ2lzdGVySW5wdXQoKVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFdpdGhVUkwodXJsKXtcbiAgICBqc29uTG9hZGVyLmxvYWQodXJsLCBmdW5jdGlvbihlcnIsanNvbil7XG4gICAgICBpZiggZXJyICl7XG4gICAgICAgIHRocm93RXJyb3IoJ2ZhaWxlZCB0byBnZXQgSlNPTiAoJyArIHVybCArICcpJylcbiAgICAgIH1cbiAgICAgIGluaXRXaXRoSlNPTihqc29uKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBlbXB0eVJlc3VsdHNDb250YWluZXIoKXtcbiAgICBvcHRpb25zLnJlc3VsdHNDb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGVuZFRvUmVzdWx0c0NvbnRhaW5lcih0ZXh0KXtcbiAgICBvcHRpb25zLnJlc3VsdHNDb250YWluZXIuaW5uZXJIVE1MICs9IHRleHRcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVySW5wdXQoKXtcbiAgICBvcHRpb25zLnNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICB2YXIga2V5ID0gZS53aGljaFxuICAgICAgdmFyIHF1ZXJ5ID0gZS50YXJnZXQudmFsdWVcbiAgICAgIGlmKCBpc1doaXRlbGlzdGVkS2V5KGtleSkgJiYgaXNWYWxpZFF1ZXJ5KHF1ZXJ5KSApIHtcbiAgICAgICAgZW1wdHlSZXN1bHRzQ29udGFpbmVyKCk7XG4gICAgICAgIHJlbmRlciggcmVwb3NpdG9yeS5zZWFyY2gocXVlcnkpICk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcihyZXN1bHRzKSB7XG4gICAgaWYoIHJlc3VsdHMubGVuZ3RoID09PSAwICl7XG4gICAgICByZXR1cm4gYXBwZW5kVG9SZXN1bHRzQ29udGFpbmVyKG9wdGlvbnMubm9SZXN1bHRzVGV4dClcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcHBlbmRUb1Jlc3VsdHNDb250YWluZXIoIHRlbXBsYXRlci5jb21waWxlKHJlc3VsdHNbaV0pIClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1ZhbGlkUXVlcnkocXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgJiYgcXVlcnkubGVuZ3RoID4gMFxuICB9XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZWxpc3RlZEtleShrZXkpIHtcbiAgICByZXR1cm4gWzEzLDE2LDIwLDM3LDM4LDM5LDQwLDkxXS5pbmRleE9mKGtleSkgPT09IC0xXG4gIH1cblxuICBmdW5jdGlvbiB0aHJvd0Vycm9yKG1lc3NhZ2UpeyB0aHJvdyBuZXcgRXJyb3IoJ1NpbXBsZUpla3lsbFNlYXJjaCAtLS0gJysgbWVzc2FnZSkgfVxufSkod2luZG93LCBkb2N1bWVudCk7XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXJnZTogbWVyZ2UsXG4gIGlzSlNPTjogaXNKU09OLFxufVxuXG5mdW5jdGlvbiBtZXJnZShkZWZhdWx0UGFyYW1zLCBtZXJnZVBhcmFtcyl7XG4gIHZhciBtZXJnZWRPcHRpb25zID0ge31cbiAgZm9yKHZhciBvcHRpb24gaW4gZGVmYXVsdFBhcmFtcyl7XG4gICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gZGVmYXVsdFBhcmFtc1tvcHRpb25dXG4gICAgaWYoIG1lcmdlUGFyYW1zW29wdGlvbl0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgbWVyZ2VkT3B0aW9uc1tvcHRpb25dID0gbWVyZ2VQYXJhbXNbb3B0aW9uXVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWVyZ2VkT3B0aW9uc1xufVxuXG5mdW5jdGlvbiBpc0pTT04oanNvbil7XG4gIHRyeXtcbiAgICBpZigganNvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGpzb24pKSApe1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1jYXRjaChlKXtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuIl19

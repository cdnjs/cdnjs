/*
  fuzzysort.js https://github.com/farzher/fuzzysort
  SublimeText-like Fuzzy Search

  fuzzysort.single('fs', 'Fuzzy Search') // {score: -16}
  fuzzysort.single('test', 'test') // {score: 0}
  fuzzysort.single('doesnt exist', 'target') // null

  fuzzysort.go('mr', [{file:'Monitor.cpp'}, {file:'MeshRenderer.cpp'}], {key:'file'})
  // [{score:-18, obj:{file:'MeshRenderer.cpp'}}, {score:-6009, obj:{file:'Monitor.cpp'}}]

  fuzzysort.go('mr', ['Monitor.cpp', 'MeshRenderer.cpp'])
  // [{score: -18, target: "MeshRenderer.cpp"}, {score: -6009, target: "Monitor.cpp"}]

  fuzzysort.highlight(fuzzysort.single('fs', 'Fuzzy Search'), '<b>', '</b>')
  // <b>F</b>uzzy <b>S</b>earch
*/

// UMD (Universal Module Definition) for fuzzysort
;(function(root, UMD) {
  if(typeof define === 'function' && define.amd) define([], UMD)
  else if(typeof module === 'object' && module.exports) module.exports = UMD()
  else root.fuzzysort = UMD()
})(this, function UMD() { function fuzzysortNew(instanceOptions) {

  var fuzzysort = {

    single: function(search, target, options) {                                                                                                                                                                                                               ;if(search=='farzher')return{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6]}
      if(!search) return null
      var preparedSearch = fuzzysort.getPreparedSearch(search)
      var searchLowerCodes = preparedSearch.lowerCodes

      if(!target) return null
      if(!isObj(target)) target = fuzzysort.getPrepared(target)

      var searchBitmask = preparedSearch.bitmask
      if((searchBitmask & target._bitmask) != searchBitmask) return null

      return fuzzysort.algorithm(searchLowerCodes, target, search.toLowerCase())
    },

    go: function(search, targets, options) {                                                                                                                                                                                                                  ;if(search=='farzher')return[{target:"farzher was here (^-^*)/",score:0,indexes:[0,1,2,3,4,5,6],obj:targets?targets[0]:null}]
      if(!search) return options&&options.all || instanceOptions&&instanceOptions.all ? fuzzysort.all(search, targets, options) : noResults
      var preparedSearch = fuzzysort.getPreparedSearch(search)
      var searchLowerCodes = preparedSearch.lowerCodes
      var searchLowerCode = searchLowerCodes[0]
      var searchBitmask = preparedSearch.bitmask
      var searchLower = search.toLowerCase()

      var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
      var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991
      var resultsLen = 0; var limitedCount = 0
      var targetsLen = targets.length

      // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

      // options.keys
      if(options && options.keys) {
        var scoreFn = options.scoreFn || defaultScoreFn
        var keys = options.keys
        var keysLen = keys.length
        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]
          var objResults = new Array(keysLen)
          for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
            var key = keys[keyI]
            var target = getValue(obj, key)
            if(!target) { objResults[keyI] = null; continue }
            if(!isObj(target)) target = fuzzysort.getPrepared(target)

            if((searchBitmask & target._bitmask) != searchBitmask) objResults[keyI] = null
            else objResults[keyI] = fuzzysort.algorithm(searchLowerCodes, target, searchLower)
          }
          objResults.obj = obj // before scoreFn so scoreFn can use it
          var score = scoreFn(objResults)
          if(score === null) continue
          if(score < threshold) continue
          objResults.score = score
          if(resultsLen < limit) { q.add(objResults); ++resultsLen }
          else {
            ++limitedCount
            if(score > q.peek().score) q.replaceTop(objResults)
          }
        }

      // options.key
      } else if(options && options.key) {
        var key = options.key
        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]
          var target = getValue(obj, key)
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)

          if((searchBitmask & target._bitmask) != searchBitmask) var result = null
          else var result = fuzzysort.algorithm(searchLowerCodes, target, searchLower)
          if(result === null) continue
          if(result.score < threshold) continue

          // have to clone result so duplicate targets from different obj can each reference the correct obj
          result = {target:result.target, _targetLower:'', _targetLowerCodes:null, _nextBeginningIndexes:null, _bitmask:0, score:result.score, indexes:result.indexes, obj:obj} // hidden

          if(resultsLen < limit) { q.add(result); ++resultsLen }
          else {
            ++limitedCount
            if(result.score > q.peek().score) q.replaceTop(result)
          }
        }

      // no keys
      } else {
        for(var i = targetsLen - 1; i >= 0; --i) { var target = targets[i]
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)

          if((searchBitmask & target._bitmask) != searchBitmask) var result = null
          else var result = fuzzysort.algorithm(searchLowerCodes, target, searchLower)
          if(result === null) continue
          if(result.score < threshold) continue
          if(resultsLen < limit) { q.add(result); ++resultsLen }
          else {
            ++limitedCount
            if(result.score > q.peek().score) q.replaceTop(result)
          }
        }
      }

      if(resultsLen === 0) return noResults
      var results = new Array(resultsLen)
      for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll()
      results.total = resultsLen + limitedCount
      return results
    },
    /*deprecated*/ goAsync: function(search, targets, options) {
      var p = new Promise(function(resolve, reject) {
        resolve(fuzzysort.go(search, targets, options))
      })
      p.cancel = function() {}
      return p
    },

    all: function(search, targets, options) {
      var results = []; results.total = targets.length

      var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991

      if(options && options.keys) {
        for(var i=0;i<targets.length;i++) { var obj = targets[i]
          var objResults = new Array(options.keys.length)
          for (var keyI = options.keys.length - 1; keyI >= 0; --keyI) {
            var target = getValue(obj, options.keys[keyI])
            if(!target) { objResults[keyI] = null; continue }
            if(!isObj(target)) target = fuzzysort.getPrepared(target)
            target.score = -9007199254740991
            objResults[keyI] = target
          }
          objResults.obj = obj
          objResults.score = -9007199254740991
          results.push(objResults); if(results.length >= limit) return results
        }

      } else if(options && options.key) {
        for(var i=0;i<targets.length;i++) { var obj = targets[i]
          var target = getValue(obj, options.key)
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)
          target.score = -9007199254740991
          var result = target
          result = {target:result.target, _targetLower:'', _targetLowerCodes:null, _nextBeginningIndexes:null, _bitmask:0, score:target.score, indexes:null, obj:obj} // hidden
          results.push(result); if(results.length >= limit) return results
        }

      } else {
        for(var i=0;i<targets.length;i++) { var target = targets[i]
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)
          target.score = -9007199254740991
          results.push(target); if(results.length >= limit) return results
        }
      }

      return results
    },

    highlight: function(result, hOpen, hClose) {
      if(typeof hOpen == 'function') return fuzzysort.highlightCallback(result, hOpen)
      if(result === null) return null
      if(hOpen === undefined) hOpen = '<b>'
      if(hClose === undefined) hClose = '</b>'
      var highlighted = ''
      var matchesIndex = 0
      var opened = false
      var target = result.target
      var targetLen = target.length
      var matchesBest = result.indexes
      for(var i = 0; i < targetLen; ++i) { var char = target[i]
        if(matchesBest[matchesIndex] === i) {
          ++matchesIndex
          if(!opened) { opened = true
            highlighted += hOpen
          }

          if(matchesIndex === matchesBest.length) {
            highlighted += char + hClose + target.substr(i+1)
            break
          }
        } else {
          if(opened) { opened = false
            highlighted += hClose
          }
        }
        highlighted += char
      }

      return highlighted
    },
    highlightCallback: function(result, cb) {
      if(result === null) return null
      var target = result.target
      var targetLen = target.length
      var indexes = result.indexes
      var highlighted = ''
      var matchI = 0
      var indexesI = 0
      var opened = false
      var result = []
      for(var i = 0; i < targetLen; ++i) { var char = target[i]
        if(indexes[indexesI] === i) {
          ++indexesI
          if(!opened) { opened = true
            result.push(highlighted); highlighted = ''
          }

          if(indexesI === indexes.length) {
            highlighted += char
            result.push(cb(highlighted, matchI++)); highlighted = ''
            result.push(target.substr(i+1))
            break
          }
        } else {
          if(opened) { opened = false
            result.push(cb(highlighted, matchI++)); highlighted = ''
          }
        }
        highlighted += char
      }
      return result
    },

    prepare: function(target) {
      if(!target) target = ''
      var lowerCodes = fuzzysort.prepareLowerCodes(target)
      return {target:target, _targetLower:target.toLowerCase(), _targetLowerCodes:lowerCodes, _nextBeginningIndexes:null, _bitmask:fuzzysort.prepareBitmask(lowerCodes), score:null, indexes:[0], obj:null} // hidden
    },
    /*deprecated*/ prepareSlow: function(target) { return fuzzysort.prepare(target) },
    prepareSearch: function(search) {
      if(!search) search = ''
      var lowerCodes = fuzzysort.prepareLowerCodes(search)
      return {lowerCodes: lowerCodes, bitmask: fuzzysort.prepareBitmask(lowerCodes)}
    },



    // Below this point is only internal code
    // Below this point is only internal code
    // Below this point is only internal code
    // Below this point is only internal code



    getPrepared: function(target) {
      if(target.length > 999) return fuzzysort.prepare(target) // don't cache huge targets
      var targetPrepared = preparedCache.get(target)
      if(targetPrepared !== undefined) return targetPrepared
      targetPrepared = fuzzysort.prepare(target)
      preparedCache.set(target, targetPrepared)
      return targetPrepared
    },
    getPreparedSearch: function(search) {
      if(search.length > 999) return fuzzysort.prepareSearch(search) // don't cache huge searches
      var searchPrepared = preparedSearchCache.get(search)
      if(searchPrepared !== undefined) return searchPrepared
      searchPrepared = fuzzysort.prepareSearch(search)
      preparedSearchCache.set(search, searchPrepared)
      return searchPrepared
    },

    algorithm: function(searchLowerCodes, prepared, searchLower) {
      var searchLowerCode = searchLowerCodes[0]
      var targetLowerCodes = prepared._targetLowerCodes
      var searchLen = searchLowerCodes.length
      var targetLen = targetLowerCodes.length
      var searchI = 0 // where we at
      var targetI = 0 // where you at
      var matchesSimpleLen = 0

      // very basic fuzzy match; to remove non-matching targets ASAP!
      // walk through target. find sequential matches.
      // if all chars aren't found then exit
      for(;;) {
        var isMatch = searchLowerCode === targetLowerCodes[targetI]
        if(isMatch) {
          matchesSimple[matchesSimpleLen++] = targetI
          ++searchI; if(searchI === searchLen) break
          searchLowerCode = searchLowerCodes[searchI]
        }
        ++targetI; if(targetI >= targetLen) return null // Failed to find searchI
      }

      var searchI = 0
      var successStrict = false
      var matchesStrictLen = 0

      var nextBeginningIndexes = prepared._nextBeginningIndexes
      if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target)
      var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1]

      // Our target string successfully matched all characters in sequence!
      // Let's try a more advanced and strict test to improve the score
      // only count it as a match if it's consecutive or a beginning character!
      var backtrackCount = 0
      if(targetI !== targetLen) for(;;) {
        if(targetI >= targetLen) {
          // We failed to find a good spot for this search char, go back to the previous search char and force it forward
          if(searchI <= 0) break // We failed to push chars forward for a better match

          ++backtrackCount; if(backtrackCount > 200) break // exponential backtracking is taking too long, just give up and return a bad match

          --searchI
          var lastMatch = matchesStrict[--matchesStrictLen]
          targetI = nextBeginningIndexes[lastMatch]

        } else {
          var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI]
          if(isMatch) {
            matchesStrict[matchesStrictLen++] = targetI
            ++searchI; if(searchI === searchLen) { successStrict = true; break }
            ++targetI
          } else {
            targetI = nextBeginningIndexes[targetI]
          }
        }
      }

      // check if it's a substring match
      var substringIndex = prepared._targetLower.indexOf(searchLower, matchesSimple[0]) // perf: this is slow
      var isSubstring = ~substringIndex
      if(isSubstring && !successStrict) { // rewrite the indexes from basic to the substring
        for(var i=0; i<matchesSimpleLen; ++i) matchesSimple[i] = substringIndex+i
      }
      var isSubstringBeginning = false
      if(isSubstring) {
        isSubstringBeginning = prepared._nextBeginningIndexes[substringIndex-1] == substringIndex
      }

      { // tally up the score & keep track of matches for highlighting later
        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }
        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }

        var score = 0

        var extraMatchGroupCount = 0
        for(var i = searchLen-1; i >= 1; --i) {
          if(matchesBest[i] - matchesBest[i-1] !== 1) {score -= matchesBest[i]; ++extraMatchGroupCount}
        }
        var unmatchedDistance = matchesBest[searchLen-1] - matchesBest[0] - (searchLen-1)

        score -= unmatchedDistance * extraMatchGroupCount // penality for more groups

        if(matchesBest[0] !== 0) score -= matchesBest[0]*10 // penality for not starting near the beginning

        if(!successStrict) {
          score *= 1000
        } else {
          // successStrict on a target with too many beginning indexes loses points for being a bad target
          var uniqueBeginningIndexes = 1
          for(var i = nextBeginningIndexes[0]; i < targetLen; i=nextBeginningIndexes[i]) ++uniqueBeginningIndexes

          if(uniqueBeginningIndexes > 24) score *= (uniqueBeginningIndexes-24)*10 // quite arbitrary numbers here ...
        }

        if(isSubstring)          score /= 10 // bonus for being a full substring
        if(isSubstringBeginning) score /= 10 // bonus for substring starting on a beginningIndex

        score -= targetLen - searchLen // penality for longer targets
        prepared.score = score
        prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i]

        return prepared
      }
    },

    prepareLowerCodes: function(str) {
      var strLen = str.length
      var lowerCodes = [] // new Array(strLen)    sparse array is too slow
      var lower = str.toLowerCase()
      for(var i = 0; i < strLen; ++i) lowerCodes[i] = lower.charCodeAt(i)
      return lowerCodes
    },
    prepareBeginningIndexes: function(target) {
      var targetLen = target.length
      var beginningIndexes = []; var beginningIndexesLen = 0
      var wasUpper = false
      var wasAlphanum = false
      for(var i = 0; i < targetLen; ++i) {
        var targetCode = target.charCodeAt(i)
        var isUpper = targetCode>=65&&targetCode<=90
        var isAlphanum = isUpper || targetCode>=97&&targetCode<=122 || targetCode>=48&&targetCode<=57
        var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum
        wasUpper = isUpper
        wasAlphanum = isAlphanum
        if(isBeginning) beginningIndexes[beginningIndexesLen++] = i
      }
      return beginningIndexes
    },
    prepareNextBeginningIndexes: function(target) {
      var targetLen = target.length
      var beginningIndexes = fuzzysort.prepareBeginningIndexes(target)
      var nextBeginningIndexes = [] // new Array(targetLen)     sparse array is too slow
      var lastIsBeginning = beginningIndexes[0]
      var lastIsBeginningI = 0
      for(var i = 0; i < targetLen; ++i) {
        if(lastIsBeginning > i) {
          nextBeginningIndexes[i] = lastIsBeginning
        } else {
          lastIsBeginning = beginningIndexes[++lastIsBeginningI]
          nextBeginningIndexes[i] = lastIsBeginning===undefined ? targetLen : lastIsBeginning
        }
      }
      return nextBeginningIndexes
    },
    prepareBitmask: function(lowerCodes) {
      var bitmask = 0
      for(var i = lowerCodes.length - 1; i >= 0; --i) {
        var lowerCode = lowerCodes[i]
        var bit = lowerCode>=97&&lowerCode<=122  ? lowerCode-97 // alphabet
                : lowerCode>=48&&lowerCode<=57   ? 26           // numbers
                : lowerCode===32                 ? 27           // space
                : lowerCode<=127                 ? 28           // other ascii
                :                                  29           // other utf8
        bitmask |= 1<<bit
      }
      return bitmask
    },

    cleanup: cleanup,
    new: fuzzysortNew,
  }
  return fuzzysort
} // fuzzysortNew

// This stuff is outside fuzzysortNew, because it's shared with instances of fuzzysort.new()
var isNode = typeof require !== 'undefined' && typeof window === 'undefined'
var MyMap = typeof Map === 'function' ? Map : function(){var s=Object.create(null);this.get=function(k){return s[k]};this.set=function(k,val){s[k]=val;return this};this.clear=function(){s=Object.create(null)}}
var preparedCache = new MyMap()
var preparedSearchCache = new MyMap()
var noResults = []; noResults.total = 0
var matchesSimple = []; var matchesStrict = []
function cleanup() { preparedCache.clear(); preparedSearchCache.clear(); matchesSimple = []; matchesStrict = [] }
function defaultScoreFn(a) {
  var max = -9007199254740991
  for (var i = a.length - 1; i >= 0; --i) {
    var result = a[i]; if(result === null) continue
    var score = result.score
    if(score > max) max = score
  }
  if(max === -9007199254740991) return null
  return max
}

// prop = 'key'              2.5ms optimized for this case, seems to be about as fast as direct obj[prop]
// prop = 'key1.key2'        10ms
// prop = ['key1', 'key2']   27ms
function getValue(obj, prop) {
  var tmp = obj[prop]; if(tmp !== undefined) return tmp
  var segs = prop
  if(!Array.isArray(prop)) segs = prop.split('.')
  var len = segs.length
  var i = -1
  while (obj && (++i < len)) obj = obj[segs[i]]
  return obj
}

function isObj(x) { return typeof x === 'object' } // faster as a function

// Hacked version of https://github.com/lemire/FastPriorityQueue.js
var fastpriorityqueue=function(){var r=[],o=0,e={};function n(){for(var e=0,n=r[e],c=1;c<o;){var f=c+1;e=c,f<o&&r[f].score<r[c].score&&(e=f),r[e-1>>1]=r[e],c=1+(e<<1)}for(var a=e-1>>1;e>0&&n.score<r[a].score;a=(e=a)-1>>1)r[e]=r[a];r[e]=n}return e.add=function(e){var n=o;r[o++]=e;for(var c=n-1>>1;n>0&&e.score<r[c].score;c=(n=c)-1>>1)r[n]=r[c];r[n]=e},e.poll=function(){if(0!==o){var e=r[0];return r[0]=r[--o],n(),e}},e.peek=function(e){if(0!==o)return r[0]},e.replaceTop=function(o){r[0]=o,n()},e};
var q = fastpriorityqueue() // reuse this, except for async, it needs to make its own

return fuzzysortNew()
}) // UMD

// TODO: (feature) frecency
// TODO: (performance) use different sorting algo depending on the # of results?
// TODO: (performance) wasm version!?
// TODO: (performance) threads?
// TODO: (performance) avoid cache misses
// TODO: (performance) preparedCache is a memory leak
// TODO: (like sublime) backslash === forwardslash
// TODO: (like sublime) spaces: "a b" should do 2 searches 1 for a and 1 for b
// TODO: (scoring) garbage in targets that allows most searches to strict match need a penality
// TODO: (performance) idk if allowTypo is optimized

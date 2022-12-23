(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WBK = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var toDateObject = require('./wikibase_time_to_date_object');

var helpers = {};
helpers.isNumericId = function (id) {
  return (/^[1-9][0-9]*$/.test(id)
  );
};
helpers.isEntityId = function (id) {
  return (/^((Q|P|L|M)[1-9][0-9]*|L[1-9][0-9]*-(F|S)[1-9][0-9]*)$/.test(id)
  );
};
helpers.isEntitySchemaId = function (id) {
  return (/^E[1-9][0-9]*$/.test(id)
  );
};
helpers.isItemId = function (id) {
  return (/^Q[1-9][0-9]*$/.test(id)
  );
};
helpers.isPropertyId = function (id) {
  return (/^P[1-9][0-9]*$/.test(id)
  );
};
helpers.isLexemeId = function (id) {
  return (/^L[1-9][0-9]*$/.test(id)
  );
};
helpers.isFormId = function (id) {
  return (/^L[1-9][0-9]*-F[1-9][0-9]*$/.test(id)
  );
};
helpers.isSenseId = function (id) {
  return (/^L[1-9][0-9]*-S[1-9][0-9]*$/.test(id)
  );
};
helpers.isGuid = function (guid) {
  return (/^((Q|P|L)[1-9][0-9]*|L[1-9][0-9]*-(F|S)[1-9][0-9]*)\$[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(guid)
  );
};
helpers.isHash = function (hash) {
  return (/^[0-9a-f]{40}$/.test(hash)
  );
};
helpers.isPropertyClaimsId = function (id) {
  var _id$split = id.split('#'),
      _id$split2 = _slicedToArray(_id$split, 2),
      entityId = _id$split2[0],
      propertyId = _id$split2[1];

  return helpers.isEntityId(entityId) && helpers.isPropertyId(propertyId);
};
helpers.isRevisionId = function (id) {
  return (/^\d+$/.test(id)
  );
};

helpers.isEntityPageTitle = function (title) {
  if (typeof title !== 'string') return false;

  var _title$split = title.split(':'),
      _title$split2 = _slicedToArray(_title$split, 2),
      namespace = _title$split2[0],
      id = _title$split2[1];

  if (namespace && id) {
    return isEntityNamespace(namespace) && helpers['is' + namespace + 'Id'](id);
  } else {
    id = namespace;
    return helpers.isItemId(id);
  }
};

var entityNamespaces = ['Item', 'Property', 'Lexeme'];

var isEntityNamespace = function isEntityNamespace(str) {
  return entityNamespaces.includes(str);
};

var isNonNestedEntityId = function isNonNestedEntityId(id) {
  return (/^(Q|P|L)[1-9][0-9]*$/.test(id)
  );
};

helpers.getNumericId = function (id) {
  if (!isNonNestedEntityId(id)) throw new Error('invalid entity id: ' + id);
  return id.replace(/^(Q|P|L)/, '');
};

helpers.wikibaseTimeToDateObject = toDateObject;

// Try to parse the date or return the input
var bestEffort = function bestEffort(fn) {
  return function (value) {
    try {
      return fn(value);
    } catch (err) {
      value = value.time || value;

      var sign = value[0];

      var _value$slice$split = value.slice(1).split('T'),
          _value$slice$split2 = _slicedToArray(_value$slice$split, 2),
          yearMonthDay = _value$slice$split2[0],
          withinDay = _value$slice$split2[1];

      yearMonthDay = yearMonthDay.replace(/-00/g, '-01');

      return '' + sign + yearMonthDay + 'T' + withinDay;
    }
  };
};

var toEpochTime = function toEpochTime(wikibaseTime) {
  return toDateObject(wikibaseTime).getTime();
};
var toISOString = function toISOString(wikibaseTime) {
  return toDateObject(wikibaseTime).toISOString();
};

// A date format that knows just three precisions:
// 'yyyy', 'yyyy-mm', and 'yyyy-mm-dd' (including negative and non-4 digit years)
// Should be able to handle the old and the new Wikidata time:
// - in the old one, units below the precision where set to 00
// - in the new one, those months and days are set to 01 in those cases,
//   so when we can access the full claim object, we check the precision
//   to recover the old format
var toSimpleDay = function toSimpleDay(wikibaseTime) {
  // Also accept claim datavalue.value objects, and actually prefer those,
  // as we can check the precision
  if ((typeof wikibaseTime === 'undefined' ? 'undefined' : _typeof(wikibaseTime)) === 'object') {
    var _wikibaseTime = wikibaseTime,
        time = _wikibaseTime.time,
        precision = _wikibaseTime.precision;
    // Year precision

    if (precision === 9) wikibaseTime = time.replace('-01-01T', '-00-00T');
    // Month precision
    else if (precision === 10) wikibaseTime = time.replace('-01T', '-00T');else wikibaseTime = time;
  }

  return wikibaseTime.split('T')[0]
  // Remove positive years sign
  .replace(/^\+/, '')
  // Remove years padding zeros
  .replace(/^(-?)0+/, '$1')
  // Remove days if not included in the Wikidata date precision
  .replace(/-00$/, '')
  // Remove months if not included in the Wikidata date precision
  .replace(/-00$/, '');
};

helpers.wikibaseTimeToEpochTime = bestEffort(toEpochTime);
helpers.wikibaseTimeToISOString = bestEffort(toISOString);
helpers.wikibaseTimeToSimpleDay = bestEffort(toSimpleDay);

helpers.getImageUrl = function (filename, width) {
  var url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + filename;
  if (typeof width === 'number') url += '?width=' + width;
  return url;
};

helpers.getEntityIdFromGuid = function (guid) {
  var parts = guid.split(/[$-]/);
  if (parts.length === 6) {
    // Examples:
    // - q520$BCA8D9DE-B467-473B-943C-6FD0C5B3D02C
    // - P6216-a7fd6230-496e-6b47-ca4a-dcec5dbd7f95
    return parts[0].toUpperCase();
  } else if (parts.length === 7) {
    // Examples:
    // - L525-S1$66D20252-8CEC-4DB1-8B00-D713CFF42E48
    // - L525-F2-52c9b382-02f5-4413-9923-26ade74f5a0d
    return parts.slice(0, 2).join('-').toUpperCase();
  } else {
    throw new Error('invalid guid: ' + guid);
  }
};

module.exports = helpers;

},{"./wikibase_time_to_date_object":16}],2:[function(require,module,exports){
'use strict';

var _require = require('./helpers'),
    wikibaseTimeToISOString = _require.wikibaseTimeToISOString,
    wikibaseTimeToEpochTime = _require.wikibaseTimeToEpochTime,
    wikibaseTimeToSimpleDay = _require.wikibaseTimeToSimpleDay;

var simple = function simple(datavalue) {
  return datavalue.value;
};

var monolingualtext = function monolingualtext(datavalue, options) {
  return options.keepRichValues ? datavalue.value : datavalue.value.text;
};

var entity = function entity(datavalue, options) {
  return prefixedId(datavalue, options.entityPrefix);
};

var entityLetter = {
  item: 'Q',
  lexeme: 'L',
  property: 'P'
};

var prefixedId = function prefixedId(datavalue, prefix) {
  var value = datavalue.value;

  var id = value.id || entityLetter[value['entity-type']] + value['numeric-id'];
  return typeof prefix === 'string' ? prefix + ':' + id : id;
};

var quantity = function quantity(datavalue, options) {
  var value = datavalue.value;

  var amount = parseFloat(value.amount);
  if (options.keepRichValues) {
    var richValue = {
      amount: parseFloat(value.amount),
      // ex: http://www.wikidata.org/entity/
      unit: value.unit.replace(/^https?:\/\/.*\/entity\//, '')
    };
    if (value.upperBound != null) richValue.upperBound = parseFloat(value.upperBound);
    if (value.lowerBound != null) richValue.lowerBound = parseFloat(value.lowerBound);
    return richValue;
  } else {
    return amount;
  }
};

var coordinate = function coordinate(datavalue, options) {
  if (options.keepRichValues) {
    return datavalue.value;
  } else {
    return [datavalue.value.latitude, datavalue.value.longitude];
  }
};

var time = function time(datavalue, options) {
  var timeValue = void 0;
  if (typeof options.timeConverter === 'function') {
    timeValue = options.timeConverter(datavalue.value);
  } else {
    timeValue = getTimeConverter(options.timeConverter)(datavalue.value);
  }
  if (options.keepRichValues) {
    var _datavalue$value = datavalue.value,
        timezone = _datavalue$value.timezone,
        before = _datavalue$value.before,
        after = _datavalue$value.after,
        precision = _datavalue$value.precision,
        calendarmodel = _datavalue$value.calendarmodel;

    return { time: timeValue, timezone: timezone, before: before, after: after, precision: precision, calendarmodel: calendarmodel };
  } else {
    return timeValue;
  }
};

var getTimeConverter = function getTimeConverter() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'iso';

  var converter = timeConverters[key];
  if (!converter) throw new Error('invalid converter key: ' + JSON.stringify(key).substring(0, 100));
  return converter;
};

// Each time converter should be able to accept 2 keys of arguments:
// - either datavalue.value objects (prefered as it gives access to the precision)
// - or the time string (datavalue.value.time)
var timeConverters = {
  iso: wikibaseTimeToISOString,
  epoch: wikibaseTimeToEpochTime,
  'simple-day': wikibaseTimeToSimpleDay,
  none: function none(wikibaseTime) {
    return wikibaseTime.time || wikibaseTime;
  }
};

var parsers = {
  commonsMedia: simple,
  'external-id': simple,
  'geo-shape': simple,
  'globe-coordinate': coordinate,
  math: simple,
  monolingualtext: monolingualtext,
  'musical-notation': simple,
  quantity: quantity,
  string: simple,
  'tabular-data': simple,
  time: time,
  url: simple,
  'wikibase-entityid': entity,
  'wikibase-form': entity,
  'wikibase-item': entity,
  'wikibase-lexeme': entity,
  'wikibase-property': entity,
  'wikibase-sense': entity
};

module.exports = {
  parsers: parsers,
  parse: function parse(datatype, datavalue, options, claimId) {
    // Known case of missing datatype: form.claims, sense.claims
    datatype = datatype || datavalue.type;
    // Known case requiring this: legacy "muscial notation" datatype
    datatype = datatype.replace(' ', '-');

    try {
      return parsers[datatype](datavalue, options);
    } catch (err) {
      if (err.message === 'parsers[datatype] is not a function') {
        err.message = datatype + ' claim parser isn\'t implemented\n        Claim id: ' + claimId + '\n        Please report to https://github.com/maxlath/wikibase-sdk/issues';
      }
      throw err;
    }
  }
};

},{"./helpers":1}],3:[function(require,module,exports){
'use strict';

var _require = require('./simplify_entity'),
    simplifyEntity = _require.simplifyEntity;

var wb = {
  entities: function entities(res) {
    // Legacy convenience for the time the 'request' lib was all the rage
    res = res.body || res;
    var _res = res,
        entities = _res.entities;

    Object.keys(entities).forEach(function (entityId) {
      entities[entityId] = simplifyEntity(entities[entityId]);
    });
    return entities;
  },

  pagesTitles: function pagesTitles(res) {
    // Same behavior as above
    res = res.body || res;
    return res.query.search.map(function (result) {
      return result.title;
    });
  }
};

module.exports = {
  wb: wb,
  // Legacy
  wd: wb
};

},{"./simplify_entity":7}],4:[function(require,module,exports){
'use strict';

var truthyPropertyClaims = function truthyPropertyClaims(propClaims) {
  var aggregate = propClaims.reduce(aggregatePerRank, {});
  // on truthyness: https://www.mediawiki.org/wiki/Wikibase/Indexing/RDF_Dump_Format#Truthy_statements
  return aggregate.preferred || aggregate.normal || [];
};

var nonDeprecatedPropertyClaims = function nonDeprecatedPropertyClaims(propClaims) {
  return propClaims.filter(function (claim) {
    return claim.rank !== 'deprecated';
  });
};

var aggregatePerRank = function aggregatePerRank(aggregate, claim) {
  var rank = claim.rank;

  aggregate[rank] || (aggregate[rank] = []);
  aggregate[rank].push(claim);
  return aggregate;
};

var truthyClaims = function truthyClaims(claims) {
  var truthClaimsOnly = {};
  Object.keys(claims).forEach(function (property) {
    truthClaimsOnly[property] = truthyPropertyClaims(claims[property]);
  });
  return truthClaimsOnly;
};

module.exports = { truthyClaims: truthyClaims, truthyPropertyClaims: truthyPropertyClaims, nonDeprecatedPropertyClaims: nonDeprecatedPropertyClaims };

},{}],5:[function(require,module,exports){
'use strict';

var _require = require('./simplify_text_attributes'),
    labels = _require.labels,
    descriptions = _require.descriptions,
    aliases = _require.aliases,
    lemmas = _require.lemmas,
    glosses = _require.glosses;

var _require2 = require('./simplify_claims'),
    claim = _require2.simplifyClaim,
    propertyClaims = _require2.simplifyPropertyClaims,
    claims = _require2.simplifyClaims,
    qualifier = _require2.simplifyQualifier,
    propertyQualifiers = _require2.simplifyPropertyQualifiers,
    qualifiers = _require2.simplifyQualifiers,
    references = _require2.simplifyReferences;

var _require3 = require('./simplify_forms'),
    form = _require3.simplifyForm,
    forms = _require3.simplifyForms;

var _require4 = require('./simplify_senses'),
    sense = _require4.simplifySense,
    senses = _require4.simplifySenses;

var sitelinks = require('./simplify_sitelinks');
var sparqlResults = require('./simplify_sparql_results');

module.exports = {
  labels: labels,
  descriptions: descriptions,
  aliases: aliases,
  claim: claim,
  propertyClaims: propertyClaims,
  claims: claims,
  qualifier: qualifier,
  propertyQualifiers: propertyQualifiers,
  qualifiers: qualifiers,
  references: references,
  sitelinks: sitelinks,

  // Aliases
  snak: claim,
  propertySnaks: propertyClaims,
  snaks: claims,

  // Lexemes
  lemmas: lemmas,
  glosses: glosses,
  form: form,
  forms: forms,
  sense: sense,
  senses: senses,

  sparqlResults: sparqlResults

  // Set in ./simplify_entity
  // entity,
  // entities,
};

},{"./simplify_claims":6,"./simplify_forms":8,"./simplify_senses":9,"./simplify_sitelinks":10,"./simplify_sparql_results":11,"./simplify_text_attributes":12}],6:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require('./parse_claim'),
    parseClaim = _require.parse;

var _require2 = require('../utils/utils'),
    uniq = _require2.uniq;

var _require3 = require('./rank'),
    truthyPropertyClaims = _require3.truthyPropertyClaims,
    nonDeprecatedPropertyClaims = _require3.nonDeprecatedPropertyClaims;

// Expects an entity 'claims' object
// Ex: entity.claims


var simplifyClaims = function simplifyClaims(claims) {
  for (var _len = arguments.length, options = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    options[_key - 1] = arguments[_key];
  }

  var _parseOptions = parseOptions(options),
      propertyPrefix = _parseOptions.propertyPrefix;

  var simpleClaims = {};
  for (var id in claims) {
    var propClaims = claims[id];
    if (propertyPrefix) {
      id = propertyPrefix + ':' + id;
    }
    simpleClaims[id] = simplifyPropertyClaims.apply(undefined, [propClaims].concat(options));
  }
  return simpleClaims;
};

// Expects the 'claims' array of a particular property
// Ex: entity.claims.P369
var simplifyPropertyClaims = function simplifyPropertyClaims(propClaims) {
  for (var _len2 = arguments.length, options = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  // Avoid to throw on empty inputs to allow to simplify claims array
  // without having to know if the entity as claims for this property
  // Ex: simplifyPropertyClaims(entity.claims.P124211616)
  if (propClaims == null || propClaims.length === 0) return [];

  var _parseOptions2 = parseOptions(options),
      keepNonTruthy = _parseOptions2.keepNonTruthy,
      keepNonDeprecated = _parseOptions2.keepNonDeprecated,
      areSubSnaks = _parseOptions2.areSubSnaks;

  if (keepNonDeprecated) {
    propClaims = nonDeprecatedPropertyClaims(propClaims);
  } else if (!(keepNonTruthy || areSubSnaks)) {
    propClaims = truthyPropertyClaims(propClaims);
  }

  propClaims = propClaims.map(function (claim) {
    return simplifyClaim.apply(undefined, [claim].concat(options));
  })
  // Filter-out novalue and somevalue claims,
  // unless a novalueValue or a somevalueValue is passed in options
  .filter(defined);

  // Deduplicate values unless we return a rich value object
  if (propClaims[0] && _typeof(propClaims[0]) !== 'object') {
    return uniq(propClaims);
  } else {
    return propClaims;
  }
};

// Considers null as defined
var defined = function defined(obj) {
  return obj !== undefined;
};

// Expects a single claim object
// Ex: entity.claims.P369[0]
var simplifyClaim = function simplifyClaim(claim) {
  for (var _len3 = arguments.length, options = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    options[_key3 - 1] = arguments[_key3];
  }

  options = parseOptions(options);

  var _parseKeepOptions = parseKeepOptions(options),
      keepQualifiers = _parseKeepOptions.keepQualifiers,
      keepReferences = _parseKeepOptions.keepReferences,
      keepIds = _parseKeepOptions.keepIds,
      keepHashes = _parseKeepOptions.keepHashes,
      keepTypes = _parseKeepOptions.keepTypes,
      keepSnaktypes = _parseKeepOptions.keepSnaktypes,
      keepRanks = _parseKeepOptions.keepRanks;

  // tries to replace wikidata deep claim object by a simple value
  // e.g. a string, an entity Qid or an epoch time number


  var mainsnak = claim.mainsnak,
      rank = claim.rank;


  var value = void 0,
      datatype = void 0,
      datavalue = void 0,
      snaktype = void 0,
      isQualifierSnak = void 0,
      isReferenceSnak = void 0;
  if (mainsnak) {
    datatype = mainsnak.datatype;
    datavalue = mainsnak.datavalue;
    snaktype = mainsnak.snaktype;
  } else {
    // Qualifiers have no mainsnak, and define datatype, datavalue on claim
    datavalue = claim.datavalue;
    datatype = claim.datatype;
    snaktype = claim.snaktype;
    // Duck typing the sub-snak type
    if (claim.hash) isQualifierSnak = true;else isReferenceSnak = true;
  }

  if (datavalue) {
    value = parseClaim(datatype, datavalue, options, claim.id);
  } else {
    if (snaktype === 'somevalue') value = options.somevalueValue;else if (snaktype === 'novalue') value = options.novalueValue;else throw new Error('no datavalue or special snaktype found');
  }

  // Qualifiers should not attempt to keep sub-qualifiers or references
  if (isQualifierSnak) {
    if (!(keepHashes || keepTypes || keepSnaktypes)) return value;

    var _valueObj = { value: value };

    if (keepHashes) _valueObj.hash = claim.hash;
    if (keepTypes) _valueObj.type = datatype;
    if (keepSnaktypes) _valueObj.snaktype = snaktype;

    return _valueObj;
  }
  if (isReferenceSnak) {
    if (!keepTypes) return value;

    return { type: datatype, value: value };
  }
  // No need to test keepHashes as it has no effect if neither
  // keepQualifiers or keepReferences is true
  if (!(keepQualifiers || keepReferences || keepIds || keepTypes || keepSnaktypes || keepRanks)) {
    return value;
  }

  // When keeping qualifiers or references, the value becomes an object
  // instead of a direct value
  var valueObj = { value: value };

  if (keepTypes) valueObj.type = datatype;

  if (keepSnaktypes) valueObj.snaktype = snaktype;

  if (keepRanks) valueObj.rank = rank;

  var subSnaksOptions = getSubSnakOptions(options);
  subSnaksOptions.keepHashes = keepHashes;

  if (keepQualifiers) {
    valueObj.qualifiers = simplifyQualifiers(claim.qualifiers, subSnaksOptions);
  }

  if (keepReferences) {
    claim.references = claim.references || [];
    valueObj.references = simplifyReferences(claim.references, subSnaksOptions);
  }

  if (keepIds) valueObj.id = claim.id;

  return valueObj;
};

var parseOptions = function parseOptions(options) {
  if (options == null) return {};

  if (options[0] && _typeof(options[0]) === 'object') return options[0];

  // Legacy interface

  var _options = _slicedToArray(options, 3),
      entityPrefix = _options[0],
      propertyPrefix = _options[1],
      keepQualifiers = _options[2];

  return { entityPrefix: entityPrefix, propertyPrefix: propertyPrefix, keepQualifiers: keepQualifiers };
};

var simplifyQualifiers = function simplifyQualifiers(qualifiers, options) {
  return simplifyClaims(qualifiers, getSubSnakOptions(options));
};

var simplifyPropertyQualifiers = function simplifyPropertyQualifiers(propertyQualifiers, options) {
  return simplifyPropertyClaims(propertyQualifiers, getSubSnakOptions(options));
};

var simplifyReferences = function simplifyReferences(references, options) {
  return references.map(function (refRecord) {
    return simplifyReferenceRecord(refRecord, options);
  });
};

var simplifyReferenceRecord = function simplifyReferenceRecord(refRecord, options) {
  var subSnaksOptions = getSubSnakOptions(options);
  var snaks = simplifyClaims(refRecord.snaks, subSnaksOptions);
  if (subSnaksOptions.keepHashes) return { snaks: snaks, hash: refRecord.hash };else return snaks;
};

var getSubSnakOptions = function getSubSnakOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (options.areSubSnaks) return options;
  // Using a new object so that the original options object isn't modified
  else return Object.assign({}, options, { areSubSnaks: true });
};

var keepOptions = ['keepQualifiers', 'keepReferences', 'keepIds', 'keepHashes', 'keepTypes', 'keepSnaktypes', 'keepRanks', 'keepRichValues'];

var parseKeepOptions = function parseKeepOptions(options) {
  if (options.keepAll) {
    keepOptions.forEach(function (optionName) {
      if (options[optionName] == null) options[optionName] = true;
    });
  }
  return options;
};

module.exports = {
  simplifyClaims: simplifyClaims,
  simplifyPropertyClaims: simplifyPropertyClaims,
  simplifyClaim: simplifyClaim,
  simplifyQualifiers: simplifyQualifiers,
  simplifyPropertyQualifiers: simplifyPropertyQualifiers,
  simplifyQualifier: simplifyClaim,
  simplifyReferences: simplifyReferences
};

},{"../utils/utils":27,"./parse_claim":2,"./rank":4}],7:[function(require,module,exports){
'use strict';

var simplify = require('./simplify');

var simplifyEntity = function simplifyEntity(entity, options) {
  var type = entity.type;

  var simplified = {
    id: entity.id,
    type: type,
    modified: entity.modified
  };

  if (entity.datatype) simplified.datatype = entity.datatype;

  if (type === 'item') {
    simplifyIfDefined(entity, simplified, 'labels');
    simplifyIfDefined(entity, simplified, 'descriptions');
    simplifyIfDefined(entity, simplified, 'aliases');
    simplifyIfDefined(entity, simplified, 'claims', options);
    simplifyIfDefined(entity, simplified, 'sitelinks', options);
  } else if (type === 'property') {
    simplified.datatype = entity.datatype;
    simplifyIfDefined(entity, simplified, 'labels');
    simplifyIfDefined(entity, simplified, 'descriptions');
    simplifyIfDefined(entity, simplified, 'aliases');
    simplifyIfDefined(entity, simplified, 'claims', options);
  } else if (type === 'lexeme') {
    simplifyIfDefined(entity, simplified, 'lemmas');
    simplified.lexicalCategory = entity.lexicalCategory;
    simplified.language = entity.language;
    simplifyIfDefined(entity, simplified, 'claims', options);
    simplifyIfDefined(entity, simplified, 'forms', options);
    simplifyIfDefined(entity, simplified, 'senses', options);
  }

  return simplified;
};

var simplifyIfDefined = function simplifyIfDefined(entity, simplified, attribute, options) {
  if (entity[attribute] != null) {
    simplified[attribute] = simplify[attribute](entity[attribute], options);
  }
};

var simplifyEntities = function simplifyEntities(entities) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (entities.entities) entities = entities.entities;
  var entityPrefix = options.entityPrefix;

  return Object.keys(entities).reduce(function (obj, key) {
    var entity = entities[key];
    if (entityPrefix) key = entityPrefix + ':' + key;
    obj[key] = simplifyEntity(entity, options);
    return obj;
  }, {});
};

// Set those here instead of in ./simplify to avoid a circular dependency
simplify.entity = simplifyEntity;
simplify.entities = simplifyEntities;

module.exports = { simplifyEntity: simplifyEntity, simplifyEntities: simplifyEntities };

},{"./simplify":5}],8:[function(require,module,exports){
'use strict';

var _require = require('./helpers'),
    isFormId = _require.isFormId;

var _require2 = require('./simplify_text_attributes'),
    simplifyRepresentations = _require2.representations;

var _require3 = require('./simplify_claims'),
    simplifyClaims = _require3.simplifyClaims;

var simplifyForm = function simplifyForm(form, options) {
  var id = form.id,
      representations = form.representations,
      grammaticalFeatures = form.grammaticalFeatures,
      claims = form.claims;

  if (!isFormId(id)) throw new Error('invalid form object');
  return {
    id: id,
    representations: simplifyRepresentations(representations),
    grammaticalFeatures: grammaticalFeatures,
    claims: simplifyClaims(claims, options)
  };
};

var simplifyForms = function simplifyForms(forms, options) {
  return forms.map(function (form) {
    return simplifyForm(form, options);
  });
};

module.exports = { simplifyForm: simplifyForm, simplifyForms: simplifyForms };

},{"./helpers":1,"./simplify_claims":6,"./simplify_text_attributes":12}],9:[function(require,module,exports){
'use strict';

var _require = require('./helpers'),
    isSenseId = _require.isSenseId;

var _require2 = require('./simplify_text_attributes'),
    simplifyGlosses = _require2.glosses;

var _require3 = require('./simplify_claims'),
    simplifyClaims = _require3.simplifyClaims;

var simplifySense = function simplifySense(sense, options) {
  var id = sense.id,
      glosses = sense.glosses,
      claims = sense.claims;

  if (!isSenseId(id)) throw new Error('invalid sense object');
  return {
    id: id,
    glosses: simplifyGlosses(glosses),
    claims: simplifyClaims(claims, options)
  };
};

var simplifySenses = function simplifySenses(senses, options) {
  return senses.map(function (sense) {
    return simplifySense(sense, options);
  });
};

module.exports = { simplifySense: simplifySense, simplifySenses: simplifySenses };

},{"./helpers":1,"./simplify_claims":6,"./simplify_text_attributes":12}],10:[function(require,module,exports){
'use strict';

var _require = require('./sitelinks'),
    getSitelinkUrl = _require.getSitelinkUrl;

module.exports = function (sitelinks) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var addUrl = options.addUrl,
      keepBadges = options.keepBadges,
      keepAll = options.keepAll;

  keepBadges = keepBadges || keepAll;
  return Object.keys(sitelinks).reduce(aggregateValues({
    sitelinks: sitelinks,
    addUrl: addUrl,
    keepBadges: keepBadges
  }), {});
};

var aggregateValues = function aggregateValues(_ref) {
  var sitelinks = _ref.sitelinks,
      addUrl = _ref.addUrl,
      keepBadges = _ref.keepBadges;
  return function (index, key) {
    // Accomodating for wikibase-cli, which might set the sitelink to null
    // to signify that a requested sitelink was not found
    if (sitelinks[key] == null) {
      index[key] = sitelinks[key];
      return index;
    }

    var _sitelinks$key = sitelinks[key],
        title = _sitelinks$key.title,
        badges = _sitelinks$key.badges;

    if (addUrl || keepBadges) {
      index[key] = { title: title };
      if (addUrl) index[key].url = getSitelinkUrl(key, title);
      if (keepBadges) index[key].badges = badges;
    } else {
      index[key] = title;
    }
    return index;
  };
};

},{"./sitelinks":13}],11:[function(require,module,exports){
'use strict';

module.exports = function (input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof input === 'string') input = JSON.parse(input);

  var vars = input.head.vars;

  var results = input.results.bindings;

  if (vars.length === 1 && options.minimize === true) {
    var varName = vars[0];
    return results.map(function (result) {
      return parseValue(result[varName]);
    })
    // filtering-out bnodes
    .filter(function (result) {
      return result != null;
    });
  }

  var _identifyVars = identifyVars(vars),
      richVars = _identifyVars.richVars,
      associatedVars = _identifyVars.associatedVars,
      standaloneVars = _identifyVars.standaloneVars;

  return results.map(getSimplifiedResult(richVars, associatedVars, standaloneVars));
};

var parseValue = function parseValue(valueObj) {
  if (!valueObj) return;
  var datatype = valueObj.datatype;

  datatype = datatype && datatype.replace('http://www.w3.org/2001/XMLSchema#', '');
  var parser = parsers[valueObj.type] || getDatatypesParsers(datatype);
  return parser(valueObj);
};

var parsers = {
  uri: function uri(valueObj) {
    return parseUri(valueObj.value);
  },
  // blank nodes will be filtered-out in order to get things simple
  bnode: function bnode() {
    return null;
  }
};

var numberParser = function numberParser(valueObj) {
  return parseFloat(valueObj.value);
};

var getDatatypesParsers = function getDatatypesParsers(datatype) {
  datatype = datatype && datatype.replace('http://www.w3.org/2001/XMLSchema#', '');
  return datatypesParsers[datatype] || passValue;
};

var datatypesParsers = {
  decimal: numberParser,
  integer: numberParser,
  float: numberParser,
  double: numberParser,
  boolean: function boolean(valueObj) {
    return valueObj.value === 'true';
  }

  // return the raw value if the datatype is missing
};var passValue = function passValue(valueObj) {
  return valueObj.value;
};

var parseUri = function parseUri(uri) {
  // ex: http://www.wikidata.org/entity/statement/
  if (uri.match(/http.*\/entity\/statement\//)) {
    return convertStatementUriToGuid(uri);
  }

  return uri
  // ex: http://www.wikidata.org/entity/
  .replace(/^https?:\/\/.*\/entity\//, '')
  // ex: http://www.wikidata.org/prop/direct/
  .replace(/^https?:\/\/.*\/prop\/direct\//, '');
};

var convertStatementUriToGuid = function convertStatementUriToGuid(uri) {
  // ex: http://www.wikidata.org/entity/statement/
  uri = uri.replace(/^https?:\/\/.*\/entity\/statement\//, '');
  var parts = uri.split('-');
  return parts[0] + '$' + parts.slice(1).join('-');
};

var identifyVars = function identifyVars(vars) {
  var richVars = vars.filter(function (varName) {
    return vars.some(isAssociatedVar(varName));
  });
  richVars = richVars.filter(function (richVar) {
    return !richVars.some(function (otherRichVar) {
      return richVar !== otherRichVar && richVar.startsWith(otherRichVar);
    });
  });
  var associatedVarPattern = new RegExp('^(' + richVars.join('|') + ')[A-Z]');
  var associatedVars = vars.filter(function (varName) {
    return associatedVarPattern.test(varName);
  });
  var standaloneVars = vars.filter(function (varName) {
    return !richVars.includes(varName) && !associatedVarPattern.test(varName);
  });
  return { richVars: richVars, associatedVars: associatedVars, standaloneVars: standaloneVars };
};

var isAssociatedVar = function isAssociatedVar(varNameA) {
  var pattern = new RegExp('^' + varNameA + '[A-Z]\\w+');
  return pattern.test.bind(pattern);
};

var getSimplifiedResult = function getSimplifiedResult(richVars, associatedVars, standaloneVars) {
  return function (result) {
    var simplifiedResult = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = richVars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var varName = _step.value;

        var richVarData = {};
        var value = parseValue(result[varName]);
        if (value != null) richVarData.value = value;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = associatedVars[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var associatedVarName = _step3.value;

            if (associatedVarName.startsWith(varName)) addAssociatedValue(result, varName, associatedVarName, richVarData);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        if (Object.keys(richVarData).length > 0) simplifiedResult[varName] = richVarData;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = standaloneVars[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _varName = _step2.value;

        simplifiedResult[_varName] = parseValue(result[_varName]);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return simplifiedResult;
  };
};

var addAssociatedValue = function addAssociatedValue(result, varName, associatedVarName, richVarData) {
  // ex: propertyType => Type
  var shortAssociatedVarName = associatedVarName.split(varName)[1];
  // ex: Type => type
  shortAssociatedVarName = shortAssociatedVarName[0].toLowerCase() + shortAssociatedVarName.slice(1);
  // ex: altLabel => aliases
  shortAssociatedVarName = specialNames[shortAssociatedVarName] || shortAssociatedVarName;
  var associatedVarData = result[associatedVarName];
  if (associatedVarData != null) richVarData[shortAssociatedVarName] = associatedVarData.value;
};

var specialNames = {
  altLabel: 'aliases'
};

},{}],12:[function(require,module,exports){
"use strict";

var simplifyTextAttributes = function simplifyTextAttributes(multivalue) {
  return function (data) {
    var simplified = {};
    Object.keys(data).forEach(function (lang) {
      var obj = data[lang];
      if (obj != null) {
        simplified[lang] = multivalue ? obj.map(getValue) : obj.value;
      } else {
        simplified[lang] = multivalue ? [] : null;
      }
    });
    return simplified;
  };
};

var getValue = function getValue(obj) {
  return obj.value;
};

var singleValue = simplifyTextAttributes(false);

module.exports = {
  labels: singleValue,
  descriptions: singleValue,
  aliases: simplifyTextAttributes(true),
  lemmas: singleValue,
  representations: singleValue,
  glosses: singleValue
};

},{}],13:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = require('../utils/utils'),
    fixedEncodeURIComponent = _require.fixedEncodeURIComponent,
    replaceSpaceByUnderscores = _require.replaceSpaceByUnderscores,
    isPlainObject = _require.isPlainObject;

var wikidataBase = 'https://www.wikidata.org/wiki/';
var languages = require('./sitelinks_languages');

var getSitelinkUrl = function getSitelinkUrl(site, title) {
  if (isPlainObject(site)) {
    title = site.title;
    site = site.site;
  }

  if (!site) throw new Error('missing a site');
  if (!title) throw new Error('missing a title');

  var shortSiteKey = site.replace(/wiki$/, '');
  var specialUrlBuilder = siteUrlBuilders[shortSiteKey] || siteUrlBuilders[site];
  if (specialUrlBuilder) return specialUrlBuilder(title);

  var _getSitelinkData = getSitelinkData(site),
      lang = _getSitelinkData.lang,
      project = _getSitelinkData.project;

  title = fixedEncodeURIComponent(replaceSpaceByUnderscores(title));
  return 'https://' + lang + '.' + project + '.org/wiki/' + title;
};

var wikimediaSite = function wikimediaSite(subdomain) {
  return function (title) {
    return 'https://' + subdomain + '.wikimedia.org/wiki/' + title;
  };
};

var siteUrlBuilders = {
  commons: wikimediaSite('commons'),
  mediawiki: function mediawiki(title) {
    return 'https://www.mediawiki.org/wiki/' + title;
  },
  meta: wikimediaSite('meta'),
  species: wikimediaSite('species'),
  wikidata: function wikidata(entityId) {
    var prefix = prefixByEntityLetter[entityId[0]];
    var title = prefix ? prefix + ':' + entityId : entityId;
    // Required for forms and senses
    title = title.replace('-', '#');
    return '' + wikidataBase + title;
  },
  wikimania: wikimediaSite('wikimania')
};

var prefixByEntityLetter = {
  E: 'EntitySchema',
  L: 'Lexeme',
  P: 'Property'
};

var sitelinkUrlPattern = /^https?:\/\/([\w-]{2,10})\.(\w+)\.org\/\w+\/(.*)/;

var getSitelinkData = function getSitelinkData(site) {
  if (site.startsWith('http')) {
    var url = site;
    var matchData = url.match(sitelinkUrlPattern);
    if (!matchData) throw new Error('invalid sitelink url: ' + url);

    var _matchData$slice = matchData.slice(1),
        _matchData$slice2 = _slicedToArray(_matchData$slice, 3),
        lang = _matchData$slice2[0],
        project = _matchData$slice2[1],
        title = _matchData$slice2[2];

    title = decodeURIComponent(title);
    var key = void 0;
    // Known case: wikidata, mediawiki
    if (lang === 'www') {
      lang = 'en';
      key = project;
    } else if (lang === 'commons') {
      lang = 'en';
      project = key = 'commons';
    } else {
      // Support multi-parts language codes, such as be_x_old
      lang = lang.replace(/-/g, '_');
      key = ('' + lang + project).replace('wikipedia', 'wiki');
    }
    return { lang: lang, project: project, key: key, title: title, url: url };
  } else {
    var _key = site;
    var specialProjectName = specialSites[_key];
    if (specialProjectName) return { lang: 'en', project: specialProjectName, key: _key };

    var _key$split = _key.split('wik'),
        _key$split2 = _slicedToArray(_key$split, 3),
        _lang = _key$split2[0],
        projectSuffix = _key$split2[1],
        rest = _key$split2[2];

    // Detecting cases like 'frwikiwiki' that would return [ 'fr', 'i', 'i' ]


    if (rest != null) throw new Error('invalid sitelink key: ' + _key);

    if (languages.indexOf(_lang) === -1) {
      throw new Error('sitelink lang not found: ' + _lang + '. Updating wikibase-sdk to a more recent version might fix the issue.');
    }

    // Support keys such as be_x_oldwiki, which refers to be-x-old.wikipedia.org
    _lang = _lang.replace(/_/g, '-');

    var _project = projectsBySuffix[projectSuffix];
    if (!_project) throw new Error('sitelink project not found: ' + _project);

    return { lang: _lang, project: _project, key: _key };
  }
};

var specialSites = {
  commonswiki: 'commons',
  mediawikiwiki: 'mediawiki',
  metawiki: 'meta',
  specieswiki: 'specieswiki',
  wikidatawiki: 'wikidata',
  wikimaniawiki: 'wikimania'
};

var isSitelinkKey = function isSitelinkKey(site) {
  try {
    // relies on getSitelinkData validation
    getSitelinkData(site);
    return true;
  } catch (err) {
    return false;
  }
};

var projectsBySuffix = {
  i: 'wikipedia',
  isource: 'wikisource',
  iquote: 'wikiquote',
  tionary: 'wiktionary',
  ibooks: 'wikibooks',
  iversity: 'wikiversity',
  ivoyage: 'wikivoyage',
  inews: 'wikinews'
};

module.exports = { getSitelinkUrl: getSitelinkUrl, getSitelinkData: getSitelinkData, isSitelinkKey: isSitelinkKey };

},{"../utils/utils":27,"./sitelinks_languages":14}],14:[function(require,module,exports){
'use strict';

// Generated by 'npm run update-sitelinks-languages'
module.exports = ['aa', 'ab', 'ace', 'ady', 'af', 'ak', 'als', 'alt', 'ami', 'am', 'ang', 'an', 'arc', 'ar', 'ary', 'arz', 'ast', 'as', 'atj', 'avk', 'av', 'awa', 'ay', 'azb', 'az', 'ban', 'bar', 'bat_smg', 'ba', 'bcl', 'be_x_old', 'be', 'bg', 'bh', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'br', 'bs', 'bug', 'bxr', 'ca', 'cbk_zam', 'cdo', 'ceb', 'ce', 'cho', 'chr', 'ch', 'chy', 'ckb', 'co', 'crh', 'cr', 'csb', 'cs', 'cu', 'cv', 'cy', 'dag', 'da', 'de', 'din', 'diq', 'dsb', 'dty', 'dv', 'dz', 'ee', 'el', 'eml', 'en', 'eo', 'es', 'et', 'eu', 'ext', 'fa', 'ff', 'fiu_vro', 'fi', 'fj', 'fo', 'frp', 'frr', 'fr', 'fur', 'fy', 'gag', 'gan', 'ga', 'gcr', 'gd', 'glk', 'gl', 'gn', 'gom', 'gor', 'got', 'gu', 'guw', 'gv', 'hak', 'ha', 'haw', 'he', 'hif', 'hi', 'ho', 'hr', 'hsb', 'ht', 'hu', 'hy', 'hyw', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'ilo', 'inh', 'io', 'is', 'it', 'iu', 'jam', 'ja', 'jbo', 'jv', 'kaa', 'kab', 'ka', 'kbd', 'kbp', 'kcg', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'koi', 'ko', 'krc', 'kr', 'ksh', 'ks', 'ku', 'kv', 'kw', 'ky', 'lad', 'la', 'lbe', 'lb', 'lez', 'lfn', 'lg', 'lij', 'li', 'lld', 'lmo', 'ln', 'lo', 'lrc', 'ltg', 'lt', 'lv', 'mad', 'mai', 'map_bms', 'mdf', 'mg', 'mhr', 'mh', 'min', 'mi', 'mk', 'ml', 'mni', 'mn', 'mnw', 'mo', 'mrj', 'mr', 'ms', 'mt', 'mus', 'mwl', 'myv', 'my', 'mzn', 'nah', 'nap', 'na', 'nds_nl', 'nds', 'ne', 'new', 'ng', 'nia', 'nl', 'nn', 'nov', 'no', 'nqo', 'nrm', 'nso', 'nv', 'ny', 'oc', 'olo', 'om', 'or', 'os', 'pag', 'pam', 'pap', 'pa', 'pcd', 'pdc', 'pfl', 'pih', 'pi', 'pl', 'pms', 'pnb', 'pnt', 'ps', 'pt', 'pwn', 'qu', 'rm', 'rmy', 'rn', 'roa_rup', 'roa_tara', 'ro', 'rue', 'ru', 'rw', 'sah', 'sat', 'sa', 'scn', 'sco', 'sc', 'sd', 'se', 'sg', 'shi', 'shn', 'sh', 'shy', 'simple', 'si', 'skr', 'sk', 'sl', 'smn', 'sm', 'sn', 'sources', 'so', 'sq', 'srn', 'sr', 'ss', 'stq', 'st', 'su', 'sv', 'sw', 'szl', 'szy', 'ta', 'tay', 'tcy', 'tet', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tpi', 'trv', 'tr', 'ts', 'tt', 'tum', 'tw', 'tyv', 'ty', 'udm', 'ug', 'uk', 'ur', 'uz', 'vec', 'vep', 've', 'vi', 'vls', 'vo', 'war', 'wa', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'yi', 'yo', 'yue', 'za', 'zea', 'zh_classical', 'zh_min_nan', 'zh_yue', 'zh', 'zu'];

},{}],15:[function(require,module,exports){
'use strict';

var helpers = require('./helpers');

var validate = function validate(name, testName) {
  return function (value) {
    if (!helpers[testName](value)) throw new Error('invalid ' + name + ': ' + value);
  };
};

module.exports = {
  entityId: validate('entity id', 'isEntityId'),
  propertyId: validate('property id', 'isPropertyId'),
  entityPageTitle: validate('entity page title', 'isEntityPageTitle'),
  revisionId: validate('revision id', 'isRevisionId')
};

},{"./helpers":1}],16:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (wikibaseTime) {
  // Also accept claim datavalue.value objects
  if ((typeof wikibaseTime === 'undefined' ? 'undefined' : _typeof(wikibaseTime)) === 'object') {
    wikibaseTime = wikibaseTime.time;
  }

  var sign = wikibaseTime[0];

  var _wikibaseTime$slice$s = wikibaseTime.slice(1).split('T'),
      _wikibaseTime$slice$s2 = _slicedToArray(_wikibaseTime$slice$s, 2),
      yearMonthDay = _wikibaseTime$slice$s2[0],
      withinDay = _wikibaseTime$slice$s2[1];

  // Wikidata generates invalid ISO dates to indicate precision
  // ex: +1990-00-00T00:00:00Z to indicate 1990 with year precision


  yearMonthDay = yearMonthDay.replace(/-00/g, '-01');
  var rest = yearMonthDay + 'T' + withinDay;

  return fullDateData(sign, rest);
};

var fullDateData = function fullDateData(sign, rest) {
  var year = rest.split('-')[0];
  var needsExpandedYear = sign === '-' || year.length > 4;

  return needsExpandedYear ? expandedYearDate(sign, rest, year) : new Date(rest);
};

var expandedYearDate = function expandedYearDate(sign, rest, year) {
  var date = void 0;
  // Using ISO8601 expanded notation for negative years or positive
  // years with more than 4 digits: adding up to 2 leading zeros
  // when needed. Can't find the documentation again, but testing
  // with `new Date(date)` gives a good clue of the implementation
  if (year.length === 4) {
    date = sign + '00' + rest;
  } else if (year.length === 5) {
    date = sign + '0' + rest;
  } else {
    date = sign + rest;
  }
  return new Date(date);
};

},{}],17:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// See https://www.wikidata.org/w/api.php?action=help&modules=query%2Bsearch

var _require = require('../utils/utils'),
    isPlainObject = _require.isPlainObject;

var namespacePattern = /^\d+[|\d]*$/;

module.exports = function (buildUrl) {
  return function (params) {
    if (!isPlainObject(params)) {
      throw new Error('expected parameters to be passed as an object, got ' + params + ' (' + (typeof params === 'undefined' ? 'undefined' : _typeof(params)) + ')');
    }

    // Accept sr parameters with or without prefix
    for (var key in params) {
      if (key.startsWith('sr')) {
        var shortKey = key.replace(/^sr/, '');
        if (params[shortKey] != null) throw new Error(shortKey + ' and ' + key + ' are the same');
        params[shortKey] = params[key];
      }
    }

    var search = params.search,
        haswbstatement = params.haswbstatement,
        _params$format = params.format,
        format = _params$format === undefined ? 'json' : _params$format,
        limit = params.limit,
        offset = params.offset,
        profile = params.profile,
        sort = params.sort;
    var namespace = params.namespace,
        prop = params.prop;


    if (!(search || haswbstatement)) throw new Error('missing "search" or "haswbstatement" parameter');

    var srsearch = '';
    if (search) srsearch += search;

    if (haswbstatement) {
      var statements = haswbstatement instanceof Array ? haswbstatement : [haswbstatement];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = statements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var statement = _step.value;

          if (statement[0] === '-') srsearch += ' -haswbstatement:' + statement.slice(1);else srsearch += ' haswbstatement:' + statement;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    if (limit != null && (typeof limit !== 'number' || limit < 1)) {
      throw new Error('invalid limit: ' + limit);
    }

    if (offset != null && (typeof offset !== 'number' || offset < 0)) {
      throw new Error('invalid offset: ' + offset);
    }

    if (namespace instanceof Array) namespace = namespace.join('|');else if (typeof namespace === 'number') namespace = namespace.toString();

    if (namespace && !namespacePattern.test(namespace)) {
      throw new Error('invalid namespace: ' + namespace);
    }

    if (profile != null && typeof profile !== 'string') {
      throw new Error('invalid profile: ' + profile + ' (' + (typeof profile === 'undefined' ? 'undefined' : _typeof(profile)) + ', expected string)');
    }

    if (sort != null && typeof sort !== 'string') {
      throw new Error('invalid sort: ' + sort + ' (' + (typeof sort === 'undefined' ? 'undefined' : _typeof(sort)) + ', expected string)');
    }

    if (prop != null) {
      if (namespace instanceof Array) prop = prop.join('|');
      if (typeof prop !== 'string') {
        throw new Error('invalid prop: ' + prop + ' (' + (typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) + ', expected string)');
      }
    }

    return buildUrl({
      action: 'query',
      list: 'search',
      srsearch: srsearch.trim(),
      format: format,
      srnamespace: namespace,
      srlimit: limit,
      sroffset: offset,
      srqiprofile: profile,
      srsort: sort,
      srprop: prop
    });
  };
};

},{"../utils/utils":27}],18:[function(require,module,exports){
'use strict';

var _require = require('../utils/utils'),
    isPlainObject = _require.isPlainObject,
    forceArray = _require.forceArray,
    shortLang = _require.shortLang;

var validate = require('../helpers/validate');

module.exports = function (buildUrl) {
  return function (ids, languages, props, format, redirects) {
    // Polymorphism: arguments can be passed as an object keys
    if (isPlainObject(ids)) {
      var _ids = ids;
      ids = _ids.ids;
      languages = _ids.languages;
      props = _ids.props;
      format = _ids.format;
      redirects = _ids.redirects;
    }

    format = format || 'json';

    // ids can't be let empty
    if (!(ids && ids.length > 0)) throw new Error('no id provided');

    // Allow to pass ids as a single string
    ids = forceArray(ids);

    ids.forEach(validate.entityId);

    if (ids.length > 50) {
      console.warn('getEntities accepts 50 ids max to match Wikidata API limitations:\n      this request won\'t get all the desired entities.\n      You can use getManyEntities instead to generate several request urls\n      to work around this limitation');
    }

    // Properties can be either one property as a string
    // or an array or properties;
    // either case me just want to deal with arrays

    var query = {
      action: 'wbgetentities',
      ids: ids.join('|'),
      format: format
    };

    if (redirects === false) query.redirects = 'no';

    if (languages) {
      languages = forceArray(languages).map(shortLang);
      query.languages = languages.join('|');
    }

    if (props && props.length > 0) query.props = forceArray(props).join('|');

    return buildUrl(query);
  };
};

},{"../helpers/validate":15,"../utils/utils":27}],19:[function(require,module,exports){
'use strict';

var _require = require('../utils/utils'),
    isPlainObject = _require.isPlainObject,
    forceArray = _require.forceArray,
    shortLang = _require.shortLang;

module.exports = function (buildUrl) {
  return function (titles, sites, languages, props, format, redirects) {
    // polymorphism: arguments can be passed as an object keys
    if (isPlainObject(titles)) {
      // Not using destructuring assigment there as it messes with both babel and standard
      var params = titles;
      titles = params.titles;
      sites = params.sites;
      languages = params.languages;
      props = params.props;
      format = params.format;
      redirects = params.redirects;
    }

    format = format || 'json';

    // titles cant be let empty
    if (!(titles && titles.length > 0)) throw new Error('no titles provided');
    // default to the English Wikipedia
    if (!(sites && sites.length > 0)) sites = ['enwiki'];

    // Properties can be either one property as a string
    // or an array or properties;
    // either case me just want to deal with arrays
    titles = forceArray(titles);
    sites = forceArray(sites).map(parseSite);
    props = forceArray(props);

    var query = {
      action: 'wbgetentities',
      titles: titles.join('|'),
      sites: sites.join('|'),
      format: format

      // Normalizing only works if there is only one site and title
    };if (sites.length === 1 && titles.length === 1) {
      query.normalize = true;
    }

    if (languages) {
      languages = forceArray(languages).map(shortLang);
      query.languages = languages.join('|');
    }

    if (props && props.length > 0) query.props = props.join('|');

    if (redirects === false) query.redirects = 'no';

    return buildUrl(query);
  };
};

// convert 2 letters language code to Wikipedia sitelinks code
var parseSite = function parseSite(site) {
  return site.length === 2 ? site + 'wiki' : site;
};

},{"../utils/utils":27}],20:[function(require,module,exports){
'use strict';

var validate = require('../helpers/validate');

var _require = require('../utils/utils'),
    isPlainObject = _require.isPlainObject;

module.exports = function (instance, wgScriptPath) {
  return function (id, revision) {
    if (isPlainObject(id)) {
      revision = id.revision;
      id = id.id;
    }
    validate.entityId(id);
    validate.revisionId(revision);
    return instance + '/' + wgScriptPath + '/index.php?title=Special:EntityData/' + id + '.json&revision=' + revision;
  };
};

},{"../helpers/validate":15,"../utils/utils":27}],21:[function(require,module,exports){
'use strict';

var _require = require('../utils/utils'),
    isPlainObject = _require.isPlainObject;

module.exports = function (buildUrl) {
  var getEntities = require('./get_entities')(buildUrl);
  return function (ids, languages, props, format, redirects) {
    // Polymorphism: arguments can be passed as an object keys
    if (isPlainObject(ids)) {
      var _ids = ids;
      ids = _ids.ids;
      languages = _ids.languages;
      props = _ids.props;
      format = _ids.format;
      redirects = _ids.redirects;
    }

    if (!(ids instanceof Array)) throw new Error('getManyEntities expects an array of ids');

    return getIdsGroups(ids).map(function (idsGroup) {
      return getEntities(idsGroup, languages, props, format, redirects);
    });
  };
};

var getIdsGroups = function getIdsGroups(ids) {
  var groups = [];
  while (ids.length > 0) {
    var group = ids.slice(0, 50);
    ids = ids.slice(50);
    groups.push(group);
  }
  return groups;
};

},{"../utils/utils":27,"./get_entities":18}],22:[function(require,module,exports){
'use strict';

var _require = require('../utils/utils'),
    forceArray = _require.forceArray;

var _require2 = require('../helpers/helpers'),
    isItemId = _require2.isItemId;

var validate = require('../helpers/validate');

// Fiter-out properties. Can't be filtered by
// `?subject a wikibase:Item`, as those triples are omitted
// https://www.mediawiki.org/wiki/Wikibase/Indexing/RDF_Dump_Format#WDQS_data_differences
var itemsOnly = 'FILTER NOT EXISTS { ?subject rdf:type wikibase:Property . } ';

module.exports = function (sparqlEndpoint) {
  var sparqlQuery = require('./sparql_query')(sparqlEndpoint);
  return function (property, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var limit = options.limit,
        caseInsensitive = options.caseInsensitive,
        keepProperties = options.keepProperties;

    var valueFn = caseInsensitive ? caseInsensitiveValueQuery : directValueQuery;
    var filter = keepProperties ? '' : itemsOnly;

    // Allow to request values for several properties at once
    var properties = forceArray(property);
    properties.forEach(validate.propertyId);
    properties = properties.map(prefixifyProperty).join('|');

    var valueBlock = getValueBlock(value, valueFn, properties, filter);
    var sparql = 'SELECT DISTINCT ?subject WHERE { ' + valueBlock + ' }';
    if (limit) sparql += ' LIMIT ' + limit;
    return sparqlQuery(sparql);
  };
};

var getValueBlock = function getValueBlock(value, valueFn, properties, filter) {
  if (!(value instanceof Array)) {
    return valueFn(properties, getValueString(value), filter);
  }

  var valuesBlocks = value.map(getValueString).map(function (valStr) {
    return valueFn(properties, valStr, filter);
  });

  return '{ ' + valuesBlocks.join('} UNION {') + ' }';
};

var getValueString = function getValueString(value) {
  if (isItemId(value)) {
    value = 'wd:' + value;
  } else if (typeof value === 'string') {
    value = '\'' + value + '\'';
  }
  return value;
};

var directValueQuery = function directValueQuery(properties, value, filter, limit) {
  return '?subject ' + properties + ' ' + value + ' .\n    ' + filter;
};

// Discussion on how to make this query optimal:
// http://stackoverflow.com/q/43073266/3324977
var caseInsensitiveValueQuery = function caseInsensitiveValueQuery(properties, value, filter, limit) {
  return '?subject ' + properties + ' ?value .\n    FILTER (lcase(?value) = ' + value.toLowerCase() + ')\n    ' + filter;
};

var prefixifyProperty = function prefixifyProperty(property) {
  return 'wdt:' + property;
};

},{"../helpers/helpers":1,"../helpers/validate":15,"../utils/utils":27,"./sparql_query":25}],23:[function(require,module,exports){
'use strict';

var _require = require('../utils/utils'),
    forceArray = _require.forceArray;

var validate = require('../helpers/validate');

// See https://www.wikidata.org/w/api.php?action=help&modules=query+revisions

module.exports = function (buildUrl) {
  return function (ids) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    ids = forceArray(ids);
    ids.forEach(validate.entityPageTitle);

    var uniqueId = ids.length === 1;
    var query = {
      action: 'query',
      prop: 'revisions'
    };

    query.titles = ids.join('|');
    query.format = options.format || 'json';
    if (uniqueId) query.rvlimit = options.limit || 'max';
    if (uniqueId && options.start) query.rvstart = getEpochSeconds(options.start);
    if (uniqueId && options.end) query.rvend = getEpochSeconds(options.end);

    var prop = options.prop,
        user = options.user,
        excludeuser = options.excludeuser,
        tag = options.tag;

    if (prop) {
      query.rvprop = forceArray(prop).join('|');
    } else {
      query.rvprop = 'ids|flags|timestamp|user|userid|size|slotsize|sha1|slotsha1|contentmodel|comment|parsedcomment|content|tags|roles|oresscores';
    }
    query.rvslots = '*';
    if (user) query.rvuser = user;
    if (excludeuser) query.rvexcludeuser = excludeuser;
    if (tag) query.rvtag = tag;

    return buildUrl(query);
  };
};

var getEpochSeconds = function getEpochSeconds(date) {
  // Return already formatted epoch seconds:
  // if a date in milliseconds appear to be earlier than 2000-01-01, that's probably
  // already seconds actually
  if (typeof date === 'number' && date < earliestPointInMs) return date;
  return Math.trunc(new Date(date).getTime() / 1000);
};

var earliestPointInMs = new Date('2000-01-01').getTime();

},{"../helpers/validate":15,"../utils/utils":27}],24:[function(require,module,exports){
'use strict';

var _require = require('../utils/utils'),
    isPlainObject = _require.isPlainObject;

var types = ['item', 'property', 'lexeme', 'form', 'sense'];

module.exports = function (buildUrl) {
  return function (search, language, limit, format, uselang) {
    // Using the variable 'offset' instead of 'continue' as the later is a reserved word
    var type = void 0,
        offset = void 0;

    // polymorphism: arguments can be passed as an object keys
    if (isPlainObject(search)) {
      // Not using destructuring assigment there as it messes with both babel and standard
      var params = search;
      search = params.search;
      language = params.language;
      limit = params.limit;
      offset = params.continue;
      format = params.format;
      uselang = params.uselang;
      type = params.type;
    }

    if (!(search && search.length > 0)) throw new Error("search can't be empty");

    language = language || 'en';
    uselang = uselang || language;
    limit = limit || '20';
    format = format || 'json';
    type = type || 'item';
    offset = offset || '0';

    if (!types.includes(type)) throw new Error('invalid type: ' + type);

    return buildUrl({
      action: 'wbsearchentities',
      search: search,
      language: language,
      limit: limit,
      continue: offset,
      format: format,
      uselang: uselang,
      type: type
    });
  };
};

},{"../utils/utils":27}],25:[function(require,module,exports){
'use strict';

var _require = require('../utils/utils'),
    fixedEncodeURIComponent = _require.fixedEncodeURIComponent;

module.exports = function (sparqlEndpoint) {
  return function (sparql) {
    var query = fixedEncodeURIComponent(sparql);
    return sparqlEndpoint + '?format=json&query=' + query;
  };
};

},{"../utils/utils":27}],26:[function(require,module,exports){
'use strict';

var isBrowser = typeof location !== 'undefined' && typeof document !== 'undefined';

var stringifyQuery = function stringifyQuery(queryObj) {
  return new URLSearchParams(queryObj).toString();
};

module.exports = function (instanceApiEndpoint) {
  return function (queryObj) {
    // Request CORS headers if the request is made from a browser
    // See https://www.wikidata.org/w/api.php ('origin' parameter)
    if (isBrowser) queryObj.origin = '*';

    // Remove null or undefined parameters
    Object.keys(queryObj).forEach(function (key) {
      if (queryObj[key] == null) delete queryObj[key];
    });

    return instanceApiEndpoint + '?' + stringifyQuery(queryObj);
  };
};

},{}],27:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
  // Ex: keep only 'fr' in 'fr_FR'
  shortLang: function shortLang(language) {
    return language.toLowerCase().split('_')[0];
  },

  // a polymorphism helper:
  // accept either a string or an array and return an array
  forceArray: function forceArray(array) {
    if (typeof array === 'string') array = [array];
    return array || [];
  },

  // simplistic implementation to filter-out arrays
  isPlainObject: function isPlainObject(obj) {
    if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj instanceof Array) return false;
    return true;
  },

  // encodeURIComponent ignores !, ', (, ), and *
  // cf https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
  fixedEncodeURIComponent: function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, encodeCharacter);
  },

  replaceSpaceByUnderscores: function replaceSpaceByUnderscores(str) {
    return str.replace(/\s/g, '_');
  },

  uniq: function uniq(array) {
    return Array.from(new Set(array));
  }
};

var encodeCharacter = function encodeCharacter(char) {
  return '%' + char.charCodeAt(0).toString(16);
};

},{}],28:[function(require,module,exports){
'use strict';

var _require = require('./utils/utils'),
    isPlainObject = _require.isPlainObject;

var simplify = require('./helpers/simplify');
var parse = require('./helpers/parse_responses');
var helpers = require('./helpers/helpers');
var sitelinksHelpers = require('../lib/helpers/sitelinks');
var rankHelpers = require('../lib/helpers/rank');
var tip = 'Tip: if you just want to access functions that don\'t need an instance or a sparqlEndpoint,\nthose are also exposed directly on the module object. Exemple:\nconst { isItemId, simplify } = require(\'wikibase-sdk\')';

var common = Object.assign({ simplify: simplify, parse: parse }, helpers, sitelinksHelpers, rankHelpers);

var WBK = function WBK(config) {
  if (!isPlainObject(config)) throw new Error('invalid config');
  var instance = config.instance,
      sparqlEndpoint = config.sparqlEndpoint;
  var _config$wgScriptPath = config.wgScriptPath,
      wgScriptPath = _config$wgScriptPath === undefined ? 'w' : _config$wgScriptPath;


  wgScriptPath = wgScriptPath.replace(/^\//, '');

  if (!(instance || sparqlEndpoint)) {
    throw new Error('one of instance or sparqlEndpoint should be set at initialization.\n' + tip);
  }

  var wikibaseApiFunctions = void 0,
      instanceRoot = void 0,
      instanceApiEndpoint = void 0;
  if (instance) {
    validateEndpoint('instance', instance);

    instanceRoot = instance.replace(/\/$/, '').replace('/' + wgScriptPath + '/api.php', '');

    instanceApiEndpoint = instanceRoot + '/' + wgScriptPath + '/api.php';

    var buildUrl = require('./utils/build_url')(instanceApiEndpoint);

    wikibaseApiFunctions = {
      searchEntities: require('./queries/search_entities')(buildUrl),
      cirrusSearchPages: require('./queries/cirrus_search')(buildUrl),
      getEntities: require('./queries/get_entities')(buildUrl),
      getManyEntities: require('./queries/get_many_entities')(buildUrl),
      getRevisions: require('./queries/get_revisions')(buildUrl),
      getEntityRevision: require('./queries/get_entity_revision')(instance, wgScriptPath),
      getEntitiesFromSitelinks: require('./queries/get_entities_from_sitelinks')(buildUrl)
    };
  } else {
    wikibaseApiFunctions = {
      searchEntities: missingInstance('searchEntities'),
      cirrusSearchPages: missingInstance('cirrusSearchPages'),
      getEntities: missingInstance('getEntities'),
      getManyEntities: missingInstance('getManyEntities'),
      getRevisions: missingInstance('getRevisions'),
      getEntityRevision: missingInstance('getEntityRevision'),
      getEntitiesFromSitelinks: missingInstance('getEntitiesFromSitelinks')
    };
  }

  var wikibaseQueryServiceFunctions = void 0;
  if (sparqlEndpoint) {
    validateEndpoint('sparqlEndpoint', sparqlEndpoint);
    wikibaseQueryServiceFunctions = {
      sparqlQuery: require('./queries/sparql_query')(sparqlEndpoint),
      getReverseClaims: require('./queries/get_reverse_claims')(sparqlEndpoint)
    };
  } else {
    wikibaseQueryServiceFunctions = {
      sparqlQuery: missingSparqlEndpoint('sparqlQuery'),
      getReverseClaims: missingSparqlEndpoint('getReverseClaims')
    };
  }

  var parsedData = {
    instance: {
      root: instanceRoot,
      apiEndpoint: instanceApiEndpoint
    }
  };

  return Object.assign(parsedData, common, wikibaseApiFunctions, wikibaseQueryServiceFunctions);
};

// Make heplpers that don't require an instance to be specified available
// directly on the exported function object
Object.assign(WBK, common);

var validateEndpoint = function validateEndpoint(name, url) {
  if (!(typeof url === 'string' && url.startsWith('http'))) {
    throw new Error('invalid ' + name + ': ' + url);
  }
};

var missingConfig = function missingConfig(missingParameter) {
  return function (name) {
    return function () {
      throw new Error(name + ' requires ' + missingParameter + ' to be set at initialization');
    };
  };
};

var missingSparqlEndpoint = missingConfig('a sparqlEndpoint');
var missingInstance = missingConfig('an instance');

module.exports = WBK;

},{"../lib/helpers/rank":4,"../lib/helpers/sitelinks":13,"./helpers/helpers":1,"./helpers/parse_responses":3,"./helpers/simplify":5,"./queries/cirrus_search":17,"./queries/get_entities":18,"./queries/get_entities_from_sitelinks":19,"./queries/get_entity_revision":20,"./queries/get_many_entities":21,"./queries/get_reverse_claims":22,"./queries/get_revisions":23,"./queries/search_entities":24,"./queries/sparql_query":25,"./utils/build_url":26,"./utils/utils":27}]},{},[28])(28)
});

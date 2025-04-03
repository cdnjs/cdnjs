import { toAbsoluteUri } from "./common.js";


const _keywords = {};
export const getKeyword = (id) => {
  if (id.indexOf("#") !== -1) {
    const absoluteId = toAbsoluteUri(id);
    return { ..._keywords[absoluteId], id };
  }

  return _keywords[id];
};

export const getKeywordByName = (keyword, dialectId) => {
  const keywordId = getKeywordId(keyword, dialectId);
  if (!keywordId) {
    throw Error(`Encountered unknown keyword '${keyword}'`);
  }

  const keywordHandler = getKeyword(keywordId);
  if (!keywordHandler) {
    throw Error(`Encountered unsupported keyword ${keyword}. You can provide an implementation for the '${keywordId}' keyword using the 'addKeyword' function.`);
  }

  return keywordHandler;
};

export const addKeyword = (keywordHandler) => {
  _keywords[keywordHandler.id] = keywordHandler;
};

const _vocabularies = {};
export const defineVocabulary = (id, keywords) => {
  _vocabularies[id] = keywords;
};

const _dialects = {};
const _allowUnknownKeywords = {};
const _persistentDialects = {};

export const getKeywordId = (keyword, dialectId) => getDialect(dialectId)?.[keyword]
  || (_allowUnknownKeywords[dialectId] || keyword.startsWith("x-"))
  && `https://json-schema.org/keyword/unknown#${keyword}`;

export const getKeywordName = (dialectId, keywordId) => {
  const dialect = getDialect(dialectId);
  for (const keyword in dialect) {
    if (dialect[keyword] === keywordId) {
      return keyword;
    }
  }
};

const getDialect = (dialectId) => {
  if (!(dialectId in _dialects)) {
    throw Error(`Encountered unknown dialect '${dialectId}'`);
  }

  return _dialects[dialectId];
};

export const hasDialect = (dialectId) => dialectId in _dialects;

export const loadDialect = (dialectId, dialect, allowUnknownKeywords = false, isPersistent = true) => {
  _allowUnknownKeywords[dialectId] = allowUnknownKeywords;
  _persistentDialects[dialectId] = _persistentDialects[dialectId] || isPersistent;

  _dialects[dialectId] = {};
  Object.entries(dialect)
    .forEach(([vocabularyId, isRequired]) => {
      if (vocabularyId in _vocabularies) {
        Object.entries(_vocabularies[vocabularyId])
          .forEach(([keyword, keywordId]) => {
            if (!(keywordId in _keywords) && !isRequired) {
              // Allow keyword to be ignored
              keywordId = `https://json-schema.org/keyword/unknown#${keyword}`;
            }
            _dialects[dialectId][keyword] = keywordId;
          });
      } else if (!allowUnknownKeywords || isRequired) {
        delete _dialects[dialectId];
        delete _allowUnknownKeywords[dialectId];
        delete _persistentDialects[dialectId];
        throw Error(`Unrecognized vocabulary: ${vocabularyId}. You can define this vocabulary with the 'defineVocabulary' function.`);
      }
    });
};

export const unloadDialect = (dialectId) => {
  if (!_persistentDialects[dialectId]) {
    delete _allowUnknownKeywords[dialectId];
    delete _dialects[dialectId];
  }
};

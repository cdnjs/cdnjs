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

export const getKeywordId = (keyword, dialectId) => {
  const dialect = getDialect(dialectId);
  return dialect.keywords[keyword]
    ?? ((dialect.allowUnknownKeywords || keyword.startsWith("x-"))
      ? `https://json-schema.org/keyword/unknown#${keyword}`
      : undefined);
};

export const getKeywordName = (dialectId, keywordId) => {
  const dialect = getDialect(dialectId);
  for (const keyword in dialect.keywords) {
    if (dialect.keywords[keyword] === keywordId) {
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
  _dialects[dialectId] = {
    keywords: {},
    allowUnknownKeywords: allowUnknownKeywords,
    persistentDialects: _dialects[dialectId]?.persistentDialects || isPersistent
  };

  for (const vocabularyId in dialect) {
    if (vocabularyId in _vocabularies) {
      for (const keyword in _vocabularies[vocabularyId]) {
        let keywordId = _vocabularies[vocabularyId][keyword];
        if (!(keywordId in _keywords) && !dialect[vocabularyId]) {
          // Allow keyword to be ignored
          keywordId = `https://json-schema.org/keyword/unknown#${keyword}`;
        }
        _dialects[dialectId].keywords[keyword] = keywordId;
      }
    } else if (!allowUnknownKeywords || dialect[vocabularyId]) {
      delete _dialects[dialectId];
      throw Error(`Unrecognized vocabulary: ${vocabularyId}. You can define this vocabulary with the 'defineVocabulary' function.`);
    }
  }
};

export const unloadDialect = (dialectId) => {
  if (!_dialects[dialectId]?.persistentDialects) {
    delete _dialects[dialectId];
  }
};

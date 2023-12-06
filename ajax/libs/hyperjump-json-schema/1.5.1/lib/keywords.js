import { toAbsoluteUri } from "./common.js";


const _keywords = {};
export const getKeyword = (id) => _keywords[toAbsoluteUri(id)];

export const addKeyword = (keywordHandler) => {
  _keywords[keywordHandler.id] = keywordHandler;
};

const _vocabularies = {};
export const defineVocabulary = (id, keywords) => {
  _vocabularies[id] = keywords;
};

const _dialects = {};
const _allowUnknownKeywords = {};
export const getKeywordId = (dialectId, keyword) => _dialects[dialectId]?.[keyword]
  || (_allowUnknownKeywords[dialectId] || keyword[0] === "@") && `https://json-schema.org/keyword/unknown#${keyword}`;
export const getKeywordName = (dialectId, keywordId) => {
  for (const keyword in _dialects[dialectId]) {
    if (_dialects[dialectId][keyword] === keywordId) {
      return keyword;
    }
  }
};

export const hasDialect = (dialectId) => dialectId in _dialects;

export const loadDialect = (dialectId, dialect, allowUnknownKeywords = false) => {
  _allowUnknownKeywords[dialectId] = allowUnknownKeywords;

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
        throw Error(`Unrecognized vocabulary: ${vocabularyId}. You can define this vocabulary with the 'defineVocabulary' function.`);
      }
    });
};

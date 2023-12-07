let metaSchemaOutputFormat;
let shouldValidateSchema = true;
const enabledExperimentalKeywords = {};

export const getMetaSchemaOutputFormat = () => metaSchemaOutputFormat;
export const setMetaSchemaOutputFormat = (format) => {
  metaSchemaOutputFormat = format;
};

export const getShouldValidateSchema = () => shouldValidateSchema;
export const setShouldValidateSchema = (isEnabled) => {
  shouldValidateSchema = isEnabled;
};

export const isExperimentalKeywordEnabled = (keywordId) => enabledExperimentalKeywords[keywordId];
export const setExperimentalKeywordEnabled = (keywordId, isEnabled) => {
  enabledExperimentalKeywords[keywordId] = isEnabled;
};

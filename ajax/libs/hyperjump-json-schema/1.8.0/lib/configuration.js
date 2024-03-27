let metaSchemaOutputFormat;
let shouldValidateSchema = true;

export const getMetaSchemaOutputFormat = () => metaSchemaOutputFormat;
export const setMetaSchemaOutputFormat = (format) => {
  metaSchemaOutputFormat = format;
};

export const getShouldValidateSchema = () => shouldValidateSchema;
export const setShouldValidateSchema = (isEnabled) => {
  shouldValidateSchema = isEnabled;
};

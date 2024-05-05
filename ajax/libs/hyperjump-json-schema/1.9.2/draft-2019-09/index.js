import { addKeyword, defineVocabulary, loadDialect } from "../lib/keywords.js";
import { registerSchema } from "../lib/index.js";

import metaSchema from "./schema.js";
import coreMetaSchema from "./meta/core.js";
import applicatorMetaSchema from "./meta/applicator.js";
import validationMetaSchema from "./meta/validation.js";
import metaDataMetaSchema from "./meta/meta-data.js";
import formatMetaSchema from "./meta/format.js";
import contentMetaSchema from "./meta/content.js";

import additionalItems from "../draft-04/additionalItems.js";
import items from "../draft-04/items.js";
import recursiveAnchor from "./recursiveAnchor.js";
import recursiveRef from "../draft-2020-12/dynamicRef.js";


addKeyword(additionalItems);
addKeyword(items);
addKeyword(recursiveAnchor);
addKeyword(recursiveRef);

defineVocabulary("https://json-schema.org/draft/2019-09/vocab/core", {
  "$anchor": "https://json-schema.org/keyword/anchor",
  "$comment": "https://json-schema.org/keyword/comment",
  "$defs": "https://json-schema.org/keyword/definitions",
  "$recursiveAnchor": "https://json-schema.org/keyword/draft-2019-09/recursiveAnchor",
  "$recursiveRef": "https://json-schema.org/keyword/draft-2020-12/dynamicRef",
  "$id": "https://json-schema.org/keyword/id",
  "$ref": "https://json-schema.org/keyword/ref",
  "$vocabulary": "https://json-schema.org/keyword/vocabulary"
});

defineVocabulary("https://json-schema.org/draft/2019-09/vocab/applicator", {
  "additionalItems": "https://json-schema.org/keyword/draft-04/additionalItems",
  "additionalProperties": "https://json-schema.org/keyword/additionalProperties",
  "allOf": "https://json-schema.org/keyword/allOf",
  "anyOf": "https://json-schema.org/keyword/anyOf",
  "contains": "https://json-schema.org/keyword/contains",
  "dependentSchemas": "https://json-schema.org/keyword/dependentSchemas",
  "if": "https://json-schema.org/keyword/if",
  "then": "https://json-schema.org/keyword/then",
  "else": "https://json-schema.org/keyword/else",
  "items": "https://json-schema.org/keyword/draft-04/items",
  "not": "https://json-schema.org/keyword/not",
  "oneOf": "https://json-schema.org/keyword/oneOf",
  "patternProperties": "https://json-schema.org/keyword/patternProperties",
  "properties": "https://json-schema.org/keyword/properties",
  "propertyNames": "https://json-schema.org/keyword/propertyNames",
  "unevaluatedItems": "https://json-schema.org/keyword/unevaluatedItems",
  "unevaluatedProperties": "https://json-schema.org/keyword/unevaluatedProperties"
});

defineVocabulary("https://json-schema.org/draft/2019-09/vocab/validation", {
  "const": "https://json-schema.org/keyword/const",
  "enum": "https://json-schema.org/keyword/enum",
  "dependentRequired": "https://json-schema.org/keyword/dependentRequired",
  "exclusiveMaximum": "https://json-schema.org/keyword/exclusiveMaximum",
  "exclusiveMinimum": "https://json-schema.org/keyword/exclusiveMinimum",
  "maxContains": "https://json-schema.org/keyword/maxContains",
  "maxItems": "https://json-schema.org/keyword/maxItems",
  "maxLength": "https://json-schema.org/keyword/maxLength",
  "maxProperties": "https://json-schema.org/keyword/maxProperties",
  "maximum": "https://json-schema.org/keyword/maximum",
  "minContains": "https://json-schema.org/keyword/minContains",
  "minItems": "https://json-schema.org/keyword/minItems",
  "minLength": "https://json-schema.org/keyword/minLength",
  "minProperties": "https://json-schema.org/keyword/minProperties",
  "minimum": "https://json-schema.org/keyword/minimum",
  "multipleOf": "https://json-schema.org/keyword/multipleOf",
  "pattern": "https://json-schema.org/keyword/pattern",
  "required": "https://json-schema.org/keyword/required",
  "type": "https://json-schema.org/keyword/type",
  "uniqueItems": "https://json-schema.org/keyword/uniqueItems"
});

defineVocabulary("https://json-schema.org/draft/2019-09/vocab/meta-data", {
  "default": "https://json-schema.org/keyword/default",
  "deprecated": "https://json-schema.org/keyword/deprecated",
  "description": "https://json-schema.org/keyword/description",
  "examples": "https://json-schema.org/keyword/examples",
  "readOnly": "https://json-schema.org/keyword/readOnly",
  "title": "https://json-schema.org/keyword/title",
  "writeOnly": "https://json-schema.org/keyword/writeOnly"
});

defineVocabulary("https://json-schema.org/draft/2019-09/vocab/format", {
  "format": "https://json-schema.org/keyword/format"
});

defineVocabulary("https://json-schema.org/draft/2019-09/vocab/content", {
  "contentEncoding": "https://json-schema.org/keyword/contentEncoding",
  "contentMediaType": "https://json-schema.org/keyword/contentMediaType",
  "contentSchema": "https://json-schema.org/keyword/contentSchema"
});

loadDialect("https://json-schema.org/draft/2019-09/schema", {
  "https://json-schema.org/draft/2019-09/vocab/core": true,
  "https://json-schema.org/draft/2019-09/vocab/applicator": true,
  "https://json-schema.org/draft/2019-09/vocab/validation": true,
  "https://json-schema.org/draft/2019-09/vocab/meta-data": true,
  "https://json-schema.org/draft/2019-09/vocab/format": true,
  "https://json-schema.org/draft/2019-09/vocab/content": true
}, true);

registerSchema(metaSchema);
registerSchema(coreMetaSchema);
registerSchema(applicatorMetaSchema);
registerSchema(validationMetaSchema);
registerSchema(metaDataMetaSchema);
registerSchema(formatMetaSchema);
registerSchema(contentMetaSchema);

export * from "../lib/index.js";

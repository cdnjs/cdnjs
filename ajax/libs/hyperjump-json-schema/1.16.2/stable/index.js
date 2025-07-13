import { defineVocabulary, loadDialect } from "../lib/keywords.js";
import { registerSchema } from "../lib/index.js";

import metaSchema from "./validation.js";
import coreMetaSchema from "./meta/core.js";
import applicatorMetaSchema from "./meta/applicator.js";
import validationMetaSchema from "./meta/validation.js";
import metaDataMetaSchema from "./meta/meta-data.js";
import formatAnnotationMetaSchema from "./meta/format-annotation.js";
import formatAssertionMetaSchema from "./meta/format-assertion.js";
import contentMetaSchema from "./meta/content.js";
import unevaluatedMetaSchema from "./meta/unevaluated.js";


defineVocabulary("https://json-schema.org/vocab/core", {
  "$anchor": "https://json-schema.org/keyword/anchor",
  "$comment": "https://json-schema.org/keyword/comment",
  "$defs": "https://json-schema.org/keyword/definitions",
  "$dynamicAnchor": "https://json-schema.org/keyword/dynamicAnchor",
  "$dynamicRef": "https://json-schema.org/keyword/dynamicRef",
  "$id": "https://json-schema.org/keyword/id",
  "$ref": "https://json-schema.org/keyword/ref",
  "$vocabulary": "https://json-schema.org/keyword/vocabulary"
});

defineVocabulary("https://json-schema.org/vocab/applicator", {
  "additionalProperties": "https://json-schema.org/keyword/additionalProperties",
  "allOf": "https://json-schema.org/keyword/allOf",
  "anyOf": "https://json-schema.org/keyword/anyOf",
  "contains": "https://json-schema.org/keyword/contains",
  "minContains": "https://json-schema.org/keyword/minContains",
  "maxContains": "https://json-schema.org/keyword/maxContains",
  "dependentSchemas": "https://json-schema.org/keyword/dependentSchemas",
  "if": "https://json-schema.org/keyword/if",
  "then": "https://json-schema.org/keyword/then",
  "else": "https://json-schema.org/keyword/else",
  "conditional": "https://json-schema.org/keyword/conditional",
  "items": "https://json-schema.org/keyword/items",
  "itemPattern": "https://json-schema.org/keyword/itemPattern",
  "not": "https://json-schema.org/keyword/not",
  "oneOf": "https://json-schema.org/keyword/oneOf",
  "patternProperties": "https://json-schema.org/keyword/patternProperties",
  "prefixItems": "https://json-schema.org/keyword/prefixItems",
  "properties": "https://json-schema.org/keyword/properties",
  "propertyDependencies": "https://json-schema.org/keyword/propertyDependencies",
  "propertyNames": "https://json-schema.org/keyword/propertyNames"
});

defineVocabulary("https://json-schema.org/vocab/validation", {
  "const": "https://json-schema.org/keyword/const",
  "dependentRequired": "https://json-schema.org/keyword/dependentRequired",
  "enum": "https://json-schema.org/keyword/enum",
  "exclusiveMaximum": "https://json-schema.org/keyword/exclusiveMaximum",
  "exclusiveMinimum": "https://json-schema.org/keyword/exclusiveMinimum",
  "maxItems": "https://json-schema.org/keyword/maxItems",
  "maxLength": "https://json-schema.org/keyword/maxLength",
  "maxProperties": "https://json-schema.org/keyword/maxProperties",
  "maximum": "https://json-schema.org/keyword/maximum",
  "minItems": "https://json-schema.org/keyword/minItems",
  "minLength": "https://json-schema.org/keyword/minLength",
  "minProperties": "https://json-schema.org/keyword/minProperties",
  "minimum": "https://json-schema.org/keyword/minimum",
  "multipleOf": "https://json-schema.org/keyword/multipleOf",
  "requireAllExcept": "https://json-schema.org/keyword/requireAllExcept",
  "pattern": "https://json-schema.org/keyword/pattern",
  "required": "https://json-schema.org/keyword/required",
  "type": "https://json-schema.org/keyword/type",
  "uniqueItems": "https://json-schema.org/keyword/uniqueItems"
});

defineVocabulary("https://json-schema.org/vocab/meta-data", {
  "default": "https://json-schema.org/keyword/default",
  "deprecated": "https://json-schema.org/keyword/deprecated",
  "description": "https://json-schema.org/keyword/description",
  "examples": "https://json-schema.org/keyword/examples",
  "readOnly": "https://json-schema.org/keyword/readOnly",
  "title": "https://json-schema.org/keyword/title",
  "writeOnly": "https://json-schema.org/keyword/writeOnly"
});

defineVocabulary("https://json-schema.org/vocab/format-annotation", {
  "format": "https://json-schema.org/keyword/format"
});

defineVocabulary("https://json-schema.org/vocab/format-assertion", {
  "format": "https://json-schema.org/keyword/format-assertion"
});

defineVocabulary("https://json-schema.org/vocab/content", {
  "contentEncoding": "https://json-schema.org/keyword/contentEncoding",
  "contentMediaType": "https://json-schema.org/keyword/contentMediaType",
  "contentSchema": "https://json-schema.org/keyword/contentSchema"
});

defineVocabulary("https://json-schema.org/vocab/unevaluated", {
  "unevaluatedItems": "https://json-schema.org/keyword/unevaluatedItems",
  "unevaluatedProperties": "https://json-schema.org/keyword/unevaluatedProperties"
});

const dialectId = "https://json-schema.org/validation";
loadDialect(dialectId, {
  "https://json-schema.org/vocab/core": true,
  "https://json-schema.org/vocab/applicator": true,
  "https://json-schema.org/vocab/validation": true,
  "https://json-schema.org/vocab/meta-data": true,
  "https://json-schema.org/vocab/format-annotation": true,
  "https://json-schema.org/vocab/content": true,
  "https://json-schema.org/vocab/unevaluated": true
});

registerSchema(metaSchema, dialectId);
registerSchema(coreMetaSchema, "https://json-schema.org/meta/core");
registerSchema(applicatorMetaSchema, "https://json-schema.org/meta/applicator");
registerSchema(validationMetaSchema, "https://json-schema.org/meta/validation");
registerSchema(metaDataMetaSchema, "https://json-schema.org/meta/meta-data");
registerSchema(formatAnnotationMetaSchema, "https://json-schema.org/meta/format-annotation");
registerSchema(formatAssertionMetaSchema, "https://json-schema.org/meta/format-assertion");
registerSchema(contentMetaSchema, "https://json-schema.org/meta/content");
registerSchema(unevaluatedMetaSchema, "https://json-schema.org/meta/unevaluated");

export * from "../lib/index.js";

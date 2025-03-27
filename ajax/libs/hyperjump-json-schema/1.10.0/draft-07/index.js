import { addKeyword, defineVocabulary, loadDialect } from "../lib/keywords.js";
import { registerSchema } from "../lib/index.js";

import metaSchema from "./schema.js";
import additionalItems from "../draft-04/additionalItems.js";
import contains from "../draft-06/contains.js";
import dependencies from "../draft-04/dependencies.js";
import items from "../draft-04/items.js";
import id from "../draft-04/id.js";
import ref from "../draft-04/ref.js";


addKeyword(additionalItems);
addKeyword(contains);
addKeyword(dependencies);
addKeyword(id);
addKeyword(items);
addKeyword(ref);

const jsonSchemaVersion = "http://json-schema.org/draft-07/schema";

defineVocabulary(jsonSchemaVersion, {
  "$id": "https://json-schema.org/keyword/draft-04/id",
  "$ref": "https://json-schema.org/keyword/draft-04/ref",
  "$comment": "https://json-schema.org/keyword/comment",
  "additionalItems": "https://json-schema.org/keyword/draft-04/additionalItems",
  "additionalProperties": "https://json-schema.org/keyword/additionalProperties",
  "allOf": "https://json-schema.org/keyword/allOf",
  "anyOf": "https://json-schema.org/keyword/anyOf",
  "const": "https://json-schema.org/keyword/const",
  "contains": "https://json-schema.org/keyword/draft-06/contains",
  "contentEncoding": "https://json-schema.org/keyword/contentEncoding",
  "contentMediaType": "https://json-schema.org/keyword/contentMediaType",
  "default": "https://json-schema.org/keyword/default",
  "definitions": "https://json-schema.org/keyword/definitions",
  "dependencies": "https://json-schema.org/keyword/draft-04/dependencies",
  "description": "https://json-schema.org/keyword/description",
  "enum": "https://json-schema.org/keyword/enum",
  "examples": "https://json-schema.org/keyword/examples",
  "exclusiveMaximum": "https://json-schema.org/keyword/exclusiveMaximum",
  "exclusiveMinimum": "https://json-schema.org/keyword/exclusiveMinimum",
  "format": "https://json-schema.org/keyword/format",
  "if": "https://json-schema.org/keyword/if",
  "then": "https://json-schema.org/keyword/then",
  "else": "https://json-schema.org/keyword/else",
  "items": "https://json-schema.org/keyword/draft-04/items",
  "maxItems": "https://json-schema.org/keyword/maxItems",
  "maxLength": "https://json-schema.org/keyword/maxLength",
  "maxProperties": "https://json-schema.org/keyword/maxProperties",
  "maximum": "https://json-schema.org/keyword/maximum",
  "minItems": "https://json-schema.org/keyword/minItems",
  "minLength": "https://json-schema.org/keyword/minLength",
  "minProperties": "https://json-schema.org/keyword/minProperties",
  "minimum": "https://json-schema.org/keyword/minimum",
  "multipleOf": "https://json-schema.org/keyword/multipleOf",
  "not": "https://json-schema.org/keyword/not",
  "oneOf": "https://json-schema.org/keyword/oneOf",
  "pattern": "https://json-schema.org/keyword/pattern",
  "patternProperties": "https://json-schema.org/keyword/patternProperties",
  "properties": "https://json-schema.org/keyword/properties",
  "propertyNames": "https://json-schema.org/keyword/propertyNames",
  "readOnly": "https://json-schema.org/keyword/readOnly",
  "required": "https://json-schema.org/keyword/required",
  "title": "https://json-schema.org/keyword/title",
  "type": "https://json-schema.org/keyword/type",
  "uniqueItems": "https://json-schema.org/keyword/uniqueItems",
  "writeOnly": "https://json-schema.org/keyword/writeOnly"
});

loadDialect(jsonSchemaVersion, {
  [jsonSchemaVersion]: true
}, true);

registerSchema(metaSchema);

export * from "../lib/index.js";

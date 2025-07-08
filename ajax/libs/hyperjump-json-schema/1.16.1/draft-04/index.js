import { addKeyword, defineVocabulary, loadDialect } from "../lib/keywords.js";
import { registerSchema } from "../lib/index.js";
import metaSchema from "./schema.js";
import additionalItems from "./additionalItems.js";
import dependencies from "./dependencies.js";
import exclusiveMaximum from "./exclusiveMaximum.js";
import exclusiveMinimum from "./exclusiveMinimum.js";
import id from "./id.js";
import items from "./items.js";
import maximum from "./maximum.js";
import minimum from "./minimum.js";
import ref from "./ref.js";


addKeyword(additionalItems);
addKeyword(dependencies);
addKeyword(exclusiveMaximum);
addKeyword(exclusiveMinimum);
addKeyword(maximum);
addKeyword(minimum);
addKeyword(id);
addKeyword(items);
addKeyword(ref);

const jsonSchemaVersion = "http://json-schema.org/draft-04/schema";

defineVocabulary(jsonSchemaVersion, {
  "id": "https://json-schema.org/keyword/draft-04/id",
  "$ref": "https://json-schema.org/keyword/draft-04/ref",
  "additionalItems": "https://json-schema.org/keyword/draft-04/additionalItems",
  "additionalProperties": "https://json-schema.org/keyword/additionalProperties",
  "allOf": "https://json-schema.org/keyword/allOf",
  "anyOf": "https://json-schema.org/keyword/anyOf",
  "default": "https://json-schema.org/keyword/default",
  "definitions": "https://json-schema.org/keyword/definitions",
  "dependencies": "https://json-schema.org/keyword/draft-04/dependencies",
  "description": "https://json-schema.org/keyword/description",
  "enum": "https://json-schema.org/keyword/enum",
  "exclusiveMaximum": "https://json-schema.org/keyword/draft-04/exclusiveMaximum",
  "exclusiveMinimum": "https://json-schema.org/keyword/draft-04/exclusiveMinimum",
  "format": "https://json-schema.org/keyword/format",
  "items": "https://json-schema.org/keyword/draft-04/items",
  "maxItems": "https://json-schema.org/keyword/maxItems",
  "maxLength": "https://json-schema.org/keyword/maxLength",
  "maxProperties": "https://json-schema.org/keyword/maxProperties",
  "maximum": "https://json-schema.org/keyword/draft-04/maximum",
  "minItems": "https://json-schema.org/keyword/minItems",
  "minLength": "https://json-schema.org/keyword/minLength",
  "minProperties": "https://json-schema.org/keyword/minProperties",
  "minimum": "https://json-schema.org/keyword/draft-04/minimum",
  "multipleOf": "https://json-schema.org/keyword/multipleOf",
  "not": "https://json-schema.org/keyword/not",
  "oneOf": "https://json-schema.org/keyword/oneOf",
  "pattern": "https://json-schema.org/keyword/pattern",
  "patternProperties": "https://json-schema.org/keyword/patternProperties",
  "properties": "https://json-schema.org/keyword/properties",
  "required": "https://json-schema.org/keyword/required",
  "title": "https://json-schema.org/keyword/title",
  "type": "https://json-schema.org/keyword/type",
  "uniqueItems": "https://json-schema.org/keyword/uniqueItems"
});

loadDialect(jsonSchemaVersion, {
  [jsonSchemaVersion]: true
}, true);

registerSchema(metaSchema);

export * from "../lib/index.js";

import { addKeyword, defineVocabulary, loadDialect } from "../lib/keywords.js";
import { registerSchema } from "../lib/index.js";
import "../lib/openapi.js";

import dialectSchema from "./dialect.js";
import schema from "./schema.js";

import discriminator from "./discriminator.js";
import example from "./example.js";
import externalDocs from "./externalDocs.js";
import nullable from "./nullable.js";
import type from "./type.js";
import xml from "./xml.js";


export * from "../draft-04/index.js";

addKeyword(discriminator);
addKeyword(example);
addKeyword(externalDocs);
addKeyword(nullable);
addKeyword(type);
addKeyword(xml);

const jsonSchemaVersion = "https://spec.openapis.org/oas/3.0/dialect";

defineVocabulary(jsonSchemaVersion, {
  "$ref": "https://json-schema.org/keyword/draft-04/ref",
  "additionalProperties": "https://json-schema.org/keyword/additionalProperties",
  "allOf": "https://json-schema.org/keyword/allOf",
  "anyOf": "https://json-schema.org/keyword/anyOf",
  "default": "https://json-schema.org/keyword/default",
  "deprecated": "https://json-schema.org/keyword/deprecated",
  "description": "https://json-schema.org/keyword/description",
  "discriminator": "https://spec.openapis.org/oas/3.0/keyword/discriminator",
  "enum": "https://json-schema.org/keyword/enum",
  "example": "https://spec.openapis.org/oas/3.0/keyword/example",
  "exclusiveMaximum": "https://json-schema.org/keyword/draft-04/exclusiveMaximum",
  "exclusiveMinimum": "https://json-schema.org/keyword/draft-04/exclusiveMinimum",
  "externalDocs": "https://spec.openapis.org/oas/3.0/keyword/externalDocs",
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
  "nullable": "https://spec.openapis.org/oas/3.0/keyword/nullable",
  "oneOf": "https://json-schema.org/keyword/oneOf",
  "pattern": "https://json-schema.org/keyword/pattern",
  "properties": "https://json-schema.org/keyword/properties",
  "readOnly": "https://json-schema.org/keyword/readOnly",
  "required": "https://json-schema.org/keyword/required",
  "title": "https://json-schema.org/keyword/title",
  "type": "https://spec.openapis.org/oas/3.0/keyword/type",
  "uniqueItems": "https://json-schema.org/keyword/uniqueItems",
  "writeOnly": "https://json-schema.org/keyword/writeOnly",
  "xml": "https://spec.openapis.org/oas/3.0/keyword/xml"
});

loadDialect(jsonSchemaVersion, {
  [jsonSchemaVersion]: true
});

loadDialect("https://spec.openapis.org/oas/3.0/schema", {
  [jsonSchemaVersion]: true
});

registerSchema(dialectSchema);

registerSchema(schema, "https://spec.openapis.org/oas/3.0/schema");
registerSchema(schema, "https://spec.openapis.org/oas/3.0/schema/latest");

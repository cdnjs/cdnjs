export default {
  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true,
    "https://spec.openapis.org/oas/3.1/vocab/base": false
  },

  "description": "openapi v3.1.x documents using 2020-12 json schemas",

  "$ref": "https://spec.openapis.org/oas/3.1/schema",
  "properties": {
    "jsonschemadialect": { "$ref": "#/$defs/dialect" }
  },

  "$defs": {
    "dialect": { "const": "https://json-schema.org/draft/2020-12/schema" },

    "schema": {
      "$dynamicanchor": "meta",
      "$ref": "https://spec.openapis.org/oas/3.1/dialect/base",
      "properties": {
        "$schema": { "$ref": "#/$defs/dialect" }
      }
    }
  }
};

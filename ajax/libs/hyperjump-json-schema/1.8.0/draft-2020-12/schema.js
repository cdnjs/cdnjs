export default {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://json-schema.org/draft/2020-12/schema",
  "$vocabulary": {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true
  },
  "$dynamicAnchor": "meta",

  "title": "Core and Validation specifications meta-schema",
  "allOf": [
    { "$ref": "meta/core" },
    { "$ref": "meta/applicator" },
    { "$ref": "meta/unevaluated" },
    { "$ref": "meta/validation" },
    { "$ref": "meta/meta-data" },
    { "$ref": "meta/format-annotation" },
    { "$ref": "meta/content" }
  ],
  "type": ["object", "boolean"],
  "properties": {
    "definitions": {
      "$comment": "While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.",
      "type": "object",
      "additionalProperties": { "$dynamicRef": "#meta" },
      "default": {}
    },
    "dependencies": {
      "$comment": "\"dependencies\" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to \"dependentSchemas\" and \"dependentRequired\"",
      "type": "object",
      "additionalProperties": {
        "anyOf": [
          { "$dynamicRef": "#meta" },
          { "$ref": "meta/validation#/$defs/stringArray" }
        ]
      }
    }
  }
};

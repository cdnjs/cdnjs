export default {
  "$id": "https://json-schema.org/meta/applicator",
  "title": "Applicator vocabulary meta-schema",

  "$dynamicAnchor": "meta",

  "properties": {
    "prefixItems": { "$ref": "#/$defs/schemaArray" },
    "items": { "$dynamicRef": "meta" },
    "contains": { "$dynamicRef": "meta" },
    "additionalProperties": { "$dynamicRef": "meta" },
    "properties": {
      "type": "object",
      "additionalProperties": { "$dynamicRef": "meta" }
    },
    "patternProperties": {
      "type": "object",
      "additionalProperties": { "$dynamicRef": "meta" },
      "propertyNames": { "format": "regex" }
    },
    "dependentSchemas": {
      "type": "object",
      "additionalProperties": { "$dynamicRef": "meta" }
    },
    "propertyDependencies": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": { "$dynamicRef": "meta" }
      }
    },
    "propertyNames": { "$dynamicRef": "meta" },
    "if": { "$dynamicRef": "meta" },
    "then": { "$dynamicRef": "meta" },
    "else": { "$dynamicRef": "meta" },
    "allOf": { "$ref": "#/$defs/schemaArray" },
    "anyOf": { "$ref": "#/$defs/schemaArray" },
    "oneOf": { "$ref": "#/$defs/schemaArray" },
    "not": { "$dynamicRef": "meta" }
  },

  "$defs": {
    "schemaArray": {
      "type": "array",
      "minItems": 1,
      "items": { "$dynamicRef": "meta" }
    }
  }
};

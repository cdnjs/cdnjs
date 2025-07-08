export default {
  "$schema": "https://json-schema.org/validation",
  "title": "Core vocabulary meta-schema",

  "$dynamicAnchor": "meta",

  "type": ["object", "boolean"],
  "properties": {
    "$id": {
      "type": "string",
      "format": "uri-reference",
      "$comment": "Non-empty fragments not allowed.",
      "pattern": "^[^#]*#?$"
    },
    "$schema": {
      "type": "string",
      "format": "uri"
    },
    "$anchor": { "$ref": "#/$defs/anchor" },
    "$ref": {
      "type": "string",
      "format": "uri-reference"
    },
    "$dynamicRef": { "$ref": "#/$defs/anchor" },
    "$dynamicAnchor": { "$ref": "#/$defs/anchor" },
    "$vocabulary": {
      "type": "object",
      "propertyNames": {
        "type": "string",
        "format": "uri"
      },
      "additionalProperties": {
        "type": "boolean"
      }
    },
    "$comment": { "type": "string" },
    "$defs": {
      "type": "object",
      "additionalProperties": { "$dynamicRef": "meta" }
    }
  },

  "$defs": {
    "anchor": {
      "type": "string",
      "pattern": "^[A-Za-z_][-A-Za-z0-9._]*$"
    }
  }
};

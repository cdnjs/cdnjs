export default {
  "id": "https://spec.openapis.org/oas/3.0/dialect",
  "$schema": "http://json-schema.org/draft-04/schema#",

  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "multipleOf": {
      "type": "number",
      "minimum": 0,
      "exclusiveMinimum": true
    },
    "maximum": { "type": "number" },
    "exclusiveMaximum": {
      "type": "boolean",
      "default": false
    },
    "minimum": { "type": "number" },
    "exclusiveMinimum": {
      "type": "boolean",
      "default": false
    },
    "maxLength": { "$ref": "#/definitions/positiveInteger" },
    "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "pattern": {
      "type": "string",
      "format": "regex"
    },
    "maxItems": { "$ref": "#/definitions/positiveInteger" },
    "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "uniqueItems": {
      "type": "boolean",
      "default": false
    },
    "maxProperties": { "$ref": "#/definitions/positiveInteger" },
    "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
    "required": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1,
      "uniqueItems": true
    },
    "enum": {
      "type": "array",
      "minItems": 1,
      "uniqueItems": false
    },
    "type": { "enum": ["array", "boolean", "integer", "number", "object", "string"] },
    "not": { "$ref": "#" },
    "allOf": { "$ref": "#/definitions/schemaArray" },
    "oneOf": { "$ref": "#/definitions/schemaArray" },
    "anyOf": { "$ref": "#/definitions/schemaArray" },
    "items": { "$ref": "#" },
    "properties": {
      "type": "object",
      "additionalProperties": { "$ref": "#" }
    },
    "additionalProperties": {
      "anyOf": [
        { "type": "boolean" },
        { "$ref": "#" }
      ],
      "default": {}
    },
    "description": { "type": "string" },
    "format": { "type": "string" },
    "default": {},
    "nullable": {
      "type": "boolean",
      "default": false
    },
    "discriminator": { "$ref": "#/definitions/Discriminator" },
    "readOnly": {
      "type": "boolean",
      "default": false
    },
    "writeOnly": {
      "type": "boolean",
      "default": false
    },
    "example": {},
    "externalDocs": { "$ref": "#/definitions/ExternalDocumentation" },
    "deprecated": {
      "type": "boolean",
      "default": false
    },
    "xml": { "$ref": "#/definitions/XML" },
    "$ref": {
      "type": "string",
      "format": "uri"
    }
  },
  "patternProperties": {
    "^x-": {}
  },
  "additionalProperties": false,

  "anyOf": [
    {
      "not": { "required": ["$ref"] }
    },
    { "maxProperties": 1 }
  ],

  "definitions": {
    "schemaArray": {
      "type": "array",
      "minItems": 1,
      "items": { "$ref": "#" }
    },
    "positiveInteger": {
      "type": "integer",
      "minimum": 0
    },
    "positiveIntegerDefault0": {
      "allOf": [{ "$ref": "#/definitions/positiveInteger" }, { "default": 0 }]
    },
    "Discriminator": {
      "type": "object",
      "required": [
        "propertyName"
      ],
      "properties": {
        "propertyName": {
          "type": "string"
        },
        "mapping": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        }
      }
    },
    "ExternalDocumentation": {
      "type": "object",
      "required": ["url"],
      "properties": {
        "description": { "type": "string" },
        "url": {
          "type": "string",
          "format": "uri-reference"
        }
      },
      "patternProperties": {
        "^x-": {}
      },
      "additionalProperties": false
    },
    "XML": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "namespace": {
          "type": "string",
          "format": "uri"
        },
        "prefix": { "type": "string" },
        "attribute": {
          "type": "boolean",
          "default": false
        },
        "wrapped": {
          "type": "boolean",
          "default": false
        }
      },
      "patternProperties": {
        "^x-": {}
      },
      "additionalProperties": false
    }
  }
};

export default {
  "$schema": "https://json-schema.org/validation",
  "title": "Meta-data vocabulary meta-schema",

  "$dynamicAnchor": "meta",

  "properties": {
    "title": { "type": "string" },
    "description": { "type": "string" },
    "default": true,
    "deprecated": { "type": "boolean" },
    "readOnly": { "type": "boolean" },
    "writeOnly": { "type": "boolean" },
    "examples": { "type": "array" }
  }
};

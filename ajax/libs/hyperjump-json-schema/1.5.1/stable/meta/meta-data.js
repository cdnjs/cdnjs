export default {
  "$id": "https://json-schema.org/meta/meta-data",
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

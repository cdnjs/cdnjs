export default {
  "$schema": "https://json-schema.org/validation",
  "$vocabulary": {
    "https://json-schema.org/vocab/core": true,
    "https://json-schema.org/vocab/applicator": true,
    "https://json-schema.org/vocab/unevaluated": true,
    "https://json-schema.org/vocab/validation": true,
    "https://json-schema.org/vocab/meta-data": true,
    "https://json-schema.org/vocab/format-annotation": true,
    "https://json-schema.org/vocab/content": true
  },
  "title": "Core and Validation specifications meta-schema",

  "$dynamicAnchor": "meta",

  "allOf": [
    { "$ref": "meta/core" },
    { "$ref": "meta/applicator" },
    { "$ref": "meta/validation" },
    { "$ref": "meta/meta-data" },
    { "$ref": "meta/format-annotation" },
    { "$ref": "meta/content" }
  ]
};

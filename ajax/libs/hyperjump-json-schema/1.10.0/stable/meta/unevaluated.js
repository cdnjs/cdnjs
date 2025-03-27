export default {
  "$schema": "https://json-schema.org/validation",
  "title": "Unevaluated applicator vocabulary meta-schema",

  "$dynamicAnchor": "meta",

  "properties": {
    "unevaluatedItems": { "$dynamicRef": "meta" },
    "unevaluatedProperties": { "$dynamicRef": "meta" }
  }
};

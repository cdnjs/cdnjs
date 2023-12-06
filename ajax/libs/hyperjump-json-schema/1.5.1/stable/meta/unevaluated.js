export default {
  "$id": "https://json-schema.org/meta/unevaluated",
  "title": "Unevaluated applicator vocabulary meta-schema",

  "$dynamicAnchor": "meta",

  "properties": {
    "unevaluatedItems": { "$dynamicRef": "meta" },
    "unevaluatedProperties": { "$dynamicRef": "meta" }
  }
};

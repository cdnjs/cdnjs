export default {
  "$id": "https://json-schema.org/draft/2020-12/meta/unevaluated",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$dynamicAnchor": "meta",

  "title": "Unevaluated applicator vocabulary meta-schema",
  "type": ["object", "boolean"],
  "properties": {
    "unevaluatedItems": { "$dynamicRef": "#meta" },
    "unevaluatedProperties": { "$dynamicRef": "#meta" }
  }
};

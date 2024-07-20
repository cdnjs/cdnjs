export default {
  "$schema": "https://json-schema.org/validation",
  "title": "Content vocabulary meta-schema",

  "$dynamicAnchor": "meta",

  "properties": {
    "contentMediaType": { "type": "string" },
    "contentEncoding": { "type": "string" },
    "contentSchema": { "$dynamicRef": "meta" }
  }
};

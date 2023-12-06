export default {
  "$id": "https://json-schema.org/meta/content",
  "title": "Content vocabulary meta-schema",

  "$dynamicAnchor": "meta",

  "properties": {
    "contentMediaType": { "type": "string" },
    "contentEncoding": { "type": "string" },
    "contentSchema": { "$dynamicRef": "meta" }
  }
};

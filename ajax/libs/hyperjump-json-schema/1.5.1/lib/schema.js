import { nil as nilPointer, append as pointerAppend, get as pointerGet } from "@hyperjump/json-pointer";
import { toAbsoluteIri } from "@hyperjump/uri";
import { jsonTypeOf, resolveUri, uriFragment, pathRelative, jsonStringify } from "./common.js";
import fetch from "./fetch.js";
import { hasDialect, loadDialect, getKeywordName } from "./keywords.js";
import { parseResponse, acceptableMediaTypes } from "./media-types.js";
import * as Reference from "./reference.js";


// Schema Management
const schemaStore = {};
const schemaStoreAlias = {};

const defaultDialectId = "https://json-schema.org/validation";

export const add = (schema, retrievalUri = undefined, contextDialectId = undefined) => {
  schema = JSON.parse(JSON.stringify(schema));

  // Dialect / JSON Schema Version
  const dialectId = toAbsoluteIri(schema.$schema || contextDialectId || defaultDialectId);
  delete schema.$schema;

  if (!hasDialect(dialectId)) {
    throw Error(`Encountered unknown dialect '${dialectId}'`);
  }

  // Identifiers
  const idToken = getKeywordName(dialectId, "https://json-schema.org/keyword/id")
    || getKeywordName(dialectId, "https://json-schema.org/keyword/draft-04/id");
  if (retrievalUri === undefined && !(idToken in schema)) {
    throw Error(`Unable to determine an identifier for the schema. Use the '${idToken}' keyword or pass a retrievalUri when loading the schema.`);
  }
  const internalUrl = resolveUri(schema[idToken] || retrievalUri, retrievalUri);
  const id = toAbsoluteIri(internalUrl);
  delete schema[idToken];
  if (retrievalUri) {
    const externalId = toAbsoluteIri(retrievalUri);
    schemaStoreAlias[externalId] = id;
  }

  // Vocabulary
  const vocabularyToken = getKeywordName(dialectId, "https://json-schema.org/keyword/vocabulary");
  if (jsonTypeOf(schema[vocabularyToken], "object")) {
    const allowUnknownKeywords = schema[vocabularyToken]["https://json-schema.org/draft/2019-09/vocab/core"]
      || schema[vocabularyToken]["https://json-schema.org/draft/2020-12/vocab/core"];

    loadDialect(id, schema[vocabularyToken], allowUnknownKeywords);
    delete schema[vocabularyToken];
  }

  const dynamicAnchors = {};

  // Recursive anchor
  const recursiveAnchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/draft-2019-09/recursiveAnchor");
  if (schema[recursiveAnchorToken] === true) {
    dynamicAnchors[""] = `${id}#`;
  }
  delete schema[recursiveAnchorToken];

  // Store Schema
  const anchors = { "": "" };
  schemaStore[id] = {
    id: id,
    dialectId: dialectId,
    schema: processSchema(schema, id, dialectId, nilPointer, anchors, dynamicAnchors),
    anchors: anchors,
    dynamicAnchors: dynamicAnchors,
    validated: false
  };

  return id;
};

const processSchema = (subject, id, dialectId, pointer, anchors, dynamicAnchors) => {
  if (jsonTypeOf(subject, "object")) {
    // Embedded Schema
    const embeddedDialectId = typeof subject.$schema === "string" ? toAbsoluteIri(subject.$schema) : dialectId;
    if (!hasDialect(embeddedDialectId)) {
      throw Error(`Encountered unknown dialect '${embeddedDialectId}'`);
    }

    const idToken = getKeywordName(embeddedDialectId, "https://json-schema.org/keyword/id");
    if (typeof subject[idToken] === "string") {
      subject[idToken] = resolveUri(subject[idToken], id);
      add(subject, undefined, dialectId);
      return Reference.cons(subject[idToken], subject);
    }

    // Legacy id
    const legacyIdToken = getKeywordName(embeddedDialectId, "https://json-schema.org/keyword/draft-04/id");
    if (typeof subject[legacyIdToken] === "string") {
      if (subject[legacyIdToken][0] === "#") {
        const anchor = decodeURIComponent(subject[legacyIdToken].slice(1));
        anchors[anchor] = pointer;
      } else {
        delete subject[legacyIdToken].$schema;
        subject[legacyIdToken] = resolveUri(subject[legacyIdToken], id);
        add(subject, undefined, dialectId);
        return Reference.cons(subject[legacyIdToken], subject);
      }
      delete subject[legacyIdToken];
    }

    const dynamicAnchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/dynamicAnchor");
    if (typeof subject[dynamicAnchorToken] === "string") {
      dynamicAnchors[subject[dynamicAnchorToken]] = `${id}#${encodeURI(pointer)}`;
      delete subject[dynamicAnchorToken];
    }

    // Legacy dynamic anchor
    const legacyDynamicAnchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/draft-2020-12/dynamicAnchor");
    if (typeof subject[legacyDynamicAnchorToken] === "string") {
      dynamicAnchors[subject[legacyDynamicAnchorToken]] = `${id}#${encodeURI(pointer)}`;
      anchors[subject[legacyDynamicAnchorToken]] = pointer;
      delete subject[legacyDynamicAnchorToken];
    }

    const anchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/anchor");
    if (typeof subject[anchorToken] === "string") {
      anchors[subject[anchorToken]] = pointer;
      delete subject[anchorToken];
    }

    // Legacy $ref
    const jrefToken = getKeywordName(dialectId, "https://json-schema.org/keyword/draft-04/ref");
    if (typeof subject[jrefToken] === "string") {
      return Reference.cons(subject[jrefToken], subject);
    }

    for (const key in subject) {
      subject[key] = processSchema(subject[key], id, dialectId, pointerAppend(key, pointer), anchors, dynamicAnchors);
    }
  } else if (Array.isArray(subject)) {
    for (let index = 0; index < subject.length; index++) {
      subject[index] = processSchema(subject[index], id, dialectId, pointerAppend(index, pointer), anchors, dynamicAnchors);
    }
  }

  return subject;
};

const hasStoredSchema = (id) => id in schemaStore || id in schemaStoreAlias;
const getStoredSchema = (id) => schemaStore[schemaStoreAlias[id]] || schemaStore[id];

export const markValidated = (id) => {
  schemaStore[id].validated = true;
};

// Schema Retrieval
const nil = {
  id: undefined,
  dialectId: undefined,
  pointer: nilPointer,
  schema: undefined,
  value: undefined,
  anchors: {},
  dynamicAnchors: {},
  validated: true
};

export const get = async (url, contextDoc = nil) => {
  const resolvedUrl = resolveUri(url, contextDoc.id);
  const id = toAbsoluteIri(resolvedUrl);
  const fragment = uriFragment(resolvedUrl);

  if (!hasStoredSchema(id)) {
    const response = await fetch(id, { headers: { Accept: acceptableMediaTypes() } });
    if (response.status >= 400) {
      await response.text(); // Sometimes node hangs without this hack
      throw Error(`Failed to retrieve ${id} (${response.status} ${response.statusText})`);
    }

    const [schema, contextDialectId] = await parseResponse(response);

    // Try to determine the dialect from the meta-schema if it isn't already known
    const dialectId = toAbsoluteIri(schema.$schema || contextDialectId || defaultDialectId);
    if (!hasDialect(dialectId) && !hasStoredSchema(dialectId)) {
      await get(dialectId);
    }

    add(schema, id, contextDialectId);
  }

  const storedSchema = getStoredSchema(id);
  const pointer = fragment[0] === "/" ? fragment : getAnchorPointer(storedSchema, fragment);
  const doc = {
    ...storedSchema,
    pointer: pointer,
    value: pointerGet(pointer, storedSchema.schema)
  };

  return followReferences(doc);
};

const followReferences = (doc) => Reference.isReference(doc.value) ? get(Reference.href(doc.value), doc) : doc;

const getAnchorPointer = (schema, fragment) => {
  if (!(fragment in schema.anchors)) {
    throw Error(`No such anchor '${encodeURI(schema.id)}#${encodeURI(fragment)}'`);
  }

  return schema.anchors[fragment];
};

// Utility Functions
export const uri = (doc) => doc.id ? `${doc.id}#${encodeURI(doc.pointer)}` : undefined;
export const value = (doc) => Reference.isReference(doc.value) ? Reference.value(doc.value) : doc.value;
export const has = (key, doc) => key in value(doc);
export const typeOf = (doc, type) => jsonTypeOf(value(doc), type);

export const step = (key, doc) => {
  const storedSchema = getStoredSchema(doc.id);
  return followReferences({
    ...doc,
    pointer: pointerAppend(`${key}`, doc.pointer),
    value: value(doc)[key],
    validated: storedSchema.validated
  });
};

export const iter = async function* (doc) {
  for (let index = 0; index < value(doc).length; index++) {
    yield step(index, doc);
  }
};

export const keys = function* (doc) {
  for (const key in value(doc)) {
    yield key;
  }
};

export const values = async function* (doc) {
  for (const key in value(doc)) {
    yield step(key, doc);
  }
};

export const entries = async function* (doc) {
  for (const key in value(doc)) {
    yield [key, await step(key, doc)];
  }
};

export const length = (doc) => value(doc).length;

const toSchemaDefaultOptions = {
  parentId: "",
  parentDialect: "",
  includeEmbedded: true
};
export const toSchema = (schemaDoc, options = {}) => {
  const fullOptions = { ...toSchemaDefaultOptions, ...options };

  const idToken = getKeywordName(schemaDoc.dialectId, "https://json-schema.org/keyword/id")
    || getKeywordName(schemaDoc.dialectId, "https://json-schema.org/keyword/draft-04/id");
  const anchorToken = getKeywordName(schemaDoc.dialectId, "https://json-schema.org/keyword/anchor");
  const dynamicAnchorToken = getKeywordName(schemaDoc.dialectId, "https://json-schema.org/keyword/dynamicAnchor");
  const legacyDynamicAnchorToken = getKeywordName(schemaDoc.dialectId, "https://json-schema.org/keyword/draft-2020-12/dynamicAnchor");
  const recursiveAnchorToken = getKeywordName(schemaDoc.dialectId, "https://json-schema.org/keyword/recursiveAnchor");

  const anchors = {};
  for (const anchor in schemaDoc.anchors) {
    if (anchor !== "" && !schemaDoc.dynamicAnchors[anchor]) {
      anchors[schemaDoc.anchors[anchor]] = anchor;
    }
  }

  const dynamicAnchors = {};
  for (const anchor in schemaDoc.dynamicAnchors) {
    const pointer = uriFragment(schemaDoc.dynamicAnchors[anchor]);
    dynamicAnchors[pointer] = anchor;
  }

  const schema = JSON.parse(jsonStringify(schemaDoc.schema, (key, value, pointer) => {
    if (Reference.isReference(value)) {
      const refValue = Reference.value(value);
      if (fullOptions.includeEmbedded || !(idToken in refValue)) {
        return Reference.value(value);
      }
    } else {
      if (pointer in anchors) {
        value = { [anchorToken]: anchors[pointer], ...value };
      }
      if (pointer in dynamicAnchors) {
        if (dynamicAnchorToken) {
          value = { [dynamicAnchorToken]: dynamicAnchors[pointer], ...value };
        }

        // Legacy dynamic anchor
        if (legacyDynamicAnchorToken) {
          value = { [legacyDynamicAnchorToken]: dynamicAnchors[pointer], ...value };
        }

        // Recursive anchor
        if (recursiveAnchorToken) {
          value = { [recursiveAnchorToken]: true, ...value };
        }
      }
      return value;
    }
  }));

  const id = relativeUri(fullOptions.parentId, schemaDoc.id);
  const dialect = fullOptions.parentDialect === schemaDoc.dialectId ? "" : schemaDoc.dialectId;
  return {
    ...id && { [idToken]: id },
    ...dialect && { $schema: dialect },
    ...schema
  };
};

const relativeUri = (from, to) => {
  if (to.startsWith("file://")) {
    const pathToSchema = from.slice(7, from.lastIndexOf("/"));
    return from === "" ? "" : pathRelative(pathToSchema, to.slice(7));
  } else {
    return to;
  }
};

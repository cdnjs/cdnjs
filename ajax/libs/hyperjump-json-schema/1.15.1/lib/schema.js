import contentTypeParser from "content-type";
import { get as browserGet } from "@hyperjump/browser";
import { Reference } from "@hyperjump/browser/jref";
import { append } from "@hyperjump/json-pointer";
import { resolveIri, toAbsoluteIri, normalizeIri } from "@hyperjump/uri";
import { getKeywordName, loadDialect, unloadDialect } from "./keywords.js";
import { uriFragment, jsonStringify, jsonTypeOf, toRelativeIri } from "./common.js";


export const schemaPlugin = {
  parse: async (response) => {
    const contentType = contentTypeParser.parse(response.headers.get("content-type") ?? "");
    const contextDialectId = contentType.parameters.schema ?? contentType.parameters.profile;

    return buildSchemaDocument(await response.json(), response.url, contextDialectId);
  },
  fileMatcher: async (path) => /(\.|\/)schema\.json$/.test(path)
};

const schemaRegistry = {};

export const getSchema = async (uri, browser = undefined) => {
  if (!browser) {
    browser = { _cache: {} };
  }

  for (const uri in schemaRegistry) {
    if (!(uri in browser._cache)) {
      browser._cache[uri] = schemaRegistry[uri];
    }
  }

  const schema = await browserGet(uri, { ...browser });
  if (typeof schema.document.dialectId !== "string") {
    throw Error(`The document at ${schema.document.baseUri} is not a schema.`);
  }

  return schema;
};

export const registerSchema = (schema, retrievalUri, contextDialectId) => {
  schema = structuredClone(schema);
  const document = buildSchemaDocument(schema, retrievalUri, contextDialectId);

  if (document.baseUri in schemaRegistry) {
    throw Error(`A schema has already been registered for '${document.baseUri}. You can use 'unregisterSchema' to remove the old schema before registering the new one.`);
  }

  if (document.baseUri.startsWith("file:")) {
    throw Error(`Registering a schema with a 'file:' URI scheme is not allowed: ${document.baseUri}`);
  }

  schemaRegistry[retrievalUri ? toAbsoluteIri(retrievalUri) : document.baseUri] = document;
};

export const unregisterSchema = (uri) => {
  const normalizedUri = toAbsoluteIri(uri);
  unloadDialect(normalizedUri);
  delete schemaRegistry[normalizedUri];
};

export const getAllRegisteredSchemaUris = () => Object.keys(schemaRegistry);

export const hasSchema = (uri) => uri in schemaRegistry;

export const buildSchemaDocument = (schema, id, dialectId, embedded = {}) => {
  // Dialect / JSON Schema Version
  if (typeof schema.$schema === "string") {
    dialectId = schema.$schema;
    delete schema.$schema;
  }

  if (!dialectId) {
    throw Error("Unable to determine a dialect for the schema. The dialect can be declared in a number of ways, but the recommended way is to use the '$schema' keyword in your schema.");
  }
  dialectId = toAbsoluteIri(dialectId);

  // Identifiers
  const legacyIdToken = getKeywordName(dialectId, "https://json-schema.org/keyword/draft-04/id");
  const idToken = getKeywordName(dialectId, "https://json-schema.org/keyword/id") || legacyIdToken;
  if (!schema[idToken] && !id) {
    throw Error(`Unable to determine an identifier for the schema. Use the '${idToken}' keyword or pass a retrievalUri when loading the schema.`);
  }
  const resolvedId = resolveIri(schema[idToken] ?? "", id ?? "");
  id = toAbsoluteIri(resolvedId);
  if (legacyIdToken && resolvedId.length > id.length) {
    schema[idToken] = "#" + uriFragment(resolvedId);
  } else {
    delete schema[idToken];
  }

  // Vocabulary
  const vocabularyToken = getKeywordName(dialectId, "https://json-schema.org/keyword/vocabulary");
  if (jsonTypeOf(schema[vocabularyToken]) === "object") {
    const allowUnknownKeywords = schema[vocabularyToken]["https://json-schema.org/draft/2019-09/vocab/core"]
      || schema[vocabularyToken]["https://json-schema.org/draft/2020-12/vocab/core"];

    loadDialect(id, schema[vocabularyToken], allowUnknownKeywords, false);
    delete schema[vocabularyToken];
  }

  const anchors = { "": "" };
  const dynamicAnchors = {};

  // Legacy Recursive anchor
  const recursiveAnchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/draft-2019-09/recursiveAnchor");
  if (schema[recursiveAnchorToken] === true) {
    dynamicAnchors[""] = `${id}#`;
  }
  delete schema[recursiveAnchorToken];

  embedded[id] = {
    baseUri: id,
    dialectId: dialectId,
    root: processSchema(schema, id, dialectId, "", embedded, anchors, dynamicAnchors),
    anchorLocation: (fragment) => {
      if (fragment === undefined) {
        return "";
      }

      fragment = decodeURI(fragment);
      if (fragment[0] === "/") {
        return fragment;
      } else if (!(fragment in anchors)) {
        throw Error(`No such anchor '${id}#${encodeURI(fragment)}'`);
      } else {
        return anchors[fragment];
      }
    },
    anchors: anchors,
    dynamicAnchors: dynamicAnchors,
    embedded: embedded
  };

  return embedded[id];
};

const processSchema = (json, id, dialectId, cursor, embedded, anchors, dynamicAnchors) => {
  if (jsonTypeOf(json) === "object") {
    // Embedded Schema
    const embeddedDialectId = typeof json.$schema === "string" ? toAbsoluteIri(json.$schema) : dialectId;
    const idToken = getKeywordName(embeddedDialectId, "https://json-schema.org/keyword/id");

    if (typeof json[idToken] === "string") {
      const embeddedId = toAbsoluteIri(resolveIri(json[idToken], id));
      json[idToken] = embeddedId;
      embedded[embeddedId] = buildSchemaDocument(json, embeddedId, embeddedDialectId, embedded);
      return new Reference(embeddedId, {});
    }

    // Legacy id
    const legacyIdToken = getKeywordName(embeddedDialectId, "https://json-schema.org/keyword/draft-04/id");
    if (typeof json[legacyIdToken] === "string") {
      if (json[legacyIdToken][0] === "#") {
        const anchor = decodeURIComponent(json[legacyIdToken].slice(1));
        anchors[anchor] = cursor;
        delete json[legacyIdToken];
      } else {
        const embeddedId = toAbsoluteIri(resolveIri(json[legacyIdToken], id));
        json[legacyIdToken] = embeddedId;
        embedded[embeddedId] = buildSchemaDocument(json, embeddedId, embeddedDialectId, embedded);
        return new Reference(embeddedId, {});
      }
    }

    // Legacy $ref
    const jrefToken = getKeywordName(dialectId, "https://json-schema.org/keyword/draft-04/ref");
    if (typeof json[jrefToken] === "string") {
      return new Reference(json[jrefToken], json);
    }

    // Anchors
    const anchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/anchor");
    if (typeof json[anchorToken] === "string") {
      anchors[json[anchorToken]] = cursor;
      delete json[anchorToken];
    }

    // Dynamic Anchors
    const dynamicAnchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/dynamicAnchor");
    if (typeof json[dynamicAnchorToken] === "string") {
      dynamicAnchors[json[dynamicAnchorToken]] = `${id}#${encodeURI(cursor)}`;
      delete json[dynamicAnchorToken];
    }

    // Legacy dynamic anchor
    const legacyDynamicAnchorToken = getKeywordName(dialectId, "https://json-schema.org/keyword/draft-2020-12/dynamicAnchor");
    if (typeof json[legacyDynamicAnchorToken] === "string") {
      dynamicAnchors[json[legacyDynamicAnchorToken]] = `${id}#${encodeURI(cursor)}`;
      anchors[json[legacyDynamicAnchorToken]] = cursor;
      delete json[legacyDynamicAnchorToken];
    }

    for (const key in json) {
      // References
      const referenceToken = getKeywordName(dialectId, "https://json-schema.org/keyword/ref");
      if (key === referenceToken && typeof json[key] === "string") {
        json[key] = new Reference(json[key], json[key]);
      } else {
        json[key] = processSchema(json[key], id, dialectId, append(key, cursor), embedded, anchors, dynamicAnchors);
      }
    }
  } else if (Array.isArray(json)) {
    for (let index = 0; index < json.length; index++) {
      json[index] = processSchema(json[index], id, dialectId, append(index, cursor), embedded, anchors, dynamicAnchors);
    }
  }

  return json;
};

export const canonicalUri = (browser) => `${browser.document.baseUri}#${encodeURI(browser.cursor)}`;

export const toSchema = (browser, options = {}) => {
  if (!options.contextUri && browser.document.baseUri.startsWith("file:")) {
    options.contextUri = browser.document.baseUri;
  }

  const anchors = {};
  for (const anchor in browser.document.anchors) {
    if (anchor !== "" && !browser.document.dynamicAnchors[anchor]) {
      anchors[browser.document.anchors[anchor]] = anchor;
    }
  }

  const dynamicAnchors = {};
  for (const anchor in browser.document.dynamicAnchors) {
    const pointer = uriFragment(browser.document.dynamicAnchors[anchor]);
    dynamicAnchors[pointer] = anchor;
  }

  const legacyIdToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/draft-04/id");
  const idToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/id") || legacyIdToken;
  const anchorToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/anchor");
  const legacyAnchorToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/draft-04/id");
  const dynamicAnchorToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/dynamicAnchor");
  const legacyDynamicAnchorToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/draft-2020-12/dynamicAnchor");
  const recursiveAnchorToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/draft-2019-09/recursiveAnchor");
  const refToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/ref");
  const legacyRefToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/draft-04/ref");

  let schema = JSON.parse(jsonStringify(browser.document.root, (key, value, pointer) => {
    if (value instanceof Reference) {
      if (key === refToken) {
        return value.href;
      } else if (legacyIdToken) {
        if (JSON.stringify(value.toJSON()) === "{}") {
          return toSchema({ document: browser.document.embedded[toAbsoluteIri(value.href)] }, {
            ...options,
            contextDialectId: browser.document.dialectId
          });
        } else {
          return { [legacyRefToken]: value.href };
        }
      } else if (options.includeEmbedded ?? true) {
        return toSchema({ document: browser.document.embedded[toAbsoluteIri(value.href)] }, {
          ...options,
          contextDialectId: browser.document.dialectId
        });
      } else {
        return;
      }
    }

    if (jsonTypeOf(value) === "object") {
      value = { ...value };
      if (pointer in anchors) {
        if (anchorToken) {
          value[anchorToken] = anchors[pointer];
        }

        // Legacy anchor
        if (legacyAnchorToken) {
          value[legacyAnchorToken] = `#${anchors[pointer]}`;
        }
      }

      if (pointer in dynamicAnchors) {
        if (dynamicAnchorToken) {
          value[dynamicAnchorToken] = dynamicAnchors[pointer];
        }

        // Legacy dynamic anchor
        if (legacyDynamicAnchorToken) {
          value[legacyDynamicAnchorToken] = dynamicAnchors[pointer];
        }

        // Recursive anchor
        if (recursiveAnchorToken) {
          value[recursiveAnchorToken] = true;
        }
      }
    }

    return value;
  }));

  const definitionsToken = getKeywordName(browser.document.dialectId, "https://json-schema.org/keyword/definitions");
  if (Reflect.ownKeys(schema[definitionsToken] ?? {}).length === 0) {
    delete schema[definitionsToken];
  }

  // Self-identification
  if (options.contextUri) {
    const relativeUri = toRelativeIri(normalizeIri(options.contextUri), browser.document.baseUri);
    if (relativeUri !== "") {
      const id = schema[idToken] ? `${relativeUri}${schema[idToken]}` : relativeUri;
      delete schema[idToken];

      schema = {
        [idToken]: id,
        ...schema
      };
    }
  } else if (!browser.document.baseUri.startsWith("file:")) {
    const id = schema[idToken] ? `${browser.document.baseUri}${schema[idToken]}` : browser.document.baseUri;
    delete schema[idToken];

    schema = {
      [idToken]: id,
      ...schema
    };
  }

  // $schema
  switch (options.includeDialect ?? "auto") {
    case "auto":
      if (browser.document.dialectId === options.contextDialectId) {
        break;
      }
    case "always":
      schema = {
        $schema: browser.document.dialectId,
        ...schema
      };
      if (legacyIdToken) {
        schema.$schema += "#";
      }
      break;
    case "never":
      break;
    default:
      throw Error(`Unsupported value ToSchemaOptions.includeDialect: '${options.includeDialect}'`);
  }

  return schema;
};

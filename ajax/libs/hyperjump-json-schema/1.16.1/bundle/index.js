import { v4 as uuid } from "uuid";
import { jrefTypeOf } from "@hyperjump/browser/jref";
import * as JsonPointer from "@hyperjump/json-pointer";
import { resolveIri, toAbsoluteIri } from "@hyperjump/uri";
import { getSchema, toSchema, getKeywordName } from "../lib/experimental.js";


export const URI = "uri", UUID = "uuid";

const defaultOptions = {
  alwaysIncludeDialect: false,
  definitionNamingStrategy: URI,
  externalSchemas: []
};

export const bundle = async (url, options = {}) => {
  const fullOptions = { ...defaultOptions, ...options };

  const mainSchema = await getSchema(url);
  fullOptions.contextUri = mainSchema.document.baseUri;
  fullOptions.contextDialectId = mainSchema.document.dialectId;

  const bundled = toSchema(mainSchema);
  fullOptions.bundlingLocation = "/" + getKeywordName(fullOptions.contextDialectId, "https://json-schema.org/keyword/definitions");
  if (JsonPointer.get(fullOptions.bundlingLocation, bundled) === undefined) {
    JsonPointer.assign(fullOptions.bundlingLocation, bundled, {});
  }

  return await doBundling(mainSchema.uri, bundled, fullOptions);
};

const doBundling = async (schemaUri, bundled, fullOptions, contextSchema, visited = new Set()) => {
  visited.add(schemaUri);

  const schema = await getSchema(schemaUri, contextSchema);
  for (const reference of allReferences(schema.document.root)) {
    const uri = toAbsoluteIri(resolveIri(reference.href, schema.document.baseUri));
    if (visited.has(uri) || fullOptions.externalSchemas.includes(uri) || (uri in schema.document.embedded && !(uri in schema._cache))) {
      continue;
    }

    const externalSchema = await getSchema(uri, contextSchema);
    const embeddedSchema = toSchema(externalSchema, {
      contextUri: externalSchema.document.baseUri.startsWith("file:") ? fullOptions.contextUri : undefined,
      includeDialect: fullOptions.alwaysIncludeDialect ? "always" : "auto",
      contextDialectId: fullOptions.contextDialectId
    });
    let id;
    if (fullOptions.definitionNamingStrategy === URI) {
      const idToken = getKeywordName(externalSchema.document.dialectId, "https://json-schema.org/keyword/id")
        || getKeywordName(externalSchema.document.dialectId, "https://json-schema.org/keyword/draft-04/id");
      id = embeddedSchema[idToken];
    } else if (fullOptions.definitionNamingStrategy === UUID) {
      id = uuid();
    } else {
      throw Error(`Unknown definition naming stragety: ${fullOptions.definitionNamingStrategy}`);
    }
    const pointer = JsonPointer.append(id, fullOptions.bundlingLocation);
    JsonPointer.assign(pointer, bundled, embeddedSchema);

    bundled = await doBundling(uri, bundled, fullOptions, schema, visited);
  }

  return bundled;
};

const allReferences = function* (node) {
  switch (jrefTypeOf(node)) {
    case "object":
      for (const property in node) {
        yield* allReferences(node[property]);
      }
      break;
    case "array":
      for (const item of node) {
        yield* allReferences(item);
      }
      break;
    case "reference":
      yield node;
      break;
  }
};

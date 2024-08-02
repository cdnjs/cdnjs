import curry from "just-curry-it";
import { v4 as uuid } from "uuid";
import * as Browser from "@hyperjump/browser";
import * as JsonPointer from "@hyperjump/json-pointer";
import { asyncCollectSet, asyncFilter, asyncFlatten, asyncMap, pipe } from "@hyperjump/pact";
import {
  Validation,
  canonicalUri, getSchema, toSchema,
  getKeywordName, getKeyword, getKeywordByName
} from "../lib/experimental.js";


export const URI = "uri", UUID = "uuid";

const defaultOptions = {
  alwaysIncludeDialect: false,
  definitionNamingStrategy: URI,
  externalSchemas: []
};

export const bundle = async (url, options = {}) => {
  loadKeywordSupport();
  const fullOptions = { ...defaultOptions, ...options };

  const mainSchema = await getSchema(url);
  const contextUri = mainSchema.document.baseUri;
  const contextDialectId = mainSchema.document.dialectId;
  const bundled = toSchema(mainSchema);

  const externalIds = await Validation.collectExternalIds(new Set(), mainSchema, mainSchema);

  // Bundle
  const bundlingLocation = "/" + getKeywordName(contextDialectId, "https://json-schema.org/keyword/definitions");
  if (JsonPointer.get(bundlingLocation, bundled) === undefined && externalIds.size > 0) {
    JsonPointer.assign(bundlingLocation, bundled, {});
  }

  for (const uri of externalIds) {
    if (fullOptions.externalSchemas.includes(uri)) {
      continue;
    }

    const externalSchema = await getSchema(uri);
    const embeddedSchema = toSchema(externalSchema, {
      contextUri: externalSchema.document.baseUri.startsWith("file:") ? contextUri : undefined,
      includeDialect: fullOptions.alwaysIncludeDialect ? "always" : "auto",
      contextDialectId: contextDialectId
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
    const pointer = JsonPointer.append(id, bundlingLocation);
    JsonPointer.assign(pointer, bundled, embeddedSchema);
  }

  return bundled;
};

Validation.collectExternalIds = curry(async (visited, parentSchema, schema) => {
  const uri = canonicalUri(schema);
  if (visited.has(uri) || Browser.typeOf(schema) === "boolean") {
    return new Set();
  }

  visited.add(uri);

  const externalIds = await pipe(
    Browser.entries(schema),
    asyncMap(async ([keyword, keywordSchema]) => {
      const keywordHandler = getKeywordByName(keyword, schema.document.dialectId);

      return "collectExternalIds" in keywordHandler
        ? await keywordHandler.collectExternalIds(visited, schema, keywordSchema)
        : new Set();
    }),
    asyncFlatten,
    asyncCollectSet
  );

  if (parentSchema.document.baseUri !== schema.document.baseUri
    && (!(schema.document.baseUri in parentSchema.document.embedded) || schema.document.baseUri in parentSchema._cache)
  ) {
    externalIds.add(schema.document.baseUri);
  }

  return externalIds;
});

const collectExternalIdsFromArrayOfSchemas = (visited, parentSchema, schema) => pipe(
  Browser.iter(schema),
  asyncMap(Validation.collectExternalIds(visited, parentSchema)),
  asyncFlatten,
  asyncCollectSet
);

const collectExternalIdsFromObjectOfSchemas = async (visited, parentSchema, schema) => pipe(
  Browser.values(schema),
  asyncMap(Validation.collectExternalIds(visited, parentSchema)),
  asyncFlatten,
  asyncCollectSet
);

const loadKeywordSupport = () => {
  // Stable

  const additionalProperties = getKeyword("https://json-schema.org/keyword/additionalProperties");
  if (additionalProperties) {
    additionalProperties.collectExternalIds = Validation.collectExternalIds;
  }

  const allOf = getKeyword("https://json-schema.org/keyword/allOf");
  if (allOf) {
    allOf.collectExternalIds = collectExternalIdsFromArrayOfSchemas;
  }

  const anyOf = getKeyword("https://json-schema.org/keyword/anyOf");
  if (anyOf) {
    anyOf.collectExternalIds = collectExternalIdsFromArrayOfSchemas;
  }

  const contains = getKeyword("https://json-schema.org/keyword/contains");
  if (contains) {
    contains.collectExternalIds = Validation.collectExternalIds;
  }

  const dependentSchemas = getKeyword("https://json-schema.org/keyword/dependentSchemas");
  if (dependentSchemas) {
    dependentSchemas.collectExternalIds = collectExternalIdsFromObjectOfSchemas;
  }

  const if_ = getKeyword("https://json-schema.org/keyword/if");
  if (if_) {
    if_.collectExternalIds = Validation.collectExternalIds;
  }

  const then = getKeyword("https://json-schema.org/keyword/then");
  if (then) {
    then.collectExternalIds = Validation.collectExternalIds;
  }

  const else_ = getKeyword("https://json-schema.org/keyword/else");
  if (else_) {
    else_.collectExternalIds = Validation.collectExternalIds;
  }

  const items = getKeyword("https://json-schema.org/keyword/items");
  if (items) {
    items.collectExternalIds = Validation.collectExternalIds;
  }

  const not = getKeyword("https://json-schema.org/keyword/not");
  if (not) {
    not.collectExternalIds = Validation.collectExternalIds;
  }

  const oneOf = getKeyword("https://json-schema.org/keyword/oneOf");
  if (oneOf) {
    oneOf.collectExternalIds = collectExternalIdsFromArrayOfSchemas;
  }

  const patternProperties = getKeyword("https://json-schema.org/keyword/patternProperties");
  if (patternProperties) {
    patternProperties.collectExternalIds = collectExternalIdsFromObjectOfSchemas;
  }

  const prefixItems = getKeyword("https://json-schema.org/keyword/prefixItems");
  if (prefixItems) {
    prefixItems.collectExternalIds = collectExternalIdsFromArrayOfSchemas;
  }

  const properties = getKeyword("https://json-schema.org/keyword/properties");
  if (properties) {
    properties.collectExternalIds = collectExternalIdsFromObjectOfSchemas;
  }

  const propertyNames = getKeyword("https://json-schema.org/keyword/propertyNames");
  if (propertyNames) {
    propertyNames.collectExternalIds = Validation.collectExternalIds;
  }

  const ref = getKeyword("https://json-schema.org/keyword/ref");
  if (ref) {
    ref.collectExternalIds = Validation.collectExternalIds;
  }

  const unevaluatedItems = getKeyword("https://json-schema.org/keyword/unevaluatedItems");
  if (unevaluatedItems) {
    unevaluatedItems.collectExternalIds = Validation.collectExternalIds;
  }

  const unevaluatedProperties = getKeyword("https://json-schema.org/keyword/unevaluatedProperties");
  if (unevaluatedProperties) {
    unevaluatedProperties.collectExternalIds = Validation.collectExternalIds;
  }

  // Draft-04

  const additionalItems4 = getKeyword("https://json-schema.org/keyword/draft-04/additionalItems");
  if (additionalItems4) {
    additionalItems4.collectExternalIds = Validation.collectExternalIds;
  }

  const dependencies = getKeyword("https://json-schema.org/keyword/draft-04/dependencies");
  if (dependencies) {
    dependencies.collectExternalIds = (visited, parentSchema, schema) => pipe(
      Browser.values(schema),
      asyncFilter((subSchema) => Browser.typeOf(subSchema) === "object"),
      asyncMap(Validation.collectExternalIds(visited, parentSchema)),
      asyncFlatten,
      asyncCollectSet
    );
  }

  const items4 = getKeyword("https://json-schema.org/keyword/draft-04/items");
  if (items4) {
    items4.collectExternalIds = (visited, parentSchema, schema) => Browser.typeOf(schema) === "array"
      ? collectExternalIdsFromArrayOfSchemas(visited, parentSchema, schema)
      : Validation.collectExternalIds(visited, parentSchema, schema);
  }

  // Draft-06

  const contains6 = getKeyword("https://json-schema.org/keyword/draft-06/contains");
  if (contains6) {
    contains6.collectExternalIds = Validation.collectExternalIds;
  }

  // Draft-2019-09

  const contains19 = getKeyword("https://json-schema.org/keyword/draft-2019-09/contains");
  if (contains19) {
    contains19.collectExternalIds = Validation.collectExternalIds;
  }

  // Extensions

  const propertyDependencies = getKeyword("https://json-schema.org/keyword/propertyDependencies");
  if (propertyDependencies) {
    propertyDependencies.collectExternalIds = (visited, parentSchema, schema) => pipe(
      Browser.values(schema),
      asyncMap((mapping) => Browser.values(mapping)),
      asyncFlatten,
      asyncMap(Validation.collectExternalIds(visited, parentSchema)),
      asyncFlatten,
      asyncCollectSet
    );
  }

  const conditional = getKeyword("https://json-schema.org/keyword/conditional");
  if (conditional) {
    conditional.collectExternalIds = collectExternalIdsFromArrayOfSchemas;
  }

  const itemPattern = getKeyword("https://json-schema.org/keyword/itemPattern");
  if (itemPattern) {
    itemPattern.collectExternalIds = (visited, parentSchema, schema) => pipe(
      Browser.iter(schema),
      asyncFilter((item) => Browser.typeOf(item) === "object"),
      asyncMap(Validation.collectExternalIds(visited, parentSchema)),
      asyncFlatten,
      asyncCollectSet
    );
  }
};

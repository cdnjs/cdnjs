import { v4 as uuid } from "uuid";
import * as JsonPointer from "@hyperjump/json-pointer";
import { toAbsoluteUri } from "../lib/common.js";
import { compile } from "../lib/core.js";
import { getKeywordName, getKeyword } from "../lib/keywords.js";
import Validation from "../lib/keywords/validation.js";
import * as Schema from "../lib/schema.js";


export const FULL = "full", FLAT = "flat";
export const URI = "uri", UUID = "uuid";

const defaultOptions = {
  alwaysIncludeDialect: false,
  bundleMode: FLAT,
  definitionNamingStrategy: URI,
  externalSchemas: []
};

export const bundle = async (url, options = {}) => {
  loadKeywordSupport();
  const fullOptions = { ...defaultOptions, ...options };

  const schemaDoc = await Schema.get(url);
  const externalIds = await collectExternalIds(url, fullOptions);

  const bundled = Schema.toSchema(schemaDoc, {
    includeEmbedded: fullOptions.bundleMode === FULL
  });

  const bundlingLocation = "/" + getKeywordName(schemaDoc.dialectId, "https://json-schema.org/keyword/definitions");
  if (JsonPointer.get(bundlingLocation, bundled) === undefined && externalIds.size > 0) {
    JsonPointer.assign(bundlingLocation, bundled, {});
  }

  for (const uri of externalIds.values()) {
    const externalSchema = await Schema.get(uri);
    const embeddedSchema = Schema.toSchema(externalSchema, {
      parentId: schemaDoc.id,
      parentDialect: fullOptions.alwaysIncludeDialect ? "" : schemaDoc.dialectId,
      includeEmbedded: fullOptions.bundleMode === FULL
    });
    let id;
    if (fullOptions.definitionNamingStrategy === URI) {
      const idToken = getKeywordName(externalSchema.dialectId, "https://json-schema.org/keyword/id")
        || getKeywordName(externalSchema.dialectId, "https://json-schema.org/keyword/draft-04/id");
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

const collectExternalIds = async (uri, options) => {
  const { ast, schemaUri } = await compile(uri);
  const subSchemaUris = new Set();
  Validation.collectExternalIds(schemaUri, subSchemaUris, ast, {});
  const externalIds = new Set([...subSchemaUris]
    .map(toAbsoluteUri)
    .filter((uri) => !options.externalSchemas.includes(uri)));
  externalIds.delete(toAbsoluteUri(schemaUri));

  return externalIds;
};

Validation.collectExternalIds = (schemaUri, externalIds, ast, dynamicAnchors) => {
  if (externalIds.has(schemaUri) || typeof ast[schemaUri] === "boolean") {
    return;
  }
  externalIds.add(schemaUri);

  const id = toAbsoluteUri(schemaUri);
  for (const [keywordId, , keywordValue] of ast[schemaUri]) {
    const keyword = getKeyword(keywordId);

    if (keyword.collectExternalIds) {
      keyword.collectExternalIds(keywordValue, externalIds, ast, {
        ...ast.metaData[id].dynamicAnchors, ...dynamicAnchors
      });
    }
  }
};

const loadKeywordSupport = () => {
  // Stable

  const additionalProperties = getKeyword("https://json-schema.org/keyword/additionalProperties");
  if (additionalProperties) {
    additionalProperties.collectExternalIds = ([, additionalProperties], externalIds, ast, dynamicAnchors) => {
      if (typeof additionalProperties === "string") {
        Validation.collectExternalIds(additionalProperties, externalIds, ast, dynamicAnchors);
      }
    };
  }

  const allOf = getKeyword("https://json-schema.org/keyword/allOf");
  if (allOf) {
    allOf.collectExternalIds = (allOf, externalIds, ast, dynamicAnchors) => {
      allOf.forEach((schemaUri) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
    };
  }

  const anyOf = getKeyword("https://json-schema.org/keyword/anyOf");
  if (anyOf) {
    anyOf.collectExternalIds = (anyOf, externalIds, ast, dynamicAnchors) => {
      anyOf.forEach((schemaUri) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
    };
  }

  const contains = getKeyword("https://json-schema.org/keyword/contains");
  if (contains) {
    contains.collectExternalIds = ({ contains }, externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(contains, externalIds, ast, dynamicAnchors);
    };
  }

  const dependentSchemas = getKeyword("https://json-schema.org/keyword/dependentSchemas");
  if (dependentSchemas) {
    dependentSchemas.collectExternalIds = (dependentSchemas, externalIds, ast, dynamicAnchors) => {
      Object.values(dependentSchemas).forEach(([, schemaUri]) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
    };
  }

  const if_ = getKeyword("https://json-schema.org/keyword/if");
  if (if_) {
    if_.collectExternalIds = Validation.collectExternalIds;
  }

  const then = getKeyword("https://json-schema.org/keyword/then");
  if (then) {
    then.collectExternalIds = ([, then], externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(then, externalIds, ast, dynamicAnchors);
    };
  }

  const else_ = getKeyword("https://json-schema.org/keyword/else");
  if (else_) {
    else_.collectExternalIds = ([, elseSchema], externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(elseSchema, externalIds, ast, dynamicAnchors);
    };
  }

  const items = getKeyword("https://json-schema.org/keyword/items");
  if (items) {
    items.collectExternalIds = ([, items], externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(items, externalIds, ast, dynamicAnchors);
    };
  }

  const not = getKeyword("https://json-schema.org/keyword/not");
  if (not) {
    not.collectExternalIds = Validation.collectExternalIds;
  }

  const oneOf = getKeyword("https://json-schema.org/keyword/oneOf");
  if (oneOf) {
    oneOf.collectExternalIds = (oneOf, externalIds, ast, dynamicAnchors) => {
      oneOf.forEach((schemaUri) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
    };
  }

  const patternProperties = getKeyword("https://json-schema.org/keyword/patternProperties");
  if (patternProperties) {
    patternProperties.collectExternalIds = (patternProperties, externalIds, ast, dynamicAnchors) => {
      patternProperties.forEach(([, schemaUri]) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
    };
  }

  const prefixItems = getKeyword("https://json-schema.org/keyword/prefixItems");
  if (prefixItems) {
    prefixItems.collectExternalIds = (tupleItems, externalIds, ast, dynamicAnchors) => {
      tupleItems.forEach((schemaUri) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
    };
  }

  const properties = getKeyword("https://json-schema.org/keyword/properties");
  if (properties) {
    properties.collectExternalIds = (properties, externalIds, ast, dynamicAnchors) => {
      Object.values(properties).forEach((schemaUri) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
    };
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
    unevaluatedItems.collectExternalIds = ([, unevaluatedItems], externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(unevaluatedItems, externalIds, ast, dynamicAnchors);
    };
  }

  const unevaluatedProperties = getKeyword("https://json-schema.org/keyword/unevaluatedProperties");
  if (unevaluatedProperties) {
    unevaluatedProperties.collectExternalIds = ([, unevaluatedProperties], externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(unevaluatedProperties, externalIds, ast, dynamicAnchors);
    };
  }

  // Draft-04

  const additionalItems4 = getKeyword("https://json-schema.org/keyword/draft-04/additionalItems");
  if (additionalItems4) {
    additionalItems4.collectExternalIds = ([, additionalItems], externalIds, ast, dynamicAnchors) => {
      if (typeof additionalItems === "string") {
        Validation.collectExternalIds(additionalItems, externalIds, ast, dynamicAnchors);
      }
    };
  }

  const dependencies = getKeyword("https://json-schema.org/keyword/draft-04/dependencies");
  if (dependencies) {
    dependencies.collectExternalIds = (dependencies, externalIds, ast, dynamicAnchors) => {
      Object.values(dependencies).forEach(([, dependency]) => {
        if (typeof dependency === "string") {
          Validation.collectExternalIds(dependency, externalIds, ast, dynamicAnchors);
        }
      });
    };
  }

  const items4 = getKeyword("https://json-schema.org/keyword/draft-04/items");
  if (items4) {
    items4.collectExternalIds = (items, externalIds, ast, dynamicAnchors) => {
      if (typeof items === "string") {
        Validation.collectExternalIds(items, externalIds, ast, dynamicAnchors);
      } else {
        items.forEach((schemaUri) => Validation.collectExternalIds(schemaUri, externalIds, ast, dynamicAnchors));
      }
    };
  }

  const ref4 = getKeyword("https://json-schema.org/keyword/draft-04/ref");
  if (ref4) {
    ref4.collectExternalIds = Validation.collectExternalIds;
  }

  // Draft-06

  const contains6 = getKeyword("https://json-schema.org/keyword/draft-06/contains");
  if (contains6) {
    contains6.collectExternalIds = (contains, externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(contains, externalIds, ast, dynamicAnchors);
    };
  }

  // Draft-2019-09

  const contains19 = getKeyword("https://json-schema.org/keyword/draft-2019-09/contains");
  if (contains19) {
    contains19.collectExternalIds = ({ contains }, externalIds, ast, dynamicAnchors) => {
      Validation.collectExternalIds(contains, externalIds, ast, dynamicAnchors);
    };
  }

  // Experimental

  const propertyDependencies = getKeyword("https://json-schema.org/keyword/propertyDependencies");
  if (propertyDependencies) {
    propertyDependencies.collectExternalIds = (propertyDependencies, externalIds, ast, dynamicAnchors) => {
      for (const key in propertyDependencies) {
        for (const value in propertyDependencies[key]) {
          Validation.collectExternalIds(propertyDependencies[key][value], externalIds, ast, dynamicAnchors);
        }
      }
    };
  }

  const conditional = getKeyword("https://json-schema.org/keyword/conditional");
  if (conditional) {
    conditional.collectExternalIds = (conditional, externalIds, ast, dynamicAnchors) => {
      for (const schema of conditional) {
        Validation.collectExternalIds(schema, externalIds, ast, dynamicAnchors);
      }
    };
  }

  const itemPattern = getKeyword("https://json-schema.org/keyword/itemPattern");
  if (itemPattern) {
    itemPattern.collectExternalIds = (nfa, externalIds, ast, dynamicAnchors) => {
      for (const itemSchema of collectNfaSchemas(nfa.start)) {
        Validation.collectExternalIds(itemSchema, externalIds, ast, dynamicAnchors);
      }
    };
  }

  const collectNfaSchemas = function* (node, visited = new Set()) {
    if (visited.has(node)) {
      return;
    }

    visited.add(node);

    for (const schema in node.transition) {
      yield schema;
      yield* collectNfaSchemas(node.transition[schema], visited);
    }

    for (const epsilon of node.epsilonTransitions) {
      yield* collectNfaSchemas(epsilon, visited);
    }
  };
};

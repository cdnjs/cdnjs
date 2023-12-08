import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/anyOf";

const compile = (schema, ast) => pipe(
  Schema.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (anyOf, instance, ast, dynamicAnchors, quiet) => {
  const matches = anyOf.filter((schemaUrl) => Validation.interpret(schemaUrl, instance, ast, dynamicAnchors, quiet));
  return matches.length > 0;
};

const collectEvaluatedProperties = (anyOf, instance, ast, dynamicAnchors) => {
  return anyOf.reduce((acc, schemaUrl) => {
    const propertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, ast, dynamicAnchors);
    return propertyNames === false ? acc : [...acc || [], ...propertyNames];
  }, false);
};

const collectEvaluatedItems = (anyOf, instance, ast, dynamicAnchors) => {
  return anyOf.reduce((acc, schemaUrl) => {
    const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, ast, dynamicAnchors);
    return itemIndexes === false ? acc : new Set([...acc || [], ...itemIndexes]);
  }, false);
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };

import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/allOf";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (allOf, instance, ast, dynamicAnchors, quiet) => {
  return allOf.every((schemaUrl) => Validation.interpret(schemaUrl, instance, ast, dynamicAnchors, quiet));
};

const collectEvaluatedProperties = (allOf, instance, ast, dynamicAnchors) => {
  return allOf.reduce((acc, schemaUrl) => {
    const propertyNames = acc && Validation.collectEvaluatedProperties(schemaUrl, instance, ast, dynamicAnchors);
    return propertyNames !== false && [...acc, ...propertyNames];
  }, []);
};

const collectEvaluatedItems = (allOf, instance, ast, dynamicAnchors) => {
  return allOf.reduce((acc, schemaUrl) => {
    const itemIndexes = acc !== false && Validation.collectEvaluatedItems(schemaUrl, instance, ast, dynamicAnchors);
    return itemIndexes !== false && new Set([...acc, ...itemIndexes]);
  }, new Set());
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };

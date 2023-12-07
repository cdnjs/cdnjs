import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/oneOf";

const compile = (schema, ast) => pipe(
  Schema.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (oneOf, instance, ast, dynamicAnchors, quiet) => {
  let validCount = 0;
  for (const schemaUrl of oneOf) {
    if (Validation.interpret(schemaUrl, instance, ast, dynamicAnchors, quiet)) {
      validCount++;
    }

    if (validCount > 1) {
      break;
    }
  }

  return validCount === 1;
};

const collectEvaluatedProperties = (oneOf, instance, ast, dynamicAnchors) => {
  let validCount = 0;
  return oneOf.reduce((acc, schemaUrl) => {
    if (validCount > 1) {
      return false;
    }

    const propertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, ast, dynamicAnchors);
    return propertyNames ? validCount++ === 0 && propertyNames : acc;
  }, false);
};

const collectEvaluatedItems = (oneOf, instance, ast, dynamicAnchors) => {
  let validCount = 0;
  return oneOf.reduce((acc, schemaUrl) => {
    if (validCount > 1) {
      return false;
    }

    const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, ast, dynamicAnchors);
    return itemIndexes ? validCount++ === 0 && itemIndexes : acc;
  }, false);
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };

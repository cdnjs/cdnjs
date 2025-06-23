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
  let isValid = true;
  for (const schemaUri of allOf) {
    if (!Validation.interpret(schemaUri, instance, ast, dynamicAnchors, quiet)) {
      isValid = false;
    }
  }
  return isValid;
};

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };

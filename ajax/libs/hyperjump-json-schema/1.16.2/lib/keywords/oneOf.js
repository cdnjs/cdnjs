import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/oneOf";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (oneOf, instance, context) => {
  let validCount = 0;
  for (const schemaUrl of oneOf) {
    if (Validation.interpret(schemaUrl, instance, context)) {
      validCount++;
    }
  }

  return validCount === 1;
};

export default { id, compile, interpret };

import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/conditional";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  schemaFlatten,
  asyncMap((subSchema) => Validation.compile(subSchema, ast)),
  asyncCollectArray
);

const interpret = (conditional, instance, context) => {
  for (let index = 0; index < conditional.length; index += 2) {
    const isValid = Validation.interpret(conditional[index], instance, context);
    if (index + 1 === conditional.length) {
      return isValid;
    } else if (isValid) {
      return Validation.interpret(conditional[index + 1], instance, context);
    }
  }

  return true;
};

const schemaFlatten = async function* (iter, depth = 1) {
  for await (const n of iter) {
    if (depth > 0 && Browser.typeOf(n) === "array") {
      yield* schemaFlatten(Browser.iter(n), depth - 1);
    } else {
      yield n;
    }
  }
};

export default { id, compile, interpret };

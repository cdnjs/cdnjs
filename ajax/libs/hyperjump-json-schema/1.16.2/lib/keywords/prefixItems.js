import { pipe, asyncMap, asyncCollectArray, zip } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/prefixItems";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (prefixItems, instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  let isValid = true;
  let index = 0;
  const instanceLength = Instance.length(instance);
  for (const [schemaUri, item] of zip(prefixItems, Instance.iter(instance))) {
    if (index >= instanceLength) {
      break;
    }

    if (!Validation.interpret(schemaUri, item, context)) {
      isValid = false;
    }

    context.evaluatedItems?.add(index);
    index++;
  }

  return isValid;
};

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };

import { pipe, asyncMap, asyncCollectArray, zip } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../lib/instance.js";
import { Validation } from "../lib/experimental.js";


const id = "https://json-schema.org/keyword/draft-04/items";

const compile = (schema, ast) => {
  if (Browser.typeOf(schema) === "array") {
    return pipe(
      Browser.iter(schema),
      asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
      asyncCollectArray
    );
  } else {
    return Validation.compile(schema, ast);
  }
};

const interpret = (items, instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  let isValid = true;
  let index = 0;

  if (typeof items === "string") {
    for (const item of Instance.iter(instance)) {
      if (!Validation.interpret(items, item, context)) {
        isValid = false;
      }

      context.evaluatedItems?.add(index++);
    }
  } else {
    for (const [tupleItem, tupleInstance] of zip(items, Instance.iter(instance))) {
      if (!tupleInstance) {
        break;
      }

      if (!Validation.interpret(tupleItem, tupleInstance, context)) {
        isValid = false;
      }

      context.evaluatedItems?.add(index);
      index++;
    }
  }

  return isValid;
};

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };

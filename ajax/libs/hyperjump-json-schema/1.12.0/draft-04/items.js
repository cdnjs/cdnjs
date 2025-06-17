import { pipe, asyncMap, asyncCollectArray, every, zip, take, range, collectSet } from "@hyperjump/pact";
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

  if (typeof items === "string") {
    return every((itemValue) => Validation.interpret(items, itemValue, context), Instance.iter(instance));
  } else {
    return pipe(
      zip(items, Instance.iter(instance)),
      take(Instance.length(instance)),
      every(([prefixItem, item]) => Validation.interpret(prefixItem, item, context))
    );
  }
};

const collectEvaluatedItems = (items, instance, context) => {
  return interpret(items, instance, context) && (typeof items === "string"
    ? collectSet(range(0, Instance.length(instance)))
    : collectSet(range(0, items.length)));
};

export default { id, compile, interpret, collectEvaluatedItems };

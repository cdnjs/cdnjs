import { pipe, asyncMap, asyncCollectArray, every, zip, take, range, collectSet } from "@hyperjump/pact";
import * as Instance from "../lib/instance.js";
import * as Schema from "../lib/schema.js";
import Validation from "../lib/keywords/validation.js";


const id = "https://json-schema.org/keyword/draft-04/items";

const compile = (schema, ast) => {
  if (Schema.typeOf(schema, "array")) {
    return pipe(
      Schema.iter(schema),
      asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
      asyncCollectArray
    );
  } else {
    return Validation.compile(schema, ast);
  }
};

const interpret = (items, instance, ast, dynamicAnchors, quiet) => {
  if (!Instance.typeOf(instance, "array")) {
    return true;
  }

  if (typeof items === "string") {
    return every((itemValue) => Validation.interpret(items, itemValue, ast, dynamicAnchors, quiet), Instance.iter(instance));
  } else {
    return pipe(
      zip(items, Instance.iter(instance)),
      take(Instance.length(instance)),
      every(([prefixItem, item]) => Validation.interpret(prefixItem, item, ast, dynamicAnchors, quiet))
    );
  }
};

const collectEvaluatedItems = (items, instance, ast, dynamicAnchors) => {
  return interpret(items, instance, ast, dynamicAnchors) && (typeof items === "string"
    ? collectSet(range(0, Instance.length(instance)))
    : collectSet(range(0, items.length)));
};

export default { id, compile, interpret, collectEvaluatedItems };

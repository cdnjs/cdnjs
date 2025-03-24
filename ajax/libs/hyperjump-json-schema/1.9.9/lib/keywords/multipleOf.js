import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/multipleOf";

const compile = (schema) => Browser.value(schema);

const interpret = (multipleOf, instance) => {
  if (Instance.typeOf(instance) !== "number") {
    return true;
  }

  const remainder = Instance.value(instance) % multipleOf;
  return numberEqual(0, remainder) || numberEqual(multipleOf, remainder);
};

const numberEqual = (a, b) => Math.abs(a - b) < 1.19209290e-7;

export default { id, compile, interpret };

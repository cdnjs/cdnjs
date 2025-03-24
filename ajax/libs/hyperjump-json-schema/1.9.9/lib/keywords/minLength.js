import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minLength";

const compile = (schema) => Browser.value(schema);
const interpret = (minLength, instance) => {
  return Instance.typeOf(instance) !== "string" || [...Instance.value(instance)].length >= minLength;
};

export default { id, compile, interpret };

import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minProperties";

const compile = (schema) => Browser.value(schema);
const interpret = (minProperties, instance) => {
  return Instance.typeOf(instance) !== "object" || [...Instance.keys(instance)].length >= minProperties;
};

export default { id, compile, interpret };

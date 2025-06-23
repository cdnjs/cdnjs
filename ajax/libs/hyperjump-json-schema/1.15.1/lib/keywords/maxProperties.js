import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maxProperties";

const compile = (schema) => Browser.value(schema);
const interpret = (maxProperties, instance) => {
  return Instance.typeOf(instance) !== "object" || [...Instance.keys(instance)].length <= maxProperties;
};

export default { id, compile, interpret };

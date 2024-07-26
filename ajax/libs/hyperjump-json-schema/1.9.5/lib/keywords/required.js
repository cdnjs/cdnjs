import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/required";

const compile = (schema) => Browser.value(schema);

const interpret = (required, instance) => {
  return Instance.typeOf(instance) !== "object" || required.every((propertyName) => Object.hasOwn(Instance.value(instance), propertyName));
};

export default { id, compile, interpret };

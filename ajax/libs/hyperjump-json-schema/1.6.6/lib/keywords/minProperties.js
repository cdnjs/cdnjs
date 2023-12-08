import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minProperties";

const compile = (schema) => Schema.value(schema);
const interpret = (minProperties, instance) => {
  return !Instance.typeOf(instance, "object") || [...Instance.keys(instance)].length >= minProperties;
};

export default { id, compile, interpret };

import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maxProperties";

const compile = (schema) => Schema.value(schema);
const interpret = (maxProperties, instance) => {
  return !Instance.typeOf(instance, "object") || [...Instance.keys(instance)].length <= maxProperties;
};

export default { id, compile, interpret };

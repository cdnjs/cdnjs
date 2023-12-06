import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/type";

const compile = (schema) => Schema.value(schema);
const interpret = (type, instance) => typeof type === "string" ? Instance.typeOf(instance, type) : type.some(Instance.typeOf(instance));

export default { id, compile, interpret };

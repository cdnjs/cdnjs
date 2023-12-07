import jsonStringify from "fastest-stable-stringify";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/enum";

const compile = (schema) => Schema.value(schema).map(jsonStringify);
const interpret = (enum_, instance) => enum_.some((enumValue) => jsonStringify(Instance.value(instance)) === enumValue);

export default { id, compile, interpret };

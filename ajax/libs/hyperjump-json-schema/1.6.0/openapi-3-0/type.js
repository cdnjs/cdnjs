import { getKeywordName } from "../lib/keywords.js";
import * as Schema from "../lib/schema.js";
import * as Instance from "../lib/instance.js";


const id = "https://spec.openapis.org/oas/3.0/keyword/type";

const compile = async (schema, ast, parentSchema) => {
  const nullableKeyword = getKeywordName(schema.dialectId, "https://spec.openapis.org/oas/3.0/keyword/nullable");
  const nullable = await Schema.step(nullableKeyword, parentSchema);
  return Schema.value(nullable) === true ? ["null", Schema.value(schema)] : Schema.value(schema);
};

const interpret = (type, instance) => typeof type === "string" ? Instance.typeOf(instance, type) : type.some(Instance.typeOf(instance));

export default { id, compile, interpret };

import * as Browser from "@hyperjump/browser";
import * as Instance from "../lib/instance.js";
import { getKeywordName } from "../lib/experimental.js";


const id = "https://spec.openapis.org/oas/3.0/keyword/type";

const compile = async (schema, _ast, parentSchema) => {
  const nullableKeyword = getKeywordName(schema.document.dialectId, "https://spec.openapis.org/oas/3.0/keyword/nullable");
  const nullable = await Browser.step(nullableKeyword, parentSchema);
  return Browser.value(nullable) === true ? ["null", Browser.value(schema)] : Browser.value(schema);
};

const interpret = (type, instance) => typeof type === "string"
  ? isTypeOf(instance)(type)
  : type.some(isTypeOf(instance));

const isTypeOf = (instance) => (type) => type === "integer"
  ? Instance.typeOf(instance) === "number" && Number.isInteger(Instance.value(instance))
  : Instance.typeOf(instance) === type;

export default { id, compile, interpret };

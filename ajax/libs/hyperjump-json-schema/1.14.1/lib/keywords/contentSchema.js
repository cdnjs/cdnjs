import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { getKeywordName } from "../keywords.js";


const id = "https://json-schema.org/keyword/contentSchema";

const compile = async (contentSchema, _ast, parentSchema) => {
  const contentMediaTypeKeyword = getKeywordName(contentSchema.document.dialectId, "https://json-schema.org/keyword/contentMediaType");
  const contentMediaType = await Browser.step(contentMediaTypeKeyword, parentSchema);
  if (Browser.value(contentMediaType) === undefined) {
    return;
  }

  return Browser.value(contentSchema);
};

const interpret = () => true;

const annotation = (contentSchema, instance) => {
  if (!contentSchema || Instance.typeOf(instance) !== "string") {
    return;
  }

  return contentSchema;
};

export default { id, compile, interpret, annotation };

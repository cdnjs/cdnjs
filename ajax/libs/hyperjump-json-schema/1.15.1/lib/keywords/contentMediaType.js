import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/contentMediaType";

const compile = (schema) => Browser.value(schema);
const interpret = () => true;

const annotation = (contentMediaType, instance) => {
  if (Instance.typeOf(instance) !== "string") {
    return;
  }

  return contentMediaType;
};

export default { id, compile, interpret, annotation };

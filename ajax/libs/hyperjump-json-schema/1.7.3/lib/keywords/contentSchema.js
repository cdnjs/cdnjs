import * as Schema from "../schema.js";


const id = "https://json-schema.org/keyword/contentSchema";

const compile = (contentSchema) => Schema.canonicalUri(contentSchema);
const interpret = () => true;

export default { id, compile, interpret };

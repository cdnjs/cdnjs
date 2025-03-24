const id = "https://json-schema.org/keyword/draft-04/exclusiveMinimum";
const compile = (schema) => schema.value;
const interpret = () => true;

export default { id, compile, interpret };

export const TypeMustBe = function (type, key, additional) {
  return 'The value for the ' + key + ' should be of type ' + (Array.isArray(type) ? type.join(' | ') : type) + '. ' + (additional || '')
}
const definedErrors = {
  TypeMustBe : TypeMustBe
};
export default definedErrors;
var Splitter = function CommaSplitter (value) {
  this.value = value;
};

Splitter.prototype.split = function () {
  if (this.value.indexOf(',') === -1)
    return [this.value];

  if (this.value.indexOf('(') === -1)
    return this.value.split(',');

  var level = 0;
  var cursor = 0;
  var lastStart = 0;
  var len = this.value.length;
  var tokens = [];

  while (cursor++ < len) {
    if (this.value[cursor] == '(') {
      level++;
    } else if (this.value[cursor] == ')') {
      level--;
    } else if (this.value[cursor] == ',' && level === 0) {
      tokens.push(this.value.substring(lastStart, cursor));
      lastStart = cursor + 1;
    }
  }

  if (lastStart < cursor + 1)
    tokens.push(this.value.substring(lastStart));

  return tokens;
};

module.exports = Splitter;

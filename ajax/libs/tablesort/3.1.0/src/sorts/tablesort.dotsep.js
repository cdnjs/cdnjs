// Dot separated values. E.g. IP addresses or version numbers.
Tablesort.extend('dotsep', function(item) {
  return /^(\d+\.)+\d+$/.test(item);
}, function(a, b) {
  a = a.split('.');
  b = b.split('.');

  for (var i = 0, len = a.length, ai, bi; i < len; i++) {
    ai = parseInt(a[i], 10);
    bi = parseInt(b[i], 10);

    if (ai === bi) continue;
    if (ai > bi) return -1;
    if (ai < bi) return 1;
  }

  return 0;
});

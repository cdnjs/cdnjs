var diff = require('../diff');

describe('#applyPatch', function() {
  it('should apply patches that change the last line', function() {
    diff.applyPatch(
        'line2\n'+
        'line3\n'+
        'line5\n',

        'Index: test\n'
        + '===================================================================\n'
        + '--- test\theader1\n'
        + '+++ test\theader2\n'
        + '@@ -1,3 +1,4 @@\n'
        + ' line2\n'
        + ' line3\n'
        + '+line4\n'
        + ' line5\n')
      .should.equal(
        'line2\n'
        + 'line3\n'
        + 'line4\n'
        + 'line5\n');

    diff.applyPatch(
        'line2\nline3\nline4\n',

        'Index: test\n'
        + '===================================================================\n'
        + '--- test\theader1\n'
        + '+++ test\theader2\n'
        + '@@ -1,3 +1,4 @@\n'
        + ' line2\n'
        + ' line3\n'
        + ' line4\n'
        + '+line5\n')
      .should.equal('line2\nline3\nline4\nline5\n');

    diff.applyPatch(
        'line1\nline2\nline3\nline4\n',

        'Index: test\n'
        + '===================================================================\n'
        + '--- test\theader1\n'
        + '+++ test\theader2\n'
        + '@@ -1,4 +1,4 @@\n'
        + ' line1\n'
        + ' line2\n'
        + ' line3\n'
        + '+line44\n'
        + '-line4\n')
      .should.equal('line1\nline2\nline3\nline44\n');

    diff.applyPatch(
        'line1\nline2\nline3\nline4\n',

        'Index: test\n'
        + '===================================================================\n'
        + '--- test\theader1\n'
        + '+++ test\theader2\n'
        + '@@ -1,4 +1,5 @@\n'
        + ' line1\n'
        + ' line2\n'
        + ' line3\n'
        + '+line44\n'
        + '+line5\n'
        + '-line4\n')
      .should.equal('line1\nline2\nline3\nline44\nline5\n');
  });

  it('should merge EOFNL', function() {
    diff.applyPatch(
        'line1\nline2\nline3\nline4\n',

        'Index: test\n'
        + '===================================================================\n'
        + '--- test\theader1\n'
        + '+++ test\theader2\n'
        + '@@ -1,4 +1,4 @@\n'
        + ' line1\n'
        + ' line2\n'
        + ' line3\n'
        + '+line4\n'
        + '\\ No newline at end of file\n'
        + '-line4\n')
      .should.equal('line1\nline2\nline3\nline4');

    diff.applyPatch(
        'line1\nline2\nline3\nline4',

        'Index: test\n'
        + '===================================================================\n'
        + '--- test\theader1\n'
        + '+++ test\theader2\n'
        + '@@ -1,4 +1,4 @@\n'
        + ' line1\n'
        + ' line2\n'
        + ' line3\n'
        + '+line4\n'
        + '-line4\n'
        + '\\ No newline at end of file\n')
      .should.equal('line1\nline2\nline3\nline4\n');

    diff.applyPatch(
        'line11\nline2\nline3\nline4',

          'Index: test\n'
          + '===================================================================\n'
          + '--- test\theader1\n'
          + '+++ test\theader2\n'
          + '@@ -1,4 +1,4 @@\n'
          + '+line1\n'
          + '-line11\n'
          + ' line2\n'
          + ' line3\n'
          + ' line4\n'
          + '\\ No newline at end of file\n')
      .should.equal('line1\nline2\nline3\nline4');

    diff.applyPatch(
        'line11\nline2\nline3\nline4\nline4\nline4\nline4',

        'Index: test\n'
        + '===================================================================\n'
        + '--- test\theader1\n'
        + '+++ test\theader2\n'
        + '@@ -1,5 +1,5 @@\n'
        + '+line1\n'
        + '-line11\n'
        + ' line2\n'
        + ' line3\n'
        + ' line4\n'
        + ' line4\n')
      .should.equal('line1\nline2\nline3\nline4\nline4\nline4\nline4');
  });

  it('should apply patches', function() {
    // Create patch
    var oldFile =
      'value\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'remove value\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'remove value\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'value\n'
      + 'context\n'
      + 'context';
    var newFile = 
      'new value\n'
      + 'new value 2\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'add value\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'context\n'
      + 'new value\n'
      + 'new value 2\n'
      + 'context\n'
      + 'context';
    var diffFile =
      'Index: testFileName\n'
      + '===================================================================\n'
      + '--- testFileName\tOld Header\n'
      + '+++ testFileName\tNew Header\n'
      + '@@ -1,5 +1,6 @@\n'
      + '+new value\n'
      + '+new value 2\n'
      + '-value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '@@ -7,9 +8,8 @@\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '-remove value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '@@ -17,20 +17,21 @@\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '-remove value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '+add value\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + ' context\n'
      + '+new value\n'
      + '+new value 2\n'
      + '-value\n'
      + ' context\n'
      + ' context\n'
      + '\\ No newline at end of file\n';

    diff.applyPatch(oldFile, diffFile).should.equal(newFile);

    diffFile =
      'Index: testFileName\n'
      + '===================================================================\n'
      + '--- testFileName\tOld Header\n'
      + '+++ testFileName\tNew Header\n';
    diff.applyPatch(oldFile, diffFile).should.equal(oldFile);
  });
});

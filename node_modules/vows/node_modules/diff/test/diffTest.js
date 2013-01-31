const VERBOSE = false;

var assert = require('assert'),
    diff = require('../diff');

function log() {
  VERBOSE && console.log.apply(console, arguments);
}

describe('#diffWords', function() {
  it('should diff whitespace', function() {
    var diffResult = diff.diffWords('New Value', 'New  ValueMoreData');
    diff.convertChangesToXML(diffResult).should.equal('New  <ins>ValueMoreData</ins><del>Value</del>');
  });

  it('should diff multiple whitespace values', function() {
    var diffResult = diff.diffWords('New Value  ', 'New  ValueMoreData ');
    diff.convertChangesToXML(diffResult).should.equal('New  <ins>ValueMoreData</ins><del>Value</del> ');
  });

  // Diff on word boundary
  it('should diff on word boundaries', function() {
    var diffResult = diff.diffWords('New :Value:Test', 'New  ValueMoreData ');
    diff.convertChangesToXML(diffResult).should.equal('New  <ins>ValueMoreData </ins><del>:Value:Test</del>');

    diffResult = diff.diffWords('New Value:Test', 'New  Value:MoreData ');
    diff.convertChangesToXML(diffResult).should.equal('New  Value:<ins>MoreData </ins><del>Test</del>');

    diffResult = diff.diffWords('New Value-Test', 'New  Value:MoreData ');
    diff.convertChangesToXML(diffResult).should.equal('New  Value<ins>:MoreData </ins><del>-Test</del>');

    diffResult = diff.diffWords('New Value', 'New  Value:MoreData ');
    diff.convertChangesToXML(diffResult).should.equal('New  Value<ins>:MoreData </ins>');
  });

  // Diff without changes
  exports['Diff without changes'] = function() {
    var diffResult = diff.diffWords('New Value', 'New Value');
    diff.convertChangesToXML(diffResult).should.equal('New Value');

    diffResult = diff.diffWords('New Value', 'New  Value');
    diff.convertChangesToXML(diffResult).should.equal('New  Value');

    diffResult = diff.diffWords('', '');
    diff.convertChangesToXML(diffResult).should.equal('');
  };

  // Empty diffs
  it('should diff empty content', function() {
    var diffResult = diff.diffWords('New Value', '');
    diffResult.length.should.equal(1);
    diff.convertChangesToXML(diffResult).should.equal('<del>New Value</del>');

    diffResult = diff.diffWords('', 'New Value');
    diff.convertChangesToXML(diffResult).should.equal('<ins>New Value</ins>');
  });

  // With without anchor (the Heckel algorithm error case)
  it('should diff when there is no anchor value', function() {
    var diffResult = diff.diffWords('New Value New Value', 'Value Value New New');
    diff.convertChangesToXML(diffResult).should.equal('<ins>Value</ins><del>New</del> Value New <ins>New</ins><del>Value</del>');
  });
});

// CSS Diff
describe('#diffCss', function() {
  it('should diff css', function() {
    var diffResult = diff.diffCss(
      '.test,#value .test{margin-left:50px;margin-right:-40px}',
      '.test2, #value2 .test {\nmargin-top:50px;\nmargin-right:-400px;\n}');
    diff.convertChangesToXML(diffResult).should.equal(
      '<ins>.test2</ins><del>.test</del>,<del>#value</del> <ins>#value2 </ins>.test<ins> </ins>{<ins>\n'
      + 'margin-top</ins><del>margin-left</del>:50px;<ins>\n</ins>'
      + 'margin-right:<ins>-400px;\n</ins><del>-40px</del>}');
  });
});

// Line Diff
describe('#diffLines', function() {
  it('should diff lines', function() {
    var diffResult = diff.diffLines(
      'line\nold value\nline',
      'line\nnew value\nline');
    diff.convertChangesToXML(diffResult).should.equal('line\n<ins>new value\n</ins><del>old value\n</del>line');
  });
  it('should the same lines in diff', function() {
    var diffResult = diff.diffLines(
      'line\nvalue\nline',
      'line\nvalue\nline');
    diff.convertChangesToXML(diffResult).should.equal('line\nvalue\nline');
  });

  it('should handle shorespace', function() {
    var diffResult = diff.diffLines(
      'line\nvalue \nline',
      'line\nvalue\nline');
    diff.convertChangesToXML(diffResult).should.equal('line\n<ins>value\n</ins><del>value \n</del>line');
  });
});

describe('convertToDMP', function() {
  it('should output diff-match-patch format', function() {
    var diffResult = diff.diffWords('New Value  ', 'New  ValueMoreData ');

    diff.convertChangesToDMP(diffResult).should.eql(
        [[0,'New  '],[1,'ValueMoreData'],[-1,'Value'],[0,' ']]);
  });
});

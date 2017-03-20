
test('Hashes are not part of query value', function () {
  var r = new Rlite();

  r.add('stuff', function (r) {
    ok(r.params.name == 'value');
  });

  r.run('stuff?name=value#baz');
});

test('Routes with no params give an empty params object', function () {
  var r = new Rlite();

  r.add('stuff', function (r) {
    ok(!Object.keys(r.params).length);
  });

  r.run('stuff');
});

test('Route parameter check', function() {
  var r = new Rlite();

  r.add('hey/:name', function(r) {
    ok(r.params.name == 'chris');
  });

  r.run('hey/chris');
});

test('Route with uppercase letters', function() {
  var r = new Rlite();

  r.add('Hey/:name', function(r) {
    ok(r.params.name == 'chris');
  });

  r.run('hey/chris');
});

test('Route handling overwriting', function() {
  var r = new Rlite();

  r.add('hey/:name', function (r) {
    ok(false, 'This should never run');
  });

  r.add('hey/:name', function(r) {
    ok(r.params.name == 'chris');
  });

  r.run('hey/chris');
});

test('Other routes don\'t get confused', function() {
  var r = new Rlite();

  r.add('hey/:name/new', function(r) {
    throw 'New called';
  });

  r.add('hey/:name', function(r) {
    ok(r.params.name == 'chris');
  });

  r.add('hey/:name/edit', function(r) {
    throw 'Edit called';
  });

  r.run('hey/chris');
});

test('Most explicit wins', function() {
  var r = new Rlite();

  r.add('hey/joe', function(r) {
    ok(r.url == 'hey/joe');
  });

  r.add('hey/:name', function(r) {
    throw 'New called';
  });

  r.add('hey/jane', function(r) {
    ok(r.url == 'hey/jane');
  });

  r.run('hey/joe');
  r.run('hey/jane');
});

test('Complex routes work', function() {
  var r = new Rlite();

  r.add('hey/:name/new', function(r) {
    throw 'New called';
  });

  r.add('hey/:name', function(r) {
    throw 'Name called';
  });

  r.add('hey/:name/last/:last', function(r) {
    ok(r.params.name == 'chris' && r.params.last == 'davies');
  });

  r.run('hey/chris/last/davies');
});

test('Query strings override other params', function() {
  var r = new Rlite();

  r.add('hey/:name/new', function(r) {
    throw 'New called';
  });

  r.add('hey/:name', function(r) {
    throw 'Name called';
  });

  r.add('hey/:name/last/:last', function(r) {
    ok(r.params.name == 'ham' && r.params.last == 'mayo');
  });

  ok(r.run('hey/chris/last/davies?last=mayo&name=ham'));
});

test('Not found', function() {
  var r = new Rlite();

  r.add('hey/:name', function(r) {
    throw 'Name called';
  });

  ok(!r.run('hoi/there'));
});

test('Leading slashes don\'t matter', function() {
  var r = new Rlite();

  r.add('hey/:name', function(r) {
    ok(r.params.name == 'chris');
  });

  r.run('/hey/chris');
});

test('Default url', function() {
  var r = new Rlite();

  r.add('', function(r) {
    ok(true);
  });

  r.run('');
});

test('Trailing slash', function() {
  var r = new Rlite();

  r.add('hoi', function(r) {
    ok(true);
  });

  r.run('hoi/');
});

test('Trailing slash with query', function() {
  var r = new Rlite();

  r.add('hoi', function(r) {
    ok(true);
  });

  r.run('hoi/?there');
});


test('Rlite.handlers calls each handler', function() {
  var r = new Rlite(),
      h1Ran = false,
      h2Ran = false;

  function h1(r) {
    h1Ran = (r.params.name == 'chris');
  }

  function h2(r) {
    h2Ran = (r.params.name == 'chris');
  }

  r.add('hey/:name', Rlite.handlers(h1, h2));

  r.run('/hey/chris');

  ok(h1Ran);
  ok(h2Ran);
});

test('Encoded params', function() {
  var r = new Rlite();

  r.add(':hey', function(r) {
    ok(r.params.hey === '/hoi/hai?hui');
  });
  r.run(encodeURIComponent('/hoi/hai?hui'));

  r.add('', function(r) {
    ok(r.params.hey === '/hoi/hai');
  });
  r.run('/?hey=' + encodeURIComponent('/hoi/hai'));

  r.add('/more-complex/:hey', function(r) {
    ok(r.params.hey === '/hoi/hai?hui');
    ok(r.params.hui === '/hoi/hai');
  });

  r.run('/more-complex/' + encodeURIComponent('/hoi/hai?hui') + '?hui=' + encodeURIComponent('/hoi/hai'));
});

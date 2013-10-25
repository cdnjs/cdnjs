# How to contribute

I love pull requests. And following this simple guidelines will make your pull request easier to merge.


## Submitting pull requests

1. Create a new branch, please don’t work in master directly.
2. Add failing tests (if there’re any tests in project) for the change you want to make. Run tests (usually `grunt` or `npm test`) to see the tests fail.
3. Hack on.
4. Run tests to see if the tests pass. Repeat steps 2–4 until done.
5. Update the documentation to reflect any changes.
6. Push to your fork and submit a pull request.


## JavaScript code style

- Tab indentation.
- Single-quotes.
- Semicolon.
- Strict mode.
- No trailing whitespace.
- Variables where needed.
- Multiple variable statements.
- Space after keywords and between arguments and operators.
- Use === and !== over == and !=.
- Return early.
- Limit line lengths to 120 chars.
- Prefer readability over religion.

Example:

```js
'use strict';

function foo(bar, fum) {
    if (!bar) return;

    var hello = 'Hello';
    var ret = 0;
    for (var barIdx = 0; barIdx < bar.length; barIdx++) {
        if (bar[barIdx] === hello) {
            ret += fum(bar[barIdx]);
        }
    }

    return ret;
}
```


## Other notes

- If you have commit access to repo and want to make big change or not sure about something, make a new branch and open pull request.
- Don’t commit generated files: compiled from Stylus CSS, minified JavaScript, etc.
- Install [EditorConfig](http://editorconfig.org/) plugin for your code editor.
- If code you change uses different style (probably it’s an old code) use file’s style instead of style described on this page.
- Feel free to [ask me](http://sapegin.me/contacts) anything you need.


## How to build / test

`cd` to `src` folder first.

Install dependencies:

```bash
npm install
```

Hack on:

```bash
grunt watch
```

Build:

```bash
grunt
```

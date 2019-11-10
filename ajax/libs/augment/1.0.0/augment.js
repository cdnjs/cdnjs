// The world's smallest and fastest classical JavaScript inheritance pattern (`Function.prototype.augment`) is a [seven line function](http://javascript.github.com/augment "augment.js") which allows you to write [CoffeeScript style classes](http://coffeescript.org/#classes "CoffeeScript") with a flair of [simplicity](http://ejohn.org/blog/simple-javascript-inheritance/ "John Resig -   Simple JavaScript Inheritance"); and it still [beats the bejesus](http://jsperf.com/oop-benchmark/86 "JavaScript Object Oriented Libraries Benchmark · jsPerf") out of other JavaScript inheritance libraries.

// Inspired by giants like [Jeremy Ashkenas](http://ashkenas.com/ "Jeremy/Ashkenas — Portfolio") and [John Resig](http://ejohn.org/ "John Resig - JavaScript Programmer"), `augment` is an augmentation of ideas. Classes created using `augment` have a CoffeeScript like structure, and a syntax like John Resig's; but they are more readable, intuitive and orders of magnitude faster. Plus they work on every JavaScript platform.

// # Table of Contents #

// 1. [Installation and Usage](https://github.com/javascript/augment#installation-and-usage "Installation and Usage")
// 2. [Creating your First Class](https://github.com/javascript/augment#creating-your-first-class "Creating your First Class")
// 3. [Creating your Second Class](https://github.com/javascript/augment#creating-your-second-class "Creating your Second Class")
// 4. [Creating your Third Class](https://github.com/javascript/augment#creating-your-third-class "Creating your Third Class")
// 5. [CoffeeScript Like Structure](https://github.com/javascript/augment#coffeescript-like-structure "CoffeeScript Like Structure")
// 6. [Syntax Like John Resig's](https://github.com/javascript/augment#syntax-like-john-resigs "Syntax Like John Resig's")

// # Documentation #

// Crockford's [fallback](http://javascript.crockford.com/prototypal.html "Prototypal Inheritance") for the `Object.create` function, with little more descriptive names.

if (typeof Object.create !== "function") {
    Object.create = function (prototype) {
        function constructor() {}
        constructor.prototype = prototype;
        return new constructor;
    };
}

// We extend the prototype of `Function` with `augment` so that any function can be augmented (extended). Yes, extending native prototypes is considered bad practice but I'm still doing it because:

Function.prototype.augment = function (classBodyFunction) {

// 1. JavaScript programmers are too scared of extending native prototypes. So I'm not afraid that some other library will break my code.
// 2. I picked the name of the method I'm adding very carefully - `augment`. All other JavaScript inheritance libraries use `extend` instead.
// 3. I am reserving the method name `augment` for myself. Don't get mad - Jeremy Ashkenas reserved the [underscore](http://underscorejs.org/ "Underscore.js") and John Resig reserved the [dollar sign](http://jquery.com/ "jQuery: The Write Less, Do More, JavaScript Library").
// 4. JavaScript allows you to extend native prototypes. It's not against the spirit of the language or else it wouldn't be possible in the first place.
// 5. Crockford has dedicated a section about extending native prototypes in his book [JavaScript: The Good Parts](http://eleventyone.done.hu/OReilly.JavaScript.The.Good.Parts.May.2008.pdf "JavaScript: The Good Parts"), and he's not against it.

// The method `augment` has a single parameter which is called `classBodyFunction` simply because it's a function which contains the body of the class.

// __Line 1:__ Save the `prototype` of the base constructor in a variable called `uber`. We can't use `super` because it's a reserved word and I don't like using underscores (`_super` abhors me).

    var uber = this.prototype;

// __Line 2:__ Create an object which inherits from the `prototype` of the base constructor. This object will be used as the `prototype` of the class, making its instances an `instanceof` the base constructor as well.

    var prototype = Object.create(uber);

// __Line 3:__ Call `classBodyFunction` with the base constructor and it's `prototype` as arguments. The public properties of the class are collected on the newly created `prototype` object. The `classBodyFunction` should return the constructor of the class.

    var constructor = classBodyFunction.call(prototype, this, uber);

// __Line 4:__ If `classBodyFunction` doesn't return a constructor then provide a default constructor which does nothing.

    if (typeof constructor !== "function") constructor = function () {};

// __Line 5:__ Set the `constructor` property of the `prototype` object to point to the constructor.

    prototype.constructor = constructor;

// __Line 6:__ Make `prototype` the prototype of the constructor function.

    constructor.prototype = prototype;

// __Line 7:__ That's it. Simple no?

    return constructor;

// If you think that this is an amazing function and that the code the CoffeeScript compiler generates is a [mess](https://github.com/javascript/augment#coffeescript-like-structure "CoffeeScript Like Structure") then send an email to [Jeremy Ashkenas](mailto:jashkenas@gmail.com "Jeremy Ashkenas") asking him to fix it using this method instead. It's a [win](http://jsperf.com/oop-benchmark/86 "JavaScript Object Oriented Libraries Benchmark · jsPerf") for everyone.

};

# X-editable

In-place editing with Twitter Bootstrap, jQuery UI or pure jQuery.  

## Live demo
**http://vitalets.github.io/x-editable/demo.html**

## Installation

### Manual download
Use **http://vitalets.github.io/x-editable**

### Bower
````
bower install x-editable
````

### CDN
````js
<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.4.5/bootstrap-editable/css/bootstrap-editable.css" rel="stylesheet"/>
<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.4.5/bootstrap-editable/js/bootstrap-editable.min.js"></script>
````

## Documentation
**http://vitalets.github.io/x-editable**


## Reporting issues
When creating issues please provide [jsFiddle](http://jsfiddle.net) example. You can easily fork one of following:   
1. [jsFiddle bootstrap template](http://jsfiddle.net/xBB5x/195)  
2. [jsFiddle jqueryui template](http://jsfiddle.net/xBB5x/196)  
3. [jsFiddle jquery template](http://jsfiddle.net/xBB5x/197)    
Your feedback is very appreciated!

## Contribution
A few steps how to start contributing:  

1.[Fork X-editable](https://github.com/vitalets/x-editable/fork) and pull the latest changes from <code>dev</code> branch

2.Arrange local directory structure. It should be:  
**x-editable**  
 | -- **lib** (repo related to <code>dev</code> and <code>master</code> branches)  
 | -- **gh-pages** (repo related to <code>gh-pages</code> branch for docs & demo)  
 | -- **playground** (simple node-server and html page for testing, [playground_1.2.zip](https://github.com/downloads/vitalets/x-editable/playground_1.2.zip), **updated in 1.2.0!**)      

To make it easy follow this script ( _assuming you have [nodejs](http://nodejs.org) installed_ ).
Please replace <code>&lt;your-github-name&gt;</code> with your name:
````
mkdir x-editable
cd x-editable

#lib
git clone https://github.com/<your-github-name>/x-editable.git -b dev lib
cd lib
#install gruntjs globally - building tool
npm install -g grunt 
#install other dependencies - grunt-contrib
npm install 
cd ..

#gh-pages
git clone https://github.com/<your-github-name>/x-editable.git -b gh-pages gh-pages
cd gh-pages
npm install 
cd ..

#playground 
#download playground.zip from https://github.com/downloads/vitalets/x-editable/playground_1.2.zip
unzip playground.zip
cd playground
npm install 
````  
3.That's it! You can start editing files in **lib/src** directory or create new editable input/container/whatever.  
To test the result go to **playground**, start server <code>node server.js</code> and open in your browser [http://localhost:3000/playground](http://localhost:3000/playground).

4.To run unit tests you can open it directly in browser **lib/test/index.html**.   
Or use grunt's _qunit_ task <code>grunt test</code>. For that you also need to [install PhantomJS](https://github.com/gruntjs/grunt/blob/master/docs/faq.md#why-does-grunt-complain-that-phantomjs-isnt-installed)

5.To build distributive run <code>grunt build</code> in **lib** directory. Result will appear in **lib/dist**.

6.To build docs run <code>build data-docs-dist</code> in **gh-pages** directory. Result will appear in **gh-pages/*.html**.  
Do not edit **index.html** and **docs.html** directly! Instead look at [Handlebars](https://github.com/wycats/handlebars.js) templates in **generator/templates**.

7.Commit changes on <code>dev</code> / <code>gh-pages-dev</code> branch and make pull request as usual. 

Thanks for your support!

## License
Copyright (c) 2012 Vitaliy Potapov  
Licensed under the MIT license.
# X-editable

In-place editing with Twitter Bootstrap, jQuery UI or pure jQuery.  

## Live demo
**http://vitalets.github.io/x-editable/demo.html**

## Installation

### Manual download
Use **http://vitalets.github.io/x-editable** main page.

### Bower
````
bower install x-editable
````

### CDN
````js
<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.4.6/bootstrap-editable/css/bootstrap-editable.css" rel="stylesheet"/>
<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.4.6/bootstrap-editable/js/bootstrap-editable.min.js"></script>
````

## Documentation
**http://vitalets.github.io/x-editable**


## Reporting issues
When creating issues please provide [jsFiddle](http://jsfiddle.net) example. You can easily fork one of following:   
1. [jsFiddle bootstrap template](http://jsfiddle.net/xBB5x/1817)  
2. [jsFiddle jqueryui template](http://jsfiddle.net/xBB5x/196)  
3. [jsFiddle jquery template](http://jsfiddle.net/xBB5x/197)    
Your feedback is very appreciated!

## Contribution
A few steps how to start contributing.  
Assuming you have [Node.js](http://nodejs.org/) already installed.

1.Fork *X-editable* on github and clone it to your local mashine:
````
git clone https://github.com/<your-github-name>/x-editable.git -b dev
````
2.Install *grunt-cli* globally (if not yet):
````
npm i -d grunt-cli
````
3.Install dependencies:  
````
npm i
````
4.Make your awesome changes.  
````
vim editable-form.js
````
5.Run tests:  
````
grunt test
````
6.Commit and push back on github:  
````
git add .
git commit -m'refactor editable form, fix #123'
git push origin
````
7.Make pull request on github.  
 
Thanks for your support!

### Local build
To build x-editable locally please run:
````
grunt build
````
Result will appear in `dist` directory.

## License
Copyright (c) 2012 Vitaliy Potapov  
Licensed under the MIT license.
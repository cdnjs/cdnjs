# dg-url : use google drive and dropbox as hosting services
[![Build Status](https://travis-ci.org/aa947/dg-url.svg?branch=master)](https://travis-ci.org/aa947/dg-url)  [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![](https://david-dm.org/aa947/dg-url.svg) 
[![Package Quality](https://npm.packagequality.com/shield/dg-url.svg)](https://packagequality.com/#?package=dg-url)
![npm](https://img.shields.io/npm/dt/dg-url)

## overview
 
 Reform google drive and dropbox urls so you can host your photos on gDrive or dropbox then use them directly in your html code for img.src attribuite.

 dg-url is a client & server side function.



## installation 
 
 ``` npm i dg-url ```
 
## usage:

react.js:

```javascript
import dg from "dg-url";

let url = //your shared photo's url (google drive or dropbox);

<img src={ dg(url) } / >

```

node.js:

```javascript 

/*
* server
*/

const dg = require("dg-url");

app.get("/", (req, res) => {

let url = //your shared photo's url (google drive or dropbox);

req.render( 'index',  { imageSrc: dg(url) } ); //to the client

} );

}


/*
* client : EJS
*/

<img src = <%= imageSrc %>   />


```

## contact

 https://www.ahmad-ali.co.uk/
 
 ahmadali14@acm.org
 
## licence 

 [![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)

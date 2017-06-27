# API

You can "search" cdnjs via our API:

```
https://api.cdnjs.com/libraries
```

Without any query parameters it will return the name and main file URL of every library on cdnjs. To search, use:

```
https://api.cdnjs.com/libraries?search=jquery
```

You can also "select" a certain library if you already know its name on CDNJS, e.g.

```
https://api.cdnjs.com/libraries/jquery
```

Without any query parameters it will return the whole meta data of the library, if you want to specify the info you want (recommended), use "fields" query:

```
https://api.cdnjs.com/libraries/jquery?fields=name,filename,version
```

All the usable fields is the same as the library's package.json on CDNJS:

https://github.com/cdnjs/cdnjs/blob/master/ajax/libs/jquery/package.json


API will reture minified result by default, if you wanna have a human readable result, try `output=human` like this:

```
https://api.cdnjs.com/libraries?output=human
https://api.cdnjs.com/libraries?search=jquery&output=human
```

If you would like more data, use the fields parameter which takes comma-separated values:

```
https://api.cdnjs.com/libraries?search=jquery&fields=version,description
```

To get a list of all files for that library, use the assets field:

```
https://api.cdnjs.com/libraries?search=jquery&fields=assets
```

Other fields available are:

```
version
description
homepage
keywords
license
repository
autoupdate
author
assets
```

The API is served over Cloudflare with a hour expiry for requests.



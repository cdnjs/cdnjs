# React Breadcrumbs 

[React][1] Component for [React-Router][4]. 

Demo at [learnreact.robbestad.com][2]

Source on [github][5]

## Installation

    % npm install react-breadcrumbs --save

## Versioning

  The aim is to correlate with react-router. 

## Usage

    var Breadcrumbs = require('react-breadcrumbs');

    MyComponent = React.createClass({
      render: function() {
         return (
           <div>
           	 <Breadcrumbs />
           </div>
        );
      }
    });

Optionally, you can add this prop to replace the default separator:

    <Breadcrumbs separator=" | " />

The breadcrumbs will automatically populate based on your 
route configuration. It requires that you have a name="" parameter
in your routes for every route. It will use the displayName parameter
for the Breadcrumb link. 

Another optional is _breadcrumbName_:

    <Breadcrumbs breadcrumbName="My breadcrumb name" />

The point of this property is to provide a method to set a breaadcrumb name for the final breadcrumb. 

You can also exclude specific routes if you want to:

    <Breadcrumbs excludes={['App']} />

This will print all breadcrumbs, except for the one where the route name is `App`.

## Styling

The breadcrumbs are set up with a div with the class name "breadcrumbs".

[1]: https://facebook.github.io/react
[2]: http://opensourceprojects.robbestad.com/#/breadcrumbs
[3]: https://github.com/svenanders/react-breadcrumbs/issues/1
[4]: https://github.com/rackt/react-router
[5]: https://github.com/svenanders/react-breadcrumbs

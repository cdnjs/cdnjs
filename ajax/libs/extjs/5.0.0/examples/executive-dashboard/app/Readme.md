# ./controller

This folder contains the application's global controllers. ViewControllers are located
alongside their respective view class in `"./view"`. These controllers are used for routing
and other activities that span all views.

# ./model

This folder contains the application's (data) Model classes.

# ./view

This folder contains the views as well as ViewModels and ViewControllers depending on the
application's architecture. Pure MVC applications may not have ViewModels, for example. For
MVCVM applications or MVC applications that use ViewControllers, the following directory
structure is recommended:

    ./view/
        foo/                    # Some meaningful grouping of one or more views
            Foo.js              # The view class
            FooController.js    # The controller for Foo (a ViewController)
            FooModel.js         # The ViewModel for Foo

This structure helps keep these closely related classes together and easily identifiable in
most tabbed IDE's or text editors.

# ./store

This folder contains any number of store instances or types that can then be reused in the
application.

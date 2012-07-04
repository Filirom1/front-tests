Backbonist --- Backbone Minimalist
==================================

WORK IN PROGRESS

Backbonist is a Minimalist Backbone boilerplate.
Yet an other Boilerplate for Backbone and like other boilerplates don't
take it too seriously.

Backbonist is greatly inspired from [DocumentCloud sources](https://github.com/documentcloud/documentcloud/tree/master/public/javascripts) and [HTML5 BoilerPlate](http://html5boilerplate.com/)

Backbonist helps you starting a Backbone project in no time. You don't have to
learn other libraries than Backbone and jQuery. The main idea is to
improve the learning curve of creating Single Page Web Application.
Nothing is magic, everything is close to javascript, HTML and the DOM,
but **you will understand what you do**.

Let's start now

### First read the sourcess, and the documentation.

Before starting, I suggest you to read the [Backbone Documentation](http://documentcloud.github.com/backbone/) and the [jQuery doc](http://docs.jquery.com/How_jQuery_Works) too.

The more you are confortable with jQuery and Backbone, the more
Backbonist will become evident for you.

Backbonist is just a set of very small conventions, to organize
your Backbone application. There is nothing hard to understand. Take
some times to look at the sources, it's the best way to understand the project. Start with [application.js](https://github.com/Backbonist/Backbonist/blob/master/application.js)


### Clone

Are you ready to start?

To create your app, just clone this repo:

    git clone https://Filirom1@github.com/Filirom1/Backbonist.git

Every source files are commented. Feel free to remove every comments and
codes you don't want. Backbonist is here to help, not to bother you with
unwanted features. If later you miss something, github will be there to
show you the original file.

### Choose your namespace

In Backbonist, there is no dependency system like [RequireJs](http://requireJs.org) or [browserify](https://github.com/substack/node-browserify). It's simpler this way.

If you want to build a big application, you need simple
conventions. The first convention to follow is the namespace.

Here we organize our code inside the namespace `xx`.

We prepare our namespace in [application.js](https://github.com/Backbonist/Backbonist/blob/master/application.js):

    window.xx = {};
    xx.view = {};
    xx.model = {};


Then, each file extend the namespace.

    xx.view.MyView = Backbone.View.extend({ ... });
    xx.model.MyThing = Backbone.Model.extend({ ... });


We attach singleton instance directly to the namespace.

    xx.model.myThing = new xx.model.MyThing();


Otherwise, non-singletons are attached to their container.

    this.mything = new xx.model.MyThing();


By default the namespace is `xx`. But you can change it on Linux and Unix
with a `sed` command:

    cd Backbonist
    find . -exec sed -i "s/xx/YOUR-NAMESPACE-HERE/g" {} \;

[Read more, read the sources](https://github.com/Backbonist/Backbonist/blob/master/application.js)


### Create your template

You are a web developper. You want to create HTML files.

This takes place in the template folder.

Create an HTLM file with the `.jst` extension, i.e. `myTemplate.jst`.



But what is JST ?

JST means JavaScript Template. A JST compiler compile all your HTML into a
JavaScript file. Then, you will be able to access your compiled templates
using the JST namespace :

    JST["your-template-name"]({name: "toto", age: "23", color: "red"});


Here is a JST compiler that works with the following templates system
: jQuery Tmpl, Handlebars, Underscore or pure string : <https://github.com/wookiehangover/handlebars-jst>


[Read more, read the sources](https://github.com/Backbonist/Backbonist/tree/master/template)


### Create your Views

In Backbone, View is just a small glue between the HTML template, the DOM, user
interaction, and raw datas.

The simplest view in Backbone, populate a template inside the `el`
attribute.

    xx.view.TodoView = Backbone.View.extend({
      template: JST.todo,

      data: {key: 'value'},

      events: {
        'click .refresh': 'render'
      },

      render: function() {
        this.$el.html(this.template(this.data));
        return this;
      }
    });

[Read more, read the sources](https://github.com/Backbonist/Backbonist/tree/master/template)


### Edit your routes

Now that you have several views, you want to build a Single Page Web
Application. You need to make some views appear or disappear.

You will also want some views to be rendered during all the application.

[Read more, read the sources](https://github.com/Backbonist/Backbonist/blob/master/Router.js)


### Organize your views.

You will have a lot of views in your application. Some views will only
exist inside a parent view (local views), other will be shared across
all the application (global views).

Local views are attached to the container instance:

    xx.view.ContainerView = Backbone.View.extend({
      events: {
        'click input': 'onClick'
      },

      initialize: function(){
        this.childView = new xx.view.ContainerView.ChildView();
      },

      onClick: function(e){
        this.childView.doSomething();
      }
    });


On the contrary, Global views are attached to the namespace:

    xx.view.MyView = Backbone.View.extend({
      events: {
        'click input': 'onClick'
      },

      onClick: function(e){
        xx.view.aGlobalView.doSomething();
      }
    });

For communication between global views you don't have to use a pubsub.
Just use the global view functions directly. It will be easier for you
to debug the communication between views. If one day you need to change
a view, don't worry you will be able to list every public methods.

    $ grep -R "xx.view.aGlobalView" your-sources/

If one day you need to extract some code from a project to an other,
just change the namespace of the second project. 

Moreover, thanks to the namespace you can identify easily every singelton instance and class usages.


### Create your Models and Collections

It's time to make your aplication dynamic, to call some remote JSON
files then show the result into a custom view.

Like you have objects and arrays in JSON, you will have Models and Collections in Backbone.

For more information about Model and Collections, read the official
website : <http://documentcloud.github.com/backbone/>. There is nothing
special in Backbonist about that.

[Read more, read the sources](https://github.com/Backbonist/Backbonist/blob/master/model/Todo.js)


### Create jQuery Plugins

To write DRY code you will have to avoid duplication.

That's why it's a good idea to extend jQuery with any function that is
relative to the DOM.

[Read more, read the sources](https://github.com/Backbonist/Backbonist/blob/master/lib/jquery.plugin.js)

### Create Backbone Plugins

Extend Backbone with any function that is
relative to Views, Model, Collections, Events, ...

It's a good idea to create Backbone plugins, take a look at this great one : [setMode](https://github.com/Filirom1/Backbone.setMode);

[Read more, read the sources](https://github.com/Backbonist/Backbonist/blob/master/lib/Backbone.plugin.js)

### Create utils functions

In an application, there is always very basic functions that are not relative to the DOM nor to Backbone : utils function.

If [underscore](http://documentcloud.github.com/underscore/) is not enough for you, create your own utilities functions in `lib/util.js`

[Read more, read the sources](https://github.com/Backbonist/Backbonist/blob/master/lib/util.js)

### Add tests

TODO


### Build your project

Never think of putting in production your application with all these
small files.

You need to concatenate, minify and md5 your CSS and Javascript files.

Then you will serve them with GZip compression.

Look at the [HTML5 BoilerPlate Build Script](http://html5boilerplate.com/docs/Build-script/)

### License

Code contributed to this project is provided under the MIT license.  
Some components of the project are subject to their own 
licenses as indicated (see /vendor directory).

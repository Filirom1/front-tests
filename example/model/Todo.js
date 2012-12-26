// Create your model this way.
xx.model.MyThing = Backbone.Model.extend({

});

// Don't forget `xx.model.MyThing` is a class.
// If want to share the instance of this model in all your application (Singleton),
// just remove the following comment.
// xx.model.myThing = new xx.model.MyThing();


// And your collection like this.
xx.model.MyThings = Backbone.Collection.extend({
  model: xx.model.MyThing
});

// Like for Model, your can use Singleton for your Collections.
// Remove the following comment if you need one.
// xx.model.myThings = new xx.model.MyThings();

(function(){

  // Extend Backbone with new functions.
  //
  // Don't forget the .prototype between the Backbone class you want to extend and your function name.
  Backbone.View.prototype.todo = function() {
    // Because are extending Backbone View, `this` refer to the view instance.
    console.log('Todo call on View ' + this);
  }
})();

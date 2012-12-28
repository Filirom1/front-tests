(function($){
  $.fn.extend({

    // Create your own jQuery plugins here.
    //
    // A plugin is not something hard to do.
    // Just replace this funtion by any util function that is relative to the DOM.
    //
    // You could use this plugin like this : `$('h2').todo()`
    todo: function(){
      // Use `$(this)` to have a reference on the DOM element with the jQuery function.
      $(this).text('TODO');
    }
  });
})(jQuery);

// The router is a Singleton.
// It is responsible of displaying your page given an URL.
//
// Some views in the application are always rendered: the AppViews.
xx.Router = Backbone.Router.extend({

  routes: {
    "":                     "home",    // /
    "toto":                 "toto",    // /toto
    "search/:query":        "search",  // /search/kiwis
    "search/:query/p:page": "search"   // /search/kiwis/p7
  },

  home: function() {
    $('#main').html(new xx.view.IndexView().render().el);
  },

  toto: function() {
    $('#main').html(new xx.view.TotoView().render().el);
  },

  search: function(query, page) {
    $('#main').html(new xx.view.SearchView().render(query, page).el);
  }

});

$(function(){
  xx.router = new xx.Router();
  Backbone.history.start({pushState: true});
});

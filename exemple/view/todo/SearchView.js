xx.view.SearchView = Backbone.View.extend({

  template: JST.search,

  render: function(query, page) {
    this.$el.html(this.template({
      query: query,
      page: page
    }));
    return this;
  }
});

xx.view.IndexView = Backbone.View.extend({

  template: JST.index,

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

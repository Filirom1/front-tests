xx.view.TotoView = Backbone.View.extend({

  template: JST.toto,

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

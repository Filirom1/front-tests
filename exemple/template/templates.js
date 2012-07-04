(function(){ window.JST || (window.JST = {}) 
window.JST["README"] = function(context) { return HandlebarsTemplates["README"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["README"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "Call a JST compiler inside this folder.\n\nAll your templates will be compiled into a single JS file.\n\nIf you use Handlebars template, you can use this JST compiler:\n<https://github.com/wookiehangover/handlebars-jst>\n\n    $ npm install -g handlebars-jst\n\n    $ cd template\n\n    $ tmpl\n";});

window.JST["index"] = function(context) { return HandlebarsTemplates["index"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["index"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<h2>Welcome on board</h2>\n<p>A custom paragraph here.</p>\n<p>Do you know <a href=\"/toto\">toto</a>?</p>\n<p>Or you may want to search for <a href=\"/search/fries\">fries</a></p>\n<p>This code is on <a href=\"https://github.com\">github</a></p>\n";});

window.JST["search"] = function(context) { return HandlebarsTemplates["search"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["search"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


  buffer += "<h2>Search</h2>\n<p>This is the search page.</p>\n<p>You are looking for <a href=\"/search/";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></p>\n<p>There are three results, you are on the ";
  foundHelper = helpers.page;
  stack1 = foundHelper || depth0.page;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "page", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/3 : </p>\n<ul>\n  <li><a href=\"/search/";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/p1\">";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></li>\n  <li><a href=\"/search/";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/p2\">";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></li>\n  <li><a href=\"/search/";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "/p3\">";
  foundHelper = helpers.query;
  stack1 = foundHelper || depth0.query;
  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "query", { hash: {} }); }
  buffer += escapeExpression(stack1) + "</a></li>\n</ul>\n<p>Are you interested in <a href=\"/search/tomatoes\">Tomatoes</a></p>\n<p>Go back to <a href=\"/\">home</a> </p>\n";
  return buffer;});

window.JST["toto"] = function(context) { return HandlebarsTemplates["toto"](context); };this.HandlebarsTemplates || (this.HandlebarsTemplates = {});this.HandlebarsTemplates["toto"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var foundHelper, self=this;


  return "<h2>Hey guy</h2>\n\n<p>Do you want a <a href=\"/search/potatoe\">potatoe</a></p>\n";});

})();
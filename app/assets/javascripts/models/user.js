GPXtra.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
  
  following: function(){
    return this.get("following") ? true : false
  }
});
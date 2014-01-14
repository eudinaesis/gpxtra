window.GPXtra = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Hello from Backbone!');
		GPXtra.workouts = new GPXtra.Collections.Workouts(INITIAL_WORKOUTS);
    GPXtra.user = USER_DATA;
    GPXtra.others = new GPXtra.Collections.Users();
    var navbar = new GPXtra.Views.NavBar();
    $("#navbar").html(navbar.render().$el);
    new GPXtra.Routers.GPXtraRouter($("#content-grid"));
    Backbone.history.start();
    Backbone.history.navigate("#!/feed", { trigger: true});
    console.log("hooray");
    GPXtra.others.fetch();
  }
};

$(document).ready(function(){
  GPXtra.initialize();
});
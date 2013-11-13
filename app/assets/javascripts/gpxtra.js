window.GPXtra = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Hello from Backbone!');
		GPXtra.workouts = new GPXtra.Collections.Workouts(INITIAL_WORKOUTS);
    GPXtra.user = USER_DATA;
    var navbar = new GPXtra.Views.NavBar();
    $("#navbar").html(navbar.render().$el);
    new GPXtra.Routers.GPXtraRouter($("#content-grid"));
    Backbone.history.start();
    Backbone.history.navigate("#!/feed", { trigger: true});
    console.log("hooray");
  }
};

$(document).ready(function(){
  GPXtra.initialize();
});


var rendermap = function() {
	var map = new L.Map('map');

	var url = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg',
		attr ='Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		service = new L.TileLayer(url, {subdomains:"1234",attribution: attr});

	var el = L.control.elevation();
	el.addTo(map);
	var g=new L.GPX(GPX_URL, {
		async: true,
		 marker_options: {
		    startIconUrl: '/assets/pin-icon-start.png',
		    endIconUrl: '/assets/pin-icon-end.png',
		    shadowUrl: '/assets/pin-shadow.png'
		  }
	});
	g.on('loaded', function(e) {
	  		map.fitBounds(e.target.getBounds());
	});
	g.on("addline",function(e){
		el.addData(e.line);
	});
	g.addTo(map);
	map.addLayer(service);
};
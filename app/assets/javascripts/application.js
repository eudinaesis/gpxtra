// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require backbone_rails_sync
//= require backbone_datalink
//= require backbone/gp_xtra
//= require_tree .
//= require_tree ../../../vendor/assets

$(document).ready(function() {
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
});
GPXtra.Views.MapDetail = Support.CompositeView.extend({

  initialize: function() {
  },
  
  render: function(){
    var renderedContent = JST["workouts/show"]({
      workout: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  saveModel: function(){
    this.model.save({}, {
      success: function(resp) {
        console.log("saved");
      },
      error: function(req, status, err) {
        console.log("errors");
      }
    });
  },
  
  initMap: function (gpxfile, tileSet) {
    // create a map in the "map" div
    var map = L.map('map-' + this.model.id);
    var viewObj = this;
    var workout = this.model

    // create an OpenStreetMap tile layer
    var tileOptions = {
      terrain: ['http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }],
      osm: ['http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }],
      watercolor: ['http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }],
    };
    tileSet = tileSet || "watercolor";
    var osmLayer = L.tileLayer(tileOptions[tileSet][0], tileOptions[tileSet][1]);
    
    var el = L.control.elevation( {
        position: "topright",
        theme: "lime2-theme", //default: lime-theme
        width: 600,
        height: 275,
        margins: {
            top: 10,
            right: 20,
            bottom: 30,
            left: 50
        },
        useHeightIndicator: true, //if false a marker is drawn at map position
        interpolation: "linear", //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
        hoverNumber: {
            decimalsX: 3, //decimals on distance (always in km)
            decimalsY: 0, //deciamls on height (always in m)
            formatter: undefined //custom formatter function may be injected
        },
        xTicks: undefined, //number of ticks in x axis, calculated by default according to width
        yTicks: undefined, //number of ticks on y axis, calculated by default according to height
        collapsed: true    //collapsed mode, show chart on click or mouseover
    } );
    el.addTo(map);

    // create the gpx Layer
    var gpxLayer = new L.GPX(gpxfile, {
      async: true,
      marker_options: {
        // define where the icons are
        startIconUrl: '/assets/pin-icon-start.png',
        endIconUrl: '/assets/pin-icon-end.png',
        shadowUrl: '/assets/pin-shadow.png'
      },
      // some more options passed to Leaflet Polyline http://leafletjs.com/reference.html#polyline
      color: 'purple',
      clickable: true,
    });

    // proceed with the loading as soon as the gpx is loaded
    gpxLayer.on('loaded', function(e) {
      var gpx = e.target;
      workout.set({
        datetime: gpx.get_start_time() || new Date(),
        distance: gpx.get_distance_imp().toFixed(2),
        moving_time: Math.floor(gpx.get_moving_time() / 1000),
        pace: gpx.get_duration_string(gpx.get_moving_pace_imp()),
        elevation: Math.floor(gpx.get_elevation_gain() * 3.28084),
        hrAvg: gpx.get_average_hr(),
        hrArr: gpx.get_heartrate_data_imp(),
        max_hr: gpx.get_max_hr(),
      });
      viewObj.saveModel();
    
      // show the map where the gpx is
      map.fitBounds(e.target.getBounds());
    
      // add layers to the map
      osmLayer.addTo(map);
      //hillshadeLayer.addTo(map);
      gpxLayer.addTo(map);
    
      //add a control to switch the layers on and off
      var baseLayers = {
        "OSM": osmLayer
      };
      var overlays = {
        //"Hillshading": hillshadeLayer,
        "GPX": gpxLayer,
      };
      L.control.layers(baseLayers, overlays).addTo(map);
    
      // add some data about the gpx
      viewObj.$el.find(".elevationgain").text(
        (gpx.get_elevation_gain() * 3.28084).toFixed(0) + " feet uphill" 
      );
      viewObj.$el.find(".elevationloss").text(
        (gpx.get_elevation_loss() * 3.28084).toFixed(0) + " feet downhill"
      );      
    });
    
    gpxLayer.on('addline', function(e) {
      if (workout.get("elevation") > 0) {
        el.addData(e.line);        
      }
    });
  }  
});

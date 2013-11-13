GPXtra.Views.NavBar = Support.CompositeView.extend({

  initialize: function() {
    this.model = new GPXtra.Models.Workout();
    this.trackData = "";
  },
  
  events: {
    "submit": "uploadTrack",
    "change #workout-file": "handleFile"
  },
  
  render: function(){
    var renderedContent = JST["navbar"]({ username: GPXtra.user["name"] });
    this.$el.html(renderedContent);
    return this;
  },
  
  handleFile: function(event) {
    console.log(event.target);
    viewObj = this;
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadstart = function(event) {
      $("#upload-label").append("<img id='loading-wheel' src='/assets/ajax-loader.gif'>");
      console.log("Starting upload");
    };
    reader.onloadend = function(event) {
      $("#loading-wheel").remove();
      // check that it has data type
      if (reader.result.slice(0, 6) === "data:;") {
        viewObj.trackData = "data:application/xml" + reader.result.slice(5);
      } else {
        viewObj.trackData = reader.result;
      }
      console.log("File read-in!")
    };
    reader.readAsDataURL(file);
    // Do I want to analyze data from the beginning?
    var r2 = new FileReader();
    r2.onloadstart = function(event) {
      console.log("Starting r2 upload");
    };
    r2.onloadend = function(event) {
      viewObj.gpxString = r2.result;
      console.log("File read-in!")
    };
    r2.readAsText(file);
  },  
  
	uploadTrack: function (event) {
		var viewObj = this;
		var isNew = (viewObj.model.isNew());
		var saveCallback = {
				success: function () {
          console.log("Success!")
					if (isNew) {
						GPXtra.workouts.add(viewObj.model);
					}
          $("#upload-form").trigger("reset");
					Backbone.history.navigate("#!/feed", { trigger: true });
				},
				error: function (resp, status, jqXHR) {
					console.log("errors!");
				}
			};

    event.preventDefault();
    $('#uploadModal').modal('hide');
		var formData = $(event.target).serializeJSON();
    formData.workout.gpx_track = viewObj.trackData;
		this.model.save(formData.workout, saveCallback);
	}
  
});
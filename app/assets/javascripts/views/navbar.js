GPXtra.Views.NavBar = Support.CompositeView.extend({

  initialize: function() {
    this.model = new GPXtra.Models.Workout();
  },
  
  events: {
    'submit': "uploadTrack"
  },
  
  render: function(){
    var renderedContent = JST["navbar"]({ username: USERNAME });
    this.$el.html(renderedContent);
    return this;
  },
  
	uploadTrack: function (event) {
		var viewObj = this;
		var isNew = (viewObj.model.isNew());
		var saveCallback = {
				success: function () {
					if (isNew) {
						viewObj.collection.add(viewObj.model);
					}
					Backbone.history.navigate("#!/feed", { trigger: true });
				},
				error: function () {
					console.log("errors!");
				}
			};

    event.preventDefault();
    $('#uploadModal').modal('hide');
		var formData = $(event.target).serializeJSON();
		this.model.save(formData.workout, saveCallback);
	}
  
});
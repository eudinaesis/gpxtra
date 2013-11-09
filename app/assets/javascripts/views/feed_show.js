GPXtra.Views.FeedShow = Support.CompositeView.extend({

  initialize: function() {
    _.bindAll(this, "displayMapDetail");
    _.bindAll(this, "hideMapDetail");
    this.listenTo(this.collection, "add remove change:title reset", this.renderWorkoutList);
    $('#content-grid').on('hide.bs.collapse', '[id|="collapse"]', this.hideMapDetail);
    $('#content-grid').on('show.bs.collapse', '[id|="collapse"]', this.displayMapDetail);
  },
  
  displayMapDetail: function(event){
    if (event.target.children.length === 0) {
      var workoutId = parseInt(event.target.id.slice(9)); // id="comment-N"
      var workout = this.collection.get(workoutId);
      var mapDetail = new GPXtra.Views.MapDetail({
        model: workout
      });
      var workoutContainer = event.target // insert into expanding panel
      this.renderChildInto(mapDetail, workoutContainer);
      mapDetail.initMap(workout.escape("track_url"));
    }
  },

  hideMapDetail: function(event){
    console.log(event.target);
  },

  events: {
  },

  render: function(){
    this.renderFeedLayout();
    this.renderWorkoutList();
    return this;
  },
  
  renderFeedLayout: function(){
    var renderedContent = JST["feed/show"]({
      workouts: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  renderWorkoutList: function(){
    var workoutsContainer = this.$("#workout-feed");
    workoutsContainer.empty();
    this.collection.each(function (workout) {
      var renderedWorkout = JST["workouts/index_view"]({
        workout: workout
      });
      workoutsContainer.append(renderedWorkout);
    });
    return this;
  },

});
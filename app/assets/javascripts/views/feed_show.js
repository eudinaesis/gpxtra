GPXtra.Views.FeedShow = Support.CompositeView.extend({

  initialize: function() {
    this.listenTo(this.collection, "add remove change:title reset", this.renderWorkoutList);
    $('#content-grid').on('hide.bs.collapse', '[id|="collapse"]', this.hideMapView);
    $('#content-grid').on('show.bs.collapse', '[id|="collapse"]', this.displayMapView);
  },
  
  displayMapView: function(event){
    console.log(event.target);
  },

  hideMapView: function(event){
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
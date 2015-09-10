GPXtra.Views.FeedShow = Support.CompositeView.extend({

  initialize: function() {
    _.bindAll(this, "displayMapDetail");
    _.bindAll(this, "hideMapDetail");
    _.bindAll(this, "unfollow");
    this.listenTo(this.collection, "add remove change:datetime change:title change:description change:workout_type reset", this.renderWorkoutList);
    $('#content-grid').on('hide.bs.collapse', '[id|="collapse"]', this.hideMapDetail);
    $('#content-grid').on('show.bs.collapse', '[id|="collapse"]', this.displayMapDetail);
    $('#content-grid').on('click', 'li.feed-dd', this.feedMode);
    $('#content-grid').on('click', 'button.unfollow', this.unfollow);
  },
  
  unfollow: function(event){
    var exfriend_id = parseInt($(event.target).attr("data-id"));
    $.ajax( '/follows/' + exfriend_id, {
      type: 'DELETE',
      success: function( resp ) {
        GPXtra.others.get(exfriend_id).set({following: false});
        console.log( resp );
      },
      error: function( req, status, err ) {
        console.log( 'something went wrong', status, err );
      }
    });
    var newWorkouts = GPXtra.workouts.reject(function(workout){
      return workout.get("user_id") === exfriend_id;
    })
    GPXtra.workouts.reset(newWorkouts);
  },

  feedMode: function(event){
    var mode = event.target.text.trim();
    if (mode === "My workouts + followed workouts") {
      $(".own-workout").removeClass("hidden");
      $(".followed-workout").removeClass("hidden");      
    } else if (mode === "Only my workouts") {
      $(".own-workout").removeClass("hidden");
      $(".followed-workout").addClass("hidden");
    } else if (mode === "Only followed workouts") {
      $(".own-workout").addClass("hidden");
      $(".followed-workout").removeClass("hidden");      
    }
    $("#active-feed-type").text(mode + " ");
    $("#active-feed-type").append("<span class='caret'></span>");
    $("#feed-type-menu").children().removeClass("active");
    $(event.currentTarget).addClass("active");
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
GPXtra.Collections.Workouts = Backbone.Collection.extend({
	model: GPXtra.Models.Workout,
	url: "/workouts",
  
  initialize: function(attributes, options) {
  },

  stats: function(days){
    var stats = {
      num_workouts: 0,
      total_distance: 0,
      total_elev: 0,
      total_time: 0
    };
    
    this.each(function(workout) {
      if (new Date() - workout.get("datetime") <= (1000*60*60*24*days)){
        console.log("within " + days + " days!");
        stats["num_workouts"]++;
        stats["total_distance"] += workout.get("distance");
        stats["total_elev"] += workout.get("elevation");
        stats["total_time"] += workout.get("moving_time");
      }
    });
    stats["total_time"] = this.secondsToString(stats["total_time"]);
    stats["total_distance"] = stats["total_distance"].toFixed(1);
    return stats;
  },
  
  secondsToString: Support.secondsToString
});
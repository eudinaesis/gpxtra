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
  
  secondsToString: function(seconds) {
    var days = seconds / 60 / 60 / 24 << 0;
    days = (days > 0 ? days + " days, " : "");
    var hours = seconds / 60 / 60 << 0;
    hours = (hours > 0 ? hours + " hours, " : "");
    var minutes = seconds / 60 << 0;
    minutes = (minutes > 0 ? minutes + " minutes, " : "");
    seconds = seconds % 60 + " seconds";
    var string = days + hours + minutes + seconds
    return string;
  } 
});
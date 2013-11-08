GPXtra.Models.Workout = Backbone.Model.extend({
  urlRoot: "/workouts",

  defaults: {
      datetime: new Date(),
      description: '',
      distance: '',
      elevation: '',
      moving_time: '',
      title: '',
      track_url: '',
      username: '',
      workout_type: ''
  },
  
  /* import datetimes as JS date objects: http://blog.chariotsolutions.com/2012/02/using-jquerymobile-and-backbonejs-for.html
  */
  set: function(attributes, options) {
      var aDate;
      if (attributes.datetime){
          aDate = new Date(attributes.datetime);
          if ( Object.prototype.toString.call(aDate) === "[object Date]" && !isNaN(aDate.getTime()) ){
              attributes.datetime = aDate;
          }
      }
      Backbone.Model.prototype.set.call(this, attributes, options);
  }
});
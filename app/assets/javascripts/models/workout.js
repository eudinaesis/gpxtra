GPXtra.Models.Workout = Backbone.Model.extend({
  urlRoot: "/workouts",
  
  initialize: function(attributes, options) {
    if (attributes && attributes.datetime) {
      this.attributes["datetime"] = new Date(attributes["datetime"]);      
    }
  },

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
  set: function(attributes, options) {
      var aDate;
      if (attributes.datetime){
          aDate = new Date(attributes.datetime);
          if ( Object.prototype.toString.call(aDate) === "[object Date]" && !isNaN(aDate.getTime()) ){
              attributes.datetime = aDate;
          }
      }
      Backbone.Model.prototype.set.call(this, attributes, options);
  },
  */
  
  parse: function(resp, options) {
    var attr = _.clone(resp);
    if (attr.datetime){
        aDate = new Date(attr.datetime);
        if ( Object.prototype.toString.call(aDate) === "[object Date]" && !isNaN(aDate.getTime()) ){
            attr.datetime = aDate;
        }
    }
    return attr;
  },
  
  toJSON: function(options) {
    var attrCopy = {};
    attrCopy.workout = _.clone(this.attributes);
    attrCopy.workout.datetime = attrCopy.workout.datetime.toJSON();
    delete attrCopy.workout["track_url"];
    delete attrCopy.workout["username"];
    return attrCopy;
  }
});
GPXtra.Views.Social = Support.CompositeView.extend({
  template: JST["social/index"],
  
  initialize: function() {
    _.bindAll(this, "unfollow");
    _.bindAll(this, "follow");
    $('#content-grid').on('click', 'button.unfollow', this.unfollow);
    $('#content-grid').on('click', 'button.follow', this.follow);
  },

  follow: function(event){
    var users = this.collection;
    var new_friend_id = parseInt($(event.target).attr("data-id"));
    $.ajax( '/follows', {
      type: 'POST',
      data: { followed_user_id: new_friend_id },
      success: function( resp ) {
        $(event.target).addClass("hidden");
        $(event.target).siblings().filter("button").removeClass("hidden")
        users.get(new_friend_id).set({following: true});
        GPXtra.workouts.fetch()
        console.log( resp );
      },
      error: function( req, status, err ) {
        console.log( 'something went wrong', status, err );
      }
    });
    GPXtra.workouts.fetch();
  },
  
  unfollow: function(event){
    var users = this.collection;
    var exfriend_id = parseInt($(event.target).attr("data-id"));
    $.ajax( '/follows/' + exfriend_id, {
      type: 'DELETE',
      success: function( resp ) {
        $(event.target).addClass("hidden");
        $(event.target).siblings().filter("button").removeClass("hidden")
        users.get(exfriend_id).set({following: false});
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
  
  render: function(){
    this.renderUserIndex();
    this.renderUsers();
    return this;
  },
  
  renderUserIndex: function(){
    var renderedContent = this.template({
      users: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  renderUsers: function(){
    var usersContainer = this.$("#user-list");
    usersContainer.empty();
    this.collection.each(function (user) {
      var renderedUser = JST["social/show"]({
        user: user
      });
      usersContainer.append(renderedUser);
    });
    return this;
  },
});
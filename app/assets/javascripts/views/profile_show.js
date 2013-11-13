GPXtra.Views.ProfileShow = Support.CompositeView.extend({
  template: JST["profile/show"],
  
  initialize: function() {
    _.bindAll(this, "refreshStats");
    $('#content-grid').on('click', 'li.stats-dd', this.refreshStats);
  },
  
  events: {
    "click .dropdown-menu": ""
  },
  
  refreshStats: function(event){
    var statsTime = parseInt($(event.currentTarget).attr("data-id")); // id="data-N"
    $("#stats-menu").children().removeClass("active");
    $(event.currentTarget).addClass("active");
    $("#stats-time").text(event.target.text);
    this.renderStats(statsTime);
  },
  
  renderStats: function(statsTime){
    var renderedStats = JST["profile/stats"]({
      workouts: this.collection,
      statsTime: statsTime
    });
    var statsContainer = $("#stats-go-here") //
    statsContainer.html(renderedStats);    
  },
  
  render: function (){
    var renderedContent = this.template({
      workouts: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }
});
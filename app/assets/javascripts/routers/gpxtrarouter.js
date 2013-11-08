GPXtra.Routers.GPXtraRouter = Support.SwappingRouter.extend({
	routes: {
    "!/feed": "showFeed",
    "!/profile": "showProfile",
    "!/explore": "showExplore",
	},

	initialize: function (rootEl) {
		this.el = rootEl;
	},
  
	showFeed: function() {
    this.activateTab("feed");
		var feedView = new GPXtra.Views.FeedShow({
      collection: GPXtra.workouts
		});
    this.swap(feedView);
	},
  
	showProfile: function() {
    this.activateTab("profile");
		var profileView = new GPXtra.Views.ProfileShow({
      collection: GPXtra.workouts
		});
    this.swap(profileView);
	},
  
	showExplore: function() {
    this.activateTab("explore");
		var exploreView = new GPXtra.Views.ExploreShow({
      collection: GPXtra.workouts
		});
    this.swap(exploreView);
	},
    
  activateTab: function(activeTab) {
    var tabs = [
      "feed",
      "profile",
      "explore"
    ];
    _.each(tabs, function(tab){
      var tabId = "#" + tab + "-tab";
      if (tab === activeTab){
        $(tabId).addClass("active");
      } else {
        $(tabId).removeClass("active");
      }
    });
  }
});
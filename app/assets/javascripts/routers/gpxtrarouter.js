GPXtra.Routers.GPXtraRouter = Support.SwappingRouter.extend({
	routes: {
    "!/feed": "showFeed",
    "!/profile": "showProfile",
    "!/social": "showSocial",
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
    profileView.renderStats(7);
	},
  
	showExplore: function() {
    this.activateTab("explore");
		var exploreView = new GPXtra.Views.ExploreShow({
      collection: GPXtra.workouts
		});
    this.swap(exploreView);
	},
  
	showSocial: function() {
    this.activateTab("social");
		var socialView = new GPXtra.Views.Social({
      collection: GPXtra.others
		});
    this.swap(socialView);
	},
    
  activateTab: function(activeTab) {
    var tabs = [
      "feed",
      "profile",
      "social"
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
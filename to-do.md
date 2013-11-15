###TO DO###

**THURSDAY, 11/12**
* list Users, Follow

***remove edit settings****
splash screen
CARETS for individual workouts, filter box


* Serious bugs:
  - Some of Bill's and Tracy's GPX files don't map. Not clear why.
* Improved Leaflet mapping/graphing
  - graph HR
  - Meters vs Feet, etc
  - speed?
  - change L-gpx so handles pure XML on first upload
  - snapshot of graph for index view [ sort of possible ]
  - allow user to choose mapping options?
  - fix problem with huge GPX files  
* Other users
  - followers/following
  - feeds, with others different colors
  - view their profiles
  - comment / thumbs-up ride
* tweet button / log into Twitter
  - requires 'public page'
* 'Explore'
  - would need to store start/end point for each ride
  - would need to calculate nearby recorded rides
* general UI
  - improve sign-in page
  
* What would Other Users require? Different rails / collection methods - need to be able to fetch (public) Ws from Followed users:
- users/x/workouts : if current user is X, gets all workouts (self + followers), else, get public ones
- workouts : needs some sort of Params, then gets 25 nearest to location?
- 
  
  TEST = "data:application/octet-stream;base64," + btoa(d3.select(".leaflet-overlay-pane").html())
  
  var html = d3.select("svg")
          .attr("version", 1.1)
          .attr("xmlns", "http://www.w3.org/2000/svg")
          .node().parentNode.innerHTML;
 
    //console.log(html);
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
    var img = '<img src="'+imgsrc+'">'; 
    d3.select("#svgdataurl").html(img);
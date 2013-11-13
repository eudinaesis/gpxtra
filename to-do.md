###TO DO###

**TUESDAY, 11/12**

* Improved Leaflet mapping/graphing
  x- fix bug with tracing always acting on first map
  x- other map tile options [using Stamen / terrain]
  x- better elevation graph--line, not fill-in; colors
  - graph HR
  - speed?
  - change L-gpx so handles pure XML on first upload
  - snapshot of graph for index view [ sort of possible ]
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
  
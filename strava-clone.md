***STRAVA CLONE***

**APIs/tech needed:**

- Files:
  * user profile pics (default to [Gravatar](http://gravatarplugin.rubyforge.org/ or https://github.com/chrislloyd/gravtastic) or PlaceKitten)
  * GPX logs (50k - 2mb XML files)
  * results from map? not sure about this
- Any reason not to use paperclip + s3?

- Social:
  * sharing on FB
  * tweeting
- Devise/OAuth

- Location:
  * bonus feature for mobile, would look cool even if impractical (battery life)
- just use HTML5 geolocation, create GPX file

- Mapping:
  * [leaflet](http://leafletjs.com/examples/quick-start.html) for mapping
  * [leaflet-gpx plugin](https://github.com/mpetazzoni/leaflet-gpx) for tracks
  * [leaflet-elevation](https://github.com/MrMufflon/Leaflet.Elevation) for elev
  * not sure how to graph HR/cadence, if at all. Bonus if I get there. (Leaflet-gpx will give me HR data.) Possibly can modify the elevation plugin?
  * [TrackMatching API](https://mapmatching.3scale.net/) might be useful for getting street-following paths. Lose timestamp/HR/cadence/elev data, but tracks are much smaller. Possibly use for Explore tab?

**MVP**

x- user can log into demo account
x- user can upload GPX files
x- user can view own files
  x* maps track
  x* shows elevation profile
  * calculates summary statistics
- Backbone implementation of Workout/s, rendering, uploading, saving
  
**Features: FULL**

- user can record a new track
- users can tweet or FB them
- comments, fistbumps, followers
- user can view profile data
  * # of workouts, total distance/elev, max dist/elev
  * display by week/month/6 months/all time


**Rails Models: MVP**

1. User
  a. Devise/OAuth stuff
  b. has_many :workouts
  c. gravatar [model only]
2. Workout
  a. user_id: integer
  b. track: attachment [filepicker -- url? so string]
  c. datetime: datetime
  d. type: string ["ride", "run", "hike"]
  e. title: string
  f. moving_time: integer
  g. distance: float
  h. elev: integer
  i. belongs_to :user
  j. private: boolean
  
**Rails routes: MVP**

1. Users, show/create/new/update/edit/destroy
2. Workouts, index/show/create/destroy
3. "/feed" :to => "users#feed" [a model?]
* API should bootstrap Workouts, for JS

**Rails Models: Full**

1. User
  a. Devise/OAuth stuff
  b. has_many :workouts
  c. has_many :comments, :through => :workouts
  d. has_many :fistbumps, :through => :workouts
  e. has_many :incoming_follows
  f. has_many :outgoing_follows
  g. has_many :followers, :through => :incoming_follows, :source => :follower_id
  h. has_many :followed_users, :through => :outgoing_follows, :source => :followed_id
  i. gravatar
  j. user_pic: attachment
  k. has_many :feed_workouts, :through => :followed_users, :source => :workouts
2. Workout
  a. user_id: integer, :index
  b. track: attachment
  c. datetime: datetime
  d. type: string ["ride", "run", "hike"]
  e. title: string
  f. moving_time: integer
  g. distance: float
  h. elev: integer
  i. belongs_to :user
  j. private: boolean
  k. has_many :comments
  l. has_many :fistbumps
3. Comment
  a. workout_id: integer, :index
  b. author_id: integer, :index
  c. text: text
4. Fistbump
  a. workout_id: integer, :index
  b. bumper_id: integer, :index
5. Follow
  a. follower_id: integer, :index
  b. followed_id: integer, :index
  
**Rails routes: Full**

1. Users, show/create/new/update/edit/destroy
  * API for Users should bootstrap Workouts, Fistbump count, Comment count
2. Workouts, index/show/destroy [index is Explore]
  * API should include Comments
  a. nested Comments, all
  b. nested Fistbumps, only Create and Destroy
3. "/feed" :to => "users#feed" [a model?]

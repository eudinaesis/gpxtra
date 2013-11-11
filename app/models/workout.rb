class Workout < ActiveRecord::Base
  attr_accessible :datetime, :distance, :elevation, :hidden, :moving_time, :type, :user_id, :title, :description, :gpx_track, :workout_type, :pace, :hrAvg
  
  has_attached_file :gpx_track
  belongs_to :user
end

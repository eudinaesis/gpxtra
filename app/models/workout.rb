class Workout < ActiveRecord::Base
  attr_accessible :datetime, :distance, :elevation, :is_private, :moving_time, :type, :user_id, :title, :description, :gpx_track, :workout_type, :pace, :hrAvg, :max_hr
  
  has_attached_file :gpx_track
  belongs_to :user
  has_many :fistbumps
  
  def gravatar_url
    self.user.gravatar_url
  end
end

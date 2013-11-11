class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :datetime, :workout_type, :moving_time, :distance, :elevation, :title, :description, :track_url, :username, :pace, :hrAvg
  def track_url
    object.gpx_track.url
  end
  def username
    object.user.name
  end
  self.root = false\
end
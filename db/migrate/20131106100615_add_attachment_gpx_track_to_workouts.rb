class AddAttachmentGpxTrackToWorkouts < ActiveRecord::Migration
  def self.up
    change_table :workouts do |t|
      t.attachment :gpx_track
    end
  end

  def self.down
    drop_attached_file :workouts, :gpx_track
  end
end

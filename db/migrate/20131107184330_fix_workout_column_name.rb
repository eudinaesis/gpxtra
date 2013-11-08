class FixWorkoutColumnName < ActiveRecord::Migration
  def change
    rename_column :workouts, :type, :workout_type
  end
end

class DefaultWorkoutType < ActiveRecord::Migration
  def change
    change_column :workouts, :workout_type, :string, :default => "bike"
  end
end

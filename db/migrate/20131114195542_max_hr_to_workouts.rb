class MaxHrToWorkouts < ActiveRecord::Migration
  def change
    add_column :workouts, :max_hr, :integer
  end
end

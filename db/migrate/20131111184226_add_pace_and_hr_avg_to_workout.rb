class AddPaceAndHrAvgToWorkout < ActiveRecord::Migration
  def change
    add_column :workouts, :pace, :string
    add_column :workouts, :hrAvg, :integer
    change_column :workouts, :moving_time, :string
  end
end

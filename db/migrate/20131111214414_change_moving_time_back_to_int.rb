class ChangeMovingTimeBackToInt < ActiveRecord::Migration
  def change
    remove_column :workouts, :moving_time
    add_column :workouts, :moving_time, :integer
    add_index :workouts, :moving_time
    add_index :workouts, :distance
  end
end

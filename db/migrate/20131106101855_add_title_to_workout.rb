class AddTitleToWorkout < ActiveRecord::Migration
  def change
    add_column :workouts, :title, :string
    add_column :workouts, :description, :text
  end
end

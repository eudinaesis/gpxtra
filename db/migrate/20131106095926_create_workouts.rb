class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :user_id, :null => false
      t.datetime :datetime
      t.string :type
      t.integer :moving_time
      t.float :distance
      t.integer :elevation
      t.boolean :hidden, :default => false

      t.timestamps
    end
    add_index :workouts, :user_id
  end
end

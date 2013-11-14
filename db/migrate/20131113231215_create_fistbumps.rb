class CreateFistbumps < ActiveRecord::Migration
  def change
    create_table :fistbumps do |t|
      t.integer :workout_id, null: false
      t.integer :bumper_id, null: false

      t.timestamps
    end
    add_index :fistbumps, :workout_id
    add_index :fistbumps, :bumper_id
  end
end

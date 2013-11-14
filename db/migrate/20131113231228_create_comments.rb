class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :workout_id, null: false
      t.integer :author_id, null: false
      t.text :text, null: false
      
      t.timestamps
    end
    add_index :comments, :workout_id
    add_index :comments, :author_id
  end
end

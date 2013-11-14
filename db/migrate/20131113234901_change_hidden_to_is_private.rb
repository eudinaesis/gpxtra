class ChangeHiddenToIsPrivate < ActiveRecord::Migration
  def change
    rename_column :workouts, :hidden, :is_private
  end
end

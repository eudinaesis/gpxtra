class RootController < ApplicationController
  def root
    @user = current_user
    @workouts = Workout.includes(:user).where(:user_id => current_user.id).order(:datetime).as_json    
  end
end

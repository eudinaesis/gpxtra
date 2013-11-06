class WorkoutsController < ApplicationController
  def create
    @workout = Workout.new(params["workout"])
    @workout.user_id = current_user.id
    @workout.save!
    redirect_to root_url
  end
end

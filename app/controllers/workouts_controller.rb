class WorkoutsController < ApplicationController
  def index
    @workouts = Workout.where(:user_id => current_user.id)
    render :json => @workouts
  end
  
  def show
    @workout = Workout.find(params[:id])
    render :json => @workout
  end

  def create
    @workout = Workout.new(params["workout"])
    @workout.user_id = current_user.id
    @workout.save!
    redirect_to root_url
  end
end

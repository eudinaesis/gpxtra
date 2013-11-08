class WorkoutsController < ApplicationController
  def index
    @workouts = Workout.includes(:user).where(:user_id => current_user.id).order(:datetime)
    render :json => @workouts, root: false
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
